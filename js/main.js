/* ============================================================
   ChildsFood.com — Main JavaScript
   Interactive Map | Recommendation Engine | Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initWorldMap();
  initPreferenceEngine();
  initBudgetTabs();
  initSmoothScroll();
});

/* ---- Header Scroll Effect ---- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal Animations ---- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---- Animated Counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

/* ---- Interactive World Map ---- */
function initWorldMap() {
  const mapContainer = document.querySelector('.world-map-container');
  if (!mapContainer) return;

  const regions = mapContainer.querySelectorAll('.map-region');
  const tooltip = document.querySelector('.map-tooltip');
  const regionButtons = document.querySelectorAll('.region-btn');

  // Region data with dishes
  const regionData = getRegionData();

  regions.forEach(region => {
    region.addEventListener('click', (e) => {
      const regionId = region.getAttribute('data-region');
      showRegionInfo(regionId, e, tooltip, regionData);

      regions.forEach(r => r.classList.remove('active'));
      region.classList.add('active');

      regionButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-region') === regionId);
      });
    });

    region.addEventListener('mouseenter', (e) => {
      const regionId = region.getAttribute('data-region');
      showRegionInfo(regionId, e, tooltip, regionData);
    });

    region.addEventListener('mouseleave', () => {
      if (!region.classList.contains('active')) {
        tooltip.classList.remove('visible');
      }
    });
  });

  regionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const regionId = btn.getAttribute('data-region');
      const targetRegion = mapContainer.querySelector(`[data-region="${regionId}"]`);

      regionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      regions.forEach(r => r.classList.remove('active'));
      if (targetRegion) {
        targetRegion.classList.add('active');
        const rect = targetRegion.getBoundingClientRect();
        showRegionInfo(regionId, { clientX: rect.x + rect.width/2, clientY: rect.y + rect.height/2 }, tooltip, regionData);
      }
    });
  });

  // Close tooltip on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.world-map-container') && !e.target.closest('.region-btn')) {
      tooltip.classList.remove('visible');
      regions.forEach(r => r.classList.remove('active'));
      regionButtons.forEach(b => b.classList.remove('active'));
    }
  });
}

