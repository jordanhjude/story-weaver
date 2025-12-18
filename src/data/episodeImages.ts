// Episode images mapping - uses images from database or public folder

export interface EpisodeImageMap {
  [comicId: string]: {
    [episodeNumber: number]: string;
  };
}

export const episodeImages: EpisodeImageMap = {
  // Let God Sort Em Out
  'f8a3b2c1-4d5e-6f7a-8b9c-0d1e2f3a4b5c': {
    1: '/episodes/lgsto-ep1-badge.jpg',
  },
};

export function getEpisodeImage(comicId: string, episodeNumber: number): string | null {
  return episodeImages[comicId]?.[episodeNumber] || null;
}
