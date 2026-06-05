import type { RanobeSingleItem, RanobeSingleItemMe, RanobeSingleContent } from '@/types/responses/ranobe';

export function mapRanobeSingleItem(data: RanobeSingleItem): RanobeSingleItemMe {
  return {
    id: data.id,
    names: data.names,
    rating: data.rating,
    year: data.year,
    synopsis: data.synopsis,
    status: data.status,
    url: data.url,
    posters: data.posters,
    description: data.description,
    authors: data.authors || [],
    translators: data.translators || [],
    genres: data.tags.genres.map(g => g.title) || [],
  };
}

export function mapRanobeSingleContent(data: RanobeSingleContent): RanobeSingleContent {
  return {
    volumes: data.volumes.map(vl => ({
      id: vl.id,
      num: vl.num,
      name: vl.name,
      status: vl.status,
      chapters: vl.chapters.map(chp => ({
        id: chp.id,
        num: chp.num, 
        name: chp.name,
        url: chp.url,
        has_images: chp.has_images,
        text: '',
        images: []
      }))
    })),
  };
}