function getRegionData() {
  const lang = document.documentElement.lang || 'en';

  const data = {
    en: {
      africa: { name: 'Africa', flag: '\uD83C\uDF0D', dishes: ['Jollof Rice (West Africa)', 'Injera & Wat (Ethiopia)', 'Bobotie (South Africa)', 'Tagine (Morocco)'] },
      asia: { name: 'Asia', flag: '\uD83C\uDF0F', dishes: ['Miso Soup & Rice (Japan)', 'Veggie Dumplings (China)', 'Dal & Roti (India)', 'Pad Thai (Thailand)'] },
      europe: { name: 'Europe', flag: '\uD83C\uDF0D', dishes: ['Pasta Primavera (Italy)', 'Croque Monsieur (France)', 'Swedish Meatballs', 'Greek Salad Wrap'] },
      namerica: { name: 'North America', flag: '\uD83C\uDF0E', dishes: ['Rainbow Tacos (Mexico)', 'Maple Salmon Bowl (Canada)', 'Mac & Cheese Veggie', 'Black Bean Burritos'] },
      samerica: { name: 'South America', flag: '\uD83C\uDF0E', dishes: ['Arepas (Venezuela)', 'Acai Bowl (Brazil)', 'Empanadas (Argentina)', 'Ceviche (Peru)'] },
      middleeast: { name: 'Middle East', flag: '\uD83C\uDF0D', dishes: ['Hummus & Pita Plate', 'Falafel Wraps', 'Chicken Shawarma Bowl', 'Fattoush Salad'] },
      oceania: { name: 'Oceania', flag: '\uD83C\uDF0F', dishes: ['Veggie Meat Pie (Australia)', 'Pavlova (New Zealand)', 'Poke Bowl (Hawaii)', 'Coconut Fish Curry'] },
      caribbean: { name: 'Caribbean', flag: '\uD83C\uDF34', dishes: ['Rice & Peas (Jamaica)', 'Plantain Cups', 'Mango Salsa Tacos', 'Callaloo Soup'] }
    },
    es: {
      africa: { name: '\u00C1frica', flag: '\uD83C\uDF0D', dishes: ['Arroz Jollof (Oeste de \u00C1frica)', 'Injera y Wat (Etiop\u00EDa)', 'Bobotie (Sud\u00E1frica)', 'Taj\u00EDn (Marruecos)'] },
      asia: { name: 'Asia', flag: '\uD83C\uDF0F', dishes: ['Sopa Miso con Arroz (Jap\u00F3n)', 'Dumplings de Verduras (China)', 'Dal con Roti (India)', 'Pad Thai (Tailandia)'] },
      europe: { name: 'Europa', flag: '\uD83C\uDF0D', dishes: ['Pasta Primavera (Italia)', 'Croque Monsieur (Francia)', 'Alb\u00F3ndigas Suecas', 'Wrap de Ensalada Griega'] },
      namerica: { name: 'Am\u00E9rica del Norte', flag: '\uD83C\uDF0E', dishes: ['Tacos Arco\u00EDris (M\u00E9xico)', 'Bowl de Salm\u00F3n con Maple (Canad\u00E1)', 'Mac & Cheese con Verduras', 'Burritos de Frijoles'] },
      samerica: { name: 'Am\u00E9rica del Sur', flag: '\uD83C\uDF0E', dishes: ['Arepas (Venezuela)', 'A\u00E7a\u00ED Bowl (Brasil)', 'Empanadas (Argentina)', 'Ceviche (Per\u00FA)'] },
      middleeast: { name: 'Medio Oriente', flag: '\uD83C\uDF0D', dishes: ['Plato de Hummus y Pita', 'Wraps de Falafel', 'Bowl de Shawarma de Pollo', 'Ensalada Fattoush'] },
      oceania: { name: 'Ocean\u00EDa', flag: '\uD83C\uDF0F', dishes: ['Pastel de Verduras (Australia)', 'Pavlova (Nueva Zelanda)', 'Poke Bowl (Haw\u00E1i)', 'Curry de Pescado con Coco'] },
      caribbean: { name: 'Caribe', flag: '\uD83C\uDF34', dishes: ['Arroz con Guandules (Jamaica)', 'Copitas de Pl\u00E1tano', 'Tacos de Salsa de Mango', 'Sopa de Callaloo'] }
    },
    fr: {
      africa: { name: 'Afrique', flag: '\uD83C\uDF0D', dishes: ['Riz Jollof (Afrique de l\'Ouest)', 'Injera et Wat (\u00C9thiopie)', 'Bobotie (Afrique du Sud)', 'Tajine (Maroc)'] },
      asia: { name: 'Asie', flag: '\uD83C\uDF0F', dishes: ['Soupe Miso et Riz (Japon)', 'Raviolis aux L\u00E9gumes (Chine)', 'Dal et Roti (Inde)', 'Pad Tha\u00EF (Tha\u00EFlande)'] },
      europe: { name: 'Europe', flag: '\uD83C\uDF0D', dishes: ['P\u00E2tes Primavera (Italie)', 'Croque Monsieur (France)', 'Boulettes Su\u00E9doises', 'Wrap Salade Grecque'] },
      namerica: { name: 'Am\u00E9rique du Nord', flag: '\uD83C\uDF0E', dishes: ['Tacos Arc-en-ciel (Mexique)', 'Bol de Saumon \u00C9rable (Canada)', 'Mac & Cheese aux L\u00E9gumes', 'Burritos aux Haricots'] },
      samerica: { name: 'Am\u00E9rique du Sud', flag: '\uD83C\uDF0E', dishes: ['Arepas (Venezuela)', 'Bol d\'A\u00E7a\u00ED (Br\u00E9sil)', 'Empanadas (Argentine)', 'Ceviche (P\u00E9rou)'] },
      middleeast: { name: 'Moyen-Orient', flag: '\uD83C\uDF0D', dishes: ['Assiette Houmous et Pita', 'Wraps de Falafels', 'Bol de Shawarma au Poulet', 'Salade Fattouch'] },
      oceania: { name: 'Oc\u00E9anie', flag: '\uD83C\uDF0F', dishes: ['Tourte aux L\u00E9gumes (Australie)', 'Pavlova (Nouvelle-Z\u00E9lande)', 'Poke Bowl (Hawa\u00EF)', 'Curry de Poisson au Coco'] },
      caribbean: { name: 'Cara\u00EFbes', flag: '\uD83C\uDF34', dishes: ['Riz et Pois (Jama\u00EFque)', 'Coupes de Plantain', 'Tacos Salsa Mangue', 'Soupe de Callaloo'] }
    }
  };

  return data[lang] || data['en'];
}

