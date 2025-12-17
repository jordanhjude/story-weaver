// Pre-generated episode images mapping
// Images are stored in src/assets/episodes/

// Let God Sort Em Out - Malik's Paris Journey (13 episodes)
import lgsto1 from '@/assets/episodes/lgsto-ep1-birds-dont-sing.jpg';
import lgsto2 from '@/assets/episodes/lgsto-ep2-chains-whips.jpg';
import lgsto3 from '@/assets/episodes/lgsto-ep3-pov.jpg';
import lgsto4 from '@/assets/episodes/lgsto-ep4-so-be-it.jpg';
import lgsto5 from '@/assets/episodes/lgsto-ep5-ace-trumpets.jpg';
import lgsto6 from '@/assets/episodes/lgsto-ep6-all-things.jpg';
import lgsto7 from '@/assets/episodes/lgsto-ep7-mtbttf.jpg';
import lgsto8 from '@/assets/episodes/lgsto-ep8-ebitda.jpg';
import lgsto9 from '@/assets/episodes/lgsto-ep9-fico.jpg';
import lgsto10 from '@/assets/episodes/lgsto-ep10-inglorious.jpg';
import lgsto11 from '@/assets/episodes/lgsto-ep11-so-far-ahead.jpg';
import lgsto12 from '@/assets/episodes/lgsto-ep12-chandeliers.jpg';
import lgsto13 from '@/assets/episodes/lgsto-ep13-grace-of-god.jpg';

// Midnight in Paris (5 episodes)
import paris1 from '@/assets/episodes/paris-ep1-rain.jpg';
import paris2 from '@/assets/episodes/paris-ep2-coffee.jpg';
import paris3 from '@/assets/episodes/paris-ep3-bridge.jpg';
import paris4 from '@/assets/episodes/paris-ep4-choice.jpg';
import paris5 from '@/assets/episodes/paris-ep5-reunion.jpg';

// The Haunting of Blackwood Manor (5 episodes)
import blackwood1 from '@/assets/episodes/blackwood-ep1-manor.jpg';
import blackwood2 from '@/assets/episodes/blackwood-ep2-ghost.jpg';
import blackwood3 from '@/assets/episodes/blackwood-ep3-door.jpg';
import blackwood4 from '@/assets/episodes/blackwood-ep4-truth.jpg';
import blackwood5 from '@/assets/episodes/blackwood-ep5-guardian.jpg';

// Streets of Tokyo (5 episodes)
import tokyo1 from '@/assets/episodes/tokyo-ep1-neon.jpg';
import tokyo2 from '@/assets/episodes/tokyo-ep2-shibuya.jpg';
import tokyo3 from '@/assets/episodes/tokyo-ep3-temple.jpg';
import tokyo4 from '@/assets/episodes/tokyo-ep4-fox.jpg';
import tokyo5 from '@/assets/episodes/tokyo-ep5-dawn.jpg';

// The Last Light (5 episodes)
import lastlight1 from '@/assets/episodes/lastlight-ep1-sun-died.jpg';
import lastlight2 from '@/assets/episodes/lastlight-ep2-survivors.jpg';
import lastlight3 from '@/assets/episodes/lastlight-ep3-others.jpg';
import lastlight4 from '@/assets/episodes/lastlight-ep4-price.jpg';
import lastlight5 from '@/assets/episodes/lastlight-ep5-dawn.jpg';

export interface EpisodeImageMap {
  [comicId: string]: {
    [episodeNumber: number]: string;
  };
}

export const episodeImages: EpisodeImageMap = {
  // Let God Sort Em Out
  'f8a3b2c1-4d5e-6f7a-8b9c-0d1e2f3a4b5c': {
    1: lgsto1,
    2: lgsto2,
    3: lgsto3,
    4: lgsto4,
    5: lgsto5,
    6: lgsto6,
    7: lgsto7,
    8: lgsto8,
    9: lgsto9,
    10: lgsto10,
    11: lgsto11,
    12: lgsto12,
    13: lgsto13,
  },
  // Midnight in Paris
  '3ba1e975-ef11-47cc-b014-cce057bd7f70': {
    1: paris1,
    2: paris2,
    3: paris3,
    4: paris4,
    5: paris5,
  },
  // The Haunting of Blackwood Manor
  '48772ecc-7213-4e23-a7f9-a12cb7fd4cde': {
    1: blackwood1,
    2: blackwood2,
    3: blackwood3,
    4: blackwood4,
    5: blackwood5,
  },
  // Streets of Tokyo
  'c0000001-0001-0001-0001-000000000001': {
    1: tokyo1,
    2: tokyo2,
    3: tokyo3,
    4: tokyo4,
    5: tokyo5,
  },
  // The Last Light
  'eeda5c2d-35bc-4fd5-abe4-c4290d68a2cc': {
    1: lastlight1,
    2: lastlight2,
    3: lastlight3,
    4: lastlight4,
    5: lastlight5,
  },
};

export function getEpisodeImage(comicId: string, episodeNumber: number): string | null {
  return episodeImages[comicId]?.[episodeNumber] || null;
}
