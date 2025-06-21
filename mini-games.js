export class MiniGameManager {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
        this.currentGame = null;
        this.gameInterval = null;
    }

    startMiningGame(content, controls) {
        this.currentGame = 'mining';
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
            if (e.code === 'Space' && this.currentGame === 'mining') {
                e.preventDefault();
                mine();
            }
        });

        setTimeout(() => {
            clearInterval(gameInterval);
            this.endGame(`時間切れ！ ${blocksFound}個のブロックを発見しました！`);
        }, 30000);
    }

    startBuildingGame(content, controls) {
        this.currentGame = 'building';
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

    startSurvivalGame(content, controls) {
        this.currentGame = 'survival';
        let health = 100;
        let food = 100;
        let shelter = 0;
        let dayCount = 0;
        let isNight = false;

        content.innerHTML = `
            <div class="survival-interface">
                <div class="survival-stats">
                    <div class="stat">
                        <span class="stat-label">体力:</span>
                        <div class="stat-bar">
                            <div class="stat-fill health-fill" id="health-bar" style="width: ${health}%"></div>
                        </div>
                        <span class="stat-value" id="health-value">${health}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">食料:</span>
                        <div class="stat-bar">
                            <div class="stat-fill food-fill" id="food-bar" style="width: ${food}%"></div>
                        </div>
                        <span class="stat-value" id="food-value">${food}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">シェルター:</span>
                        <span class="stat-value" id="shelter-value">${shelter}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">日数:</span>
                        <span class="stat-value" id="day-count">${dayCount}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">時間:</span>
                        <span class="stat-value" id="time-of-day">${isNight ? '夜' : '昼'}</span>
                    </div>
                </div>
                <div class="survival-area">
                    <div class="survival-actions">
                        <button id="gather-food" class="survival-btn">食料採集 🍖</button>
                        <button id="build-shelter" class="survival-btn">シェルター建設 🏠</button>
                        <button id="rest" class="survival-btn">休息 😴</button>
                    </div>
                </div>
            </div>
        `;

        controls.innerHTML = `
            <div class="survival-tips">
                <p>💡 昼間は食料採集とシェルター建設を行い、夜は休息しましょう</p>
                <p>⚠️ 食料が不足すると体力が減少します</p>
                <p>🏠 シェルターがあると夜間の体力回復が向上します</p>
            </div>
        `;

        const gatherFoodBtn = document.getElementById('gather-food');
        const buildShelterBtn = document.getElementById('build-shelter');
        const restBtn = document.getElementById('rest');

        const updateUI = () => {
            document.getElementById('health-bar').style.width = health + '%';
            document.getElementById('health-value').textContent = health;
            document.getElementById('food-bar').style.width = food + '%';
            document.getElementById('food-value').textContent = food;
            document.getElementById('shelter-value').textContent = shelter;
            document.getElementById('day-count').textContent = Math.floor(dayCount);
            document.getElementById('time-of-day').textContent = isNight ? '夜' : '昼';
        };

        const survivalInterval = setInterval(() => {
            dayCount += 0.1;
            
            // Day/Night cycle
            if (Math.floor(dayCount * 2) % 2 === 1 && !isNight) {
                isNight = true;
                this.uiManager.showNotification('🌙 夜になりました。休息の時間です。');
            } else if (Math.floor(dayCount * 2) % 2 === 0 && isNight) {
                isNight = false;
                this.uiManager.showNotification('☀️ 朝になりました。活動を開始しましょう。');
            }
            
            // Food consumption
            food = Math.max(0, food - 0.5);
            
            // Health effects
            if (food < 20) health -= 2;
            if (shelter > 50 && !isNight) health = Math.min(100, health + 1);
            
            updateUI();
            
            // Game over condition
            if (health <= 0) {
                clearInterval(survivalInterval);
                this.endGame(`ゲームオーバー... ${Math.floor(dayCount)}日間生存しました！`);
                return;
            }
            
            // Win condition
            if (dayCount >= 7) {
                clearInterval(survivalInterval);
                this.endGame(`素晴らしい！ 7日間のサバイバルに成功しました！`);
                return;
            }
            
            // Night rest bonus
            if (isNight) health = Math.min(100, health + 15);
            
        }, 1000);

        gatherFoodBtn.addEventListener('click', () => {
            if (!isNight) {
                food = Math.min(100, food + 20);
                health = Math.max(0, health - 5);
                this.uiManager.showNotification('🍖 食料を採集しました！');
            } else {
                this.uiManager.showNotification('🌙 夜間は食料採集できません。');
            }
            updateUI();
        });

        buildShelterBtn.addEventListener('click', () => {
            if (!isNight) {
                shelter = Math.min(100, shelter + 15);
                health = Math.max(0, health - 10);
                food = Math.max(0, food - 10);
                this.uiManager.showNotification('🏠 シェルターを建設しました！');
            } else {
                this.uiManager.showNotification('🌙 夜間は建設できません。');
            }
            updateUI();
        });

        restBtn.addEventListener('click', () => {
            if (isNight || health < 50) {
                health = Math.min(100, health + 25 + (shelter / 4));
                this.uiManager.showNotification('😴 休息しました。体力が回復しました！');
            } else {
                this.uiManager.showNotification('☀️ 昼間は活動しましょう。');
            }
            updateUI();
        });
    }

    startRedstoneGame(content, controls) {
        this.currentGame = 'redstone';
        let circuitComplexity = 1;
        let currentCircuit = this.generateCircuit(circuitComplexity);
        let playerCircuit = Array(5).fill().map(() => Array(5).fill(''));

        content.innerHTML = `
            <div class="redstone-interface">
                <div class="redstone-stats">
                    <div class="stat">
                        <span class="stat-label">回路レベル:</span>
                        <span class="stat-value" id="circuit-level">${circuitComplexity}</span>
                    </div>
                </div>
                <div class="redstone-area">
                    <div class="circuit-target">
                        <h4>目標回路</h4>
                        <div class="circuit-grid" id="target-circuit">
                            ${this.renderCircuit(currentCircuit)}
                        </div>
                    </div>
                    <div class="circuit-builder">
                        <h4>作成エリア</h4>
                        <div class="circuit-grid" id="player-circuit">
                            ${this.renderPlayerCircuit(playerCircuit)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        controls.innerHTML = `
            <div class="redstone-components">
                <button class="component-btn" data-component="🔴">レッドストーン</button>
                <button class="component-btn" data-component="🔄">リピーター</button>
                <button class="component-btn" data-component="💡">ランプ</button>
                <button class="component-btn" data-component="🔘">ボタン</button>
                <button class="component-btn" data-component="❌">消去</button>
            </div>
            <button id="test-circuit" class="game-btn">回路テスト</button>
        `;

        let selectedComponent = '🔴';

        document.querySelectorAll('.component-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedComponent = btn.dataset.component;
                document.querySelectorAll('.component-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        document.querySelectorAll('.player-circuit-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                
                if (selectedComponent === '❌') {
                    playerCircuit[row][col] = '';
                    cell.textContent = '';
                } else {
                    playerCircuit[row][col] = selectedComponent;
                    cell.textContent = selectedComponent;
                }
            });
        });

        document.getElementById('test-circuit').addEventListener('click', () => {
            const isCorrect = this.testCircuit(currentCircuit, playerCircuit);
            if (isCorrect) {
                circuitComplexity++;
                currentCircuit = this.generateCircuit(circuitComplexity);
                playerCircuit = Array(5).fill().map(() => Array(5).fill(''));
                
                document.getElementById('circuit-level').textContent = circuitComplexity;
                document.getElementById('target-circuit').innerHTML = this.renderCircuit(currentCircuit);
                document.getElementById('player-circuit').innerHTML = this.renderPlayerCircuit(playerCircuit);
                
                this.uiManager.showNotification(`✅ 正解！ レベル ${circuitComplexity} に進みます！`);
                
                if (circuitComplexity > 5) {
                    this.endGame('レッドストーンマスター！ 全ての回路をクリアしました！');
                }
            } else {
                this.uiManager.showNotification('❌ 回路が間違っています。再度確認してください。');
            }
        });

        setTimeout(() => {
            this.endGame(`時間切れ！ レベル ${circuitComplexity} まで到達しました！`);
        }, 180000); // 3 minutes
    }

    generateCircuit(complexity) {
        const components = ['🔴', '💡', '🔘'];
        const circuit = Array(5).fill().map(() => Array(5).fill(''));
        
        // Simple pattern generation based on complexity
        for (let i = 0; i < complexity + 2; i++) {
            const row = Math.floor(Math.random() * 5);
            const col = Math.floor(Math.random() * 5);
            circuit[row][col] = components[Math.floor(Math.random() * components.length)];
        }
        
        return circuit;
    }

    renderCircuit(circuit) {
        return circuit.map((row, i) => 
            `<div class="circuit-row">
                ${row.map((cell, j) => `<div class="circuit-cell">${cell}</div>`).join('')}
            </div>`
        ).join('');
    }

    renderPlayerCircuit(circuit) {
        return circuit.map((row, i) => 
            `<div class="circuit-row">
                ${row.map((cell, j) => 
                    `<div class="player-circuit-cell" data-row="${i}" data-col="${j}">${cell}</div>`
                ).join('')}
            </div>`
        ).join('');
    }

    testCircuit(target, player) {
        for (let i = 0; i < target.length; i++) {
            for (let j = 0; j < target[i].length; j++) {
                if (target[i][j] !== player[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    endGame(message) {
        this.currentGame = null;
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        this.uiManager.endGame(message);
        
        // Add experience and items based on game type
        if (this.currentGame === 'mining') {
            this.playerManager.playerStats.totalExperience += 50;
            if (!this.playerManager.playerStats.inventory['stone']) this.playerManager.playerStats.inventory['stone'] = 0;
            this.playerManager.playerStats.inventory['stone'] += 5;
        } else if (this.currentGame === 'building') {
            this.playerManager.playerStats.totalExperience += 75;
            if (!this.playerManager.playerStats.inventory['wood']) this.playerManager.playerStats.inventory['wood'] = 0;
            this.playerManager.playerStats.inventory['wood'] += 3;
        }
        
        this.playerManager.saveData();
    }
}
