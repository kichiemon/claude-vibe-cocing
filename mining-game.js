export class MiningGame {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
    }

    start(content, controls) {
        let cursorPosition = 0;
        let accuracy = 100;
        let toolDurability = 100;
        let blocksFound = 0;
        
        content.innerHTML = `
            <div class="mining-interface">
                <div class="mining-stats">
                    <div class="stat">
                        <span class="stat-label">位置:</span>
                        <span class="stat-value" id="cursor-position">0%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">精度:</span>
                        <span class="stat-value" id="accuracy">${accuracy}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">ツール耐久度:</span>
                        <span class="stat-value" id="tool-durability">${toolDurability}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">発見ブロック:</span>
                        <span class="stat-value" id="blocks-found">${blocksFound}</span>
                    </div>
                </div>
                <div class="mining-area">
                    <div class="mining-cursor" id="mining-cursor">⛏️</div>
                    <div class="mining-target" id="mining-target">💎</div>
                </div>
            </div>
        `;

        controls.innerHTML = `
            <button id="mine-btn" class="game-btn">採掘 (スペース)</button>
            <div class="control-hint">スペースキーまたはボタンで採掘してください</div>
        `;

        const mineBtn = document.getElementById('mine-btn');
        const cursorEl = document.getElementById('mining-cursor');
        
        const gameInterval = setInterval(() => {
            cursorPosition = (cursorPosition + 2) % 200;
            if (cursorPosition >= 100) {
                cursorPosition = 200 - cursorPosition;
            }
            
            cursorEl.style.left = cursorPosition + '%';
            document.getElementById('cursor-position').textContent = cursorPosition + '%';
            
            if (accuracy > 50) {
                accuracy -= 0.5;
                document.getElementById('accuracy').textContent = Math.round(accuracy) + '%';
            }
        }, 50);

        const mine = () => {
            if (accuracy > 70) {
                blocksFound++;
                const foundMessage = `ブロック発見！ 精度: ${Math.round(accuracy)}%`;
                this.uiManager.showMiningEffect(foundMessage);
                
                // Add blocks to inventory
                if (!this.playerManager.playerStats.inventory['stone']) this.playerManager.playerStats.inventory['stone'] = 0;
                this.playerManager.playerStats.inventory['stone']++;
                
                // Reset accuracy
                accuracy = 100;
            } else {
                this.uiManager.showMiningEffect('外れ... 精度が足りません');
                accuracy = Math.max(20, accuracy - 10);
            }
            
            toolDurability -= 5;
            document.getElementById('tool-durability').textContent = toolDurability + '%';
            document.getElementById('blocks-found').textContent = blocksFound;
            document.getElementById('accuracy').textContent = Math.round(accuracy) + '%';
            
            if (toolDurability <= 0) {
                clearInterval(gameInterval);
                this.endGame(`採掘完了！ ${blocksFound}個のブロックを発見しました！`);
            }
        };

        mineBtn.addEventListener('click', mine);
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                mine();
            }
        });

        setTimeout(() => {
            clearInterval(gameInterval);
            this.endGame(`時間切れ！ ${blocksFound}個のブロックを発見しました！`);
        }, 30000);
    }

    endGame(message) {
        this.playerManager.playerStats.totalExperience += 50;
        if (!this.playerManager.playerStats.inventory['stone']) this.playerManager.playerStats.inventory['stone'] = 0;
        this.playerManager.playerStats.inventory['stone'] += 5;
        this.playerManager.saveData();
        this.uiManager.endGame(message);
    }
}
