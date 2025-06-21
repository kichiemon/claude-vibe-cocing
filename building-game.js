export class BuildingGame {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
    }

    start(content, controls) {
        const gridSize = 5;
        const pattern = this.generateBuildingPattern(gridSize);
        const construction = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
        let currentBlock = '🟫';
        let accuracy = 0;

        content.innerHTML = `
            <div class="building-interface">
                <div class="building-stats">
                    <div class="stat">
                        <span class="stat-label">精度:</span>
                        <span class="stat-value" id="building-accuracy">${accuracy}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">現在のブロック:</span>
                        <span class="stat-value" id="current-block">${currentBlock}</span>
                    </div>
                </div>
                <div class="building-area">
                    <div class="blueprint">
                        <h4>設計図</h4>
                        <div class="building-grid" id="blueprint-grid">
                            ${this.renderBuildingBlueprint(pattern)}
                        </div>
                    </div>
                    <div class="construction">
                        <h4>建設エリア</h4>
                        <div class="building-grid" id="construction-grid">
                            ${this.renderConstructionGrid(construction, gridSize)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        controls.innerHTML = `
            <div class="block-selector">
                <button class="block-btn" data-block="🟫">木材</button>
                <button class="block-btn" data-block="⬜">石</button>
                <button class="block-btn" data-block="🟤">土</button>
                <button class="block-btn" data-block="🟢">草</button>
            </div>
            <div class="control-hint">ブロックを選択してから建設エリアをクリックしてください</div>
        `;

        // Event listeners for block selection
        document.querySelectorAll('.block-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentBlock = btn.dataset.block;
                document.getElementById('current-block').textContent = currentBlock;
                document.querySelectorAll('.block-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        // Event listeners for construction grid
        document.querySelectorAll('.construction-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                construction[row][col] = currentBlock;
                cell.textContent = currentBlock;
                
                accuracy = this.calculateBuildingAccuracy(pattern, construction);
                document.getElementById('building-accuracy').textContent = Math.round(accuracy) + '%';
                
                if (accuracy >= 100) {
                    this.endGame('完璧な建築！ マスタービルダーの称号を獲得しました！');
                }
            });
        });

        setTimeout(() => {
            this.endGame(`建設時間終了！ 精度: ${Math.round(accuracy)}%`);
        }, 60000);
    }

    generateBuildingPattern(size) {
        const blocks = ['🟫', '⬜', '🟤', '🟢'];
        return Array(size).fill().map(() => 
            Array(size).fill().map(() => blocks[Math.floor(Math.random() * blocks.length)])
        );
    }

    renderBuildingBlueprint(pattern) {
        return pattern.map((row, i) => 
            `<div class="grid-row">
                ${row.map((cell, j) => `<div class="blueprint-cell">${cell}</div>`).join('')}
            </div>`
        ).join('');
    }

    renderConstructionGrid(construction, size) {
        return construction.map((row, i) => 
            `<div class="grid-row">
                ${row.map((cell, j) => 
                    `<div class="construction-cell" data-row="${i}" data-col="${j}">${cell}</div>`
                ).join('')}
            </div>`
        ).join('');
    }

    calculateBuildingAccuracy(pattern, construction) {
        let matches = 0;
        let total = 0;
        
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                total++;
                if (pattern[i][j] === construction[i][j]) {
                    matches++;
                }
            }
        }
        
        return (matches / total) * 100;
    }

    endGame(message) {
        this.playerManager.playerStats.totalExperience += 75;
        if (!this.playerManager.playerStats.inventory['wood']) this.playerManager.playerStats.inventory['wood'] = 0;
        this.playerManager.playerStats.inventory['wood'] += 3;
        this.playerManager.saveData();
        this.uiManager.endGame(message);
    }
}
