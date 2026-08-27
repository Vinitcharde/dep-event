import { DepartmentEvent } from '../types';

export const INITIAL_EVENTS: DepartmentEvent[] = [
  /* ─────────────────────────── ACT I ─────────────────────────── */
  {
    id: 'dataverse-legacy-event',
    title: 'DataVerse',
    subtitle: 'The Legacy DataDive Technical Challenge in Python & Machine Learning',
    category: 'Data Science & Machine Learning',
    badge: 'Legacy DataDive Event',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T09:00:00Z',
    time: 'Schedule to be announced',
    venue: {
      name: 'Department of Data Science',
      hall: 'Technical Lab & Model-Building Arena',
      address: 'Department of Data Science, Campus Innovation Center',
      mapUrl: 'https://maps.google.com/?q=Department+of+Data+Science',
      isVirtual: false,
      capacity: 120,
      seatsLeft: 120,
    },
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop',
    // Python & Machine Learning full tutorial — freeCodeCamp (YouTube)
    videoTrailerUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg',
    // No gallery images — media stills TBA
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
        caption: 'Python development environment — first-round fundamentals quiz'
      },
      {
        url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop',
        caption: 'Teams building and evaluating machine learning models'
      }
    ],
    description: 'DataVerse is the legacy event of DataDive, a pure technical competition built around Python fundamentals and machine learning. Participants first prove their foundations in a quiz, then selected teams build and evaluate their own models.',
    synopsis: 'The competition has two rounds. Round one tests core Python and machine learning knowledge through a fundamentals quiz. Teams with the strongest scores advance to round two, where they build machine learning models and compete on predictive accuracy. The top two teams are recognised as winners and receive prize money of 2000 and 1000 respectively.',
    speakers: [
      {
        name: 'DataDive Technical Jury',
        role: 'Model Evaluation & Competition Panel',
        affiliation: 'Department of Data Science',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop',
        bio: 'A technical panel responsible for challenge design, team selection, model evaluation, and final rankings.'
      }
    ],
    agenda: [
      {
        time: 'Round 1',
        title: 'Python & Machine Learning Fundamentals Quiz',
        description: 'Individual or team-based quiz covering Python foundations, data preparation, model concepts, and essential machine learning knowledge.'
      },
      {
        time: 'Selection',
        title: 'Team Selection by Quiz Score',
        description: 'Teams are shortlisted for the model-building round according to their Round 1 scores.'
      },
      {
        time: 'Round 2',
        title: 'Machine Learning Model-Building Challenge',
        description: 'Selected teams build, test, and present machine learning models against the competition dataset.'
      },
      {
        time: 'Finale',
        title: 'Accuracy Evaluation & Winner Announcement',
        description: 'Models are ranked by accuracy. The top two teams win prize money of 2000 and 1000.'
      }
    ],
    registration: {
      url: 'https://datadive-events.edu/register/dataverse',
      qrValue: 'https://datadive-events.edu/register/dataverse?src=qr_landing',
      deadline: 'To be announced',
      fee: 'To be announced',
      perks: [
        'Hands-on Python and machine learning competition experience',
        'Opportunity to build and evaluate a working ML model',
        'Prize money of 2000 for first place and 1000 for second place',
        'Recognition from the DataDive technical jury'
      ]
    },
    voyageMilestone: 'Act I: DataDive Legacy & Technical Foundations',
    curatorNotes: 'Event registration deadline, venue confirmation, and fee will be updated when released by the department.',
    tags: ['DataVerse', 'DataDive', 'Python', 'Machine Learning', 'Quiz', 'Model Building', 'Technical Competition']
  },

  /* ─────────────────────────── ACT II ────────────────────────── */
  {
    id: 'vizminds-dataverse',
    title: 'VizMinds',
    subtitle: 'Data Visualization Challenge — Power BI & Business Intelligence for Beginners',
    category: 'Data Science & Machine Learning',
    badge: 'DataVerse Technical Event',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T09:00:00Z',
    time: 'Schedule to be announced',
    venue: {
      name: 'Department of Data Science',
      hall: 'Visualization Lab & Presentation Arena',
      address: 'Department of Data Science, Campus Innovation Center',
      mapUrl: 'https://maps.google.com/?q=Department+of+Data+Science',
      isVirtual: false,
      capacity: 120,
      seatsLeft: 120,
    },
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    videoTrailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        caption: 'Power BI dashboard with interactive charts and business intelligence visuals'
      },
      {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
        caption: 'Teams building meaningful data visualizations from real-world datasets'
      }
    ],
    description: 'VizMinds is a beginner-friendly data visualization technical event under DataVerse, specifically designed for 1st and 2nd year students. Participants explore industry-standard tools like Power BI to transform raw datasets into compelling visual stories that drive strategic business decisions.',
    synopsis: 'The competition runs across two rounds. Round 1 is a quiz testing knowledge of data visualization concepts and tools like Power BI. Top-scoring teams advance to Round 2, where they build meaningful dashboards and visual narratives from given datasets or problem statements to make strategic business decisions. The prize pool is ₹3000.',
    speakers: [
      {
        name: 'VizMinds Technical Panel',
        role: 'Visualization Evaluation & Judging Committee',
        affiliation: 'Department of Data Science',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop',
        bio: 'A faculty-led panel responsible for quiz design, round selection, dashboard evaluation, and final rankings.'
      }
    ],
    agenda: [
      {
        time: 'Round 1',
        title: 'Data Visualization Quiz',
        description: 'A quiz covering core data visualization concepts, chart types, Power BI tools, and best practices for visual communication and business intelligence.'
      },
      {
        time: 'Selection',
        title: 'Team Shortlisting by Quiz Score',
        description: 'Top-performing teams from Round 1 are selected to advance to the hands-on dashboard building round.'
      },
      {
        time: 'Round 2',
        title: 'Live Dashboard & Visualization Challenge',
        description: 'Selected teams build insightful Power BI dashboards or data visualizations from provided datasets or problem statements, demonstrating how to make strategic business decisions.'
      },
      {
        time: 'Finale',
        title: 'Presentation & Winner Announcement',
        description: 'Teams present their visualizations to the judging panel. Winners are announced and the ₹3000 prize pool is distributed among the top teams.'
      }
    ],
    registration: {
      url: 'https://datadive-events.edu/register/vizminds',
      qrValue: 'https://datadive-events.edu/register/vizminds?src=qr_landing',
      deadline: 'To be announced',
      fee: 'To be announced',
      perks: [
        'Hands-on experience with Power BI and data visualization tools',
        'Work with real-world datasets and business problem statements',
        'Prize pool of ₹3000 for winning teams',
        'Certificate of participation from the Department of Data Science',
        'Ideal entry point for 1st and 2nd year students into data science competitions'
      ]
    },
    voyageMilestone: 'Act II: Visual Intelligence & Business Insights',
    curatorNotes: 'VizMinds is designed to be accessible to all skill levels — especially 1st and 2nd year students. Registration deadline, venue confirmation, and fee will be updated when released by the department.',
    tags: ['VizMinds', 'DataVerse', 'Power BI', 'Data Visualization', 'Business Intelligence', 'Quiz', 'Dashboard', 'Beginner Friendly']
  },

  /* ─────────────────────────── ACT III ───────────────────────── */
  {
    id: 'founders-gone-wild',
    title: 'Founders Gone Wild',
    subtitle: 'Fast-Paced Startup Pitch Challenge — Shark Tank Style Entrepreneurship Showdown',
    category: 'Entrepreneurship & Innovation',
    badge: 'Startup Pitch Challenge',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T09:00:00Z',
    time: 'Schedule to be announced',
    venue: {
      name: 'Department of Data Science',
      hall: 'Innovation Arena & Pitch Stage',
      address: 'Department of Data Science, Campus Innovation Center',
      mapUrl: 'https://maps.google.com/?q=Department+of+Data+Science',
      isVirtual: false,
      capacity: 150,
      seatsLeft: 150,
    },
    heroImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1400&auto=format&fit=crop',
    videoTrailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop',
        caption: 'Startup teams brainstorming wild ideas under the clock'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
        caption: 'Shark Tank-style investor pitch panel evaluating startup business proposals'
      }
    ],
    description: 'Founders Gone Wild is a fast-paced, high-energy startup challenge that blends creativity with entrepreneurship. Teams are handed random combinations of industries, technologies, and target audiences and must transform them into a unique, compelling startup idea — under the clock, no safety net.',
    synopsis: 'After a screening round to shortlist the sharpest ideas, teams dive deep to build a complete business proposal — covering branding, marketing strategy, and financial planning. They then pitch it Shark Tank–style to a panel of investor-style judges. Winners are scored on innovation, clarity, business potential, and execution quality, with bonus points awarded for humor and creative flair.',
    speakers: [
      {
        name: 'Investor Judge Panel',
        role: 'Shark Tank–Style Evaluation Board',
        affiliation: 'Department of Data Science & Industry Partners',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        bio: 'A panel of faculty members and industry professionals who evaluate startup pitches on innovation, business viability, clarity, execution, and creative presentation.'
      }
    ],
    agenda: [
      {
        time: 'Round 1',
        title: 'Wild Card Draw & Idea Screening',
        description: 'Teams receive random combinations of industry, technology, and target audience. They rapidly develop a startup concept and present it in a brief screening pitch to qualify for the main event.'
      },
      {
        time: 'Selection',
        title: 'Shortlisting of Finalist Teams',
        description: 'Judges shortlist the most innovative and promising startup ideas from the screening round to advance to the full pitch stage.'
      },
      {
        time: 'Round 2',
        title: 'Business Proposal Build & Shark Tank Pitch',
        description: 'Shortlisted teams build a complete business proposal covering branding, marketing strategy, and financial planning, then deliver a polished Shark Tank–style pitch to the investor judge panel.'
      },
      {
        time: 'Finale',
        title: 'Judging, Scoring & Winner Announcement',
        description: 'Judges score teams on innovation, clarity, business potential, and execution. Bonus points are awarded for humor and creativity. Winners are announced and prizes are awarded.'
      }
    ],
    registration: {
      url: 'https://datadive-events.edu/register/founders-gone-wild',
      qrValue: 'https://datadive-events.edu/register/founders-gone-wild?src=qr_landing',
      deadline: 'To be announced',
      fee: 'To be announced',
      perks: [
        'Experience a real-world startup ideation challenge under pressure',
        'Build a complete business proposal with branding, marketing & financial strategy',
        'Pitch your idea Shark Tank–style to investor-style judges',
        'Bonus points for humor, creativity, and out-of-the-box thinking',
        'Networking with industry professionals and faculty mentors',
        'Certificate of participation from the Department of Data Science'
      ]
    },
    voyageMilestone: 'Act III: The Wild Seas of Entrepreneurship',
    curatorNotes: 'Founders Gone Wild celebrates bold ideas and creative risk-taking. Humor and originality are rewarded alongside business acumen. Event date, registration details, prize pool, and team size will be announced by the department.',
    tags: ['Founders Gone Wild', 'Startup Challenge', 'Entrepreneurship', 'Shark Tank', 'Pitch Competition', 'Innovation', 'Business Proposal', 'Creativity']
  },

  /* ─────────────────────────── ACT IV ────────────────────────── */
  {
    id: 'game-of-bids-2026',
    title: 'Game of Bids 2026',
    subtitle: 'The Ultimate IPL Auction Experience — Build Your Dream Squad with ₹80 Crore',
    category: 'Sports & Gaming Strategy',
    badge: 'IPL Auction Simulation',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T09:00:00Z',
    time: 'Schedule to be announced',
    venue: {
      name: 'Department of Data Science',
      hall: 'Auction War Room & Strategy Arena',
      address: 'Department of Data Science, Campus Innovation Center',
      mapUrl: 'https://maps.google.com/?q=Department+of+Data+Science',
      isVirtual: false,
      capacity: 200,
      seatsLeft: 200,
    },
    // Cricket match hero — IPL stadium aerial & action
    heroImage: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1400&auto=format&fit=crop',
    videoTrailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    gallery: [
      {
        // Cricket match — players, stadium lights, IPL energy
        url: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1200&auto=format&fit=crop',
        caption: 'Live IPL cricket match action — the pulse, the crowd, the energy'
      },
      {
        // Auction bidding / strategy room
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
        caption: 'IPL auction war room — franchise managers, strategy boards & \u20b980 Crore purse'
      },
      {
        // Cricket bat & ball close-up
        url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
        caption: 'Building the dream squad — every bid shapes your IPL franchise'
      }
    ],
    description: 'Game of Bids 2026 is the Ultimate IPL Auction Experience — a thrilling live auction event where participants step into the shoes of IPL franchise owners. Armed with a virtual purse of ₹80 Crore and a pool of 2026 IPL players, teams compete in a high-intensity live auction to build their dream squad.',
    synopsis: 'Every bid, every decision, and every player could make the difference between victory and defeat. Teams must strategically manage their ₹80 Crore virtual purse, balance squad composition across batting, bowling, and all-rounders, and outsmart rival franchises in real-time bidding wars. The event tests analytical thinking, budget management, strategic decision-making, and knowledge of IPL 2026 players.',
    speakers: [
      {
        name: 'Game of Bids Auctioneer Panel',
        role: 'Live Auction Hosts & Game Masters',
        affiliation: 'Department of Data Science',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        bio: 'An energetic panel of hosts and game masters who conduct the live auction, manage player pools, track virtual purses, and ensure an authentic IPL auction atmosphere.'
      }
    ],
    agenda: [
      {
        time: 'Briefing',
        title: 'Franchise Registration & Rules Orientation',
        description: 'Teams register as IPL franchises, receive their ₹80 Crore virtual purse, and learn the auction rules — player categories, retention slots, RTM cards, and bidding protocols.'
      },
      {
        time: 'Round 1',
        title: 'Marquee Player Auction — Icons & Internationals',
        description: 'The opening auction block featuring star international players and marquee Indian cricketers. Fierce bidding wars begin as franchises compete for top-tier talent.'
      },
      {
        time: 'Round 2',
        title: 'Domestic & Emerging Player Auction',
        description: 'Teams complete their squads by bidding on domestic players, promising youngsters, and strategic utility picks — all while managing their remaining purse carefully.'
      },
      {
        time: 'Finale',
        title: 'Squad Reveal, Analysis & Winner Declaration',
        description: 'All franchises reveal their final squads. Teams are evaluated on squad balance, purse management, and overall strategy. The best-built franchise is crowned the Game of Bids 2026 Champion.'
      }
    ],
    registration: {
      url: 'https://datadive-events.edu/register/game-of-bids-2026',
      qrValue: 'https://datadive-events.edu/register/game-of-bids-2026?src=qr_landing',
      deadline: 'To be announced',
      fee: 'To be announced',
      perks: [
        'Experience an authentic IPL-style live auction with ₹80 Crore virtual purse',
        'Access to full 2026 IPL player pool with real stats and valuations',
        'Test your strategic thinking, budget management, and cricket knowledge',
        'Compete against rival franchise teams in real-time bidding wars',
        'Certificate of participation from the Department of Data Science',
        'Prizes for the best-built franchise squad'
      ]
    },
    voyageMilestone: 'Act IV: The Grand Arena — Battle of Strategies',
    curatorNotes: 'Game of Bids 2026 is open to all cricket enthusiasts and strategy lovers. Knowledge of IPL 2026 players will be a strong advantage. Team size, registration fee, and prize details will be announced by the department.',
    tags: ['Game of Bids', 'IPL Auction', 'Cricket', 'Strategy', 'Live Auction', 'Fantasy Cricket', 'Budget Management', 'Squad Building', 'Gaming']
  },

  /* ─────────────────────────── ACT V ─────────────────────────── */
  {
    id: 'odyssey-opening-gala',
    title: 'The Mythic Frame: Homer to Kubrick & The Modern Epic',
    subtitle: 'Annual Departmental Keynote & 70mm Retrospective Gala',
    category: 'Keynote Gala',
    badge: 'Opening Gala & 70mm Screen',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T18:30:00Z',
    time: '18:30 - 22:00',
    venue: {
      name: 'Amphitheater of the Muses',
      hall: 'Auditorium Magna & Widescreen Pavilion',
      address: 'Department of Cinema & Classical Studies, Campus West, Room 101',
      mapUrl: 'https://maps.google.com/?q=Department+of+Cinema+and+Classical+Studies',
      isVirtual: true,
      streamUrl: 'https://odyssey-cinema.edu/live/gala-stream',
      capacity: 350,
      seatsLeft: 42,
    },
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1400&auto=format&fit=crop',
    videoTrailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        caption: 'Classical marble colonnades and high-contrast Mediterranean architectural staging'
      },
      {
        url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
        caption: 'Large format 70mm film camera rigs on Aegean shoreline sets'
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        caption: 'Homeric maritime navigation through ancient Greek archipelagos'
      }
    ],
    description: 'An expansive keynote symposium exploring how Homer\'s *Odyssey* forged the architectural blueprint for cinematic storytelling—from Mario Camerini\'s 1954 *Ulisse* to Stanley Kubrick\'s *2001: A Space Odyssey*, and Christopher Nolan\'s 2026 epic adaptation *The Odyssey*.',
    synopsis: 'Odysseus\' ten-year struggle across the Mediterranean is not merely an ancient poem—it is the primal template for visual voyage, nonlinear memory, monstrous apparitions, and spiritual return. In this gala opening, Department Chair Dr. Helena Thorne and renowned cinematographer Marcos Castelli deconstruct the grammar of mythic scale, focal depth, and celestial navigation across three eras of cinema.',
    speakers: [
      {
        name: 'Dr. Helena Thorne',
        role: 'Professor of Classical Reception & Epic Poetics',
        affiliation: 'Oxford & Department of Hellenic Studies',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        bio: 'Author of *The Widescreen Nostos: Homeric Voyages in 20th Century Cinema*. Dr. Thorne has curated international retrospectives at the Venice Film Festival and the BFI.'
      },
      {
        name: 'Marcos Castelli, ASC',
        role: 'Cinematographer & Visual Stylist',
        affiliation: 'Academy of Motion Picture Arts and Sciences',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        bio: 'Director of Photography behind acclaimed historical epics and recipient of the Silver Frog for Best Mediterranean Cinematography.'
      }
    ],
    agenda: [
      {
        time: '18:30 - 19:15',
        title: 'Arrival, Bronze Courtyard Reception & Astrolabe Exhibition',
        description: 'Guests gather in the illuminated Aegean foyer. Archival exhibition of vintage Panavision lenses and Homeric navigation charts.'
      },
      {
        time: '19:15 - 20:30',
        title: 'Keynote Address: "The Lens of Nostos: Longing for Ithaca in 2.39:1"',
        speaker: 'Dr. Helena Thorne',
        description: 'A deep-dive into visual motifs of home, exile, sirens, and the cinematic gaze across 70 years of film history.'
      },
      {
        time: '20:30 - 21:30',
        title: 'Special 70mm Archival Screening: Restored Sequences & Discussion',
        speaker: 'Marcos Castelli, ASC',
        description: 'Exclusive projection of ultra-high definition restorations with live commentary on anamorphic distortion and lighting.'
      },
      {
        time: '21:30 - 22:00',
        title: 'Q&A, Departmental Networking & Gala Toast',
        description: 'Interactive audience Q&A and departmental gathering with Mediterranean culinary pairings.'
      }
    ],
    registration: {
      url: 'https://odyssey-events.edu/register/gala-2026',
      qrValue: 'https://odyssey-events.edu/register/gala-2026?src=qr_landing&ref=dept_cinema',
      deadline: 'September 7, 2026',
      fee: 'Free for Students / ₹200 General Public',
      perks: [
        'Commemorative Silk-Screened Odyssey Film Poster',
        'VIP Reserved Seating in Amphitheater Magna',
        'Access to Archival 4K Recording & Syllabus Pack',
        'Invitation to Post-Gala Reception'
      ]
    },
    voyageMilestone: 'Act V: The Grand Homecoming — Cinematic Odyssey',
    curatorNotes: 'Dress code: Festive / Smart Casual with gold or Mediterranean blue accents. 70mm projection supported by the National Film Archive.',
    tags: ['Epic Cinema', 'Keynote', '70mm Screening', 'Homeric Poetics', 'Gala'],
    featured: true
  },
];
