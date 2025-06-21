import { MiningGame } from './mining-game.js';
import { BuildingGame } from './building-game.js';
import { SurvivalGame, RedstoneGame } from './survival-redstone-games.js';

export class MiniGameManager {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
        this.currentGame = null;
        this.gameInterval = null;
        
        // Initialize game instances
        this.miningGame = new MiningGame(playerManager, uiManager);
        this.buildingGame = new BuildingGame(playerManager, uiManager);
        this.survivalGame = new SurvivalGame(playerManager, uiManager);
        this.redstoneGame = new RedstoneGame(playerManager, uiManager);
    }

    startMiningGame(content, controls) {
        this.currentGame = 'mining';
        this.miningGame.start(content, controls);
    }

    startBuildingGame(content, controls) {
        this.currentGame = 'building';
        this.buildingGame.start(content, controls);
    }

    startSurvivalGame(content, controls) {
        this.currentGame = 'survival';
        this.survivalGame.start(content, controls);
    }

    startRedstoneGame(content, controls) {
        this.currentGame = 'redstone';
        this.redstoneGame.start(content, controls);
    }

    endGame(message) {
        this.currentGame = null;
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        this.uiManager.endGame(message);
        this.playerManager.saveData();
    }
}
