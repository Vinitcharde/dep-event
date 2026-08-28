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
      mapUrl: 'https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8',
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
      mapUrl: 'https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8',
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
      mapUrl: 'https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8',
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
      mapUrl: 'https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8',
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
    id: 'survival-showdown-2026',
    title: 'Survival Showdown',
    subtitle: 'Edition 2 — Intense WWE 2K26 Knockout & Tag Team Championship Tournament',
    category: 'Sports & Gaming Strategy',
    badge: 'WWE 2K26 Knockout Tournament',
    date: 'September 10, 2026',
    isoDate: '2026-09-10T14:00:00Z',
    time: 'Schedule to be announced',
    venue: {
      name: 'Department of Data Science',
      hall: 'WWE 2K26 Arena & Console Gaming Stage',
      address: 'Department of Data Science, Campus Innovation Center',
      mapUrl: 'https://maps.app.goo.gl/wv9eUrZ8erRhXhNi8',
      isVirtual: false,
      capacity: 150,
      seatsLeft: 150,
    },
    heroImage: '/survival_showdown_hero.jpg',
    videoTrailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    gallery: [
      {
        url: '/survival_showdown_hero.jpg',
        caption: 'Survival Showdown WWE 2K26 Championship Finals main arena & championship belts'
      },
      {
        url: '/survival_showdown_arena.jpg',
        caption: 'Pro console battle stations & tournament knockout bracket board'
      },
      {
        url: '/survival_showdown_tag_team.jpg',
        caption: 'Finalists battling in the intense Tag Team Championship Match'
      }
    ],
    description: 'Survival Showdown returns for its second edition as an intense WWE 2K26 knockout tournament where participants compete to become the ultimate Top Dog. Players can enter solo and receive a randomly allotted teammate or bring their own partner to compete as a team. The tournament begins with Triple Threat knockout matches, where only the winning team advances while the others are eliminated. After progressing through multiple rounds, the final two surviving teams will face each other in an intense Tag Team Match to crown the champions of Survival Showdown.',
    synopsis: 'Survival Showdown returns for its second edition as an intense WWE 2K26 knockout tournament where participants compete to become the ultimate Top Dog. Players can enter solo and receive a randomly allotted teammate or bring their own partner to compete as a team. The tournament begins with Triple Threat knockout matches, where only the winning team advances while the others are eliminated. After progressing through multiple rounds, the final two surviving teams will face each other in an intense Tag Team Match to crown the champions of Survival Showdown.',
    speakers: [
      {
        name: 'Survival Showdown Arena Marshals',
        role: 'Head Referees & Tournament Directors',
        affiliation: 'Department of Data Science — Esports Division',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop',
        bio: 'Tournament directors overseeing matchmaking, console setup configurations, refereeing, and the Top Dog championship coronation.'
      },
      {
        name: 'WWE 2K26 Live Shoutcasters',
        role: 'Match Commentators & Ring Announcers',
        affiliation: 'DataDive Esports Guild',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        bio: 'Electric ring-side commentators providing live play-by-play coverage, fighter introductions, and knockout highlight breakdowns.'
      }
    ],
    agenda: [
      {
        time: 'Round 1: Matchmaking & Check-In',
        title: 'Solo Allotment & Tag Team Roster Check-In',
        description: 'Solo entrants receive their randomly allotted teammate while pre-registered duos confirm roster slots. Rules briefing and controller setups.'
      },
      {
        time: 'Round 2: Elimination Stage',
        title: 'Triple Threat Knockout Matches',
        description: 'The tournament begins with intense Triple Threat knockout matches. Only the single winning team advances while the others are eliminated.'
      },
      {
        time: 'Round 3: Knockout Progression',
        title: 'Multi-Round Knockout Battles',
        description: 'Progressing through multiple rounds of high-intensity knockout matches to filter down to the final two survivor teams.'
      },
      {
        time: 'Grand Finale',
        title: 'Tag Team Championship Match — Top Dog Coronation',
        description: 'The final two surviving teams face each other in an intense Tag Team Match to crown the champions of Survival Showdown.'
      }
    ],
    registration: {
      url: 'https://datadive-events.edu/register/survival-showdown',
      qrValue: 'https://datadive-events.edu/register/survival-showdown?src=qr_landing',
      deadline: 'September 10, 2026',
      fee: 'Schedule to be announced',
      perks: [
        'Survival Showdown Top Dog Championship Trophy & Title Belts',
        'Official Winner & Runner-Up Certificates from Department of Data Science',
        'Solo (random partner allotment) & Duo (bring your partner) entry modes',
        'Live big-screen tournament broadcast & commentary stage'
      ]
    },
    voyageMilestone: 'Act V: The Ultimate Knockout — Survival Showdown',
    curatorNotes: 'Participants can register as a solo player (a teammate will be randomly assigned) or with their own chosen partner. Triple Threat knockout rules apply in early rounds.',
    tags: ['Survival Showdown', 'WWE 2K26', 'Knockout Tournament', 'Top Dog', 'Triple Threat', 'Tag Team', 'Esports', 'Gaming', 'DataDive 5.0'],
    featured: true
  },
];
