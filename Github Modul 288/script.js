const stocks = [
  { id: 'stock-1', cost: 100, count: 0 },
  { id: 'stock-2', cost: 100, count: 0 },
  { id: 'stock-3', cost: 100, count: 0 },
  { id: 'stock-4', cost: 100, count: 0 },
];

let money = 1000;

function updateStockCost(stock) {
  const change = Math.floor(Math.random() * 21) - 10; // Generates a random number between -1 and 1
  stock.cost += change;
  const costElement = document.getElementById(`${stock.id}-cost`);
  costElement.innerHTML = stock.cost;

  const arrowElement = document.getElementById(`${stock.id}-arrow`);
  if (change > 0) {
    arrowElement.classList.remove('down');
    arrowElement.classList.add('up');
  } else if (change < 0) {
    arrowElement.classList.remove('up');
    arrowElement.classList.add('down');
  }
}

function updateAllStockCosts() {
  stocks.forEach(updateStockCost);
}

function buyStock(stock) {
  if (stock.cost > money) {
    return;
  }
  money -= stock.cost;
  stock.count++;
  updateMoney();
}

function sellStock(stock) {
  if (stock.count === 0) {
    return;
  }
  money += stock.cost;
  stock.count--;
  updateMoney();
}

function updateMoney() {
  const moneyElement = document.getElementById('money');
  moneyElement.innerHTML = money;
}

function saveGame() {
  const gameState = {
    money: money,
    stocks: stocks.map(stock => ({
      id: stock.id,
      cost: stock.cost,
      count: stock.count,
    })),
  };
  const gameStateJson = JSON.stringify(gameState);
  const a = document.createElement('a');
  const file = new Blob([gameStateJson], {type: 'application/json'});
  a.href = URL.createObjectURL(file);
  a.download = 'game-state.json';
  a.click();
}

function earnMoney() {
  money++;
  updateMoney();
}

function init() {
  const earnMoneyButton = document.getElementById('earn-money');
  earnMoneyButton.addEventListener('click', earnMoney);

  const saveGameButton = document.getElementById('save-game');
  saveGameButton.addEventListener('click', saveGame);

  stocks.forEach(stock => {
    const buyButton = document.getElementById(`buy-${stock.id}`);
    buyButton.addEventListener('click', () => buyStock(stock));

    const sellButton = document.getElementById(`sell-${stock.id}`);
    sellButton.addEventListener('click', () => sellStock(stock));

    const arrowElement = document.createElement('div');
    arrowElement.id = `${stock.id}-arrow`;
    arrowElement.classList.add('arrow');
    document.getElementById(stock.id).appendChild(arrowElement);
  });

  setInterval(updateAllStockCosts, 5000); // Update stock costs every 5 seconds
}

init();
