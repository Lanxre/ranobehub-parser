import * as cheerio from 'cheerio';
import pLimit from 'p-limit';

import type { RanobeChapterContent } from '@/types/internal/novel';
import type { RanobeHubResponse, RanobeItem, RanobeSingleItem, RanobeSingleContent } from '@/types/responses/ranobe';

import { ExternalApiError } from '@/errors';

import { mapRanobeSingleItem, mapRanobeSingleContent } from '@/mappers/ranobeMapper';

export async function searchRanobeHub(page: number = 1, take: number = 40): Promise<RanobeSingleItem[]> {
  try {
    const response = await fetch(`https://ranobehub.org/api/search?page=${page}&take=${take}`);
    if (!response.ok) {
      throw new ExternalApiError(`Failed to fetch search data: ${response.statusText}`);
    }
    const data = (await response.json()) as RanobeHubResponse;

    const items: RanobeSingleItem[] = await Promise.all(
      data.resource.map(async (item: RanobeItem) => {
        const ranobe = await fetchFullNovela(item.id)
        return ranobe;
      })
    );

    return items;
  } catch (error) {
    console.error('Error searching site:', error);
    throw new ExternalApiError('Failed to fetch search data');
  }
}

export async function fetchRanobe(ranobeId: number): Promise<RanobeSingleItem> {
  try {
    const response = await fetch(`https://ranobehub.org/api/ranobe/${ranobeId}`);
    if (!response.ok) {
      throw new ExternalApiError(`Failed to fetch ranobe data: ${response.statusText}`);
    }
    const data = (await response.json()).data as RanobeSingleItem;
    return mapRanobeSingleItem(data);
  } catch (error) {
    console.error('Error fetching ranobe:', error);
    throw new ExternalApiError('Failed to fetch ranobe data');
  }
}

export async function fetchRanobeContent(ranobeId: number): Promise<RanobeSingleContent> {
  try {
    const response = await fetch(`https://ranobehub.org/api/ranobe/${ranobeId}/contents`);
    if (!response.ok) {
      throw new ExternalApiError(`Failed to fetch ranobe content: ${response.statusText}`);
    }
    const data = (await response.json()) as RanobeSingleContent;
    return mapRanobeSingleContent(data);
  } catch (error) {
    console.error('Error fetching ranobe content:', error);
    throw new ExternalApiError('Failed to fetch ranobe content');
  }
}

export async function parseRanobeChapter(targetUrl: string): Promise<RanobeChapterContent> {
  const domain = new URL(targetUrl).origin;

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    const $ = cheerio.load(html);
    const container = $('div.ui.text.container[data-container]');
    
    if (!container.length) {
      console.warn(`[Warn] Container not found at ${targetUrl}`);
      return { title: '', images: [], text: '' };
    }

    const images = container.find('img')
      .map((_, img) => {
        const mediaId = $(img).attr('data-media-id');
        if (mediaId) {
          return `${domain}/api/media/${mediaId}`;
        }
        
        const path = $(img).attr('data-src') || $(img).attr('src') || '';
        return path.startsWith('/') ? domain + path : path;
      })
      .get()
      .filter(src => src.includes('/api/media/'));

    const paragraphs = container.find('p')
      .filter((_, p) => !$(p).closest('.ads-desktop, .ads-mobile').length)
      .map((_, p) => $(p).text().trim())
      .get()
      .filter(t => t.length > 0);

    const title = $('h1.ui.header').first().text().trim() || '';

    return {
      title,
      images,
      text: paragraphs.join('\n\n')
    };

  } catch (err: any) {
    return { title: '', images: [], text: '' };
  }
}

export async function fetchFullNovela(id: number): Promise<RanobeSingleItem & RanobeSingleContent> {
  const ranobe = await fetchRanobe(id);
  const ranobeVolumeContent = await fetchRanobeContent(ranobe.id);

  const limit = pLimit(20); 
  const allChapters = ranobeVolumeContent.volumes.flatMap(v => v.chapters);
  
  const chapterTasks = allChapters.map((chapter) => 
    limit(async () => {
      try {
        const content = await parseRanobeChapter(chapter.url);
        chapter.images = content.images || [];
        chapter.text = content.text || '';
      } catch (err) {
        chapter.images = [];
        chapter.text = '';
      }
    })
  );

  await Promise.all(chapterTasks);
  
  return { ...ranobe, ...ranobeVolumeContent };
}