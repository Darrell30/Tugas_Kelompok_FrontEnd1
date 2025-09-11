document.addEventListener('DOMContentLoaded', () => {

  // 1. DATA: A list of mouse models. 
  // You can easily add or remove mice here.
  const mouseData = [
    { name: 'MX Master 3S', brand: 'Logitech', type: 'Office', image: 'mouse_img/mx_master3s.png' },
    { name: 'G Pro X Superlight', brand: 'Logitech', type: 'Gaming', image: 'mouse_img/g_pro_x_superlight.png' },
    { name: 'G305', brand: 'Logitech', type: 'Gaming', image: 'mouse_img/g305.png' },
    { name: 'Lift Vertical', brand: 'Logitech', type: 'Ergonomic', image: 'mouse_img/lift_vertical.png' },
    { name: 'Razer Viper V2 Pro', brand: 'Razer', type: 'Gaming', image: 'mouse_img/viper_v2_pro.png' },
    { name: 'Razer DeathAdder V3', brand: 'Razer', type: 'Gaming', image: 'mouse_img/deathadder_v3.png' },
    { name: 'Pro Click', brand: 'Razer', type: 'Office', image: 'mouse_img/pro_click.png' },
    { name: 'Magic Mouse', brand: 'Apple', type: 'Office', image: 'mouse_img/magic_mouse.png' },
    { name: 'Model O', brand: 'Glorious', type: 'Gaming', image: 'mouse_img/model_o.png' },
    { name: 'SteelSeries Aerox 5', brand: 'SteelSeries', type: 'Gaming', image: 'mouse_img/aerox_5.png' },
    { name: 'SteelSeries Rival 3', brand: 'SteelSeries', type: 'Gaming', image: 'mouse_img/rival3.png' },
    { name: 'SteelSeries Rival 650', brand: 'SteelSeries', type: 'Gaming', image: 'mouse_img/rival650.png' },
  ];

  // 2. DOM ELEMENT REFERENCES
  const catalog = document.getElementById('mouse-catalog');
  const searchInput = document.getElementById('search-input');
  const brandFilter = document.getElementById('brand-filter');
  const typeFilter = document.getElementById('type-filter');
  const noResults = document.getElementById('no-results');

  // 3. DISPLAY FUNCTION: Renders the mouse cards to the page
  const displayMice = (mice) => {
    catalog.innerHTML = ''; // Clear existing content

    if (mice.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }

    mice.forEach(mouse => {
      const card = document.createElement('div');
      card.className = 'mouse-card';
      card.innerHTML = `
        <img src="${mouse.image}" alt="${mouse.name}" onerror="this.onerror=null;this.src='img/placeholder.png';">
        <div class="mouse-info">
          <h3>${mouse.name}</h3>
          <p class="brand">By ${mouse.brand}</p>
          <span class="type-badge">${mouse.type}</span>
        </div>
      `;
      catalog.appendChild(card);
    });
  };

  // 4. POPULATE FILTERS: Dynamically create filter options from data
  const populateFilters = () => {
    const brands = [...new Set(mouseData.map(mouse => mouse.brand))];
    const types = [...new Set(mouseData.map(mouse => mouse.type))];

    brands.sort().forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandFilter.appendChild(option);
    });

    types.sort().forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeFilter.appendChild(option);
    });
  };

  // 5. FILTERING LOGIC
  const handleFilter = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedType = typeFilter.value;

    let filteredMice = mouseData.filter(mouse => {
      const matchesSearch = mouse.name.toLowerCase().includes(searchTerm) || mouse.brand.toLowerCase().includes(searchTerm);
      const matchesBrand = selectedBrand === 'all' || mouse.brand === selectedBrand;
      const matchesType = selectedType === 'all' || mouse.type === selectedType;

      return matchesSearch && matchesBrand && matchesType;
    });

    displayMice(filteredMice);
  };

  // 6. EVENT LISTENERS
  searchInput.addEventListener('input', handleFilter);
  brandFilter.addEventListener('change', handleFilter);
  typeFilter.addEventListener('change', handleFilter);

  // 7. INITIALIZE
  populateFilters();
  displayMice(mouseData);
});