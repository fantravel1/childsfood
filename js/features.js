/* ============================================================
   ChildsFood.com — Interactive Features
   Enhanced Recommendation Engine | Meal Planner | Grocery List
   Food Exposure Tracker | Recipe Filtering
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRecipeDatabase();
  initEnhancedRecommendation();
  initMealPlanner();
  initGroceryList();
  initFoodExposureTracker();
  initRecipeFilter();
});

/* ============================================================
   RECIPE DATABASE
   Central store for all recipe data used by features
   ============================================================ */

const RECIPE_DB = [
  { id: 'rainbow-stir-fry', name: 'Rainbow Veggie Stir-Fry', cuisine: 'Asian', region: 'asia', diet: ['vegetarian','vegan'], allergens: ['soy'], time: 25, cost: 5, age: [4,12], meals: ['dinner'], ingredients: ['sesame oil','bell peppers','broccoli','snap peas','carrots','cabbage','soy sauce','honey','ginger','garlic','rice vinegar','rice'], link: '/recipes/rainbow-veggie-stir-fry.html' },
  { id: 'hummus-bowl', name: 'Creamy Hummus Bowl', cuisine: 'Middle Eastern', region: 'middleeast', diet: ['vegetarian','vegan'], allergens: ['sesame'], time: 20, cost: 4, age: [3,12], meals: ['lunch','snack'], ingredients: ['chickpeas','tahini','lemon','garlic','olive oil','carrots','bell pepper','cucumber','cherry tomatoes','pita bread','paprika'], link: '/recipes/creamy-hummus-bowl.html' },
  { id: 'jollof-rice', name: 'Jollof Rice Party', cuisine: 'West African', region: 'africa', diet: ['vegetarian'], allergens: [], time: 50, cost: 5, age: [5,12], meals: ['dinner'], ingredients: ['vegetable oil','onion','garlic','rice','diced tomatoes','bell pepper','mixed vegetables','vegetable broth','tomato paste','paprika','bay leaf','cilantro'], link: '/recipes/jollof-rice-party.html' },
  { id: 'black-bean-quesadilla', name: 'Black Bean Quesadilla', cuisine: 'Mexican', region: 'samerica', diet: ['vegetarian'], allergens: ['dairy','gluten'], time: 20, cost: 3, age: [4,12], meals: ['lunch','dinner'], ingredients: ['black beans','cheddar cheese','bell pepper','cilantro','cumin','garlic powder','tortillas','butter','sour cream','salsa'], link: '/recipes/mexican-black-bean-quesadilla.html' },
  { id: 'thai-coconut-soup', name: 'Thai Coconut Noodle Soup', cuisine: 'Thai', region: 'asia', diet: ['vegetarian','vegan'], allergens: ['fish'], time: 25, cost: 6, age: [5,12], meals: ['dinner'], ingredients: ['vegetable broth','coconut milk','curry paste','fish sauce','lime juice','sugar','rice noodles','mixed vegetables','baby corn','basil','cilantro'], link: '/recipes/thai-coconut-noodle-soup.html' },
  { id: 'mild-dal', name: 'Mild Masala Dal', cuisine: 'Indian', region: 'asia', diet: ['vegetarian','vegan'], allergens: [], time: 30, cost: 2, age: [6,12], meals: ['dinner'], ingredients: ['red lentils','vegetable broth','coconut milk','onion','garlic','ginger','cumin','turmeric','garam masala','coconut oil','cilantro','lime'], link: '/recipes/indian-mild-dal.html' },
  { id: 'pita-pockets', name: 'Mediterranean Pita Pockets', cuisine: 'Mediterranean', region: 'europe', diet: ['vegetarian'], allergens: ['dairy','gluten'], time: 15, cost: 4, age: [4,12], meals: ['lunch'], ingredients: ['pita pockets','salad greens','cucumber','cherry tomatoes','red onion','feta cheese','olives','tzatziki','dill','lemon juice'], link: '/recipes/mediterranean-pita-pockets.html' },
  { id: 'bibimbap', name: 'Korean Bibimbap Bowl', cuisine: 'Korean', region: 'asia', diet: ['vegetarian'], allergens: ['soy','eggs'], time: 25, cost: 6, age: [6,12], meals: ['dinner'], ingredients: ['short-grain rice','eggs','spinach','sesame oil','soy sauce','carrots','zucchini','mushrooms','cucumber','bell pepper','gochujang','sesame seeds'], link: '/recipes/korean-bibimbap-bowl.html' },
  { id: 'rice-beans', name: 'Brazilian Rice & Beans', cuisine: 'Brazilian', region: 'samerica', diet: ['vegetarian','vegan'], allergens: [], time: 30, cost: 2, age: [4,12], meals: ['dinner','lunch'], ingredients: ['white rice','vegetable broth','black beans','onion','garlic','vegetable oil','cumin','bay leaf','cilantro','orange'], link: '/recipes/brazilian-rice-beans-plate.html' },
  { id: 'tagine', name: 'Moroccan Sweet Potato Tagine', cuisine: 'Moroccan', region: 'africa', diet: ['vegetarian','vegan'], allergens: [], time: 40, cost: 4, age: [5,12], meals: ['dinner'], ingredients: ['sweet potatoes','chickpeas','onion','garlic','olive oil','diced tomatoes','vegetable broth','cumin','cinnamon','turmeric','cilantro','couscous'], link: '/recipes/moroccan-sweet-potato-tagine.html' },
  { id: 'pasta-pomodoro', name: 'Italian Pasta al Pomodoro', cuisine: 'Italian', region: 'europe', diet: ['vegetarian','vegan'], allergens: ['gluten'], time: 20, cost: 3, age: [4,12], meals: ['dinner','lunch'], ingredients: ['spaghetti','olive oil','garlic','crushed tomatoes','oregano','basil','parmesan'], link: '/recipes/italian-pasta-pomodoro.html' },
  { id: 'okonomiyaki', name: 'Japanese Okonomiyaki', cuisine: 'Japanese', region: 'asia', diet: [], allergens: ['gluten','eggs'], time: 25, cost: 6, age: [5,12], meals: ['dinner','lunch'], ingredients: ['flour','water','eggs','cabbage','green onions','vegetable oil','okonomiyaki sauce','mayo','aonori'], link: '/recipes/japanese-okonomiyaki.html' },
  { id: 'spanakopita', name: 'Greek Spanakopita', cuisine: 'Greek', region: 'europe', diet: ['vegetarian'], allergens: ['dairy','gluten','eggs'], time: 30, cost: 5, age: [6,12], meals: ['dinner','lunch'], ingredients: ['phyllo dough','butter','spinach','feta cheese','egg','onion','nutmeg'], link: '/recipes/greek-spanakopita.html' },
  { id: 'summer-rolls', name: 'Vietnamese Summer Rolls', cuisine: 'Vietnamese', region: 'asia', diet: ['vegetarian','vegan'], allergens: ['peanuts'], time: 20, cost: 5, age: [5,12], meals: ['lunch','snack'], ingredients: ['rice paper','lettuce','carrots','cucumber','vermicelli noodles','mint','cilantro','peanut butter','honey','soy sauce'], link: '/recipes/vietnamese-summer-rolls.html' },
  { id: 'tortilla-espanola', name: 'Spanish Tortilla', cuisine: 'Spanish', region: 'europe', diet: ['vegetarian'], allergens: ['eggs'], time: 25, cost: 4, age: [6,12], meals: ['dinner','lunch','breakfast'], ingredients: ['potatoes','onion','eggs','olive oil'], link: '/recipes/spanish-tortilla-espanola.html' },
  { id: 'chilaquiles', name: 'Mexican Chilaquiles', cuisine: 'Mexican', region: 'samerica', diet: ['vegetarian'], allergens: ['dairy'], time: 20, cost: 5, age: [4,12], meals: ['breakfast','lunch'], ingredients: ['tortilla chips','red salsa','diced tomatoes','onion','shredded cheese','vegetable oil','cilantro','sour cream'], link: '/recipes/mexican-chilaquiles.html' },
  { id: 'kofta', name: 'Turkish Kofta', cuisine: 'Turkish', region: 'middleeast', diet: [], allergens: ['gluten','eggs','dairy'], time: 25, cost: 5, age: [6,12], meals: ['dinner'], ingredients: ['ground lamb','breadcrumbs','egg','garlic','cumin','cinnamon','parsley','oil','yogurt'], link: '/recipes/turkish-kofta.html' },
  { id: 'fattoush', name: 'Lebanese Fattoush', cuisine: 'Lebanese', region: 'middleeast', diet: ['vegetarian','vegan'], allergens: ['gluten'], time: 15, cost: 4, age: [4,12], meals: ['lunch','snack'], ingredients: ['pita bread','lettuce','cucumber','tomatoes','radishes','olive oil','lemon juice','sumac','mint'], link: '/recipes/lebanese-fattoush.html' },
  { id: 'koshari', name: 'Egyptian Koshari', cuisine: 'Egyptian', region: 'africa', diet: ['vegetarian','vegan'], allergens: ['gluten'], time: 30, cost: 4, age: [5,12], meals: ['dinner','lunch'], ingredients: ['pasta','rice','lentils','chickpeas','onions','tomato sauce','garlic','cumin','vinegar','chili flakes'], link: '/recipes/egyptian-koshari.html' },
  { id: 'adobo', name: 'Filipino Adobo', cuisine: 'Filipino', region: 'asia', diet: [], allergens: ['soy'], time: 40, cost: 6, age: [6,12], meals: ['dinner'], ingredients: ['chicken thighs','soy sauce','vinegar','garlic','bay leaves','peppercorns','onion','rice'], link: '/recipes/filipino-adobo.html' },
  { id: 'paella', name: 'Spanish Paella', cuisine: 'Spanish', region: 'europe', diet: ['vegetarian'], allergens: [], time: 35, cost: 7, age: [6,12], meals: ['dinner'], ingredients: ['rice','saffron','olive oil','onion','garlic','bell pepper','tomatoes','vegetable broth','peas','lemon'], link: '/recipes/spanish-paella.html' }
];