function showRegionInfo(regionId, event, tooltip, regionData) {
  const data = regionData[regionId];
  if (!data || !tooltip) return;

  tooltip.innerHTML = `
    <h4>${data.flag} ${data.name}</h4>
    <div class="map-tooltip-dishes">
      ${data.dishes.map(d => `<div class="tooltip-dish">${d}</div>`).join('')}
    </div>
  `;

  // Position tooltip
  const container = tooltip.parentElement;
  const rect = container.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // Keep tooltip in bounds
  const tooltipW = 300;
  if (x + tooltipW > rect.width) x = rect.width - tooltipW - 10;
  if (x < 10) x = 10;
  if (y + 200 > rect.height) y -= 200;

  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  tooltip.classList.add('visible');
}

/* ---- Preference / Recommendation Engine ---- */
function initPreferenceEngine() {
  const form = document.getElementById('pref-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateMealPlan();
  });
}

function generateMealPlan() {
  const lang = document.documentElement.lang || 'en';
  const age = document.getElementById('pref-age').value;
  const diet = document.getElementById('pref-diet').value;
  const budget = document.getElementById('pref-budget').value;
  const time = document.getElementById('pref-time').value;

  const results = document.getElementById('pref-results');
  if (!results) return;

  const meals = getMealSuggestions(lang, age, diet, budget, time);

  const labels = {
    en: { title: 'Your Personalized Meal Plan', meal: 'Meal', snack: 'Snack', adventure: 'Food Adventure', time: 'min', cost: 'Budget' },
    es: { title: 'Tu Plan de Comidas Personalizado', meal: 'Comida', snack: 'Merienda', adventure: 'Aventura Culinaria', time: 'min', cost: 'Presupuesto' },
    fr: { title: 'Votre Plan Repas Personnalis\u00E9', meal: 'Repas', snack: 'Go\u00FBter', adventure: 'Aventure Culinaire', time: 'min', cost: 'Budget' }
  };
  const l = labels[lang] || labels['en'];

  let html = `<h3 class="text-h3" style="color:var(--color-accent);margin-bottom:var(--space-lg);">${l.title}</h3>`;

  meals.forEach(meal => {
    html += `
      <div class="meal-result-card">
        <h4>${meal.emoji} ${meal.name}</h4>
        <p>${meal.desc}</p>
        <div class="meal-meta">
          <span class="meal-meta-item">\u23F1 ${meal.time} ${l.time}</span>
          <span class="meal-meta-item">\uD83D\uDCB0 ${meal.cost}</span>
          <span class="meal-meta-item">\u2B50 ${meal.type}</span>
        </div>
      </div>
    `;
  });

  results.innerHTML = html;
  results.classList.add('active');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getMealSuggestions(lang, age, diet, budget, time) {
  const allMeals = {
    en: [
      { name: 'Rainbow Veggie Stir-Fry', desc: 'Colorful bell peppers, broccoli, and tofu tossed in a sweet ginger sauce over brown rice.', emoji: '\uD83C\uDF08', time: 25, cost: '$', type: 'Dinner', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Mini Mexican Bean Tacos', desc: 'Soft corn tortillas loaded with seasoned black beans, avocado, and fresh salsa.', emoji: '\uD83C\uDF2E', time: 20, cost: '$', type: 'Lunch', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Banana Oat Pancakes', desc: 'Fluffy pancakes made with mashed bananas and oats, naturally sweetened.', emoji: '\uD83E\uDD5E', time: 15, cost: '$', type: 'Breakfast', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Mediterranean Hummus Bowl', desc: 'Creamy hummus, cucumber, cherry tomatoes, olives, and whole wheat pita.', emoji: '\uD83E\uDD66', time: 10, cost: '$', type: 'Snack', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Japanese Miso Noodle Soup', desc: 'Gentle miso broth with udon noodles, soft tofu, and steamed vegetables.', emoji: '\uD83C\uDF5C', time: 20, cost: '$', type: 'Dinner', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Tropical Fruit & Yogurt Parfait', desc: 'Layers of mango, pineapple, and coconut with creamy Greek yogurt.', emoji: '\uD83C\uDF53', time: 10, cost: '$', type: 'Snack', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'West African Peanut Stew', desc: 'A warming stew with sweet potato, tomato, and creamy peanut butter.', emoji: '\uD83C\uDF72', time: 35, cost: '$', type: 'Food Adventure', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Build-Your-Own Pita Pizza', desc: 'Whole wheat pita with marinara, mozzarella, and veggies of choice.', emoji: '\uD83C\uDF55', time: 15, cost: '$', type: 'Lunch', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Grilled Chicken & Mango Bowl', desc: 'Juicy grilled chicken with tropical mango salsa, rice, and black beans.', emoji: '\uD83C\uDF57', time: 30, cost: '$$', type: 'Dinner', diet: ['any'], age: ['child','preteen','teen'] },
      { name: 'Indian Lentil Dal with Rice', desc: 'Creamy spiced lentils served with fluffy basmati rice and fresh cilantro.', emoji: '\uD83C\uDF5B', time: 30, cost: '$', type: 'Food Adventure', diet: ['any','vegetarian','vegan','halal','kosher'], age: ['child','preteen','teen'] }
    ],
    es: [
      { name: 'Salteado Arco\u00EDris de Verduras', desc: 'Coloridos pimientos, br\u00F3coli y tofu en salsa de jengibre dulce sobre arroz integral.', emoji: '\uD83C\uDF08', time: 25, cost: '$', type: 'Cena', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Mini Tacos Mexicanos de Frijoles', desc: 'Tortillas de ma\u00EDz suaves con frijoles negros sazonados, aguacate y salsa fresca.', emoji: '\uD83C\uDF2E', time: 20, cost: '$', type: 'Almuerzo', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Panqueques de Banana y Avena', desc: 'Panqueques esponjosos hechos con pl\u00E1tanos y avena, naturalmente dulces.', emoji: '\uD83E\uDD5E', time: 15, cost: '$', type: 'Desayuno', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Bowl Mediterr\u00E1neo de Hummus', desc: 'Hummus cremoso, pepino, tomates cherry, aceitunas y pan pita integral.', emoji: '\uD83E\uDD66', time: 10, cost: '$', type: 'Merienda', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Sopa Japonesa de Miso con Fideos', desc: 'Caldo suave de miso con fideos udon, tofu blando y verduras al vapor.', emoji: '\uD83C\uDF5C', time: 20, cost: '$', type: 'Cena', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Parfait Tropical de Frutas y Yogur', desc: 'Capas de mango, pi\u00F1a y coco con yogur griego cremoso.', emoji: '\uD83C\uDF53', time: 10, cost: '$', type: 'Merienda', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Estofado Africano de Man\u00ED', desc: 'Un guiso reconfortante con batata, tomate y mantequilla de man\u00ED cremosa.', emoji: '\uD83C\uDF72', time: 35, cost: '$', type: 'Aventura Culinaria', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Pizza Pita Para Armar', desc: 'Pita integral con salsa marinara, mozzarella y verduras a elecci\u00F3n.', emoji: '\uD83C\uDF55', time: 15, cost: '$', type: 'Almuerzo', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Bowl de Pollo a la Parrilla con Mango', desc: 'Pollo jugoso a la parrilla con salsa tropical de mango, arroz y frijoles negros.', emoji: '\uD83C\uDF57', time: 30, cost: '$$', type: 'Cena', diet: ['any'], age: ['child','preteen','teen'] },
      { name: 'Dal de Lentejas Indio con Arroz', desc: 'Lentejas cremosas y especiadas servidas con arroz basmati y cilantro fresco.', emoji: '\uD83C\uDF5B', time: 30, cost: '$', type: 'Aventura Culinaria', diet: ['any','vegetarian','vegan','halal','kosher'], age: ['child','preteen','teen'] }
    ],
    fr: [
      { name: 'Saut\u00E9 Arc-en-ciel de L\u00E9gumes', desc: 'Poivrons color\u00E9s, brocoli et tofu dans une sauce gingembre sur riz complet.', emoji: '\uD83C\uDF08', time: 25, cost: '\u20AC', type: 'D\u00EEner', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Mini Tacos Mexicains aux Haricots', desc: 'Tortillas de ma\u00EFs garnies de haricots noirs assaisonn\u00E9s, avocat et salsa.', emoji: '\uD83C\uDF2E', time: 20, cost: '\u20AC', type: 'D\u00E9jeuner', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Pancakes Banane et Flocons d\'Avoine', desc: 'Pancakes moelleux \u00E0 la banane et aux flocons d\'avoine, naturellement sucr\u00E9s.', emoji: '\uD83E\uDD5E', time: 15, cost: '\u20AC', type: 'Petit-d\u00E9jeuner', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Bol M\u00E9diterran\u00E9en au Houmous', desc: 'Houmous onctueux, concombre, tomates cerises, olives et pain pita complet.', emoji: '\uD83E\uDD66', time: 10, cost: '\u20AC', type: 'Go\u00FBter', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Soupe Japonaise Miso aux Nouilles', desc: 'Bouillon miso doux avec nouilles udon, tofu soyeux et l\u00E9gumes vapeur.', emoji: '\uD83C\uDF5C', time: 20, cost: '\u20AC', type: 'D\u00EEner', diet: ['any','vegetarian','vegan'], age: ['toddler','child','preteen','teen'] },
      { name: 'Parfait Tropical Fruits et Yaourt', desc: 'Couches de mangue, ananas et noix de coco avec yaourt grec onctueux.', emoji: '\uD83C\uDF53', time: 10, cost: '\u20AC', type: 'Go\u00FBter', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Rago\u00FBt Africain aux Arachides', desc: 'Un rago\u00FBt r\u00E9confortant \u00E0 la patate douce, tomate et beurre de cacahu\u00E8te.', emoji: '\uD83C\uDF72', time: 35, cost: '\u20AC', type: 'Aventure Culinaire', diet: ['any','vegetarian','vegan'], age: ['child','preteen','teen'] },
      { name: 'Pizza Pita \u00E0 Composer', desc: 'Pain pita complet avec sauce tomate, mozzarella et l\u00E9gumes au choix.', emoji: '\uD83C\uDF55', time: 15, cost: '\u20AC', type: 'D\u00E9jeuner', diet: ['any','vegetarian'], age: ['toddler','child','preteen','teen'] },
      { name: 'Bol de Poulet Grill\u00E9 et Mangue', desc: 'Poulet grill\u00E9 juteux avec salsa tropicale \u00E0 la mangue, riz et haricots noirs.', emoji: '\uD83C\uDF57', time: 30, cost: '\u20AC\u20AC', type: 'D\u00EEner', diet: ['any'], age: ['child','preteen','teen'] },
      { name: 'Dal Indien de Lentilles au Riz', desc: 'Lentilles cr\u00E9meuses \u00E9pic\u00E9es servies avec riz basmati et coriandre fra\u00EEche.', emoji: '\uD83C\uDF5B', time: 30, cost: '\u20AC', type: 'Aventure Culinaire', diet: ['any','vegetarian','vegan','halal','kosher'], age: ['child','preteen','teen'] }
    ]
  };

  const meals = allMeals[lang] || allMeals['en'];

  // Filter based on preferences
  let filtered = meals.filter(m => {
    const dietMatch = !diet || diet === 'any' || m.diet.includes(diet);
    const ageMatch = !age || m.age.includes(age);
    return dietMatch && ageMatch;
  });

  // Sort by time if time preference set
  if (time === 'quick') {
    filtered.sort((a, b) => a.time - b.time);
  }

  // Return top 5
  return filtered.slice(0, 5);
}

/* ---- Budget Tabs ---- */
function initBudgetTabs() {
  const tabs = document.querySelectorAll('.budget-tab');
  const panels = document.querySelectorAll('.budget-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-budget');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(panel => {
        panel.style.display = panel.getAttribute('data-budget') === target ? 'block' : 'none';
      });
    });
  });
}

/* ---- Smooth Scroll for Anchor Links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}
