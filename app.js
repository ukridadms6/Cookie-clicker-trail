const state = {
  cookies: 0,
  cookiesPerSecond: 0,
  cookiesPerClick: 1,
};

const upgrades = [
  {
    id: 'cursor',
    name: 'Cursed Cursor',
    description: '+1 cookie per click',
    cost: 15,
    scaling: 1.2,
    owned: 0,
    apply() {
      state.cookiesPerClick += 1;
    },
  },
  {
    id: 'grandma',
    name: 'Grandma Wagon',
    description: '+1 cookie per second',
    cost: 50,
    scaling: 1.25,
    owned: 0,
    apply() {
      state.cookiesPerSecond += 1;
    },
  },
  {
    id: 'farm',
    name: 'Chocolate Farm',
    description: '+4 cookies per second',
    cost: 220,
    scaling: 1.3,
    owned: 0,
    apply() {
      state.cookiesPerSecond += 4;
    },
  },
  {
    id: 'factory',
    name: 'Biscuit Factory',
    description: '+10 cookies per second',
    cost: 800,
    scaling: 1.33,
    owned: 0,
    apply() {
      state.cookiesPerSecond += 10;
    },
  },
];

const cookieCount = document.getElementById('cookie-count');
const cpsCount = document.getElementById('cps-count');
const cpcCount = document.getElementById('cpc-count');
const cookieButton = document.getElementById('cookie-button');
const shopList = document.getElementById('shop-list');
const shopTemplate = document.getElementById('shop-item-template');

function format(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value < 100 ? 1 : 0,
  }).format(value);
}

function redraw() {
  cookieCount.textContent = format(state.cookies);
  cpsCount.textContent = format(state.cookiesPerSecond);
  cpcCount.textContent = format(state.cookiesPerClick);

  upgrades.forEach((upgrade) => {
    const buyButton = document.querySelector(`[data-buy="${upgrade.id}"]`);
    const owned = document.querySelector(`[data-owned="${upgrade.id}"]`);
    if (!buyButton || !owned) return;

    buyButton.textContent = `Buy (${format(upgrade.cost)})`;
    buyButton.disabled = state.cookies < upgrade.cost;
    owned.textContent = `Owned: ${upgrade.owned}`;
  });
}

function buildShop() {
  upgrades.forEach((upgrade) => {
    const clone = shopTemplate.content.cloneNode(true);
    clone.querySelector('.item-name').textContent = upgrade.name;
    clone.querySelector('.item-description').textContent = upgrade.description;

    const owned = clone.querySelector('.item-owned');
    owned.dataset.owned = upgrade.id;
    owned.textContent = 'Owned: 0';

    const button = clone.querySelector('.buy-button');
    button.dataset.buy = upgrade.id;
    button.addEventListener('click', () => {
      if (state.cookies < upgrade.cost) return;

      state.cookies -= upgrade.cost;
      upgrade.apply();
      upgrade.owned += 1;
      upgrade.cost = Math.ceil(upgrade.cost * upgrade.scaling);
      redraw();
    });

    shopList.append(clone);
  });
}

cookieButton.addEventListener('click', () => {
  state.cookies += state.cookiesPerClick;
  redraw();
});

setInterval(() => {
  if (state.cookiesPerSecond <= 0) return;
  state.cookies += state.cookiesPerSecond;
  redraw();
}, 1000);

buildShop();
redraw();