function initRecipeDatabase() {
  window.recipeDB = RECIPE_DB;
}

/* ============================================================
   ENHANCED RECOMMENDATION ENGINE
   Smarter filters, cuisine preference, links to real recipes
   ============================================================ */

function initEnhancedRecommendation() {
  const section = document.getElementById('smart-recommendations');
  if (!section) return;

  const form = section.querySelector('#rec-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runRecommendation(form, section);
  });
}

function runRecommendation(form, section) {
  const age = parseInt(form.querySelector('[name="rec-age"]').value);
  const diet = form.querySelector('[name="rec-diet"]').value;
  const maxTime = parseInt(form.querySelector('[name="rec-time"]').value);
  const maxCost = parseInt(form.querySelector('[name="rec-cost"]').value);
  const cuisine = form.querySelector('[name="rec-cuisine"]').value;
  const allergens = Array.from(form.querySelectorAll('[name="rec-allergen"]:checked')).map(cb => cb.value);
  const mealType = form.querySelector('[name="rec-meal"]').value;

  let results = RECIPE_DB.filter(r => {
    if (age < r.age[0] || age > r.age[1]) return false;
    if (diet && diet !== 'any' && !r.diet.includes(diet)) return false;
    if (r.time > maxTime) return false;
    if (r.cost > maxCost) return false;
    if (cuisine && cuisine !== 'any' && r.cuisine.toLowerCase() !== cuisine.toLowerCase()) return false;
    if (mealType && mealType !== 'any' && !r.meals.includes(mealType)) return false;
    if (allergens.length > 0) {
      for (const a of allergens) {
        if (r.allergens.includes(a)) return false;
      }
    }
    return true;
  });

  // Shuffle for variety
  results = results.sort(() => Math.random() - 0.5);

  const container = section.querySelector('#rec-results');
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = '<div class="rec-empty"><p>No recipes match your criteria. Try adjusting your filters!</p></div>';
    container.classList.add('active');
    return;
  }

  const shown = results.slice(0, 6);

  container.innerHTML = `
    <h3 style="color:var(--color-secondary);margin-bottom:1.5rem;">We Found ${results.length} Recipes For You!</h3>
    <div class="rec-grid">
      ${shown.map(r => `
        <div class="rec-card">
          <div class="rec-card-header" style="background:${getCuisineColor(r.cuisine)}">
            <span class="rec-cuisine">${r.cuisine}</span>
          </div>
          <div class="rec-card-body">
            <h4>${r.name}</h4>
            <div class="rec-tags">
              <span class="rec-tag">⏱️ ${r.time} min</span>
              <span class="rec-tag">💰 $${r.cost}</span>
              ${r.diet.includes('vegan') ? '<span class="rec-tag">🌱 Vegan</span>' : ''}
              ${r.diet.includes('vegetarian') && !r.diet.includes('vegan') ? '<span class="rec-tag">🌿 Vegetarian</span>' : ''}
            </div>
            <a href="${r.link}" class="rec-link">View Recipe →</a>
          </div>
        </div>
      `).join('')}
    </div>
    ${results.length > 6 ? `<p style="text-align:center;margin-top:1.5rem;color:var(--color-dark-gray);">...and ${results.length - 6} more matches. Adjust filters to narrow down.</p>` : ''}
  `;
  container.classList.add('active');
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getCuisineColor(cuisine) {
  const colors = {
    'Asian': 'linear-gradient(135deg, #E74C3C, #C0392B)',
    'Thai': 'linear-gradient(135deg, #E74C3C, #C0392B)',
    'Japanese': 'linear-gradient(135deg, #FF6B9D, #C44569)',
    'Korean': 'linear-gradient(135deg, #E84393, #B8227E)',
    'Vietnamese': 'linear-gradient(135deg, #FF6B35, #F7931E)',
    'Filipino': 'linear-gradient(135deg, #C0392B, #A93226)',
    'West African': 'linear-gradient(135deg, #E67E22, #D35400)',
    'Moroccan': 'linear-gradient(135deg, #D4A5A5, #A65D6E)',
    'Egyptian': 'linear-gradient(135deg, #F39C12, #D68910)',
    'Mexican': 'linear-gradient(135deg, #27AE60, #229954)',
    'Brazilian': 'linear-gradient(135deg, #27AE60, #1ABC9C)',
    'Indian': 'linear-gradient(135deg, #F39C12, #D68910)',
    'Mediterranean': 'linear-gradient(135deg, #3498DB, #2980B9)',
    'Greek': 'linear-gradient(135deg, #0099FF, #0077CC)',
    'Italian': 'linear-gradient(135deg, #E74C3C, #C0392B)',
    'Spanish': 'linear-gradient(135deg, #FFC837, #FF9500)',
    'Turkish': 'linear-gradient(135deg, #E67E22, #D35400)',
    'Lebanese': 'linear-gradient(135deg, #27AE60, #1ABC9C)',
    'Middle Eastern': 'linear-gradient(135deg, #E67E22, #D35400)'
  };
  return colors[cuisine] || 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';
}

