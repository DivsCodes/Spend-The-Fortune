(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const currency = 'USD';
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
  const compactMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 });

  const categories = [
    ['All', 'Everything'], ['Cars', 'Cars & hypercars'], ['Bikes', 'Motorcycles'], ['Jets', 'Private aviation'], ['Yachts', 'Yachts & boats'],
    ['Real Estate', 'Property'], ['Islands', 'Private islands'], ['Hotels', 'Hospitality'], ['Business', 'Businesses'], ['Sports', 'Sports & teams'],
    ['Tech', 'Technology'], ['Watches', 'Watches & jewelry'], ['Luxury', 'Luxury'], ['Travel', 'Travel'], ['Food', 'Food & absurd dining'],
    ['Staff', 'Staff & services'], ['Charity', 'Charity'], ['Space', 'Space'], ['Ridiculous', 'Absolutely unnecessary']
  ];

  const fortunes = [
    { id:'musk', name:'Elon Musk', amount:500_000_000_000, note:'Illustrative tech-titan fortune' },
    { id:'gates', name:'Bill Gates', amount:200_000_000_000, note:'Illustrative software-pioneer fortune' },
    { id:'tycoon', name:'Indian Tycoon', amount:75_000_000_000, note:'Illustrative industrial fortune' },
    { id:'athlete', name:'Global Sports Icon', amount:3_500_000_000, note:'Illustrative superstar fortune' },
    { id:'mega', name:'Mega Billionaire', amount:1_000_000_000_000, note:'The one-trillion mode' },
    { id:'million', name:'The Millionaire', amount:10_000_000, note:'Try doing damage with $10M' },
    { id:'custom', name:'Custom Fortune', amount:null, note:'Enter any amount you like' },
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
    selectedCategory:'All', search:'', sort:'featured', sound:true, challenge:0, unlocked:new Set(), sessionStarted:null
  };

  const els = {
    landing:$('#landing'), store:$('#store'), fortuneGrid:$('#fortuneGrid'), balance:$('#balance'), spent:$('#spent'), itemsOwned:$('#itemsOwned'), progressFill:$('#progressFill'), progressLeft:$('#progressLeft'), progressRight:$('#progressRight'),
    largestPurchase:$('#largestPurchase'), averagePurchase:$('#averagePurchase'), categoriesOwned:$('#categoriesOwned'), achievementCount:$('#achievementCount'), categoryList:$('#categoryList'), searchInput:$('#searchInput'), sortSelect:$('#sortSelect'), catalogEyebrow:$('#catalogEyebrow'), catalogTitle:$('#catalogTitle'), resultCount:$('#resultCount'), productGrid:$('#productGrid'), emptyState:$('#emptyState'), modal:$('#modal'), modalClose:$('#modalClose'), modalContent:$('#modalContent'), toast:$('#toast'), confetti:$('#confetti'), challengeText:$('#challengeText'), soundBtn:$('#soundBtn')
  };

  function compact(v) {
    return v === 0 ? '$0' : compactMoney.format(v);
  }
  function format(v) { return money.format(Math.max(0, Math.round(v))); }
  function pct(v) { return `${(v * 100).toFixed(v * 100 < 10 ? 2 : 1)}%`; }
  function escapeHtml(str) { return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function monogram(name) { return name.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase(); }

  function save() {
    if (!state.fortune) return;
    localStorage.setItem('spend-fortune-v1', JSON.stringify({ ...state, unlocked:[...state.unlocked] }));
  }
  function load() {
    try {
      const raw = localStorage.getItem('spend-fortune-v1');
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.assign(state, data);
      state.unlocked = new Set(data.unlocked || []);
    } catch(e) {}
  }

  function showScreen(name) {
    state.screen = name;
    els.landing.classList.toggle('active', name === 'landing');
    els.store.classList.toggle('active', name === 'store');
    window.scrollTo({top:0, behavior:'instant'});
  }

  function buildFortunes() {
    els.fortuneGrid.innerHTML = '';
    fortunes.forEach(f => {
      const button = document.createElement('button');
      button.className = `fortune-card ${f.id === 'custom' ? 'custom-card' : ''}`;
      button.innerHTML = `<span class="fortune-name">${escapeHtml(f.name)}</span><span class="fortune-meta"><span class="fortune-amount">${f.amount === null ? 'Custom' : format(f.amount)}</span><span class="fortune-note">${escapeHtml(f.note)}</span></span>`;
      button.addEventListener('click', () => {
        if (f.id === 'custom') {
          const raw = prompt('Enter your starting fortune in USD. Example: 2500000000');
          if (raw === null) return;
          const val = Number(raw.replace(/[^0-9.]/g,''));
          if (!Number.isFinite(val) || val <= 0) return showToast('Enter a valid positive number.');
          startFortune({ ...f, amount: Math.floor(val), name:'Custom Fortune' });
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
    showScreen('store');
    renderAll();
    playTick();
    showToast(`${f.name} mode started.`);
    save();
  }

  function resetGame() {
    if (!state.fortune) { showScreen('landing'); return; }
    if (!confirm('Reset this fortune and delete your current purchases?')) return;
    localStorage.removeItem('spend-fortune-v1');
    showScreen('landing');
    showToast('Run reset.');
  }

  function getOwned(p) { return state.purchases[p.id]?.qty || 0; }
  function getSpentOnProduct(p) { return getOwned(p) * p.price; }
  function categorySpent(category) { return products.filter(p=>p.category===category).reduce((s,p)=>s + getSpentOnProduct(p), 0); }
  function categoryOwned(category) { return products.some(p=>p.category===category && getOwned(p)>0); }

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
    playBuy();
    checkAchievements();
    save();
    updateStatsOnly();
    showToast(`Bought ${qty.toLocaleString()} × ${p.name} for ${format(cost)}.`);
  }

  function renderCategories() {
    els.categoryList.innerHTML = '';
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
      return categoryMatch && queryMatch;
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
    list.forEach(p => {
      const card = $('#productTemplate').content.firstElementChild.cloneNode(true);
      $('.product-monogram', card).textContent = monogram(p.name);
      $('.product-tag', card).textContent = p.category;
      $('.product-category', card).textContent = p.category;
      $('.product-name', card).textContent = p.name;
      $('.product-description', card).textContent = p.description;
      $('.product-price', card).textContent = format(p.price);
      const owned = getOwned(p);
      $('.owned-count', card).textContent = owned ? `${owned.toLocaleString()} owned` : 'Not owned yet';
      const input = $('.qty-input', card);
      const minus = $('.qty-minus', card);
      const plus = $('.qty-plus', card);
      const buyBtn = $('.buy-button', card);
      const maxBtn = $('.max-button', card);
      input.addEventListener('input', () => { input.value = Math.max(1, Math.floor(Number(input.value)||1)); });
      minus.addEventListener('click', () => input.value = Math.max(1, Number(input.value)-1));
      plus.addEventListener('click', () => input.value = Math.min(999999, Number(input.value)+1));
      maxBtn.addEventListener('click', () => { input.value = Math.max(1, Math.floor(state.balance / p.price)); });
      buyBtn.addEventListener('click', () => buy(p, input.value));
      frag.appendChild(card);
    });
    els.productGrid.appendChild(frag);
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
    els.averagePurchase.textContent = state.totalItems ? compact(state.spent / state.totalItems) : '$0';
    const cats = categories.filter(c=>c[0] !== 'All').filter(c=>categoryOwned(c[0])).length;
    els.categoriesOwned.textContent = `${cats} / ${categories.length-1}`;
    els.achievementCount.textContent = `${state.unlocked.size} / ${achievements.length}`;
    updateChallengeCopy();
  }

  function updateChallengeCopy() {
    const c = challenges[state.challenge % challenges.length];
    els.challengeText.textContent = c.text;
  }

  function renderAll() { renderCategories(); renderProducts(); updateStatsOnly(); }

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
    return `<div><span class="eyebrow">ABOUT</span><h2 class="modal-title">How it works</h2><p class="modal-subtitle">Pick a fictional starting fortune and spend it on hundreds of items. Everything is calculated in your browser, and your run can be saved locally.</p><div class="report-grid"><div class="report-card"><span>No backend</span><strong>100% static</strong></div><div class="report-card"><span>Persistent runs</span><strong>Local only</strong></div><div class="report-card"><span>Catalog</span><strong>${products.length}+ items</strong></div><div class="report-card"><span>Achievements</span><strong>${achievements.length}</strong></div></div><p class="modal-subtitle" style="margin-top:18px">Prices and fortunes are simplified, illustrative values. This is a game, not financial information.</p></div>`;
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
  els.modalClose.addEventListener('click', closeModal);
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
  els.searchInput.addEventListener('input', e => { state.search = e.target.value; renderProducts(); });
  els.sortSelect.addEventListener('change', e => { state.sort=e.target.value; renderProducts(); });
  els.soundBtn.addEventListener('click', () => { state.sound=!state.sound; els.soundBtn.textContent=state.sound?'Sound':'Muted'; save(); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); els.searchInput.focus(); }
    if (e.key==='Escape' && els.modal.open) closeModal();
  });

  load();
  buildFortunes();
  if (state.fortune && state.starting > 0) { showScreen('store'); renderAll(); }
})();
