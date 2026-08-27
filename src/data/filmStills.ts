export interface OdysseyFilmStill {
  id: string;
  title: string;
  characterOrScene: string;
  caption: string;
  imageUrl: string;
  category: 'Teaser & Posters' | 'Characters' | 'Production & Sets' | 'Landscapes & Sea';
  aspectRatio: string;
  resolution: string;
}

export const ODYSSEY_FILM_STILLS: OdysseyFilmStill[] = [
  {
    id: 'still-warrior-spine-helmet',
    title: 'The Golden Spine Helmet',
    characterOrScene: 'Agamemnon / Mycenaean Commander',
    caption: 'The iconic teaser frame featuring the crested Corinthian battle helmet with handcrafted golden vertebrae running down the neck, surveying the misty assembly along the Aegean coast.',
    imageUrl: '/odyssey_warrior_bg.svg',
    category: 'Teaser & Posters',
    aspectRatio: '16:9',
    resolution: '4K Ultra HD (2.39:1 Anamorphic)'
  },
  {
    id: 'still-odysseus-ithaca-coast',
    title: 'Windswept Shores of Ithaca',
    characterOrScene: 'Odysseus (Matt Damon)',
    caption: 'Odysseus stands upon the jagged coastal limestone cliffs of Ithaca, weary from twenty years of war and wanderings across the Mediterranean.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
    category: 'Characters',
    aspectRatio: '16:9',
    resolution: 'IMAX 70mm 15/70'
  },
  {
    id: 'still-aegean-trireme-fleet',
    title: 'The Mycenaean Fleet at Sea',
    characterOrScene: 'The 12 War Triremes',
    caption: 'Practical replica Greek war galleys navigate through heavy Mediterranean swells under stormy maritime skies on location in Greece.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    category: 'Landscapes & Sea',
    aspectRatio: '16:9',
    resolution: '70mm Anamorphic'
  },
  {
    id: 'still-palace-of-ithaca',
    title: 'The Great Hall of Penelope',
    characterOrScene: 'Penelope (Anne Hathaway)',
    caption: 'Shafts of Mediterranean dawn light pierce the high marble columns of the royal palace where the shroud of Laertes is woven and unraveled.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop',
    category: 'Production & Sets',
    aspectRatio: '16:9',
    resolution: '4K Panavision'
  },
  {
    id: 'still-aegean-cliffs-sunset',
    title: 'The Cliffs of Ogygia',
    characterOrScene: 'Calypso’s Sanctuary',
    caption: 'Golden hour sunlight illuminating the sheer white limestone headlands and azure bays of the western Mediterranean archipelago.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1400&auto=format&fit=crop',
    category: 'Landscapes & Sea',
    aspectRatio: '16:9',
    resolution: 'IMAX 70mm'
  },
  {
    id: 'still-imax-camera-production',
    title: '70mm IMAX Location Filming',
    characterOrScene: 'Director & Camera Unit',
    caption: 'Christopher Nolan and the Panavision camera unit operating custom waterproof 70mm 15/70 film rigs on open water in the Cyclades.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop',
    category: 'Production & Sets',
    aspectRatio: '16:9',
    resolution: 'Behind the Scenes 70mm'
  },
  {
    id: 'still-underworld-katabasis',
    title: 'Descent to the Realm of Hades',
    characterOrScene: 'Katabasis / Tiresias',
    caption: 'Ethereal mist and shadow play as Odysseus journeys to the borders of the underworld to consult the blind prophet Tiresias.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    category: 'Landscapes & Sea',
    aspectRatio: '16:9',
    resolution: 'Anamorphic 2.39:1'
  },
  {
    id: 'still-mediterranean-harbor',
    title: 'The Port of the Phaeacians',
    characterOrScene: 'Scheria / King Alcinous',
    caption: 'The ancient harbor city of the master seafarers who grant Odysseus safe passage on his final voyage back to Ithaca.',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1400&auto=format&fit=crop',
    category: 'Production & Sets',
    aspectRatio: '16:9',
    resolution: '4K Ultra HD'
  }
];