/* ============================================================
   WEEKLY MEAL PLANNER
   Interactive calendar-style planner with localStorage
   ============================================================ */

function initMealPlanner() {
  const planner = document.getElementById('weekly-planner');
  if (!planner) return;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Load saved plan
  let plan = JSON.parse(localStorage.getItem('cf-meal-plan') || '{}');

  renderPlanner(planner, days, mealTypes, plan);

  // Clear plan button
  const clearBtn = planner.querySelector('#clear-plan');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      plan = {};
      localStorage.setItem('cf-meal-plan', JSON.stringify(plan));
      renderPlanner(planner, days, mealTypes, plan);
    });
  }
}

function renderPlanner(container, days, mealTypes, plan) {
  const grid = container.querySelector('#planner-grid');
  if (!grid) return;

  let html = `<div class="planner-header-row">
    <div class="planner-corner"></div>
    ${mealTypes.map(m => `<div class="planner-meal-header">${m}</div>`).join('')}
  </div>`;

  days.forEach(day => {
    html += `<div class="planner-row">
      <div class="planner-day">${day}</div>
      ${mealTypes.map(meal => {
        const key = `${day}-${meal}`;
        const assigned = plan[key];
        return `<div class="planner-cell ${assigned ? 'filled' : ''}" data-key="${key}">
          ${assigned
            ? `<div class="planner-meal-name">${assigned.name}</div>
               <div class="planner-meal-meta">⏱️${assigned.time}m 💰$${assigned.cost}</div>
               <button class="planner-remove" data-key="${key}" title="Remove">&times;</button>`
            : `<button class="planner-add" data-key="${key}" data-meal="${meal.toLowerCase()}" title="Add meal">+</button>`
          }
        </div>`;
      }).join('')}
    </div>`;
  });

  grid.innerHTML = html;

  // Calculate totals
  const entries = Object.values(plan);
  const totalCost = entries.reduce((sum, m) => sum + (m.cost || 0), 0);
  const totalTime = entries.reduce((sum, m) => sum + (m.time || 0), 0);
  const mealsPlanned = entries.length;

  const stats = container.querySelector('#planner-stats');
  if (stats) {
    stats.innerHTML = `
      <div class="stat-item"><span class="stat-value">${mealsPlanned}</span><span class="stat-label">Meals Planned</span></div>
      <div class="stat-item"><span class="stat-value">$${totalCost}</span><span class="stat-label">Est. Total Cost</span></div>
      <div class="stat-item"><span class="stat-value">${totalTime}m</span><span class="stat-label">Total Cook Time</span></div>
    `;
  }

  // Add event listeners
  grid.querySelectorAll('.planner-add').forEach(btn => {
    btn.addEventListener('click', () => showRecipePicker(btn.dataset.key, btn.dataset.meal, plan, container, days, mealTypes));
  });

  grid.querySelectorAll('.planner-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      delete plan[btn.dataset.key];
      localStorage.setItem('cf-meal-plan', JSON.stringify(plan));
      renderPlanner(container, days, mealTypes, plan);
      updateGroceryFromPlan(plan);
    });
  });
}

