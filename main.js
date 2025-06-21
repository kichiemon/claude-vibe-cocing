import { minecraftBlocks } from './biomes.js';
import { PlayerManager } from './player.js';
import { MiniGameManager } from './mini-games-manager.js';
import { UIManager } from './ui.js';

class MinecraftVibeCrafting {
    constructor() {
        this.playerManager = new PlayerManager();
        this.uiManager = new UIManager(this.playerManager);
        this.miniGameManager = new MiniGameManager(this.playerManager, this.uiManager);
        
        this.currentBiome = 'plains';
        this.miningRecords = [];
        
        this.init();
    }

    init() {
        this.loadMinecraftData();
        this.playerManager.initializeBiomeProgress();
        this.uiManager.init();
        this.bindMinecraftEvents();
        
        // Initialize displays
        this.uiManager.renderPlayerStats();
        this.uiManager.renderCreatureDisplay();
        this.uiManager.updateBiomeButtons();
        
        // Set initial biome
        this.uiManager.handleBiomeSelection('plains');
    }

    loadMinecraftData() {
        // Load saved records
        const savedRecords = localStorage.getItem('minecraftMiningRecords');
        if (savedRecords) {
            this.miningRecords = JSON.parse(savedRecords);
        }

        // Load player and biome data
        this.playerManager.loadData();
        
        // Load UI data
        this.uiManager.loadCreatureData();
    }

    saveMinecraftData() {
        localStorage.setItem('minecraftMiningRecords', JSON.stringify(this.miningRecords));
        this.playerManager.saveData();
        this.uiManager.saveCreatureData();
    }

    collectBlock(block) {
        // Add block to inventory and calculate experience
        const expGain = this.playerManager.collectBlock(block);
        
        // Update biome progress
        const newLevel = this.playerManager.updateBiomeProgress(this.currentBiome, expGain);
        if (newLevel) {
            this.uiManager.showBiomeLevelUpNotification(this.currentBiome, newLevel);
        }

        // Check for player level up
        const playerLevelUp = this.playerManager.checkPlayerLevelUp();
        if (playerLevelUp) {
            this.uiManager.showPlayerLevelUpNotification();
        }

        // Check achievements
        const newAchievements = this.playerManager.checkAchievements();
        newAchievements.forEach(achievement => {
            this.uiManager.showAchievementNotification(achievement);
        });

        // Show collection notification and effects
        this.uiManager.showCollectionNotification(block, expGain);
        this.uiManager.createBlockParticleEffect(block);

        // Update displays
        this.uiManager.renderPlayerStats();
        this.uiManager.renderInventory();

        // Save progress
        this.saveMinecraftData();

        // Update creature message
        const messages = [
            `${block.name}をゲット！ナイス採掘！`,
            `素晴らしい発見だね！`,
            `${block.name}は貴重だよ！`,
            `どんどん集めよう！`,
            `君の採掘スキルが上がってるね！`
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.uiManager.updateCreatureMessage(randomMessage);
    }

    startMinecraftGame(gameType) {
        const gameModal = document.getElementById('game-modal');
        const gameContent = document.getElementById('game-content');
        const gameControls = document.getElementById('game-controls');
        
        if (!gameModal || !gameContent || !gameControls) {
            console.error('Game modal elements not found');
            return;
        }
        
        gameModal.style.display = 'block';
        
        switch(gameType) {
            case 'mining':
                this.miniGameManager.startMiningGame(gameContent, gameControls);
                break;
            case 'building':
                this.miniGameManager.startBuildingGame(gameContent, gameControls);
                break;
            case 'survival':
                this.miniGameManager.startSurvivalGame(gameContent, gameControls);
                break;
            case 'redstone':
                this.miniGameManager.startRedstoneGame(gameContent, gameControls);
                break;
            default:
                console.error('Unknown game type:', gameType);
                gameModal.style.display = 'none';
        }
    }

    bindMinecraftEvents() {
        // Bind UI events
        this.uiManager.bindEvents();

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.miniGameManager.currentGame) {
                this.miniGameManager.endGame('ゲームを終了しました');
            }
        });

        // Modal close events
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Options tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update active tab button
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show target section
                const sections = ['player-stats', 'biome-progress', 'achievements', 'inventory'];
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.style.display = sectionId === targetTab ? 'block' : 'none';
                    }
                });
            });
        });

        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveMinecraftData();
        }, 30000);
    }

    recordCurrentMining() {
        this.uiManager.recordCurrentMining();
    }

    showNotification(message) {
        this.uiManager.showNotification(message);
    }

    renderInventory() {
        this.uiManager.renderInventory();
    }

    renderPlayerStats() {
        this.uiManager.renderPlayerStats();
    }

    checkMinecraftAchievements() {
        return this.playerManager.checkAchievements();
    }

    startMiningGame(content, controls) {
        this.miniGameManager.startMiningGame(content, controls);
    }

    startBuildingGame(content, controls) {
        this.miniGameManager.startBuildingGame(content, controls);
    }

    startSurvivalGame(content, controls) {
        this.miniGameManager.startSurvivalGame(content, controls);
    }

    startRedstoneGame(content, controls) {
        this.miniGameManager.startRedstoneGame(content, controls);
    }

    endMinecraftGame(message) {
        this.miniGameManager.endGame(message);
    }

    exitMinecraftGame() {
        this.uiManager.exitGame();
    }

    showMinecraftOptions() {
        this.uiManager.showMinecraftOptions();
    }

    applyTheme(theme) {
        this.uiManager.applyTheme(theme);
    }

    updateBiomeButtons() {
        this.uiManager.updateBiomeButtons();
    }
}

// Initialize the Minecraft Vibe Crafting app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.minecraftApp = new MinecraftVibeCrafting();
});

// Export for potential external use
export default MinecraftVibeCrafting;
