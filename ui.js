import { minecraftBlocks, biomeUnlockRequirements } from './biomes.js';
import { NotificationManager } from './notifications.js';

export class UIManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
        this.notificationManager = new NotificationManager();
        this.currentBiome = 'plains';
    }

    init() {
        this.notificationManager.loadCreatureData();
        this.loadThemePreference();
        this.renderPlayerStats();
        this.notificationManager.renderCreatureDisplay();
        this.updateBiomeButtons();
    }

    handleBiomeSelection(biome) {
        if (!this.playerManager.biomeProgress[biome]?.unlocked) {
            this.showNotification('このバイオームはまだ解放されていません！');
            return;
        }
        this.updateActiveBiome(biome);
        this.displayBlockPalette(biome);
        this.currentBiome = biome;
    }

    updateActiveBiome(selectedBiome) {
        const biomeButtons = document.querySelectorAll('.biome-btn');
        biomeButtons.forEach(button => {
            if (button.dataset.biome === selectedBiome) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    displayBlockPalette(biome) {
        const palette = document.getElementById('block-palette');
        const biomeData = minecraftBlocks[biome];
        
        if (!palette || !biomeData) return;
        
        palette.innerHTML = biomeData.blocks.map(block => this.createBlockCard(block)).join('');
        
        // Apply biome color theme
        document.documentElement.style.setProperty('--biome-color', biomeData.color);
    }

    createBlockCard(block) {
        return `
            <div class="block-card ${this.playerManager.getRarityClass(block.rarity)}" 
                 onclick="minecraftApp.collectBlock(${JSON.stringify(block).replace(/"/g, '&quot;')})">
                <div class="block-texture">${block.texture}</div>
                <div class="block-info">
                    <div class="block-name">${block.name}</div>
                    <div class="block-rarity">${this.playerManager.getRarityName(block.rarity)}</div>
                    <div class="block-durability">耐久度: ${block.durability}</div>
                </div>
                <div class="collect-effect">+</div>
            </div>
        `;
    }

    showCollectionNotification(block, expGain) {
        this.notificationManager.showCollectionNotification(block, expGain);
    }

    showBiomeLevelUpNotification(biome, newLevel) {
        const biomeData = minecraftBlocks[biome];
        this.notificationManager.showBiomeLevelUpNotification(biomeData.name, newLevel);
        
        setTimeout(() => {
            this.checkAndUnlockNewBiomes(biome, newLevel);
        }, 1000);
    }

    checkAndUnlockNewBiomes(currentBiome, level) {
        Object.keys(biomeUnlockRequirements).forEach(biome => {
            const unlockData = biomeUnlockRequirements[biome];
            
            if (unlockData && level >= unlockData.level) {
                if (unlockData.biome === currentBiome) {
                    if (!this.playerManager.biomeProgress[biome].unlocked) {
                        this.playerManager.biomeProgress[biome].unlocked = true;
                        this.showBiomeUnlockNotification(biome);
                        this.updateBiomeButtons();
                    }
                }
            }
        });
    }

    showBiomeUnlockNotification(biome) {
        const biomeData = minecraftBlocks[biome];
        this.notificationManager.showBiomeUnlockNotification(biomeData.name);
        
        setTimeout(() => {
            this.updateBiomeButtons();
        }, 1000);
    }

    createBlockParticleEffect(block) {
        this.notificationManager.createBlockParticleEffect(block);
    }

    showMiningEffect(message) {
        this.notificationManager.showMiningEffect(message);
    }

    endGame(message) {
        const gameModal = document.getElementById('game-modal');
        const gameContent = document.getElementById('game-content');
        const gameControls = document.getElementById('game-controls');
        
        gameContent.innerHTML = `
            <div class="game-end">
                <h3>🎮 ゲーム終了</h3>
                <p>${message}</p>
                <button id="close-game" class="game-btn">閉じる</button>
            </div>
        `;
        gameControls.innerHTML = '';
        
        document.getElementById('close-game').addEventListener('click', () => {
            this.exitGame();
        });
        
        setTimeout(() => {
            this.exitGame();
        }, 5000);
    }

    exitGame() {
        const gameModal = document.getElementById('game-modal');
        if (gameModal) {
            gameModal.style.display = 'none';
        }
        this.renderPlayerStats();
        this.renderInventory();
    }

    showAchievementNotification(achievement) {
        this.notificationManager.showAchievementNotification(achievement);
        
        setTimeout(() => {
            this.renderPlayerStats();
        }, 1000);
    }

    updateCreatureMessage(message) {
        this.notificationManager.updateCreatureMessage(message);
    }

    showPlayerLevelUpNotification() {
        this.notificationManager.showPlayerLevelUpNotification(this.playerManager.playerStats.level);
        
        setTimeout(() => {
            this.renderPlayerStats();
        }, 1000);
    }

    showNotification(message) {
        this.notificationManager.showNotification(message);
    }

    renderInventory() {
        const inventoryGrid = document.getElementById('inventory-grid');
        if (!inventoryGrid) return;
        
        inventoryGrid.innerHTML = '';
        
        Object.entries(this.playerManager.playerStats.inventory).forEach(([item, count]) => {
            const inventoryItem = document.createElement('div');
            inventoryItem.className = 'inventory-item';
            inventoryItem.innerHTML = `
                <div class="item-icon">${this.playerManager.getItemIcon(item)}</div>
                <div class="item-name">${item}</div>
                <div class="item-count">${count}</div>
            `;
            inventoryGrid.appendChild(inventoryItem);
        });
    }

    renderPlayerStats() {
        const playerLevel = document.getElementById('player-level');
        const playerExp = document.getElementById('player-exp');
        const achievementCount = document.getElementById('achievement-count');
        
        if (playerLevel) playerLevel.textContent = this.playerManager.playerStats.level;
        if (playerExp) playerExp.textContent = this.playerManager.playerStats.totalExperience;
        if (achievementCount) achievementCount.textContent = this.playerManager.playerStats.achievements.length;
        
        // Update biome progress display
        Object.keys(minecraftBlocks).forEach(biome => {
            const levelElement = document.getElementById(`${biome}-level`);
            const expElement = document.getElementById(`${biome}-exp`);
            
            if (levelElement && this.playerManager.biomeProgress[biome]) {
                levelElement.textContent = this.playerManager.biomeProgress[biome].level;
            }
            if (expElement && this.playerManager.biomeProgress[biome]) {
                expElement.textContent = this.playerManager.biomeProgress[biome].experience;
            }
        });
    }

    renderCreatureDisplay() {
        this.notificationManager.renderCreatureDisplay();
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        if (theme === 'system') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        if (this.themeSelector) {
            this.themeSelector.value = theme;
        }
    }

    saveThemePreference(theme) {
        localStorage.setItem('minecraftTheme', theme);
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('minecraftTheme') || 'light';
        this.applyTheme(savedTheme);
    }

    loadCreatureData() {
        this.notificationManager.loadCreatureData();
    }

    saveCreatureData() {
        this.notificationManager.saveCreatureData();
    }

    showMinecraftOptions() {
        const optionsModal = document.getElementById('options-modal');
        if (optionsModal) {
            optionsModal.style.display = 'block';
            
            const sections = ['player-stats', 'biome-progress', 'achievements', 'inventory'];
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.style.display = sectionId === 'player-stats' ? 'block' : 'none';
                }
            });
        }
    }

    updateBiomeButtons() {
        const biomeButtons = document.querySelectorAll('.biome-btn');
        biomeButtons.forEach(button => {
            const biome = button.dataset.biome;
            if (this.playerManager.biomeProgress[biome]?.unlocked) {
                button.classList.remove('locked');
                button.classList.add('unlocked');
            } else {
                button.classList.remove('unlocked');
                button.classList.add('locked');
            }
        });
    }

    bindEvents() {
        // Biome selection events
        document.querySelectorAll('.biome-btn').forEach(button => {
            button.addEventListener('click', () => {
                const biome = button.dataset.biome;
                if (this.playerManager.biomeProgress[biome]?.unlocked) {
                    this.handleBiomeSelection(biome);
                } else {
                    this.showNotification('このバイオームはまだ解放されていません！');
                }
            });
        });

        // Theme selector
        this.themeSelector = document.getElementById('theme-selector');
        if (this.themeSelector) {
            this.themeSelector.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
                this.saveThemePreference(e.target.value);
            });
        }

        // Game buttons
        document.querySelectorAll('.game-btn').forEach(button => {
            const gameType = button.dataset.game;
            if (gameType) {
                button.addEventListener('click', () => {
                    this.startMinecraftGame(gameType);
                });
            }
        });

        // Options button
        const optionsBtn = document.getElementById('options-btn');
        if (optionsBtn) {
            optionsBtn.addEventListener('click', () => {
                this.showMinecraftOptions();
            });
        }

        // Exit game button
        const exitGameBtn = document.getElementById('exit-game');
        if (exitGameBtn) {
            exitGameBtn.addEventListener('click', () => {
                this.exitGame();
            });
        }

        // Record current mood button
        const recordBtn = document.getElementById('record-current');
        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                this.recordCurrentMining();
            });
        }
    }

    recordCurrentMining() {
        if (!this.currentBiome) {
            this.showNotification('まずバイオームを選択してください！');
            return;
        }

        const biomeData = minecraftBlocks[this.currentBiome];
        const timestamp = new Date().toISOString();
        
        this.showNotification(`${biomeData.name}での採掘記録を保存しました！`);
        this.playerManager.saveData();
    }
}