function showRecipePicker(key, mealType, plan, container, days, mealTypes) {
  const modal = document.createElement('div');
  modal.className = 'picker-overlay';

  const recipes = RECIPE_DB.filter(r => mealType === 'any' || r.meals.includes(mealType));

  modal.innerHTML = `
    <div class="picker-modal">
      <div class="picker-header">
        <h3>Choose a Recipe</h3>
        <button class="picker-close">&times;</button>
      </div>
      <div class="picker-search">
        <input type="text" id="picker-search-input" placeholder="Search recipes..." autocomplete="off">
      </div>
      <div class="picker-list">
        ${recipes.map(r => `
          <div class="picker-item" data-id="${r.id}">
            <div class="picker-item-name">${r.name}</div>
            <div class="picker-item-meta">
              <span>${r.cuisine}</span> | <span>⏱️ ${r.time}m</span> | <span>💰 $${r.cost}</span>
              ${r.diet.includes('vegan') ? ' | <span>🌱</span>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Search filter
  const searchInput = modal.querySelector('#picker-search-input');
  searchInput.focus();
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    modal.querySelectorAll('.picker-item').forEach(item => {
      const name = item.querySelector('.picker-item-name').textContent.toLowerCase();
      const meta = item.querySelector('.picker-item-meta').textContent.toLowerCase();
      item.style.display = (name.includes(query) || meta.includes(query)) ? '' : 'none';
    });
  });

  // Select recipe
  modal.querySelectorAll('.picker-item').forEach(item => {
    item.addEventListener('click', () => {
      const recipe = RECIPE_DB.find(r => r.id === item.dataset.id);
      if (recipe) {
        plan[key] = { name: recipe.name, time: recipe.time, cost: recipe.cost, id: recipe.id };
        localStorage.setItem('cf-meal-plan', JSON.stringify(plan));
        renderPlanner(container, days, mealTypes, plan);
        updateGroceryFromPlan(plan);
      }
      modal.remove();
    });
  });

  // Close
  modal.querySelector('.picker-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

/* ============================================================
   GROCERY LIST GENERATOR
   Auto-generates from meal plan, with quantity aggregation
   ============================================================ */

function initGroceryList() {
  const section = document.getElementById('grocery-list');
  if (!section) return;

  const plan = JSON.parse(localStorage.getItem('cf-meal-plan') || '{}');
  updateGroceryFromPlan(plan);

  const printBtn = section.querySelector('#print-grocery');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const list = section.querySelector('#grocery-items');
      if (list) {
        const win = window.open('', '_blank');
        win.document.write(`<html><head><title>Grocery List - ChildsFood</title><style>body{font-family:sans-serif;padding:2rem;}h1{color:#333;}ul{list-style:none;padding:0;}li{padding:0.5rem 0;border-bottom:1px solid #eee;display:flex;align-items:center;gap:0.5rem;}li:before{content:"☐";font-size:1.2rem;}</style></head><body><h1>ChildsFood Grocery List</h1>${list.innerHTML}</body></html>`);
        win.document.close();
        win.print();
      }
    });
  }
}

