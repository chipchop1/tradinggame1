// Initial player data
let player = {
    cash: 10000,
    portfolio: {} // Holds the number of shares owned for each stock
};

// Stock market data
let stocks = {
    "TechCorp": { price: 100 },
    "HealthInc": { price: 150 },
    "GreenEnergy": { price: 200 }
};

// Function to update the cash balance display
function updateCashBalance() {
    const cashBalanceEl = document.getElementById('cash-balance');
    cashBalanceEl.textContent = `Cash Balance: $${player.cash.toFixed(2)}`;
}

// Function to display the stock market table
function displayStockMarket() {
    const stockTableBody = document.querySelector('#stock-table tbody');
    stockTableBody.innerHTML = ''; // Clear existing rows

    for (let stock in stocks) {
        const row = document.createElement('tr');

        // Stock Name
        const nameCell = document.createElement('td');
        nameCell.textContent = stock;
        row.appendChild(nameCell);

        // Stock Price
        const priceCell = document.createElement('td');
        priceCell.textContent = stocks[stock].price.toFixed(2);
        row.appendChild(priceCell);

        // Buy Button
        const actionCell = document.createElement('td');
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', () => buyStock(stock));
        actionCell.appendChild(buyButton);
        row.appendChild(actionCell);

        stockTableBody.appendChild(row);
    }
}

// Function to display the player's portfolio
function displayPortfolio() {
    const portfolioTableBody = document.querySelector('#portfolio-table tbody');
    portfolioTableBody.innerHTML = ''; // Clear existing rows

    for (let stock in player.portfolio) {
        const sharesOwned = player.portfolio[stock];
        const totalValue = sharesOwned * stocks[stock].price;

        const row = document.createElement('tr');

        // Stock Name
        const nameCell = document.createElement('td');
        nameCell.textContent = stock;
        row.appendChild(nameCell);

        // Shares Owned
        const sharesCell = document.createElement('td');
        sharesCell.textContent = sharesOwned;
        row.appendChild(sharesCell);

        // Total Value
        const valueCell = document.createElement('td');
        valueCell.textContent = totalValue.toFixed(2);
        row.appendChild(valueCell);

        // Sell Button
        const actionCell = document.createElement('td');
        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.addEventListener('click', () => sellStock(stock));
        actionCell.appendChild(sellButton);
        row.appendChild(actionCell);

        portfolioTableBody.appendChild(row);
    }
}

// Function to buy a stock
function buyStock(stock) {
    const price = stocks[stock].price;
    const quantity = parseInt(prompt(`Enter the number of shares to buy for ${stock}:`), 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity.');
        return;
    }

    const totalCost = price * quantity;

    if (player.cash >= totalCost) {
        player.cash -= totalCost;
        player.portfolio[stock] = (player.portfolio[stock] || 0) + quantity;
        updateCashBalance();
        displayPortfolio();
    } else {
        alert('Insufficient cash to complete this purchase.');
    }
}

// Function to sell a stock
function sellStock(stock) {
    const sharesOwned = player.portfolio[stock];
    const price = stocks[stock].price;
    const quantity = parseInt(prompt(`Enter the number of shares to sell for ${stock}:`), 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity.');
        return;
    }

    if (quantity <= sharesOwned) {
        const totalRevenue = price * quantity;
        player.cash += totalRevenue;
        player.portfolio[stock] -= quantity;

        if (player.portfolio[stock] === 0) {
            delete player.portfolio[stock]; // Remove stock from portfolio if no shares are left
        }

        updateCashBalance();
        displayPortfolio();
    } else {
        alert('You do not own enough shares to sell that quantity.');
    }
}

// Function to simulate stock price changes
function simulateMarket() {
    for (let stock in stocks) {
        // Random price change between -5% to +5%
        const changePercent = (Math.random() * 10 - 5) / 100;
        stocks[stock].price += stocks[stock].price * changePercent;

        // Ensure price doesn't fall below a minimum value
        stocks[stock].price = Math.max(stocks[stock].price, 1);
    }
    displayStockMarket();
    displayPortfolio();
}

// Initialize the game
function initGame() {
    updateCashBalance();
    displayStockMarket();
    displayPortfolio();

    // Simulate market every 5 seconds
    setInterval(simulateMarket, 5000);
}

// Start the game when the page loads
window.onload = initGame;
