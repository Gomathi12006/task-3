let cash = 1000;
        let stock = 0;
        let balance = cash;
        let previousPrice = 100;
        let currentPrice = previousPrice;
        let profit = 0;
        let trades = [];
        let botInterval;

        const cashElement = document.getElementById('cash');
        const stockElement = document.getElementById('stock');
        const currentPriceElement = document.getElementById('current-price');
        const balanceElement = document.getElementById('balance');
        const profitElement = document.getElementById('profit');
        const tradeLogList = document.getElementById('trade-log-list');
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');

        // Generate random price fluctuations
        function generatePrice() {
            const priceChange = Math.floor(Math.random() * 5) - 2;  // Price change between -2 and +2
            currentPrice = Math.max(0, previousPrice + priceChange);
            previousPrice = currentPrice;
            currentPriceElement.textContent = currentPrice.toFixed(2);
        }

        // Simulate trading decision
        function makeTrade() {
            // Buy low strategy
            if (currentPrice < previousPrice) {
                const sharesToBuy = Math.floor(cash / currentPrice);
                if (sharesToBuy > 0) {
                    cash -= sharesToBuy * currentPrice;
                    stock += sharesToBuy;
                    trades.push(`Bought ${sharesToBuy} shares at $${currentPrice.toFixed(2)}`);
                }
            }
            // Sell high strategy
            else if (currentPrice > previousPrice && stock > 0) {
                cash += stock * currentPrice;
                trades.push(`Sold ${stock} shares at $${currentPrice.toFixed(2)}`);
                stock = 0;
            }

            // Update balance and profit
            balance = cash + (stock * currentPrice);
            profit = balance - 1000;  // Initial investment of $1000
            updateUI();
        }

        // Update the UI with the latest data
        function updateUI() {
            cashElement.textContent = `$${cash.toFixed(2)}`;
            stockElement.textContent = stock;
            balanceElement.textContent = `$${balance.toFixed(2)}`;
            profitElement.textContent = `$${profit.toFixed(2)}`;

            // Update trade log with animations
            tradeLogList.innerHTML = trades.map(trade => `<li>${trade}</li>`).join('');
        }

        // Start the bot and begin trading
        function startBot() {
            startBtn.disabled = true;
            stopBtn.disabled = false;

            botInterval = setInterval(() => {
                generatePrice();
                makeTrade();
            }, 1000);  // Update every second
        }

        // Stop the bot
        function stopBot() {
            clearInterval(botInterval);
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }

        // Event Listeners
        startBtn.addEventListener('click', startBot);
        stopBtn.addEventListener('click', stopBot);
   