function updateGroceryFromPlan(plan) {
  const section = document.getElementById('grocery-list');
  if (!section) return;

  const container = section.querySelector('#grocery-items');
  if (!container) return;

  const entries = Object.values(plan);
  if (entries.length === 0) {
    container.innerHTML = '<p class="grocery-empty">Add meals to your planner to generate a grocery list.</p>';
    return;
  }

  // Aggregate ingredients
  const ingredientMap = {};
  entries.forEach(entry => {
    const recipe = RECIPE_DB.find(r => r.id === entry.id);
    if (recipe) {
      recipe.ingredients.forEach(ing => {
        const normalized = ing.toLowerCase().trim();
        if (ingredientMap[normalized]) {
          ingredientMap[normalized].count++;
        } else {
          ingredientMap[normalized] = { name: ing, count: 1 };
        }
      });
    }
  });

  // Categorize ingredients
  const categories = {
    'Produce': ['bell pepper','broccoli','snap peas','carrots','cabbage','spinach','cucumber','cherry tomatoes','tomatoes','onion','garlic','ginger','cilantro','basil','mint','dill','parsley','green onions','lettuce','salad greens','red onion','zucchini','mushrooms','lemon','lime','potatoes','sweet potatoes','orange'],
    'Protein': ['eggs','chicken thighs','ground lamb','chickpeas','black beans','red lentils','tofu'],
    'Dairy': ['butter','cheddar cheese','feta cheese','sour cream','yogurt','mozzarella','parmesan'],
    'Pantry': ['olive oil','sesame oil','vegetable oil','coconut oil','soy sauce','fish sauce','rice vinegar','cumin','turmeric','garam masala','paprika','cinnamon','oregano','nutmeg','honey','sugar','peanut butter','tahini','tomato paste','curry paste','gochujang','okonomiyaki sauce'],
    'Grains & Bread': ['rice','spaghetti','pasta','rice noodles','vermicelli noodles','flour','tortillas','pita bread','pita pockets','phyllo dough','tortilla chips','breadcrumbs','couscous','rice paper'],
    'Canned': ['diced tomatoes','crushed tomatoes','coconut milk','vegetable broth','red salsa','baby corn']
  };

  const categorized = {};
  const uncategorized = [];

  Object.values(ingredientMap).forEach(item => {
    let placed = false;
    for (const [cat, keywords] of Object.entries(categories)) {
      if (keywords.some(k => item.name.toLowerCase().includes(k))) {
        if (!categorized[cat]) categorized[cat] = [];
        categorized[cat].push(item);
        placed = true;
        break;
      }
    }
    if (!placed) uncategorized.push(item);
  });

  let html = '';
  for (const [cat, items] of Object.entries(categorized)) {
    html += `<div class="grocery-category"><h4>${cat}</h4><ul>`;
    items.forEach(item => {
      html += `<li><input type="checkbox" class="grocery-check"> ${item.name}${item.count > 1 ? ` <span class="grocery-count">(x${item.count} recipes)</span>` : ''}</li>`;
    });
    html += '</ul></div>';
  }
  if (uncategorized.length) {
    html += '<div class="grocery-category"><h4>Other</h4><ul>';
    uncategorized.forEach(item => {
      html += `<li><input type="checkbox" class="grocery-check"> ${item.name}${item.count > 1 ? ` <span class="grocery-count">(x${item.count} recipes)</span>` : ''}</li>`;
    });
    html += '</ul></div>';
  }

  container.innerHTML = html;

  // Checkbox persistence
  container.querySelectorAll('.grocery-check').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.parentElement.classList.toggle('checked', cb.checked);
    });
  });
}

