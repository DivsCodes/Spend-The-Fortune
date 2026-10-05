(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // Display currencies. Game math stays in USD; display conversion uses the latest
  // published reference rates baked into this release (updated 5 Oct 2026).
  // USD/INR reference: 96.2831; USD/GBP: 0.7568; USD/EUR: 0.8933.
  const currencyOptions = {
    USD:{code:'USD', locale:'en-US', symbol:'$', rate:1},
    INR:{code:'INR', locale:'en-IN', symbol:'₹', rate:96.2831},
    EUR:{code:'EUR', locale:'de-DE', symbol:'€', rate:0.89326114},
    GBP:{code:'GBP', locale:'en-GB', symbol:'£', rate:0.75683432}
  };
  let activeCurrency = 'USD';
  function displayValue(v){ return v * currencyOptions[activeCurrency].rate; }
  function formatter(v, compactMode=false){
    const o=currencyOptions[activeCurrency];
    return new Intl.NumberFormat(o.locale,{style:'currency',currency:o.code,notation:compactMode?'compact':'standard',maximumFractionDigits:compactMode?1:0}).format(Math.max(0,Math.round(displayValue(v))));
  }

  const categories = [
    ['All', 'Everything'], ['Cars', 'Cars & hypercars'], ['Bikes', 'Motorcycles'], ['Jets', 'Private aviation'], ['Yachts', 'Yachts & boats'],
    ['Real Estate', 'Property'], ['Islands', 'Private islands'], ['Hotels', 'Hospitality'], ['Business', 'Businesses'], ['Sports', 'Sports & teams'],
    ['Tech', 'Technology'], ['Watches', 'Watches & jewelry'], ['Luxury', 'Luxury'], ['Travel', 'Travel'], ['Food', 'Food & absurd dining'],
    ['Staff', 'Staff & services'], ['Charity', 'Charity'], ['Space', 'Space'], ['Ridiculous', 'Absolutely unnecessary']
  ];

  const fortunes = [
    { id:'musk', name:'Elon Musk', amount:886_400_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'bezos', name:'Jeff Bezos', amount:368_400_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'page', name:'Larry Page', amount:282_800_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'dell', name:'Michael Dell', amount:265_700_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'brin', name:'Sergey Brin', amount:260_300_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'zuck', name:'Mark Zuckerberg', amount:230_100_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'ellison', name:'Larry Ellison', amount:184_500_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'huang', name:'Jensen Huang', amount:183_900_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'ballmer', name:'Steve Ballmer', amount:155_400_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'buffett', name:'Warren Buffett', amount:146_600_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'gates', name:'Bill Gates', amount:115_600_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'bloomberg', name:'Michael Bloomberg', amount:94_900_000_000, country:'United States', flag:'🇺🇸', note:'Forbes real-time snapshot · Sep 16, 2026' },
    { id:'ambani', name:'Mukesh Ambani', amount:91_120_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'adani', name:'Gautam Adani', amount:89_490_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'jindal', name:'Savitri Jindal & family', amount:41_260_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'mistry', name:'Mistry family', amount:34_130_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'lakshmi', name:'Lakshmi Mittal', amount:34_900_000_000, country:'India', flag:'🇮🇳', note:'Forbes real-time snapshot · Sep 10, 2026' },
    { id:'sunil', name:'Sunil Mittal & family', amount:29_830_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'dilip', name:'Dilip Shanghvi & family', amount:26_840_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'roshni', name:'Roshni Nadar Malhotra', amount:23_420_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'cyrus', name:'Cyrus Poonawalla', amount:22_970_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'birla', name:'Kumar Mangalam Birla', amount:22_580_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'premji', name:'Azim Premji', amount:21_480_000_000, country:'India', flag:'🇮🇳', note:'Fortune India 2026 study' },
    { id:'mega', name:'$1 Trillion Mode', amount:1_000_000_000_000, country:'Fictional', flag:'🌎', note:'Challenge mode · fictional starting fortune' },
    { id:'million', name:'The Millionaire', amount:10_000_000, country:'Fictional', flag:'🌎', note:'Try doing damage with $10M' },
    { id:'custom', name:'Custom Fortune', amount:null, country:'Your choice', flag:'🌍', note:'Enter any amount in your chosen currency' },
  ];

  const productSeeds = [
    ['Cars', [
      ['Bugatti Chiron',3000000],['Bugatti Tourbillon',4500000],['Rolls-Royce Phantom',550000],['Rolls-Royce Spectre',420000],['Ferrari Purosangue',430000],['Ferrari SF90',600000],['Lamborghini Revuelto',650000],['Lamborghini Urus SE',270000],['McLaren 750S',350000],['McLaren Solus GT',3000000],['Koenigsegg Jesko',3200000],['Koenigsegg Gemera',1900000],['Pagani Utopia',2800000],['Pagani Huayra',3400000],['Aston Martin Valkyrie',3000000],['Mercedes-Maybach S-Class',230000],['Range Rover SV',250000],['Porsche 911 GT3 RS',250000],['Gordon Murray T.50',2500000],['Bentley Mulliner Batur',2000000]
    ]],
    ['Bikes', [
      ['Ducati Panigale V4 R',45000],['Ducati Diavel V4',32000],['BMW M 1000 RR',36000],['BMW R 1300 GS',21000],['Kawasaki Ninja H2R',58000],['Kawasaki Ninja ZX-10R',17000],['Honda Gold Wing',28000],['Honda CBR1000RR-R',28500],['Harley-Davidson CVO Road Glide',44000],['Indian Roadmaster Elite',41000],['Triumph Rocket 3',30000],['Triumph Speed Triple 1200 RS',20000],['MV Agusta Brutale 1000',39000],['Aprilia RSV4 Factory',28000],['Arch Method 143',85000],['Brough Superior Lawrence',140000],['Yamaha YZF-R1M',27000],['Suzuki Hayabusa',20000],['Royal Enfield Shotgun 650',8000],['Customized Cruiser Build',120000]
    ]],
    ['Jets', [
      ['Gulfstream G700',75000000],['Bombardier Global 8000',78000000],['Dassault Falcon 10X',75000000],['Embraer Praetor 600',26000000],['Cessna Citation Longitude',29000000],['Pilatus PC-24',12000000],['Boeing BBJ 737',90000000],['Airbus ACJ TwoTwenty',100000000],['VIP Boeing 777',400000000],['Private Airliner Interior',25000000],['Hangar in New York',12000000],['Hangar in Dubai',18000000],['Hangar in Singapore',15000000],['Private Airport Upgrade',220000000],['Jet Fuel for a Year',5000000],['Global Jet Membership',2000000],['Flight Crew for a Year',1200000],['Luxury Helicopter',15000000],['Helipad Build',3500000],['Vintage Business Jet',9000000]
    ]],
    ['Yachts', [
      ['Sunseeker 100',12000000],['Azimut Grande 36M',21000000],['Pershing 140',28000000],['Feadship Superyacht',180000000],['Oceanco Custom Yacht',350000000],['Heesen Yacht',90000000],['Explorer Yacht',120000000],['Sailing Superyacht',80000000],['Classic Wooden Yacht',25000000],['Party Catamaran',8500000],['Submersible Tender',6000000],['Yacht Helicopter',12000000],['Yacht Marina Slip',3000000],['Yacht Crew for a Year',2500000],['Global Yacht Season',7000000],['Underwater Lounge',18000000],['Floating Cinema',5000000],['Ocean Research Vessel',110000000],['Ice-Class Expedition Yacht',150000000],['Custom Superyacht Interior',70000000]
    ]],
    ['Real Estate', [
      ['Penthouse in Manhattan',50000000],['Mansion in Beverly Hills',65000000],['Mansion in Dubai Hills',35000000],['London Townhouse',30000000],['Singapore Bungalow',28000000],['Swiss Chalet',22000000],['French Riviera Villa',45000000],['Lake Como Estate',70000000],['Tokyo Skyline Residence',40000000],['Private Compound',90000000],['Private Golf Estate',120000000],['Mountain Lodge',18000000],['Desert Retreat',15000000],['Beachfront Estate',25000000],['Historic European Castle',75000000],['Ultra-Luxury Apartment Building',180000000],['New York Office Tower Floor',300000000],['Private Art Gallery',25000000],['Underground Garage Complex',22000000],['Smart Home Automation',2000000]
    ]],
    ['Islands', [
      ['Caribbean Private Island',35000000],['Mediterranean Island',80000000],['Pacific Private Island',60000000],['Island Resort',180000000],['Island With Airstrip',140000000],['Island Eco-Resort',120000000],['Luxury Island Compound',250000000],['Volcanic Island',90000000],['Tiny Tropical Island',8000000],['Private Island Dock',6000000],['Island Helipad',3500000],['Island Substation',5500000],['Island Desalination Plant',8000000],['Island Data Center',150000000],['Private Island Marina',30000000],['Island Security Fleet',15000000],['Island Observatory',12000000],['Island Beach Club',22000000],['Floating Island Pavilion',10000000],['Whole Island Renovation',300000000]
    ]],
    ['Hotels', [
      ['Boutique Hotel',15000000],['Five-Star City Hotel',80000000],['Luxury Beach Resort',160000000],['Mountain Resort',120000000],['Historic Hotel',90000000],['Desert Resort',140000000],['Airport Hotel',40000000],['Private Safari Lodge',60000000],['Ski Resort',250000000],['Wellness Retreat',65000000],['Hotel Penthouse',9000000],['Presidential Suite for a Year',1000000],['Private Cinema',3000000],['Full Hotel Renovation',50000000],['Hotel Rooftop Pool',5000000],['Michelin-Level Restaurant Fitout',7000000],['Private Event Ballroom',6000000],['Hotel Art Collection',12000000],['Resort Waterpark',35000000],['Luxury Spa Complex',18000000]
    ]],
    ['Business', [
      ['Coffee Shop Chain',25000000],['Premium Gym Brand',50000000],['Restaurant Group',75000000],['Boutique Hotel Brand',120000000],['Fashion Label',200000000],['Gaming Studio',90000000],['Film Production Company',200000000],['Music Label',300000000],['Private Security Firm',45000000],['Logistics Company',250000000],['Construction Company',400000000],['Fintech Startup',100000000],['Software Company',700000000],['News Network',500000000],['E-Sports Organization',75000000],['Football Club Stake',1000000000],['Basketball Franchise Stake',1500000000],['Airline Stake',2000000000],['Luxury Car Dealership Group',120000000],['Theme Park',600000000]
    ]],
    ['Sports', [
      ['Football Club',1200000000],['Basketball Team',2200000000],['Cricket Franchise',900000000],['Formula Racing Team',800000000],['Tennis Academy',25000000],['Golf Club',60000000],['Stadium Naming Rights',250000000],['Private Sports Complex',45000000],['Esports Arena',35000000],['Olympic-Level Training Center',70000000],['Boxing Promotion Company',80000000],['Horse Racing Stable',25000000],['Polo Club',15000000],['Private Racetrack',120000000],['Ski Team Sponsorship',10000000],['Racing Yacht Team',45000000],['Athlete Sponsorship',5000000],['Sports Documentary',3000000],['Championship Trophy Replica',100000],['Lifetime Front-Row Seats',2500000]
    ]],
    ['Tech', [
      ['AI Supercomputer Cluster',250000000],['Private Data Center',180000000],['Quantum Computing Lab',300000000],['Startup R&D Campus',120000000],['Private 5G Network',30000000],['Cybersecurity Lab',50000000],['Robot Fleet',25000000],['Personal Cloud',3000000],['Home Server Wall',500000],['Pro Video Wall',2000000],['Cinema-Grade VR Room',800000],['Private Satellite Ground Station',20000000],['High-End Creator Studio',1200000],['Immersive Simulation Room',2500000],['Smart City Pilot',100000000],['AI Research Fellowship',1000000],['Private Super App Build',15000000],['Robotics Factory',250000000],['Data Privacy Suite',5000000],['Custom Operating System',8000000]
    ]],
    ['Watches', [
      ['Patek Philippe Grand Complication',2500000],['Audemars Piguet Royal Oak',150000],['Richard Mille RM 88',3500000],['Rolex Daytona',45000],['Rolex GMT Master II',25000],['Cartier Santos',12000],['Vacheron Constantin Overseas',65000],['Jacob & Co. Astronomia',1200000],['Bespoke Diamond Watch',7000000],['Rare Vintage Watch',3000000],['Watch Collection Cabinet',250000],['Luxury Jewelry Vault',1500000],['Diamond Necklace',900000],['Emerald Ring',400000],['Crown-Inspired Tiara',250000],['Custom Gold Chain',100000],['Museum-Grade Jewelry Set',5000000],['Watchmaker Atelier',3000000],['Private Gem Collection',900000000],['Diamond-Encrusted Chronograph',4000000]
    ]],
    ['Luxury', [
      ['Designer Wardrobe',250000],['Bespoke Suit Collection',150000],['Luxury Sneaker Vault',100000],['Home Recording Studio',300000],['Private Movie Theater',1500000],['Indoor Basketball Court',750000],['Bowling Alley',500000],['Indoor Pool',1000000],['Home Spa',900000],['Private Nightclub',3500000],['Personal Library',800000],['Art Studio',450000],['Luxury Kitchen',600000],['Collector Garage',2500000],['Climate-Controlled Wine Cellar',1200000],['Museum-Grade Art Room',5000000],['Grand Piano',180000000],['Custom Furniture Collection',1200000],['Luxury Home Gym',750000],['Private Recording Label Office',2500000]
    ]],
    ['Travel', [
      ['World Cruise for a Year',6000000],['Antarctica Expedition',500000],['Private Safari',350000],['Luxury Train Charter',1500000],['Round-the-World Private Jet Tour',3000000],['Private Island Week',500000],['Polar Expedition Ship Charter',7000000],['F1 Grand Prix Weekend',250000],['World Cup Final Hospitality',150000],['Private Concert Weekend',500000],['Luxury Space Camp',1000000],['European Villa Summer',750000],['Japan Luxury Tour',350000],['African Great Migration Trip',300000],['Arctic Yacht Expedition',2200000],['Private City Takeover',3500000],['Ski Season in the Alps',450000],['Global Restaurant Tour',100000],['Six-Month Hotel Takeover',1200000],['Perfect Vacation Fund',10000000]
    ]],
    ['Food', [
      ['Personal Chef for a Year',250000],['Michelin Restaurant Buyout',100000],['Private Dining Room',250000],['Luxury Food Truck Fleet',1200000],['World-Class Wine Collection',800000],['Rare Coffee Collection',150000],['Cheese Cave',200000],['Chocolate Lab',400000],['Private Bakery',500000],['Home Ramen Bar',120000],['Sushi Chef for a Year',300000],['Custom Candy Factory',5000000],['Private Farm',3000000],['Urban Farm Complex',2500000],['24/7 Room Service',1000000],['Gourmet Kitchen Crew',350000],['Chef Competition',5000000],['100,000 Burgers',150000],['World Dessert Tour',250000],['Ridiculous Cake',50000]
    ]],
    ['Staff', [
      ['Personal Assistant for a Year',150000],['Private Driver for a Year',120000],['House Manager for a Year',180000],['Security Detail for a Year',1200000],['Pilot for a Year',220000],['Chef for a Year',250000],['Trainer for a Year',150000],['Travel Planner for a Year',90000],['IT Team for a Year',300000],['Personal Stylist for a Year',100000],['Butler for a Year',170000],['Event Planner Retainer',150000],['Law Firm Retainer',1000000],['Accountant Team for a Year',300000],['Private Nurse Team',400000],['Tutor Team for a Year',180000],['PR Team for a Year',1000000],['Personal Research Team',500000],['Chief of Staff',450000],['Entire Private Office',2500000]
    ]],
    ['Charity', [
      ['Build a School',2500000],['Fund a Hospital Wing',10000000],['Clean Water Project',5000000],['Feed 1 Million Meals',1500000],['Plant 10 Million Trees',8000000],['Scholarship Fund',5000000],['Disaster Relief Fund',25000000],['Rural Internet Project',15000000],['Cancer Research Grant',20000000],['Animal Rescue Network',5000000],['Women Entrepreneurship Fund',10000000],['Public Library Network',12000000],['Affordable Housing Fund',50000000],['Mental Wellness Foundation',15000000],['STEM Education Fund',25000000],['Global Food Bank Fund',50000000],['Ocean Cleanup Program',30000000],['Local Sports Academies',8000000],['Medical Equipment Drive',5000000],['Build a University Lab',35000000]
    ]],
    ['Space', [
      ['Small Satellite',5000000],['Earth Observation Satellite',120000000],['Rocket Launch',65000000],['Private Research Mission',100000000],['Space Telescope Contribution',50000000],['Orbital Lab Share',300000000],['Lunar Mission Sponsorship',150000000],['Mars Mission Sponsorship',500000000],['Launch Vehicle Development',1000000000],['Private Spaceport',400000000],['Space Suit Collection',1000000],['Rocket Engine Lab',150000000],['Astronaut Training',2500000],['Ground Tracking Network',25000000],['Microgravity Research Facility',80000000],['Planetarium',20000000],['Observatory',45000000],['Deep-Space Antenna',90000000],['Rocket Garden',7000000],['Orbital Habitat Concept',200000000]
    ]],
    ['Ridiculous', [
      ['Buy Every Item on the Page',50000000],['A Personal Mountain',75000000],['Build a Giant Clock',2500000],['Rename a Small Street',500000],['Private Fireworks Show',250000],['Hire a Orchestra for Dinner',120000],['Build a Neon Mega-Sign',800000],['Custom Floating Restaurant',9000000],['Giant Indoor Water Slide',1200000],['Personal Observatory Dome',1500000],['Worlds Biggest Treehouse',800000],['Robot Butler Prototype',6000000],['Underground Arcade',3000000],['Private Museum',20000000],['Custom Airship',30000000],['Luxury Bunker',50000000],['Floating City Prototype',3000000000],['Make a Mountain Movie Set',150000000],['Buy an Entire Movie Premiere',1000000],['Absolutely Nothing',1]
    ]]
  ];


  // Bonus catalog expansion: 95 additional purchases so the shop feels genuinely huge.
  const extraSeeds = [
    ['Cars', [['Ferrari 12Cilindri',450000],['Lamborghini Temerario',360000],['Mercedes-AMG GT Black Series',400000],['Porsche 918 Spyder',1700000],['Aston Martin DBS 770 Ultimate',500000]]],
    ['Bikes', [['Ducati Streetfighter V4 Lamborghini',65000],['BMW HP4 Race',78000],['Indian Pursuit Elite',38000],['Harley-Davidson CVO Pan America',30000],['Triumph Rocket 3 Storm GT',29000]]],
    ['Jets', [['Gulfstream G800',85000000],['Bombardier Challenger 650',33000000],['Airbus ACJ330neo',270000000],['Private Jet Interior Refit',12000000],['Jet Engine Upgrade Package',8000000]]],
    ['Yachts', [['Benetti Oasis 40M',30000000],['Lürssen Custom Yacht',250000000],['Wallywhy200',24000000],['Superyacht Beach Club',22000000],['Yacht Submarine',18000000]]],
    ['Real Estate', [['Malibu Oceanfront Compound',95000000],['Palm Jumeirah Villa',45000000],['Paris Private Mansion',55000000],['Bangalore Tech Park',160000000],['London Penthouse Collection',110000000]]],
    ['Islands', [['Bahamas Private Island',55000000],['Caribbean Island Airstrip Upgrade',45000000],['Tropical Island Resort Refit',210000000],['Island Solar Farm',12000000],['Private Island Villa Cluster',140000000]]],
    ['Hotels', [['Dubai Ultra-Luxury Hotel',220000000],['Maldives Resort',180000000],['Paris Boutique Hotel',95000000],['Tokyo Luxury Hotel',200000000],['Private Hotel Rooftop',12000000]]],
    ['Business', [['Cloud Infrastructure Company',950000000],['EV Charging Network',350000000],['Luxury Car Rental Group',180000000],['Media Production Campus',450000000],['Private Aviation Company',750000000]]],
    ['Sports', [['Cricket Stadium',350000000],['Football Training City',180000000],['F1 Team Factory',500000000],['Major League Franchise Stake',3000000000],['Championship Sponsorship',75000000]]],
    ['Tech', [['AI Training Cluster',500000000],['Humanoid Robot Factory',400000000],['Private Fiber Network',80000000],['Advanced Chip Lab',900000000],['Cyber Range Campus',120000000]]],
    ['Watches', [['Rolex Platinum Day-Date',65000],['Patek Philippe Nautilus',140000],['RM 65-01',1000000],['Bespoke Watch Vault',2500000],['Diamond Watch Display',850000]]],
    ['Luxury', [['Private Bowling Suite',1200000],['Luxury Car Elevator',1500000],['Designer Home Fragrance Collection',75000],['Custom Ballroom',2500000],['Luxury Home Cinema Upgrade',900000]]],
    ['Travel', [['Private Jet Around the World',5000000],['Superyacht Mediterranean Month',3500000],['Luxury Train Across Europe',1800000],['Private Safari Camp Takeover',2500000],['Global Luxury Hotel Pass',750000]]],
    ['Food', [['Private Sushi Restaurant',1800000],['Michelin Chef Residency',800000],['Rare Truffle Reserve',300000],['Private Coffee Plantation',2500000],['Luxury Chocolate Factory',4000000]]],
    ['Staff', [['Personal Concierge Company',900000],['Private Security Command Center',3500000],['Aviation Management Team',1800000],['Household Staffing Agency Retainer',1500000],['Personal Driver Fleet',750000]]],
    ['Charity', [['Build 10 Schools',18000000],['Fund Rural Hospitals',50000000],['Global Clean Water Initiative',75000000],['STEM Scholarship Endowment',25000000],['Disaster Response Aircraft',30000000]]],
    ['Space', [['Reusable Rocket Prototype',800000000],['Private Astronaut Training Campus',65000000],['Lunar Rover Program',200000000],['Space Weather Satellite',90000000],['Private Space Observatory',120000000]]],
    ['Ridiculous', [['Build a Floating Mansion',120000000],['Hire a Symphony for a Week',1000000],['Own a Giant LED City Screen',1500000],['Private Mountain Cable Car',65000000],['Launch a Luxury Zeppelin',90000000]]]
  ];
  extraSeeds.forEach(([category, entries]) => {
    const target = productSeeds.find(x => x[0] === category);
    if (target) target[1].push(...entries);
  });

  const descriptors = {
    Cars:'A ridiculous machine with an even more ridiculous price tag.', Bikes:'Fast, loud, unnecessary and extremely fun.', Jets:'Because commercial boarding is apparently beneath you.', Yachts:'A floating statement of questionable fiscal judgment.', 'Real Estate':'A place to put all the things you bought.', Islands:'Your own tiny kingdom, give or take a coastline.', Hotels:'A building where someone else makes the bed.', Business:'Acquire a company and immediately call yourself a group.', Sports:'For the feeling of owning the scoreboard.', Tech:'Expensive hardware for even more expensive ideas.', Watches:'Because your phone apparently was not luxurious enough.', Luxury:'Pure excess, professionally packaged.', Travel:'A trip so unnecessary it becomes the point.', Food:'Eat like the expense report never existed.', Staff:'Outsource every tiny inconvenience on Earth.', Charity:'Turn fantasy money into something genuinely useful.', Space:'Because Earth is apparently not enough.', Ridiculous:'The category nobody asked for and everyone opens first.'
  };

  const products = [];
  let pid = 1;
  for (const [category, entries] of productSeeds) {
    for (const [name, price] of entries) {
      products.push({
        id: `p${pid++}`,
        category,
        name,
        price,
        description: descriptors[category] || 'A fictional purchase for this simulator.',
        imageQuery: name,
        popularity: Math.floor(20 + Math.random() * 80)
      });
    }
  }

  // Make “featured” deterministic enough for a static app while still feeling varied.
  products.forEach((p, i) => p.featured = (i * 17 + 7) % 9);

  const challenges = [
    { text:'Spend $1,000,000 without buying a car.', type:'noCategory', category:'Cars', target:1_000_000 },
    { text:'Buy 10 different categories.', type:'categories', target:10 },
    { text:'Spend more on charity than luxury.', type:'compare', a:'Charity', b:'Luxury' },
    { text:'Buy one item worth at least $100M.', type:'single', target:100_000_000 },
    { text:'End your run with less than 1% of your fortune left.', type:'leftPct', target:0.01 }
  ];

  const achievements = [
    ['First Purchase','Buy your first item.'],
    ['Millionaire Down','Spend at least $1,000,000.'],
    ['Eight Figures','Spend at least $10,000,000.'],
    ['Nine Figures','Spend at least $100,000,000.'],
    ['Billionaire Down','Spend at least $1,000,000,000.'],
    ['Half Gone','Spend 50% of your fortune.'],
    ['Almost Broke','Spend 99% of your fortune.'],
    ['Category Collector','Own at least one item from 10 categories.'],
    ['Car Problem','Own 10 cars.'],
    ['Island Owner','Own at least one island.'],
    ['Sky King','Own at least one jet.'],
    ['Big Boat Energy','Own at least one yacht.'],
    ['Company Man','Spend at least $1B on businesses.'],
    ['Generous','Spend at least $100M on charity.'],
    ['The One Percent','Make a purchase worth at least 1% of your starting fortune.'],
    ['Broke','Reach $0.']
  ];

  const state = {
    screen:'landing', fortune:null, starting:0, balance:0, spent:0, purchases:{}, totalItems:0,
    selectedCategory:'All', search:'', sort:'featured', sound:true, challenge:0, unlocked:new Set(), favorites:new Set(),
    affordableOnly:false, ownedOnly:false, favoritesOnly:false, lastPurchase:null, theme:'violet', sessionStarted:null, currency:'USD'
  };

  const els = {
    landing:$('#landing'), store:$('#store'), fortuneGrid:$('#fortuneGrid'), balance:$('#balance'), spent:$('#spent'), itemsOwned:$('#itemsOwned'), progressFill:$('#progressFill'), progressLeft:$('#progressLeft'), progressRight:$('#progressRight'),
    largestPurchase:$('#largestPurchase'), averagePurchase:$('#averagePurchase'), categoriesOwned:$('#categoriesOwned'), achievementCount:$('#achievementCount'), favoriteCountStat:$('#favoriteCountStat'), categoryList:$('#categoryList'), favoritesBtn:$('#favoritesBtn'), favoriteCount:$('#favoriteCount'), searchInput:$('#searchInput'), sortSelect:$('#sortSelect'), affordableOnly:$('#affordableOnly'), ownedOnly:$('#ownedOnly'), catalogEyebrow:$('#catalogEyebrow'), catalogTitle:$('#catalogTitle'), resultCount:$('#resultCount'), productGrid:$('#productGrid'), emptyState:$('#emptyState'), modal:$('#modal'), modalClose:$('#modalClose'), modalContent:$('#modalContent'), toast:$('#toast'), confetti:$('#confetti'), challengeText:$('#challengeText'), soundBtn:$('#soundBtn'), undoBtn:$('#undoBtn'), themeBtn:$('#themeBtn'), runMode:$('#runMode'), wealthStatus:$('#wealthStatus'), fortuneName:$('#fortuneName'), fortuneCountry:$('#fortuneCountry'), fortuneTier:$('#fortuneTier'), burnRate:$('#burnRate'), lastMove:$('#lastMove'), tickerText:$('#tickerText'), spotlightGrid:$('#spotlightGrid'), luckyBtn:$('#luckyBtn'), randomizeSpotlight:$('#randomizeSpotlight'), challengeIndex:$('#challengeIndex')
  };

  function compact(v) { return v === 0 ? currencyOptions[activeCurrency].symbol+'0' : formatter(v,true); }
  function format(v) { return formatter(v,false); }
  function pct(v) { return `${(v * 100).toFixed(v * 100 < 10 ? 2 : 1)}%`; }
  function escapeHtml(str) { return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function monogram(name) { return name.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase(); }

  // V2.1 IMAGE SYSTEM -------------------------------------------------------
  // Real-photo-first, exact-title matching. There is deliberately NO random
  // category image and NO AI fallback. If a strong real photo cannot be verified,
  // the card shows a clean placeholder instead of lying about the subject.
  const imageMemoryKey = 'spend-fortune-v21-images';
  const imageMap = new Map();
  const usedImageKeys = new Set();
  const reservedImageKeys = new Set(); // prevents async duplicate races
  const imagePending = new Map();
  const imageJobs = [];
  let activeImageJobs = 0;
  let imageObserver = null;
  const IMAGE_CONCURRENCY = 3;

  const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';
  const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php';

  const categoryPhotoHints = {
    Cars:'real production car automotive photograph', Bikes:'real production motorcycle motorcycle photograph',
    Jets:'real production aircraft aviation photograph', Yachts:'real yacht marine photograph',
    'Real Estate':'real luxury property architectural photograph', Islands:'real island aerial photograph',
    Hotels:'real luxury hotel or resort travel photograph', Business:'real company or business facility photograph',
    Sports:'real sports venue or sports facility photograph', Tech:'real technology hardware or technology facility photograph',
    Watches:'real luxury wristwatch macro photograph', Luxury:'real luxury object or interior editorial photograph',
    Travel:'real luxury travel photograph', Food:'real food or restaurant culinary photograph',
    Staff:'real professional service or executive team photograph', Charity:'real humanitarian project or public infrastructure photograph',
    Space:'real spacecraft launch vehicle observatory or aerospace facility photograph',
    Ridiculous:'real-world engineering or luxury project photograph'
  };

  const imageAliases = {
    'Ferrari SF90':'Ferrari SF90 Stradale', 'Ferrari Purosangue':'Ferrari Purosangue', 'Bugatti Chiron':'Bugatti Chiron',
    'Bugatti Tourbillon':'Bugatti Tourbillon', 'Lamborghini Revuelto':'Lamborghini Revuelto', 'Lamborghini Urus SE':'Lamborghini Urus SE',
    'Rolls-Royce Phantom':'Rolls-Royce Phantom', 'Rolls-Royce Spectre':'Rolls-Royce Spectre', 'McLaren 750S':'McLaren 750S',
    'McLaren Solus GT':'McLaren Solus GT', 'Koenigsegg Jesko':'Koenigsegg Jesko', 'Koenigsegg Gemera':'Koenigsegg Gemera',
    'Pagani Utopia':'Pagani Utopia', 'Pagani Huayra':'Pagani Huayra', 'Aston Martin Valkyrie':'Aston Martin Valkyrie',
    'Mercedes-Maybach S-Class':'Mercedes-Maybach S-Class', 'Range Rover SV':'Range Rover Sport SV', 'Porsche 911 GT3 RS':'Porsche 911 GT3 RS',
    'Gordon Murray T.50':'Gordon Murray Automotive T.50', 'Bentley Mulliner Batur':'Bentley Batur',
    'Ducati Panigale V4 R':'Ducati Panigale V4 R', 'Ducati Diavel V4':'Ducati Diavel V4', 'BMW M 1000 RR':'BMW M 1000 RR',
    'BMW R 1300 GS':'BMW R 1300 GS', 'Kawasaki Ninja H2R':'Kawasaki Ninja H2R', 'Honda Gold Wing':'Honda Gold Wing',
    'Honda CBR1000RR-R':'Honda CBR1000RR-R', 'Harley-Davidson CVO Road Glide':'Harley-Davidson CVO Road Glide',
    'Indian Roadmaster Elite':'Indian Roadmaster Elite', 'Triumph Rocket 3':'Triumph Rocket 3', 'MV Agusta Brutale 1000':'MV Agusta Brutale 1000',
    'Aprilia RSV4 Factory':'Aprilia RSV4', 'Yamaha YZF-R1M':'Yamaha YZF-R1M', 'Suzuki Hayabusa':'Suzuki Hayabusa',
    'Gulfstream G700':'Gulfstream G700', 'Bombardier Global 8000':'Bombardier Global 8000', 'Dassault Falcon 10X':'Dassault Falcon 10X',
    'Embraer Praetor 600':'Embraer Praetor 600', 'Cessna Citation Longitude':'Cessna Citation Longitude', 'Pilatus PC-24':'Pilatus PC-24',
    'Boeing BBJ 737':'Boeing Business Jet 737', 'Airbus ACJ TwoTwenty':'Airbus ACJ TwoTwenty', 'VIP Boeing 777':'Boeing 777',
    'Luxury Helicopter':'luxury helicopter', 'Sunseeker 100':'Sunseeker 100 yacht', 'Azimut Grande 36M':'Azimut Grande 36M yacht',
    'Pershing 140':'Pershing 140 yacht', 'Feadship Superyacht':'Feadship superyacht', 'Oceanco Custom Yacht':'Oceanco yacht',
    'Heesen Yacht':'Heesen yacht', 'Explorer Yacht':'explorer yacht', 'Sailing Superyacht':'sailing superyacht',
    'Rolex Platinum Day-Date':'Rolex Day-Date platinum', 'Patek Philippe Nautilus':'Patek Philippe Nautilus', 'RM 65-01':'Richard Mille RM 65-01',
    'Maldives Resort':'Maldives resort', 'Luxury Beach Resort':'luxury beach resort', 'Historic European Castle':'historic European castle'
  };

  const STOPWORDS = new Set(['the','and','of','in','for','with','a','an','at','on','to','by','from','year','years','private','luxury','custom','collection','upgrade','fund','project','program','company','team','group','brand','build','world','global']);
  const BAD_WORDS = ['illustration','drawing','diagram','render','rendering','cgi','3d','concept art','toy','model car','scale model','diecast','logo','poster','screenshot','game','video game','wallpaper','ai art','fantasy','cartoon','fictional','icon','flag','map','coat of arms'];

  const norm = s => String(s||'').toLowerCase().replace(/[–—]/g,'-').replace(/[^a-z0-9]+/g,' ').trim();
  const tokens = s => norm(s).split(/\s+/).filter(Boolean);
  const meaningfulTokens = s => tokens(s).filter(t => t.length >= 2 && !STOPWORDS.has(t));

  function loadImageMemory(){
    try {
      const raw = localStorage.getItem(imageMemoryKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      Object.entries(parsed || {}).forEach(([id,v]) => {
        if (v?.url && v?.key && v.source !== 'NO_MATCH') {
          imageMap.set(id,v);
          usedImageKeys.add(v.key);
        }
      });
    } catch(e) {}
  }
  function persistImageMemory(){
    try {
      const obj={}; imageMap.forEach((v,id)=>{ obj[id]=v; });
      localStorage.setItem(imageMemoryKey,JSON.stringify(obj));
    } catch(e) {}
  }

  function exactPageQueries(p){
    const alias=imageAliases[p.name] || p.name;
    return [...new Set([alias, p.name])];
  }

  function photoQueries(p){
    const alias=imageAliases[p.name] || p.name;
    const hint=categoryPhotoHints[p.category] || 'real-world photograph';
    return [...new Set([
      `"${alias}" photograph`,
      `"${alias}" ${hint}`,
      `${alias} photograph`,
      `"${p.name}" photograph`,
      `${p.name} ${hint}`
    ])];
  }

  function badWordPenalty(text){
    const hay=norm(text);
    return BAD_WORDS.reduce((n,w)=>n+(hay.includes(w)?35:0),0);
  }

  function scoreTitle(title, p){
    const t=norm(title);
    const alias=norm(imageAliases[p.name] || p.name);
    const required=meaningfulTokens(alias);
    let score=0;
    if (t === alias) score += 160;
    if (t.includes(alias)) score += 80;
    let matched=0;
    required.forEach(w=>{ if(t.includes(w)){matched++; score+=18;} });
    if(required.length && matched === required.length) score += 55;
    score -= badWordPenalty(title);
    return score;
  }

  function scoreCommons(result,p){
    const titleScore=scoreTitle(result.title,p);
    const hay=norm([result.title,result.description,result.creator].join(' '));
    const hint=norm(categoryPhotoHints[p.category] || '');
    const hintWords=meaningfulTokens(hint);
    let score=titleScore;
    let hintMatches=0;
    hintWords.forEach(w=>{ if(hay.includes(w)) hintMatches++; });
    score += Math.min(20,hintMatches*3);
    if((result.width||0)>=1600) score+=12;
    else if((result.width||0)>=1200) score+=7;
    if((result.height||0)>=800) score+=4;
    if(/photograph|photo/i.test(result.title||'')) score+=8;
    score -= badWordPenalty(hay);
    return score;
  }

  function makeMeta({id,title,url,fullUrl,landingUrl,width,height,source}){
    return {id:String(id||''),title:String(title||''),url,fullUrl:url?fullUrl||url:'',landingUrl:landingUrl||'',width:width||0,height:height||0,source:source||'Wikimedia Commons',key:String(id||url)};
  }

  async function fetchJson(url, timeoutMs=15000){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{
      const r=await fetch(url,{signal:controller.signal,headers:{Accept:'application/json'}});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } finally { clearTimeout(timer); }
  }

  async function fetchWikipediaExact(p){
    const titles=exactPageQueries(p);
    for(const title of titles){
      const u=new URL(WIKIPEDIA_API);
      u.searchParams.set('action','query'); u.searchParams.set('format','json'); u.searchParams.set('origin','*');
      u.searchParams.set('titles',title); u.searchParams.set('prop','pageimages|info');
      u.searchParams.set('inprop','url'); u.searchParams.set('piprop','thumbnail|name'); u.searchParams.set('pithumbsize','1600');
      const data=await fetchJson(u.toString());
      const pages=Object.values(data?.query?.pages||{});
      if(!pages.length) continue;
      const page=pages[0];
      if(String(page.missing)==='') continue;
      const thumb=page.thumbnail?.source;
      if(!thumb) continue;
      const pageTitle=String(page.title||title);
      const imageName=String(page.pageimage||'');
      if(imageName && badWordPenalty(imageName)>0) continue;
      const score=scoreTitle(pageTitle,p);
      if(score < 110) continue;
      // Use the underlying Wikipedia image name as the identity, so the same
      // photograph cannot sneak in again through a different thumbnail URL.
      const key=`wikimedia-file:${norm(imageName||thumb)}`;
      if(usedImageKeys.has(key) || reservedImageKeys.has(key)) continue;
      return {meta:makeMeta({id:key,title:pageTitle,url:thumb,fullUrl:thumb,landingUrl:page.fullurl||`https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g,'_'))}`,width:page.thumbnail.width,height:page.thumbnail.height,source:'Wikipedia photo'}),score};
    }
    return null;
  }

  async function fetchWikimediaSearch(q){
    const u=new URL(WIKIMEDIA_API);
    u.searchParams.set('action','query'); u.searchParams.set('format','json'); u.searchParams.set('origin','*');
    u.searchParams.set('generator','search'); u.searchParams.set('gsrsearch',q); u.searchParams.set('gsrnamespace','6');
    u.searchParams.set('gsrlimit','30'); u.searchParams.set('gsrsort','relevance');
    u.searchParams.set('prop','imageinfo'); u.searchParams.set('iiprop','url|mime|size'); u.searchParams.set('iiurlwidth','1600');
    const data=await fetchJson(u.toString());
    return Object.values(data?.query?.pages||{}).map(page=>{
      const ii=page.imageinfo?.[0]; if(!ii) return null;
      const mime=String(ii.mime||''); if(!/^image\/(jpeg|png|webp)$/i.test(mime)) return null;
      const title=String(page.title||'').replace(/^File:/,'');
      return {id:page.pageid,title,url:ii.thumburl||ii.url,fullUrl:ii.url,width:ii.thumbwidth||ii.width||0,height:ii.thumbheight||ii.height||0,landingUrl:`https://commons.wikimedia.org/wiki/${encodeURIComponent(String(page.title||'').replace(/ /g,'_'))}`,source:'Wikimedia Commons'};
    }).filter(Boolean);
  }

  async function resolveRealPhoto(p){
    if(imageMap.has(p.id)) return imageMap.get(p.id);
    if(imagePending.has(p.id)) return imagePending.get(p.id);
    const job=(async()=>{
      // Tier 1: exact Wikipedia article image.
      try{
        const exact=await fetchWikipediaExact(p);
        if(exact?.meta){ reservedImageKeys.add(exact.meta.key); return exact.meta; }
      }catch(e) {}

      // Tier 2: Wikimedia Commons, strict scoring. Never drop to a category-only image.
      const candidates=[];
      for(const q of photoQueries(p)){
        try{
          const results=await fetchWikimediaSearch(q);
          for(const r of results){
            const score=scoreCommons(r,p);
            if(score < 100) continue;
            if((r.width||0) < 900 || (r.height||0) < 600) continue;
            const key=`commons-file:${norm(r.title||r.url)}`;
            if(usedImageKeys.has(key) || reservedImageKeys.has(key)) continue;
            candidates.push({...r,score,key});
          }
          if(candidates.length >= 5) break;
        }catch(e) {}
      }
      candidates.sort((a,b)=>b.score-a.score);
      for(const c of candidates){
        if(usedImageKeys.has(c.key) || reservedImageKeys.has(c.key)) continue;
        reservedImageKeys.add(c.key);
        return makeMeta(c);
      }
      throw new Error(`No verified real photo for ${p.name}`);
    })();
    imagePending.set(p.id,job);
    job.finally(()=>imagePending.delete(p.id));
    return job;
  }

  function placeholderImage(p,img,credit){
    img.removeAttribute('src');
    img.classList.remove('is-loaded');
    img.dataset.loading='';
    img.dataset.imageKey='NO_MATCH';
    img.alt=`No verified real photo found for ${p.name}`;
    img.closest('.product-visual')?.classList.add('photo-unavailable');
    if(credit){
      credit.hidden=false;
      credit.removeAttribute('href');
      credit.textContent='No verified photo';
      credit.setAttribute('aria-label','No verified photo available');
    }
  }

  function applyImageMeta(img,meta,p,credit){
    if(meta?.source==='NO_MATCH') return placeholderImage(p,img,credit);
    img.dataset.imageKey=meta.key||'';
    img.alt=`Real-world photograph of ${p.name}`;
    img.classList.remove('image-error');
    img.closest('.product-visual')?.classList.remove('photo-unavailable');
    img.onload=()=>{
      img.classList.add('is-loaded'); img.dataset.loading='';
      if(credit){
        credit.hidden=false; credit.textContent='Open source photo';
        if(meta.landingUrl){credit.href=meta.landingUrl;credit.target='_blank';credit.rel='noopener';}
      }
      reservedImageKeys.delete(meta.key);
    };
    img.onerror=()=>{
      img.classList.add('image-error'); img.dataset.loading='';
      if(imageMap.get(p.id)?.key===meta.key){imageMap.delete(p.id); usedImageKeys.delete(meta.key); persistImageMemory();}
      reservedImageKeys.delete(meta.key);
      placeholderImage(p,img,credit);
    };
    img.src=meta.url;
  }

  function pumpImageQueue(){
    while(activeImageJobs<IMAGE_CONCURRENCY && imageJobs.length){
      const {job,resolve}=imageJobs.shift(); activeImageJobs++;
      Promise.resolve().then(job).catch(()=>{}).finally(()=>{activeImageJobs--;resolve();pumpImageQueue();});
    }
  }
  function enqueueImageJob(job){return new Promise(resolve=>{imageJobs.push({job,resolve});pumpImageQueue();});}

  function queueImageLoad(p,img,credit){
    if(!p || !img || img.dataset.loading==='1' || img.classList.contains('is-loaded')) return;
    img.dataset.loading='1';
    enqueueImageJob(async()=>{
      try{
        const meta=await resolveRealPhoto(p);
        imageMap.set(p.id,meta); usedImageKeys.add(meta.key); persistImageMemory();
        if(document.contains(img)) applyImageMeta(img,meta,p,credit);
      }catch(e){
        if(document.contains(img)) placeholderImage(p,img,credit);
      }
    });
  }

  function installImageObserver(){
    imageObserver?.disconnect();
    const imgs=$$('.product-image[data-product-id], .spotlight-image[data-product-id]');
    if(!('IntersectionObserver' in window)){
      imgs.forEach(img=>{const p=products.find(x=>x.id===img.dataset.productId);if(p)queueImageLoad(p,img,img.closest('.product-visual')?.querySelector('.image-credit'));});
      return;
    }
    imageObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const img=entry.target; imageObserver.unobserve(img);
        const p=products.find(x=>x.id===img.dataset.productId); if(!p)return;
        const credit=img.closest('.product-visual')?.querySelector('.image-credit');
        queueImageLoad(p,img,credit);
      });
    },{rootMargin:'900px 0px'});
    imgs.forEach(img=>imageObserver.observe(img));
  }

  function prepareImage(img,p,credit){
    img.dataset.productId=p.id; img.loading='lazy'; img.decoding='async';
    img.alt=`Real-world photograph of ${p.name}`; img.removeAttribute('src');
    if(imageMap.has(p.id)) applyImageMeta(img,imageMap.get(p.id),p,credit);
    else if(credit) credit.hidden=true;
  }

  // Make image reservations serializable in the browser session, but never carry
  // forward the old V1/V2 random-image cache.
  loadImageMemory();

  function save() {
    if (!state.fortune) return;
    localStorage.setItem('spend-fortune-v21', JSON.stringify({
      ...state, unlocked:[...state.unlocked], favorites:[...state.favorites]
    }));
  }
  function load() {
    try {
      const raw = localStorage.getItem('spend-fortune-v21');
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.assign(state, data);
      state.favoritesOnly = !!data.favoritesOnly;
      state.affordableOnly = !!data.affordableOnly;
      state.ownedOnly = !!data.ownedOnly;
      activeCurrency = currencyOptions[state.currency] ? state.currency : 'USD';
      state.unlocked = new Set(data.unlocked || []);
      state.favorites = new Set(data.favorites || []);
      applyTheme(state.theme || 'violet');
    } catch(e) {}
  }

  const themeNames = ['violet','gold','cyber'];
  function applyTheme(theme) {
    const safe = themeNames.includes(theme) ? theme : 'violet';
    state.theme = safe;
    document.body.dataset.theme = safe;
    if (els.themeBtn) els.themeBtn.textContent = safe === 'violet' ? 'Violet' : safe === 'gold' ? 'Gold' : 'Cyber';
  }
  function cycleTheme() {
    const next = themeNames[(themeNames.indexOf(state.theme) + 1) % themeNames.length];
    applyTheme(next); save(); showToast(`${next[0].toUpperCase()+next.slice(1)} theme active.`);
  }
  function setCurrency(code){
    if(!currencyOptions[code]) return;
    activeCurrency=code; state.currency=code; save();
    const selector=$('#currencySelect'); if(selector) selector.value=code;
    buildFortunes(); updateStatsOnly(); if(state.screen==='store'){ renderProducts(); renderSpotlight(); }
    showToast(`Currency switched to ${code}.`);
  }

  function fortuneTier(amount) {
    if (amount >= 1e12) return 'TRILLIONAIRE';
    if (amount >= 1e11) return 'ULTRA-BILLIONAIRE';
    if (amount >= 1e10) return 'MEGA BILLIONAIRE';
    if (amount >= 1e9) return 'BILLIONAIRE';
    if (amount >= 1e8) return 'CENTI-MILLIONAIRE';
    if (amount >= 1e7) return 'DECA-MILLIONAIRE';
    if (amount >= 1e6) return 'MILLIONAIRE';
    if (amount >= 1e5) return 'HIGH ROLLER';
    return 'BIG SPENDER';
  }
  function updateTicker() {
    if (!els.tickerText) return;
    if (!state.fortune) return;
    const spentPct = state.starting ? state.spent/state.starting : 0;
    const lines = [
      state.lastPurchase ? `LAST BUY: ${state.lastPurchase.name} × ${state.lastPurchase.qty}` : 'THE SHOP IS OPEN. YOUR FORTUNE IS NOT SAFE.',
      `${pct(spentPct)} OF YOUR FORTUNE IS GONE.`,
      `${state.totalItems.toLocaleString()} ITEMS HAVE LEFT THE SHELVES.`,
      `${products.length.toLocaleString()} ITEMS ARE CURRENTLY LISTED IN THE SHOP.`,
      state.favorites.size ? `${state.favorites.size} ITEMS ARE ON YOUR FAVORITE LIST.` : 'STAR ITEMS YOU WANT TO WATCH.',
      state.balance <= 0.0001 ? 'RUN COMPLETE. CONGRATULATIONS, YOU ARE BROKE.' : 'THE MONEY IS MOVING. KEEP SHOPPING.'
    ];
    els.tickerText.textContent = lines[Math.floor(Date.now()/4500) % lines.length];
  }
  function toggleFavorite(p) {
    if (state.favorites.has(p.id)) { state.favorites.delete(p.id); showToast('Removed from favorites.'); }
    else { state.favorites.add(p.id); showToast('Added to favorites.'); }
    save(); renderProducts(); updateStatsOnly();
  }

  function showScreen(name) {
    state.screen = name;
    els.landing.classList.toggle('active', name === 'landing');
    els.store.classList.toggle('active', name === 'store');
    window.scrollTo({top:0, behavior:'instant'});
    if (state.fortune) {
      try { localStorage.setItem('spend-fortune-v21', JSON.stringify({...state, unlocked:[...state.unlocked], favorites:[...state.favorites]})); } catch(e) {}
    }
  }

  function buildFortunes() {
    els.fortuneGrid.innerHTML = '';
    fortunes.forEach(f => {
      const button = document.createElement('button');
      button.className = `fortune-card ${f.id === 'custom' ? 'custom-card' : ''}`;
      button.innerHTML = `<span class="fortune-name">${escapeHtml(f.name)}</span><span class="fortune-country">${f.flag || '🌍'} <span>${escapeHtml(f.country || 'Global')}</span></span><span class="fortune-meta"><span class="fortune-amount">${f.amount === null ? 'Custom' : format(f.amount)}</span><span class="fortune-note">${escapeHtml(f.note)}</span></span>`;
      button.addEventListener('click', () => {
        if (f.id === 'custom') {
          const raw = prompt(`Enter your starting fortune in ${activeCurrency}. Example: ${activeCurrency==='INR'?'10000000000':'2500000000'}`);
          if (raw === null) return;
          const val = Number(raw.replace(/[^0-9.]/g,''));
          if (!Number.isFinite(val) || val <= 0) return showToast('Enter a valid positive number.');
          startFortune({ ...f, amount: Math.floor(val / currencyOptions[activeCurrency].rate), name:'Custom Fortune' });
          return;
        }
        startFortune(f);
      });
      els.fortuneGrid.appendChild(button);
    });
  }

  function startFortune(f) {
    Object.assign(state, { fortune:f.name, starting:f.amount, balance:f.amount, spent:0, purchases:{}, totalItems:0, selectedCategory:'All', search:'', sort:'featured', unlocked:new Set(), sessionStarted:Date.now() });
    els.searchInput.value = '';
    els.sortSelect.value = 'featured';
    if (els.fortuneName) els.fortuneName.textContent = f.name;
    if (els.fortuneCountry) els.fortuneCountry.textContent = `${f.flag || '🌍'} ${f.country || 'Global'}`;
    if (els.runMode) els.runMode.textContent = 'LIVE RUN';
    if (els.wealthStatus) els.wealthStatus.textContent = "YOU'RE LOSING MONEY";
    showScreen('store');
    renderAll();
    playTick();
    showToast(`${f.name} mode started.`);
    save();
  }

  function resetGame() {
    if (!state.fortune) { showScreen('landing'); return; }
    if (!confirm('Reset this fortune and delete your current purchases?')) return;
    localStorage.removeItem('spend-fortune-v21');
    localStorage.removeItem(imageMemoryKey); imageMap.clear(); usedImageKeys.clear(); reservedImageKeys.clear(); imagePending.clear();
    Object.assign(state, { screen:'landing', fortune:null, starting:0, balance:0, spent:0, purchases:{}, totalItems:0, selectedCategory:'All', search:'', sort:'featured', unlocked:new Set(), favorites:new Set(), favoritesOnly:false, lastPurchase:null, sessionStarted:null });
    els.searchInput.value = '';
    els.sortSelect.value = 'featured';
    showScreen('landing');
    buildFortunes();
    showToast('Run reset.');
  }

  function getOwned(p) { return state.purchases[p.id]?.qty || 0; }
  function getSpentOnProduct(p) { return getOwned(p) * p.price; }
  function categorySpent(category) { return products.filter(p=>p.category===category).reduce((s,p)=>s + getSpentOnProduct(p), 0); }
  function categoryOwned(category) { return products.some(p=>p.category===category && getOwned(p)>0); }

  function animateBalance() {
    if (!els.balance) return;
    els.balance.classList.remove('balance-pop');
    void els.balance.offsetWidth;
    els.balance.classList.add('balance-pop');
  }

  function buy(p, qty) {
    qty = Math.max(1, Math.floor(Number(qty) || 1));
    const affordable = Math.floor(state.balance / p.price);
    if (affordable < qty) {
      if (affordable <= 0) return showToast('You cannot afford this one.');
      qty = affordable;
    }
    const cost = qty * p.price;
    if (cost <= 0) return;
    state.balance -= cost;
    state.spent += cost;
    state.totalItems += qty;
    state.purchases[p.id] = { qty:getOwned(p) + qty, firstBought:Date.now() };
    state.lastPurchase = { id:p.id, name:p.name, qty, cost };
    playBuy();
    checkAchievements();
    save();
    updateStatsOnly();
    animateBalance();
    showToast(`Bought ${qty.toLocaleString()} × ${p.name} for ${format(cost)}.`);
  }

  function renderCategories() {
    els.categoryList.innerHTML = '';
    if (els.favoritesBtn) {
      els.favoritesBtn.classList.toggle('active', !!state.favoritesOnly);
      els.favoriteCount.textContent = state.favorites.size.toLocaleString();
    }
    categories.forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.className = `category-button ${state.selectedCategory===id ? 'active':''}`;
      const count = id === 'All' ? products.length : products.filter(p=>p.category===id).length;
      btn.innerHTML = `<span class="category-name">${escapeHtml(label)}</span><span class="category-count">${count}</span>`;
      btn.addEventListener('click', () => { state.selectedCategory=id; renderCategories(); renderProducts(); });
      els.categoryList.appendChild(btn);
    });
  }

  function filteredProducts() {
    const q = state.search.trim().toLowerCase();
    let list = products.filter(p => {
      const categoryMatch = state.selectedCategory === 'All' || p.category === state.selectedCategory;
      const queryMatch = !q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q);
      const favoriteMatch = !state.favoritesOnly || state.favorites.has(p.id);
      const affordableMatch = !state.affordableOnly || p.price <= state.balance;
      const ownedMatch = !state.ownedOnly || getOwned(p) > 0;
      return categoryMatch && queryMatch && favoriteMatch && affordableMatch && ownedMatch;
    });
    if (state.sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if (state.sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if (state.sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));
    else if (state.sort === 'owned') list.sort((a,b)=>getOwned(b)-getOwned(a) || b.price-a.price);
    else list.sort((a,b)=>a.featured-b.featured || b.price-a.price);
    return list;
  }

  function renderProducts() {
    const list = filteredProducts();
    els.productGrid.innerHTML = '';
    els.resultCount.textContent = `${list.length.toLocaleString()} item${list.length === 1 ? '' : 's'}`;
    els.catalogEyebrow.textContent = state.selectedCategory === 'All' ? 'ALL ITEMS' : state.selectedCategory.toUpperCase();
    els.catalogTitle.textContent = state.selectedCategory === 'All' ? 'The shop' : categories.find(c=>c[0]===state.selectedCategory)?.[1] || state.selectedCategory;
    els.emptyState.classList.toggle('hidden', list.length > 0);

    const frag = document.createDocumentFragment();
    list.forEach((p, index) => {
      const card = $('#productTemplate').content.firstElementChild.cloneNode(true);
      card.dataset.productId = p.id;
      card.classList.toggle('is-owned', getOwned(p) > 0);
      card.classList.toggle('is-favorite', state.favorites.has(p.id));
      $('.product-monogram', card).textContent = monogram(p.name);
      $('.product-tag', card).textContent = p.category;
      $('.product-category', card).textContent = p.category;
      $('.product-name', card).textContent = p.name;
      $('.product-description', card).textContent = p.description;
      $('.visual-price', card).textContent = compact(p.price);
      $('.product-price', card).textContent = format(p.price);
      const rank = $('.product-rank', card);
      rank.textContent = index < 3 ? 'Featured' : p.featured <= 2 ? 'Hot' : 'Available';
      const owned = getOwned(p);
      $('.owned-count', card).textContent = owned ? `${owned.toLocaleString()} owned` : 'Not owned yet';
      const img = $('.product-image', card);
      const credit = $('.image-credit', card);
      prepareImage(img, p, credit);
      const input = $('.qty-input', card);
      const minus = $('.qty-minus', card);
      const plus = $('.qty-plus', card);
      const buyBtn = $('.buy-button', card);
      const maxBtn = $('.max-button', card);
      input.addEventListener('input', () => { input.value = Math.max(1, Math.floor(Number(input.value)||1)); });
      minus.addEventListener('click', () => input.value = Math.max(1, Number(input.value)-1));
      plus.addEventListener('click', () => input.value = Math.min(999999, Number(input.value)+1));
      maxBtn.addEventListener('click', () => { input.value = Math.max(1, Math.floor(state.balance / p.price)); });
      buyBtn.addEventListener('click', () => { buy(p, input.value); card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash'); });
      const favoriteBtn = $('.favorite-button', card);
      favoriteBtn.textContent = state.favorites.has(p.id) ? '★' : '☆';
      favoriteBtn.classList.toggle('active', state.favorites.has(p.id));
      favoriteBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(p); });
      frag.appendChild(card);
    });
    els.productGrid.appendChild(frag);
    installImageObserver();
  }

  function openSpotlightProduct(p){
    if(!p || !state.fortune) return;
    // This is a navigation action, never a filter action. Keep the run intact.
    state.selectedCategory = p.category;
    state.search = '';
    state.favoritesOnly = false;
    state.affordableOnly = false;
    state.ownedOnly = false;
    if(els.searchInput) els.searchInput.value='';
    if(els.affordableOnly) els.affordableOnly.checked=false;
    if(els.ownedOnly) els.ownedOnly.checked=false;
    renderCategories();
    renderProducts();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const target=els.productGrid.querySelector(`article[data-product-id="${p.id}"]`);
      if(!target){showToast(`Could not open ${p.name}.`);return;}
      target.scrollIntoView({behavior:'smooth',block:'center'});
      target.classList.add('spotlight-target');
      window.setTimeout(()=>target.classList.remove('spotlight-target'),1800);
    }));
  }

  function renderSpotlight() {
    if (!els.spotlightGrid) return;
    const candidates = [...products].sort((a,b)=>b.price-a.price).slice(0,12);
    const offset = Math.floor(Math.random() * Math.max(1, candidates.length - 3));
    const picks = [candidates[offset], candidates[(offset+4)%candidates.length], candidates[(offset+7)%candidates.length], candidates[(offset+10)%candidates.length]].filter(Boolean);
    els.spotlightGrid.innerHTML = '';
    picks.forEach(p => {
      const card = $('#spotlightTemplate').content.firstElementChild.cloneNode(true);
      const spotlightImg=$('.spotlight-image', card);
      prepareImage(spotlightImg, p, null);
      $('.spotlight-text small', card).textContent = p.category;
      $('.spotlight-text strong', card).textContent = p.name;
      $('.spotlight-text b', card).textContent = format(p.price);
      card.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openSpotlightProduct(p);
      });
      els.spotlightGrid.appendChild(card);
    });
    installImageObserver();
  }

  function undoLastPurchase() {
    const last = state.lastPurchase;
    if (!last) return showToast('Nothing to undo.');
    const p = products.find(x => x.id === last.id);
    if (!p) return;
    const owned = getOwned(p);
    const qty = Math.min(owned, last.qty);
    if (!qty) { state.lastPurchase = null; updateStatsOnly(); return; }
    state.balance = Math.min(state.starting, state.balance + qty * p.price);
    state.spent = Math.max(0, state.spent - qty * p.price);
    state.totalItems = Math.max(0, state.totalItems - qty);
    if (owned - qty > 0) state.purchases[p.id].qty = owned - qty;
    else delete state.purchases[p.id];
    state.lastPurchase = null;
    playTick(); save(); renderProducts(); updateStatsOnly();
    showToast(`Undid ${qty.toLocaleString()} × ${p.name}.`);
  }

  function luckyBuy() {
    const list = filteredProducts().filter(p => p.price > 0 && p.price <= state.balance);
    if (!list.length) return showToast('Nothing affordable in this view.');
    const weighted = [...list].sort(()=>Math.random()-.5).slice(0, Math.min(18, list.length));
    const p = weighted[Math.floor(Math.random()*weighted.length)] || list[0];
    const max = Math.max(1, Math.floor(state.balance / p.price));
    const qty = Math.min(max, Math.random() < .72 ? 1 : Math.max(1, Math.floor(Math.random()*Math.min(5,max))+1));
    buy(p, qty);
    renderProducts();
  }

  function updateStatsOnly() {
    els.balance.textContent = format(state.balance);
    els.spent.textContent = `${compact(state.spent)} spent`;
    els.itemsOwned.textContent = `${state.totalItems.toLocaleString()} item${state.totalItems === 1 ? '' : 's'}`;
    const spentPct = state.starting ? Math.min(1, state.spent / state.starting) : 0;
    els.progressFill.style.width = `${spentPct*100}%`;
    els.progressLeft.textContent = `${pct(1-spentPct)} left`;
    els.progressRight.textContent = `${pct(spentPct)} spent`;
    const ownedProducts = products.filter(p=>getOwned(p)>0);
    const largest = ownedProducts.reduce((best,p)=>!best || p.price > best.price ? p : best, null);
    els.largestPurchase.textContent = largest ? compact(largest.price) : '—';
    els.averagePurchase.textContent = state.totalItems ? compact(state.spent / state.totalItems) : compact(0);
    const cats = categories.filter(c=>c[0] !== 'All').filter(c=>categoryOwned(c[0])).length;
    els.categoriesOwned.textContent = `${cats} / ${categories.length-1}`;
    els.achievementCount.textContent = `${state.unlocked.size} / ${achievements.length}`;
    if (els.favoriteCountStat) els.favoriteCountStat.textContent = state.favorites.size.toLocaleString();
    if (els.fortuneName) els.fortuneName.textContent = state.fortune || 'Fortune';
    const currentFortune = fortunes.find(f => f.name === state.fortune);
    if (els.fortuneCountry) els.fortuneCountry.textContent = `${currentFortune?.flag || '🌍'} ${currentFortune?.country || 'Global'}`;
    if (els.fortuneTier) els.fortuneTier.textContent = fortuneTier(state.starting);
    if (els.burnRate) els.burnRate.textContent = state.totalItems ? `${compact(state.spent / state.totalItems)} / item` : `${compact(0)} / item`;
    if (els.lastMove) els.lastMove.textContent = state.lastPurchase ? `${state.lastPurchase.name} × ${state.lastPurchase.qty}` : 'Nothing yet';
    if (els.undoBtn) els.undoBtn.disabled = !state.lastPurchase;
    updateTicker();
    if (els.favoritesBtn) { els.favoriteCount.textContent = state.favorites.size.toLocaleString(); els.favoritesBtn.classList.toggle('active', !!state.favoritesOnly); }
    if (els.runMode) els.runMode.textContent = state.balance <= 0.0001 ? 'RUN COMPLETE' : 'LIVE RUN';
    if (els.wealthStatus) els.wealthStatus.textContent = state.balance <= 0.0001 ? 'YOU ARE BROKE' : (spentPct >= .75 ? 'SERIOUS DAMAGE' : "YOU'RE LOSING MONEY");
    updateChallengeCopy();
  }

  function updateChallengeCopy() {
    const c = challenges[state.challenge % challenges.length];
    els.challengeText.textContent = c.text;
    if (els.challengeIndex) els.challengeIndex.textContent = String((state.challenge % challenges.length) + 1).padStart(2,'0');
  }

  function renderAll() { renderCategories(); renderProducts(); updateStatsOnly(); renderSpotlight(); }

  function checkAchievements() {
    const spent = state.spent;
    const cats = categories.filter(c=>c[0] !== 'All').filter(c=>categoryOwned(c[0])).length;
    const conditions = [
      state.totalItems >= 1,
      spent >= 1_000_000,
      spent >= 10_000_000,
      spent >= 100_000_000,
      spent >= 1_000_000_000,
      state.starting && spent / state.starting >= .5,
      state.starting && spent / state.starting >= .99,
      cats >= 10,
      products.filter(p=>p.category==='Cars').reduce((s,p)=>s+getOwned(p),0) >= 10,
      categoryOwned('Islands'), categoryOwned('Jets'), categoryOwned('Yachts'), categorySpent('Business') >= 1_000_000_000,
      categorySpent('Charity') >= 100_000_000,
      products.some(p=>getOwned(p)>0 && p.price >= state.starting*.01),
      state.balance <= 0.0001
    ];
    let newly = false;
    conditions.forEach((ok,i) => {
      if (ok && !state.unlocked.has(i)) { state.unlocked.add(i); newly = true; celebrate(achievements[i][0]); }
    });
    if (newly) save();
  }

  function celebrate(title) {
    showToast(`Achievement unlocked: ${title}`);
    els.confetti.innerHTML = '';
    for (let i=0;i<70;i++) {
      const s = document.createElement('span');
      s.style.left = `${Math.random()*100}%`;
      s.style.setProperty('--x', `${(Math.random()-.5)*220}px`);
      s.style.animationDelay = `${Math.random()*180}ms`;
      s.style.transform = `rotate(${Math.random()*180}deg)`;
      els.confetti.appendChild(s);
    }
    setTimeout(()=>els.confetti.innerHTML='',1200);
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(()=>els.toast.classList.remove('show'), 2800);
  }

  function playTick() {
    if (!state.sound) return;
    try { const a = new AudioContext(); const o=a.createOscillator(); const g=a.createGain(); o.frequency.value=520; g.gain.value=.045; o.connect(g); g.connect(a.destination); o.start(); g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.08); o.stop(a.currentTime+.08); } catch(e) {}
  }
  function playBuy() {
    if (!state.sound) return;
    try { const a = new AudioContext(); const o=a.createOscillator(); const g=a.createGain(); o.type='triangle'; o.frequency.value=680; g.gain.value=.035; o.connect(g); g.connect(a.destination); o.start(); o.frequency.exponentialRampToValueAtTime(280,a.currentTime+.12); g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.13); o.stop(a.currentTime+.14); } catch(e) {}
  }

  function openModal(html) {
    els.modalContent.innerHTML = html;
    els.modal.showModal();
    $('#shareReportBtn')?.addEventListener('click', shareReport);
    $('#closeReportBtn')?.addEventListener('click', closeModal);
  }

  async function shareReport() {
    const text = `I spent ${format(state.spent)} out of ${format(state.starting)} in Spend the Fortune. I bought ${state.totalItems.toLocaleString()} items and have ${format(state.balance)} left.`;
    try {
      if (navigator.share) {
        await navigator.share({ title:'Spend the Fortune', text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast('Result copied to clipboard.');
      } else {
        prompt('Copy your result:', text);
      }
    } catch (e) {}
  }
  function closeModal() { els.modal.close(); }

  function reportHtml() {
    const breakdown = categories.filter(c=>c[0] !== 'All').map(c=>[c[0], categorySpent(c[0])]).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
    const max = Math.max(1, ...breakdown.map(([,v])=>v));
    const unlocked = achievements.map((a,i)=>({a,i,ok:state.unlocked.has(i)}));
    return `<div>
      <span class="eyebrow">SPENDING REPORT</span>
      <h2 class="modal-title">You had ${format(state.starting)}.<br>Now look what happened.</h2>
      <p class="modal-subtitle">${escapeHtml(state.fortune)} mode • session started ${new Date(state.sessionStarted || Date.now()).toLocaleString()}</p>
      <div class="report-grid">
        <div class="report-card"><span>Total spent</span><strong>${format(state.spent)}</strong></div>
        <div class="report-card"><span>Money left</span><strong>${format(state.balance)}</strong></div>
        <div class="report-card"><span>Items purchased</span><strong>${state.totalItems.toLocaleString()}</strong></div>
        <div class="report-card"><span>Fortune burned</span><strong>${pct(state.starting ? state.spent/state.starting : 0)}</strong></div>
      </div>
      <div class="breakdown"><span class="eyebrow">WHERE IT WENT</span>
        ${breakdown.length ? breakdown.map(([cat,v])=>`<div class="breakdown-row"><div class="breakdown-label">${escapeHtml(cat)}</div><div class="breakdown-track"><div class="breakdown-bar" style="width:${(v/max)*100}%"></div></div><div class="breakdown-value">${compact(v)}</div></div>`).join('') : '<p class="modal-subtitle">You have not bought anything yet.</p>'}
      </div>
      <div class="receipt"><span class="eyebrow">ACHIEVEMENTS</span><div class="achievement-list">${unlocked.map(({a,i,ok})=>`<div class="achievement ${ok?'unlocked':''}"><div class="achievement-title">${escapeHtml(a[0])}</div><div class="achievement-desc">${escapeHtml(a[1])}</div><div class="achievement-state">${ok?'Unlocked':'Locked'}</div></div>`).join('')}</div></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="primary-button" id="shareReportBtn">Share result</button><button class="ghost-button" id="closeReportBtn">Close</button></div>
    </div>`;
  }

  function historyHtml() {
    const bought = products.filter(p=>getOwned(p)>0).sort((a,b)=>getOwned(b)*b.price - getOwned(a)*a.price).slice(0,50);
    return `<div><span class="eyebrow">YOUR PURCHASES</span><h2 class="modal-title">The damage report</h2><p class="modal-subtitle">Saved only in this browser. Reset the run to clear it.</p>${bought.length ? bought.map(p=>`<div class="receipt-row"><span>${escapeHtml(p.name)} × ${getOwned(p).toLocaleString()}</span><strong>${format(getSpentOnProduct(p))}</strong></div>`).join('') : '<p class="modal-subtitle">Nothing bought yet.</p>'}</div>`;
  }

  function aboutHtml() {
    return `<div><span class="eyebrow">HOW IT WORKS</span><h2 class="modal-title">Spend a fortune. Try not to go broke.</h2><p class="modal-subtitle">Choose a starting fortune, browse the catalog, and buy anything you can afford. Every purchase is calculated locally in your browser. USD is the internal game currency; the display can be switched to INR, EUR or GBP.</p><div class="report-grid"><div class="report-card"><span>Catalog</span><strong>${products.length}+ items</strong></div><div class="report-card"><span>Achievements</span><strong>${achievements.length}</strong></div><div class="report-card"><span>Save</span><strong>Browser only</strong></div><div class="report-card"><span>Images</span><strong>Verified real photos</strong></div></div><p class="modal-subtitle" style="margin-top:18px">Real-person fortunes are snapshots from published wealth lists, not live ownership statements. Prices are game estimates, and the experience is entertainment—not financial advice.</p></div>`;
  }

  function challenge() {
    const c = challenges[state.challenge % challenges.length];
    let success = false;
    if (c.type==='noCategory') success = state.spent >= c.target && categorySpent(c.category) === 0;
    if (c.type==='categories') success = categories.filter(x=>x[0] !== 'All').filter(x=>categoryOwned(x[0])).length >= c.target;
    if (c.type==='compare') success = categorySpent(c.a) > categorySpent(c.b) && categorySpent(c.a) > 0;
    if (c.type==='single') success = products.some(p=>getOwned(p)>0 && p.price>=c.target);
    if (c.type==='leftPct') success = state.starting > 0 && state.balance/state.starting <= c.target;
    openModal(`<div><span class="eyebrow">CHALLENGE ${((state.challenge%challenges.length)+1)}/${challenges.length}</span><h2 class="modal-title">${success?'Challenge cleared':'Current challenge'}</h2><p class="modal-subtitle">${escapeHtml(c.text)}</p><div class="report-card"><span>Status</span><strong>${success?'Complete':'Keep spending'}</strong></div><button class="primary-button" style="margin-top:18px" onclick="document.getElementById('modal').close()">Back to the shop</button></div>`);
    if (success) { state.challenge++; updateChallengeCopy(); }
  }

  // Events
  els.aboutBtn?.addEventListener('click', () => openModal(aboutHtml()));
  $('#aboutBtnSecondary')?.addEventListener('click', () => openModal(aboutHtml()));
  $('#currencySelect')?.addEventListener('change', e => setCurrency(e.target.value));
  els.modalClose.addEventListener('click', closeModal);
  els.themeBtn?.addEventListener('click', cycleTheme);
  els.undoBtn?.addEventListener('click', undoLastPurchase);
  els.favoritesBtn?.addEventListener('click', () => { state.favoritesOnly=!state.favoritesOnly; renderCategories(); renderProducts(); });
  els.affordableOnly?.addEventListener('change', e => { state.affordableOnly=e.target.checked; renderProducts(); });
  els.ownedOnly?.addEventListener('change', e => { state.ownedOnly=e.target.checked; renderProducts(); });
  els.modal.addEventListener('click', e => { if (e.target === els.modal) closeModal(); });
  $('#homeBtn').addEventListener('click', () => { if (confirm('Go back? Your run is saved locally.')) showScreen('landing'); });
  $('#resetBtn').addEventListener('click', resetGame);
  $('#reportBtn').addEventListener('click', () => openModal(reportHtml()));
  $('#historyBtn').addEventListener('click', () => openModal(historyHtml()));
  $('#buyEverythingBtn').addEventListener('click', () => {
    const target = filteredProducts().filter(p=>p.price>0);
    const totalCost = target.reduce((s,p)=>s + p.price, 0);
    if (totalCost <= state.balance) {
      target.forEach(p=>buy(p,1));
      showToast(`Bought one of all ${target.length} visible items.`);
    } else {
      const confirmMsg = `One of every visible item costs ${format(totalCost)}. You have ${format(state.balance)}. Buy as much as possible?`;
      if (!confirm(confirmMsg)) return;
      const ordered = [...target].sort((a,b)=>a.price-b.price);
      for (const p of ordered) {
        if (state.balance < p.price) continue;
        buy(p, 1);
      }
      const cheapest = ordered[0];
      if (cheapest && state.balance >= cheapest.price) buy(cheapest, Math.floor(state.balance / cheapest.price));
    }
    renderProducts();
  });
  $('#challengeBtn').addEventListener('click', challenge);
  els.luckyBtn?.addEventListener('click', luckyBuy);
  els.randomizeSpotlight?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); renderSpotlight(); });
  els.searchInput.addEventListener('input', e => { state.search = e.target.value; renderProducts(); });
  els.sortSelect.addEventListener('change', e => { state.sort=e.target.value; renderProducts(); });
  els.soundBtn.addEventListener('click', () => { state.sound=!state.sound; els.soundBtn.textContent=state.sound?'Sound':'Muted'; save(); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); els.searchInput.focus(); }
    if (e.key==='Escape' && els.modal.open) closeModal();
  });

  load();
  applyTheme(state.theme || 'violet');
  buildFortunes();
  setInterval(updateTicker, 4500);
  if (state.fortune && state.starting > 0) { showScreen('store'); renderAll(); }
})();
