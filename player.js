import { minecraftBlocks, rarityConfig } from './biomes.js';

export class PlayerManager {
    constructor() {
        this.playerStats = {
            level: 1,
            totalExperience: 0,
            inventory: {},
            achievements: []
        };
        
        this.biomeProgress = {};
    }

    initializeBiomeProgress() {
        Object.keys(minecraftBlocks).forEach(biome => {
            if (!this.biomeProgress[biome]) {
                this.biomeProgress[biome] = {
                    level: 1,
                    experience: 0,
                    unlocked: biome === 'plains'
                };
            }
        });
    }

    collectBlock(block) {
        const blockName = block.name;
        
        if (!this.playerStats.inventory[blockName]) {
            this.playerStats.inventory[blockName] = 0;
        }
        this.playerStats.inventory[blockName]++;
        
        // Calculate experience gain
        const expGain = this.calculateExpGain(block);
        this.playerStats.totalExperience += expGain;
        
        return expGain;
    }

    calculateExpGain(block) {
        const baseExp = 10;
        const rarityMultipliers = {
            'common': 1,
            'uncommon': 2,
            'rare': 3,
            'legendary': 5,
            'mythic': 10
        };
        
        const rarityMultiplier = rarityMultipliers[block.rarity] || 1;
        const durabilityBonus = Math.floor(block.durability / 2);
        
        return baseExp * rarityMultiplier + durabilityBonus;
    }

    updateBiomeProgress(biome, expGain) {
        if (this.biomeProgress[biome]) {
            this.biomeProgress[biome].experience += expGain;
            return this.checkBiomeLevelUp(biome);
        }
        return false;
    }

    checkBiomeLevelUp(biome) {
        const biomeData = this.biomeProgress[biome];
        const requiredExp = this.getRequiredExperience(biomeData.level);
        
        if (biomeData.experience >= requiredExp) {
            biomeData.level++;
            biomeData.experience = 0;
            return biomeData.level;
        }
        return false;
    }

    getRequiredExperience(level) {
        return level * 100 + Math.pow(level, 2) * 25;
    }

    checkPlayerLevelUp() {
        const requiredExp = this.getRequiredExperience(this.playerStats.level);
        
        if (this.playerStats.totalExperience >= requiredExp) {
            this.playerStats.level++;
            this.playerStats.totalExperience = 0;
            return true;
        }
        return false;
    }

    checkAchievements() {
        const achievements = [
            {
                id: 'first_block',
                name: '初回収集',
                description: '初めてブロックを収集しました',
                condition: () => Object.keys(this.playerStats.inventory).length > 0
            },
            {
                id: 'collection_master',
                name: 'コレクションマスター',
                description: '10種類のブロックを収集しました',
                condition: () => Object.keys(this.playerStats.inventory).length >= 10
            },
            {
                id: 'biome_explorer',
                name: 'バイオーム探検家',
                description: '3つのバイオームのレベルを上げました',
                condition: () => Object.values(this.biomeProgress).filter(p => p.level > 1).length >= 3
            },
            {
                id: 'legendary_collector',
                name: 'レジェンダリーコレクター',
                description: 'レジェンダリーブロックを収集しました',
                condition: () => {
                    return Object.keys(this.playerStats.inventory).some(item => {
                        for (const biome of Object.values(minecraftBlocks)) {
                            const block = biome.blocks.find(b => b.name === item);
                            if (block && (block.rarity === 'legendary' || block.rarity === 'mythic')) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
            },
            {
                id: 'level_up_hero',
                name: 'レベルアップヒーロー',
                description: 'プレイヤーレベル5に到達しました',
                condition: () => this.playerStats.level >= 5
            },
            {
                id: 'mining_expert',
                name: '採掘エキスパート',
                description: '100個のブロックを収集しました',
                condition: () => {
                    return Object.values(this.playerStats.inventory).reduce((sum, count) => sum + count, 0) >= 100;
                }
            },
            {
                id: 'nether_explorer',
                name: 'ネザー探検家',
                description: 'ネザーバイオームを解放しました',
                condition: () => this.biomeProgress.nether?.unlocked === true
            },
            {
                id: 'end_conqueror',
                name: 'エンド征服者',
                description: 'エンドバイオームを解放しました',
                condition: () => this.biomeProgress.end?.unlocked === true
            }
        ];

        const newAchievements = [];
        achievements.forEach(achievement => {
            if (!this.playerStats.achievements.includes(achievement.id) && achievement.condition()) {
                this.playerStats.achievements.push(achievement.id);
                newAchievements.push(achievement);
            }
        });
        
        return newAchievements;
    }

    getItemIcon(itemName) {
        const iconMap = {
            '草ブロック': '🟢',
            '土ブロック': '🟤',
            '石ブロック': '⬜',
            '木材': '🟫',
            'オークの原木': '🌳',
            'シラカバの原木': '🌲',
            '苗木': '🌱',
            'キノコ': '🍄',
            '石炭鉱石': '⚫',
            '鉄鉱石': '🔸',
            '金鉱石': '🟡',
            'ダイヤモンド鉱石': '💎',
            '海草': '🌿',
            '珊瑚': '🪸',
            'プリズマリン': '💠',
            '海の心': '💙',
            '砂ブロック': '🟨',
            'サボテン': '🌵',
            'ピラミッド石': '🔺',
            'エメラルド': '💚',
            'ネザーラック': '🔥',
            'ソウルサンド': '💀',
            'グロウストーン': '✨',
            'ネザライト': '⚫💎',
            'エンドストーン': '🌕',
            'コーラスフルーツ': '🍇',
            'シュルカーシェル': '💜',
            'ドラゴンエッグ': '🥚✨',
            'stone': '⬜',
            'wood': '🟫',
            'iron': '🔸',
            'diamond': '💎'
        };
        return iconMap[itemName] || '📦';
    }

    getRarityClass(rarity) {
        return rarityConfig[rarity]?.class || 'common';
    }

    getRarityName(rarity) {
        return rarityConfig[rarity]?.name || 'コモン';
    }

    loadData() {
        const savedPlayerStats = localStorage.getItem('minecraftPlayerStats');
        if (savedPlayerStats) {
            this.playerStats = JSON.parse(savedPlayerStats);
        }

        const savedBiomeProgress = localStorage.getItem('minecraftBiomeProgress');
        if (savedBiomeProgress) {
            this.biomeProgress = JSON.parse(savedBiomeProgress);
        } else {
            this.initializeBiomeProgress();
        }
    }

    saveData() {
        localStorage.setItem('minecraftPlayerStats', JSON.stringify(this.playerStats));
        localStorage.setItem('minecraftBiomeProgress', JSON.stringify(this.biomeProgress));
    }
}