/* ============================================================
   FOOD EXPOSURE TRACKER
   Simple tracker for new foods child has tried
   ============================================================ */

function initFoodExposureTracker() {
  const tracker = document.getElementById('exposure-tracker');
  if (!tracker) return;

  let foods = JSON.parse(localStorage.getItem('cf-exposure-foods') || '[]');

  renderExposureTracker(tracker, foods);

  const addForm = tracker.querySelector('#exposure-add-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = addForm.querySelector('#exposure-food-input');
      const level = addForm.querySelector('#exposure-level').value;
      if (input.value.trim()) {
        foods.push({
          name: input.value.trim(),
          level: parseInt(level),
          date: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('cf-exposure-foods', JSON.stringify(foods));
        input.value = '';
        renderExposureTracker(tracker, foods);
      }
    });
  }
}

function renderExposureTracker(container, foods) {
  const list = container.querySelector('#exposure-list');
  if (!list) return;

  const levelLabels = ['Saw It', 'Smelled It', 'Touched It', 'Tasted It', 'Ate Some', 'Enjoyed It!'];
  const levelColors = ['#E74C3C', '#E67E22', '#F39C12', '#27AE60', '#2ECC71', '#1ABC9C'];

  if (foods.length === 0) {
    list.innerHTML = '<p class="exposure-empty">No foods tracked yet. Add your child\'s first food adventure!</p>';
    return;
  }

  const sorted = [...foods].reverse();
  list.innerHTML = sorted.map((food, i) => `
    <div class="exposure-item">
      <div class="exposure-name">${food.name}</div>
      <div class="exposure-progress">
        ${levelLabels.map((label, lvl) => `
          <div class="exposure-step ${lvl <= food.level ? 'active' : ''}"
               style="${lvl <= food.level ? `background:${levelColors[lvl]}` : ''}"
               title="${label}">
            ${lvl + 1}
          </div>
        `).join('')}
      </div>
      <div class="exposure-label" style="color:${levelColors[food.level]}">${levelLabels[food.level]}</div>
      <div class="exposure-date">${food.date}</div>
      <button class="exposure-remove" data-index="${foods.length - 1 - i}" title="Remove">&times;</button>
    </div>
  `).join('');

  // Remove buttons
  list.querySelectorAll('.exposure-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      foods.splice(parseInt(btn.dataset.index), 1);
      localStorage.setItem('cf-exposure-foods', JSON.stringify(foods));
      renderExposureTracker(container, foods);
    });
  });

  // Stats
  const stats = container.querySelector('#exposure-stats');
  if (stats) {
    const total = foods.length;
    const enjoyed = foods.filter(f => f.level >= 5).length;
    const tasted = foods.filter(f => f.level >= 3).length;
    stats.innerHTML = `
      <div class="stat-item"><span class="stat-value">${total}</span><span class="stat-label">Foods Explored</span></div>
      <div class="stat-item"><span class="stat-value">${tasted}</span><span class="stat-label">Foods Tasted</span></div>
      <div class="stat-item"><span class="stat-value">${enjoyed}</span><span class="stat-label">Foods Enjoyed</span></div>
    `;
  }
}

/* ============================================================
   RECIPE FILTER
   Quick filter for the recipe grid on the homepage
   ============================================================ */

function initRecipeFilter() {
  const filterContainer = document.getElementById('recipe-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filter = btn.dataset.filter;
    const value = btn.dataset.value;

    // Toggle active
    filterContainer.querySelectorAll(`.filter-btn[data-filter="${filter}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter recipe cards
    const cards = document.querySelectorAll('.recipe-card[data-cuisine]');
    cards.forEach(card => {
      if (value === 'all') {
        card.style.display = '';
      } else if (filter === 'cuisine') {
        card.style.display = card.dataset.cuisine === value ? '' : 'none';
      } else if (filter === 'diet') {
        card.style.display = card.dataset.diet && card.dataset.diet.includes(value) ? '' : 'none';
      }
    });
  });
}
