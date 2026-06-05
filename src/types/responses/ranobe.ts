export interface RanobeHubResponse {
  resource: RanobeItem[];
}

export interface RanobeItem {
  id: number;

  names: {
    eng: string;
    rus: string;
  };

  rating: number;
  created_at: number;

  synopsis: string;

  url: string;

  poster: {
    medium: string;
    small: string;
    color: string;
  };

  status: string;
  counts: {
    volumes: string;
    chapters: string;
  };
}

// responce from ranobehub
export interface RanobeSingleItem {
  id: number;
  names: {
    eng: string;
    rus: string;
  };
  rating: number;
  year: number;
  synopsis: string;
  status: {
    id: number;
    name: string;
  };
  url: string;
  posters: {
    big: string;
    medium: string;
    small: string;
    color: string;
  };
  description: string;

  authors: RanobeAuthor[];
  translators: RanobeAuthor[];
  tags: RanobeTag;
}

// responce from me
export interface RanobeSingleItemMe {
  id: number;
  names: {
    eng: string;
    rus: string;
  };
  rating: number;
  year: number;
  synopsis: string;
  status: {
    id: number;
    name: string;
  };
  url: string;
  posters: {
    big: string;
    medium: string;
    small: string;
    color: string;
  };
  description: string;

  authors: RanobeAuthor[];
  translators: RanobeAuthor[];
  genres: string[];
}

export interface RanobeTag {
  events: RanobeEvent[];
  genres: RanobeGenre[];
}

export interface RanobeEvent {
  id: number;
  url: string;
  title: string;
  description: string;
  names: {
    eng: string;
    rus: string;
  };
}

export interface RanobeGenre {
  id: number;
  url: string;
  title: string;
  names: {
    eng: string;
    rus: string;
  };
}

export interface RanobeAuthor {
  name_tag: string;
  pivot: {
    ranobe_id: number;
    author_id: number;
  };
}

export interface RanobeSingleContent {
  volumes: RanobeVolume[];
}

export interface RanobeVolume {
  id: number;
  num: number;
  name: string;
  status: {
    id: number;
    name: string;
  };
  chapters: RanobeChapter[];
}

export interface RanobeChapter {
  id: number;
  num: number;
  name: string;
  url: string;
  has_images: boolean;

  text: string;
  images: string[];
}
