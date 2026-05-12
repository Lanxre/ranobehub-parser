export interface NovelData {
  title: string;
  description: string;
  author: string;
  coverUrl: string;
  url: string;
}

export interface SearchItem {
  id: number;
  names: {
    eng: string;
    rus: string;
  };
  description: string;
  synopsis: string;
  url: string;
  poster: {
    medium: string;
  };
  year: number;
  authors: RanobeAuthor[];
  translators: RanobeAuthor[];
  created_at: number;
  status: string;
  counts: {
    volumes: string;
    chapters: string;
  };
  volumes: RanobeVolume[];
}

export interface RanobeVolume {
  id: number;
  name: string;
  num: number;
  chapters: RanobeChapter[];
}

export interface RanobeChapter {
  id: number;
  name: string;
  num: number;
  url: string;
  has_images: boolean;
}

interface RanobeAuthor {
  name_tag: string;
  pivot: {
    ranobe_id: number;
    author_id: number;
  };
}

export interface RanobeChapterContent {
  title: string;
  images: string[];
  text: string;
}
