// Minecraft-style biome blocks with their mood associations
const minecraftBlocks = {
    plains: {
        name: '平原バイオーム',
        blocks: [
            { name: '草ブロック', texture: '🟢', durability: 1, rarity: 'common', craftable: ['サバイバルシェルター'] },
            { name: '土ブロック', texture: '🟤', durability: 1, rarity: 'common', craftable: ['基本建材'] },
            { name: '石ブロック', texture: '⬜', durability: 3, rarity: 'common', craftable: ['石の道具'] },
            { name: '木材', texture: '🟫', durability: 2, rarity: 'common', craftable: ['木の道具', '作業台'] }
        ],
        mood: 'peaceful',
        color: '#7CB342'
    },
    forest: {
        name: '森林バイオーム',
        blocks: [
            { name: 'オークの原木', texture: '🌳', durability: 3, rarity: 'common', craftable: ['高級建材'] },
            { name: 'シラカバの原木', texture: '🌲', durability: 3, rarity: 'uncommon', craftable: ['装飾材'] },
            { name: '苗木', texture: '🌱', durability: 1, rarity: 'uncommon', craftable: ['森の再生'] },
            { name: 'キノコ', texture: '🍄', durability: 1, rarity: 'rare', craftable: ['魔法のポーション'] }
        ],
        mood: 'creative',
        color: '#4CAF50'
    },
    mountain: {
        name: '山岳バイオーム',
        blocks: [
            { name: '石炭鉱石', texture: '⚫', durability: 4, rarity: 'uncommon', craftable: ['燃料'] },
            { name: '鉄鉱石', texture: '🔸', durability: 5, rarity: 'uncommon', craftable: ['鉄の道具'] },
            { name: '金鉱石', texture: '🟡', durability: 6, rarity: 'rare', craftable: ['金の道具'] },
            { name: 'ダイヤモンド鉱石', texture: '💎', durability: 10, rarity: 'legendary', craftable: ['最強装備'] }
        ],
        mood: 'focused',
        color: '#795548'
    },
    ocean: {
        name: '海洋バイオーム',
        blocks: [
            { name: '海草', texture: '🌿', durability: 1, rarity: 'common', craftable: ['水中呼吸薬'] },
            { name: '珊瑚', texture: '🪸', durability: 2, rarity: 'uncommon', craftable: ['装飾品'] },
            { name: 'プリズマリン', texture: '💠', durability: 5, rarity: 'rare', craftable: ['海底神殿'] },
            { name: '海の心', texture: '💙', durability: 15, rarity: 'legendary', craftable: ['海神の力'] }
        ],
        mood: 'relaxed',
        color: '#03A9F4'
    },
    desert: {
        name: '砂漠バイオーム',
        blocks: [
            { name: '砂ブロック', texture: '🟨', durability: 1, rarity: 'common', craftable: ['ガラス'] },
            { name: 'サボテン', texture: '🌵', durability: 2, rarity: 'uncommon', craftable: ['染料'] },
            { name: '砂岩', texture: '🟧', durability: 3, rarity: 'uncommon', craftable: ['建築材'] },
            { name: 'エメラルド', texture: '💚', durability: 8, rarity: 'rare', craftable: ['交易アイテム'] }
        ],
        mood: 'energetic',
        color: '#FFC107'
    },
    nether: {
        name: 'ネザーバイオーム',
        blocks: [
            { name: 'ネザーラック', texture: '🔴', durability: 1, rarity: 'uncommon', craftable: ['永続燃焼'] },
            { name: 'グロウストーン', texture: '🟡', durability: 3, rarity: 'rare', craftable: ['明るい照明'] },
            { name: 'ネザークォーツ', texture: '⚪', durability: 5, rarity: 'rare', craftable: ['レッドストーン回路'] },
            { name: 'ネザライト', texture: '🖤', durability: 20, rarity: 'legendary', craftable: ['最終装備'] }
        ],
        mood: 'intense',
        color: '#D32F2F'
    },
    end: {
        name: 'エンドバイオーム',
        blocks: [
            { name: 'エンドストーン', texture: '🟢', durability: 4, rarity: 'rare', craftable: ['エンド建築'] },
            { name: 'コーラスフルーツ', texture: '🟣', durability: 2, rarity: 'rare', craftable: ['テレポート薬'] },
            { name: 'エンドロッド', texture: '⭐', durability: 6, rarity: 'rare', craftable: ['エンド照明'] },
            { name: 'ドラゴンエッグ', texture: '🥚', durability: 50, rarity: 'ultimate', craftable: ['ドラゴン召喚'] }
        ],
        mood: 'transcendent',
        color: '#9C27B0'
    },
    village: {
        name: '村バイオーム',
        blocks: [
            { name: '農作物', texture: '🌾', durability: 1, rarity: 'common', craftable: ['食料'] },
            { name: 'パン', texture: '🍞', durability: 1, rarity: 'common', craftable: ['回復アイテム'] },
            { name: '取引台', texture: '📦', durability: 5, rarity: 'uncommon', craftable: ['村人取引'] },
            { name: 'エンチャント本', texture: '📚', durability: 10, rarity: 'legendary', craftable: ['最強エンチャント'] }
        ],
        mood: 'social',
        color: '#8BC34A'
    },
    stronghold: {
        name: '要塞バイオーム',
        blocks: [
            { name: '石レンガ', texture: '🧱', durability: 4, rarity: 'uncommon', craftable: ['要塞建築'] },
            { name: 'エンダーアイ', texture: '👁️', durability: 8, rarity: 'rare', craftable: ['エンドポータル'] },
            { name: 'チェスト', texture: '📦', durability: 3, rarity: 'uncommon', craftable: ['ストレージ'] },
            { name: 'レアアイテム', texture: '✨', durability: 15, rarity: 'legendary', craftable: ['伝説装備'] }
        ],
        mood: 'adventurous',
        color: '#607D8B'
    }
};

class MinecraftVibeCrafting {
    constructor() {
        this.currentBiome = null;
        this.currentIntensity = 5;
        this.miningRecords = [];
        this.activeMining = new Map();
        
        // Minecraft-style game system properties
        this.biomeProgress = {};
        this.playerStats = {
            totalBlocks: 0,
            miningStreak: 0,
            lastMiningDate: null,
            achievements: [],
            totalExperience: 0,
            playerLevel: 1,
            health: 20,
            hunger: 20,
            inventory: {},
            tools: {
                pickaxe: { level: 'wood', durability: 59, efficiency: 1 },
                shovel: { level: 'wood', durability: 59, efficiency: 1 },
                axe: { level: 'wood', durability: 59, efficiency: 1 }
            }
        };

        // Advanced Minecraft creature system
        this.minecraftCreature = {
            name: 'スティーブ',
            level: 1,
            experience: 0,
            health: 20,
            hunger: 20,
            dimension: 'overworld', // overworld, nether, end
            gameMode: 'survival', // survival, creative, adventure, hardcore
            
            // Advanced survival mechanics
            stats: {
                miningSpeed: 1.0,
                damage: 2.0,
                defense: 0,
                luck: 0,
                efficiency: 1.0
            },
            
            // Equipment system
            equipment: {
                helmet: null,
                chestplate: null,
                leggings: null,
                boots: null,
                mainHand: { type: 'wooden_pickaxe', durability: 59 },
                offHand: null
            },
            
            // Enchantments system
            enchantments: {
                efficiency: 0,
                unbreaking: 0,
                fortune: 0,
                silkTouch: false,
                mending: false
            },
            
            // Achievements and progression
            achievements: {
                gettingWood: false,
                benchmarking: false,
                timeToMine: false,
                hotStuff: false,
                acquireHardware: false,
                diamonds: false,
                enterTheNether: false,
                theEnd: false
            },
            
            // World interaction
            worldData: {
                spawnPoint: { x: 0, y: 64, z: 0 },
                currentPosition: { x: 0, y: 64, z: 0 },
                exploredBiomes: ['plains'],
                structuresFound: [],
                mobsEncountered: [],
                timePlayed: 0
            },
            
            // Creative building system
            buildingProjects: [],
            redstoneKnowledge: 0,
            farmingLevel: 0,
            combatLevel: 0,
            
            // Multiplayer-like features
            friendship: {
                villagers: 0,
                traded: 0,
                rescued: 0
            }
        };

        // Crafting recipes system
        this.craftingRecipes = {
            'wooden_pickaxe': {
                materials: { '木材': 3, '棒': 2 },
                result: { type: 'tool', name: 'wooden_pickaxe', durability: 59 },
                category: 'tools'
            },
            'stone_pickaxe': {
                materials: { '石ブロック': 3, '棒': 2 },
                result: { type: 'tool', name: 'stone_pickaxe', durability: 131 },
                category: 'tools'
            },
            'iron_pickaxe': {
                materials: { '鉄鉱石': 3, '棒': 2 },
                result: { type: 'tool', name: 'iron_pickaxe', durability: 250 },
                category: 'tools'
            },
            'diamond_pickaxe': {
                materials: { 'ダイヤモンド鉱石': 3, '棒': 2 },
                result: { type: 'tool', name: 'diamond_pickaxe', durability: 1561 },
                category: 'tools'
            },
            'chest': {
                materials: { '木材': 8 },
                result: { type: 'storage', name: 'chest', slots: 27 },
                category: 'utility'
            },
            'furnace': {
                materials: { '石ブロック': 8 },
                result: { type: 'processing', name: 'furnace' },
                category: 'utility'
            },
            'crafting_table': {
                materials: { '木材': 4 },
                result: { type: 'utility', name: 'crafting_table' },
                category: 'utility'
            }
        };

        // Advanced building projects
        this.buildingTemplates = {
            'starter_house': {
                name: 'スターターハウス',
                materials: { '木材': 50, '石ブロック': 20, 'ガラス': 10 },
                difficulty: 1,
                reward: { experience: 100, achievement: 'first_home' }
            },
            'farm': {
                name: '自動農場',
                materials: { '土ブロック': 30, '水': 5, '種': 10, 'レッドストーン': 5 },
                difficulty: 3,
                reward: { experience: 300, unlocks: 'advanced_farming' }
            },
            'castle': {
                name: '古城',
                materials: { '石レンガ': 500, '鉄ブロック': 50, 'ガラス': 100 },
                difficulty: 8,
                reward: { experience: 2000, title: 'castle_lord' }
            },
            'redstone_computer': {
                name: 'レッドストーンコンピューター',
                materials: { 'レッドストーン': 200, '石ブロック': 100, 'リピーター': 50 },
                difficulty: 10,
                reward: { experience: 5000, achievement: 'redstone_engineer' }
            }
        };

        // Mob and creature interactions
        this.mobEncounters = {
            'zombie': { hostile: true, drops: ['腐った肉'], experience: 5 },
            'skeleton': { hostile: true, drops: ['骨', '矢'], experience: 5 },
            'creeper': { hostile: true, drops: ['火薬'], experience: 5 },
            'enderman': { hostile: true, drops: ['エンダーパール'], experience: 5 },
            'villager': { hostile: false, trades: true, experience: 2 },
            'cow': { hostile: false, drops: ['生の牛肉', '革'], experience: 1 },
            'pig': { hostile: false, drops: ['生の豚肉'], experience: 1 }
        };

        // Theme-related properties
        this.themeSelector = document.getElementById('themeSelector');
        this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }
        this.achievements = [];
        
        // Theme-related properties
        this.themeSelector = document.getElementById('themeSelector');
        this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadMoodData();
        const preferredTheme = this.loadThemePreference();
        this.applyTheme(preferredTheme);
    }

    // Data Management Methods
    loadMoodData() {
        const savedRecords = localStorage.getItem('moodRecords');
        const savedMoodLevels = localStorage.getItem('moodLevels');
        const savedUserStats = localStorage.getItem('userStats');
        const savedAchievements = localStorage.getItem('achievements');
        const savedVirtualPet = localStorage.getItem('virtualPet');
        
        if (savedRecords) {
            this.moodRecords = JSON.parse(savedRecords);
        }
        
        
        if (savedMoodLevels) {
            this.moodLevels = JSON.parse(savedMoodLevels);
        }
        
        if (savedUserStats) {
            this.userStats = { ...this.userStats, ...JSON.parse(savedUserStats) };
        }
        
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }
        
        if (savedVirtualPet) {
            this.virtualPet = { ...this.virtualPet, ...JSON.parse(savedVirtualPet) };
        }
        
        // 初期化：全ての気分のレベルを設定
        this.initializeMoodLevels();
    }

    saveMoodData() {
        localStorage.setItem('moodRecords', JSON.stringify(this.moodRecords));
        localStorage.setItem('moodLevels', JSON.stringify(this.moodLevels));
        localStorage.setItem('userStats', JSON.stringify(this.userStats));
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
        localStorage.setItem('virtualPet', JSON.stringify(this.virtualPet));
        localStorage.setItem('specialEvolutions', JSON.stringify(this.specialEvolutions));
        localStorage.setItem('breedingAchievements', JSON.stringify(this.breedingAchievements));
    }

    initializeMoodLevels() {
        // デフォルト気分のレベル初期化
        Object.keys(moodColorMap).forEach(mood => {
            if (!this.moodLevels[mood]) {
                this.moodLevels[mood] = {
                    level: 1,
                    experience: 0,
                    usageCount: 0,
                    unlocked: true
                };
            }
        });
        
    }

    addMoodRecord(moodData) {
        this.moodRecords.push({
            ...moodData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        
        // 育成システムの更新
        this.updateMoodExperience(moodData);
        this.updateUserStats();
        this.checkAchievements();
        
        // バーチャルペットの更新
        this.feedVirtualPet(moodData);
        
        this.saveMoodData();
    }

    // 育成システムのメソッド
    updateMoodExperience(moodData) {
        const moods = moodData.moods ? moodData.moods.map(m => m.type) : [moodData.mood];
        
        moods.forEach(mood => {
            if (this.moodLevels[mood]) {
                // 経験値とレベルアップの計算
                const baseExp = 10;
                const intensityBonus = Math.floor(this.currentIntensity * 2);
                const durationBonus = moodData.duration ? Math.floor(moodData.duration / 5) : 0;
                const totalExp = baseExp + intensityBonus + durationBonus;
                
                this.moodLevels[mood].experience += totalExp;
                this.moodLevels[mood].usageCount++;
                this.userStats.totalExperience += totalExp;
                
                // レベルアップチェック
                this.checkLevelUp(mood);
            }
        });
    }

    checkLevelUp(mood) {
        const moodLevel = this.moodLevels[mood];
        const requiredExp = this.getRequiredExperience(moodLevel.level);
        
        if (moodLevel.experience >= requiredExp) {
            moodLevel.level++;
            moodLevel.experience -= requiredExp;
            this.showLevelUpNotification(mood, moodLevel.level);
            
            // レベルアップ報酬
            this.grantLevelUpReward(mood, moodLevel.level);
        }
    }

    getRequiredExperience(level) {
        return Math.floor(100 * Math.pow(1.5, level - 1));
    }

    showLevelUpNotification(mood, newLevel) {
        const moodName = moodColorMap[mood]?.name || mood;
        const notification = document.getElementById('copyNotification');
        notification.textContent = `🎉 ${moodName} がレベル ${newLevel} にアップしました！`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 3000);
    }

    grantLevelUpReward(mood, level) {
        // レベルアップ報酬の処理
        if (level % 5 === 0) {
            // 5レベルごとに新しい色を解放
            this.unlockNewColor(mood);
        }
        
        if (level === 10) {
            // レベル10で特別なバッジを獲得
            this.unlockBadge(`${mood}_master`, `${moodColorMap[mood]?.name || mood}マスター`);
        }
    }

    unlockNewColor(mood) {
        // 新しい色のバリエーションを追加（実装例）
        const notification = document.getElementById('copyNotification');
        notification.textContent = `🎨 新しい色のバリエーションが解放されました！`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 3000);
    }

    unlockBadge(badgeId, badgeName) {
        if (!this.userStats.badges.includes(badgeId)) {
            this.userStats.badges.push(badgeId);
            
            const notification = document.getElementById('copyNotification');
            notification.textContent = `🏆 バッジ獲得: ${badgeName}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                notification.textContent = 'カラーコードをコピーしました！';
            }, 3000);
        }
    }

    updateUserStats() {
        this.userStats.totalRecords++;
        
        // 連続記録日数の更新
        const today = new Date().toDateString();
        const lastRecord = this.userStats.lastRecordDate;
        
        if (lastRecord) {
            const lastDate = new Date(lastRecord).toDateString();
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
            
            if (lastDate === yesterday) {
                // 昨日記録していた場合、ストリーク継続
                this.userStats.streakDays++;
            } else if (lastDate !== today) {
                // 昨日記録していない場合、ストリークリセット
                this.userStats.streakDays = 1;
            }
            // 今日既に記録している場合は何もしない
        } else {
            // 初回記録
            this.userStats.streakDays = 1;
        }
        
        this.userStats.lastRecordDate = today;
    }

    checkAchievements() {
        const achievements = [
            {
                id: 'first_record',
                name: '初回記録',
                description: '初めて気分を記録しました',
                condition: () => this.userStats.totalRecords >= 1
            },
            {
                id: 'week_streak',
                name: '一週間継続',
                description: '7日間連続で記録しました',
                condition: () => this.userStats.streakDays >= 7
            },
            {
                id: 'month_streak',
                name: '一ヶ月継続',
                description: '30日間連続で記録しました',
                condition: () => this.userStats.streakDays >= 30
            },
            {
                id: 'experience_master',
                name: '経験値マスター',
                description: '総経験値1000を達成しました',
                condition: () => this.userStats.totalExperience >= 1000
            },
            {
                id: 'mood_explorer',
                name: '気分探検家',
                description: '5種類以上の気分を記録しました',
                condition: () => Object.keys(this.moodLevels).filter(mood => this.moodLevels[mood].usageCount > 0).length >= 5
            }
        ];

        achievements.forEach(achievement => {
            if (!this.achievements.includes(achievement.id) && achievement.condition()) {
                this.achievements.push(achievement.id);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.getElementById('copyNotification');
        notification.textContent = `🏅 達成: ${achievement.name} - ${achievement.description}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 4000);
    }

    // Theme Methods
    applyTheme(theme) {
        let activeTheme = theme;
        if (theme === 'system') {
            activeTheme = this.darkModeMediaQuery.matches ? 'dark' : 'light';
        }
        document.documentElement.dataset.theme = activeTheme;
        if (this.themeSelector) {
            this.themeSelector.value = theme; // Keep selector on "system" if that's the choice
        }
    }

    saveThemePreference(theme) {
        localStorage.setItem('themePreference', theme);
    }

    loadThemePreference() {
        return localStorage.getItem('themePreference') || 'system';
    }

    bindEvents() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleMoodSelection(e.target.dataset.mood);
            });
        });

        // Theme events
        if (this.themeSelector) {
            this.themeSelector.addEventListener('change', (e) => {
                const selectedTheme = e.target.value;
                this.saveThemePreference(selectedTheme);
                this.applyTheme(selectedTheme);
            });
        }

        this.darkModeMediaQuery.addEventListener('change', (e) => {
            const currentPreference = this.loadThemePreference();
            if (currentPreference === 'system') {
                this.applyTheme('system');
            }
        });

        // Integrity slider events
        const intensitySlider = document.getElementById('intensitySlider');
        const intensityValue = document.getElementById('intensityValue');
        if (intensitySlider && intensityValue) {
            intensitySlider.addEventListener('input', (e) => {
                this.currentIntensity = parseInt(e.target.value);
                intensityValue.textContent = this.currentIntensity;
                this.updateColorIntensity();
            });
        }

        // Multiple mood events
        const enableMultipleMoods = document.getElementById('enableMultipleMoods');
        if (enableMultipleMoods) {
            enableMultipleMoods.addEventListener('change', (e) => {
                this.toggleMultipleMoodMode(e.target.checked);
            });
        }

        // Duration tracking events
        const startTrackingBtn = document.getElementById('startTracking');
        const stopTrackingBtn = document.getElementById('stopTracking');
        if (startTrackingBtn && stopTrackingBtn) {
            startTrackingBtn.addEventListener('click', () => this.startDurationTracking());
            stopTrackingBtn.addEventListener('click', () => this.stopDurationTracking());
        }

        // Record mood events
        const recordMoodBtn = document.getElementById('recordMood');
        if (recordMoodBtn) {
            recordMoodBtn.addEventListener('click', () => this.recordCurrentMood());
        }

        // Minigame events
        const startFeedingGame = document.getElementById('startFeedingGame');
        const startMusicGame = document.getElementById('startMusicGame');
        const startMemoryGame = document.getElementById('startMemoryGame');
        const startTreasureHunt = document.getElementById('startTreasureHunt');
        const exitGame = document.getElementById('exitGame');
        
        if (startFeedingGame) {
            startFeedingGame.addEventListener('click', () => this.startMinigame('feeding'));
        }
        
        if (startMusicGame) {
            startMusicGame.addEventListener('click', () => this.startMinigame('music'));
        }
        
        if (startMemoryGame) {
            startMemoryGame.addEventListener('click', () => this.startMinigame('memory'));
        }
        
        if (startTreasureHunt) {
            startTreasureHunt.addEventListener('click', () => this.startMinigame('treasure'));
        }
        
        if (exitGame) {
            exitGame.addEventListener('click', () => this.exitMinigame());
        }

        // Growth system events
        const toggleGrowthStats = document.getElementById('toggleGrowthStats');
        if (toggleGrowthStats) {
            toggleGrowthStats.addEventListener('click', () => this.toggleGrowthSystemDisplay());
        }

        // Virtual pet events
        const feedPetBtn = document.getElementById('feedPetBtn');
        const playWithPetBtn = document.getElementById('playWithPetBtn');
        const talkToPetBtn = document.getElementById('talkToPetBtn');
        const petInfoBtn = document.getElementById('petInfoBtn');
        const petCharacter = document.getElementById('petCharacter');
        
        if (feedPetBtn) {
            feedPetBtn.addEventListener('click', () => this.feedPetManually());
        }
        
        if (playWithPetBtn) {
            playWithPetBtn.addEventListener('click', () => this.playWithPet());
        }
        
        if (talkToPetBtn) {
            talkToPetBtn.addEventListener('click', () => this.startConversation());
        }
        
        if (petInfoBtn) {
            petInfoBtn.addEventListener('click', () => this.showPetInfo());
        }
        
        if (petCharacter) {
            petCharacter.addEventListener('click', () => this.petCharacterClicked());
        }

        // Load systems on init
        this.renderGrowthSystem();
        this.renderVirtualPet();
        this.startPetLifeCycle();
        this.initializeMinigames();
    }

    handleMoodSelection(mood) {
        this.currentMood = mood;
        this.updateActiveButton(mood);
        this.displayColorPalette(mood);
        this.showAdvancedOptions();
    }

    updateActiveButton(selectedMood) {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.mood === selectedMood) {
                button.classList.add('active');
            }
        });
    }

    displayColorPalette(mood) {
        const paletteData = moodColorMap[mood];
        const paletteSection = document.getElementById('colorPalette');
        const paletteTitle = document.getElementById('paletteTitle');
        const colorGrid = document.getElementById('colorGrid');

        paletteTitle.textContent = `${paletteData.name}のカラーパレット`;
        
        colorGrid.innerHTML = '';
        
        paletteData.colors.forEach(color => {
            const colorCard = this.createColorCard(color);
            colorGrid.appendChild(colorCard);
        });

        paletteSection.classList.add('show');
    }

    createColorCard(color) {
        const card = document.createElement('div');
        card.className = 'color-card';
        card.addEventListener('click', () => this.copyColorCode(color.hex));

        card.innerHTML = `
            <div class="color-sample" style="background-color: ${color.hex}"></div>
            <div class="color-info">
                <div class="color-code">${color.hex}</div>
                <div class="color-name">${color.name}</div>
            </div>
        `;

        return card;
    }

    copyColorCode(colorCode) {
        navigator.clipboard.writeText(colorCode).then(() => {
            this.showCopyNotification();
        }).catch(err => {
            console.error('コピーに失敗しました: ', err);
        });
    }

    showCopyNotification() {
        const notification = document.getElementById('copyNotification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // New Feature Methods

    showAdvancedOptions() {
        const intensitySection = document.getElementById('intensitySection');
        const multipleMoodSection = document.getElementById('multipleMoodSection');
        const durationSection = document.getElementById('durationSection');
        const recordSection = document.getElementById('recordSection');

        [intensitySection, multipleMoodSection, durationSection, recordSection].forEach(section => {
            if (section) {
                section.style.display = 'block';
            }
        });
    }

    updateColorIntensity() {
        if (!this.currentMood) return;

        const colorCards = document.querySelectorAll('.color-sample');
        const opacity = 0.3 + (0.7 * this.currentIntensity / 10);
        
        colorCards.forEach(card => {
            card.style.opacity = opacity;
        });
    }

    // Multiple Mood Selection Methods
    toggleMultipleMoodMode(enabled) {
        const moodCheckboxes = document.getElementById('moodCheckboxes');
        const primaryMoodSelector = document.getElementById('primaryMoodSelector');
        
        if (enabled) {
            this.generateMoodCheckboxes();
            moodCheckboxes.style.display = 'grid';
            primaryMoodSelector.style.display = 'block';
        } else {
            moodCheckboxes.style.display = 'none';
            primaryMoodSelector.style.display = 'none';
        }
    }

    generateMoodCheckboxes() {
        const moodCheckboxes = document.getElementById('moodCheckboxes');
        const primaryMoodSelect = document.getElementById('primaryMoodSelect');
        
        moodCheckboxes.innerHTML = '';
        primaryMoodSelect.innerHTML = '<option value="">選択してください</option>';

        // Add default moods only
        Object.entries(moodColorMap).forEach(([key, data]) => {
            // Create checkbox
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'mood-checkbox';
            checkboxDiv.innerHTML = `
                <input type="checkbox" value="${key}" id="mood-${key}">
                <span class="mood-icon">${this.getMoodEmoji(key)}</span>
                <span class="mood-name">${data.name}</span>
            `;
            moodCheckboxes.appendChild(checkboxDiv);

            // Add to primary selector
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data.name;
            primaryMoodSelect.appendChild(option);
        });
    }

    getMoodEmoji(mood) {
        const emojiMap = {
            happy: '😊',
            relax: '😌',
            energetic: '⚡',
            melancholy: '😔',
            creative: '🎨',
            romantic: '💕',
            focus: '🎯',
            peace: '🕊️',
            tough: '💦'
        };
        return emojiMap[mood] || '😊';
    }

    getSelectedMoods() {
        const checkboxes = document.querySelectorAll('#moodCheckboxes input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Duration Tracking Methods
    startDurationTracking() {
        if (!this.currentMood) {
            alert('先に気分を選択してください');
            return;
        }

        const startTime = new Date();
        this.activeDurations.set(this.currentMood, {
            startTime: startTime,
            interval: null
        });

        const startBtn = document.getElementById('startTracking');
        const stopBtn = document.getElementById('stopTracking');
        
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';

        // Start timer
        const interval = setInterval(() => this.updateDurationDisplay(), 1000);
        this.activeDurations.get(this.currentMood).interval = interval;
    }

    stopDurationTracking() {
        if (!this.currentMood || !this.activeDurations.has(this.currentMood)) {
            return;
        }

        const durationData = this.activeDurations.get(this.currentMood);
        const endTime = new Date();
        const durationMinutes = Math.floor((endTime - durationData.startTime) / 1000 / 60);

        // Clear interval
        clearInterval(durationData.interval);
        this.activeDurations.delete(this.currentMood);

        // Update UI
        const startBtn = document.getElementById('startTracking');
        const stopBtn = document.getElementById('stopTracking');
        
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';

        // Store duration
        this.currentDuration = durationMinutes;
        document.getElementById('currentDuration').textContent = '00:00';
    }

    updateDurationDisplay() {
        if (!this.currentMood || !this.activeDurations.has(this.currentMood)) {
            return;
        }

        const durationData = this.activeDurations.get(this.currentMood);
        const now = new Date();
        const elapsed = Math.floor((now - durationData.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('currentDuration').textContent = display;
    }

    // Record Mood Method
    recordCurrentMood() {
        if (!this.currentMood) {
            alert('先に気分を選択してください');
            return;
        }

        const enableMultipleMoods = document.getElementById('enableMultipleMoods');
        let moodData;

        if (enableMultipleMoods && enableMultipleMoods.checked) {
            const selectedMoods = this.getSelectedMoods();
            const primaryMood = document.getElementById('primaryMoodSelect').value;
            
            if (selectedMoods.length === 0) {
                alert('複数気分モードでは少なくとも1つの気分を選択してください');
                return;
            }

            moodData = {
                moods: selectedMoods.map(mood => ({
                    type: mood,
                    weight: mood === primaryMood ? 0.7 : 0.3 / (selectedMoods.length - 1),
                    isPrimary: mood === primaryMood
                })),
                intensity: this.currentIntensity,
                duration: this.currentDuration || null,
                compositeColor: this.generateCompositeColor(selectedMoods)
            };
        } else {
            moodData = {
                mood: this.currentMood,
                intensity: this.currentIntensity,
                duration: this.currentDuration || null
            };
        }

        this.addMoodRecord(moodData);
        this.showRecordNotification();
    }

    generateCompositeColor(moods) {
        // Simple color blending - average the hex values
        const colors = moods.map(mood => {
            const moodData = moodColorMap[mood];
            return moodData ? moodData.colors[0].hex : '#888888';
        });

        // Convert hex to RGB, average, convert back
        const rgbValues = colors.map(hex => {
            const r = parseInt(hex.substr(1, 2), 16);
            const g = parseInt(hex.substr(3, 2), 16);
            const b = parseInt(hex.substr(5, 2), 16);
            return { r, g, b };
        });

        const avgR = Math.round(rgbValues.reduce((sum, rgb) => sum + rgb.r, 0) / rgbValues.length);
        const avgG = Math.round(rgbValues.reduce((sum, rgb) => sum + rgb.g, 0) / rgbValues.length);
        const avgB = Math.round(rgbValues.reduce((sum, rgb) => sum + rgb.b, 0) / rgbValues.length);

        return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
    }

    showRecordNotification() {
        const notification = document.getElementById('copyNotification');
        notification.textContent = '気分を記録しました！';
        notification.classList.add('show');
        
        // エフェクト効果を追加
        this.createParticleEffect();
        this.showPetAnimation('super-happy');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 2000);
    }

    // Minigame System
    initializeMinigames() {
        this.currentGame = null;
        this.gameScore = 0;
        this.gameData = {};
    }

    startMinigame(gameType) {
        this.currentGame = gameType;
        this.gameScore = 0;
        
        const minigamePlayArea = document.getElementById('minigamePlayArea');
        const gameContent = document.getElementById('gameContent');
        const gameControls = document.getElementById('gameControls');
        
        minigamePlayArea.style.display = 'block';
        
        switch(gameType) {
            case 'feeding':
                this.startFeedingGame(gameContent, gameControls);
                break;
            case 'music':
                this.startMusicGame(gameContent, gameControls);
                break;
            case 'memory':
                this.startMemoryGame(gameContent, gameControls);
                break;
            case 'treasure':
                this.startTreasureGame(gameContent, gameControls);
                break;
        }
    }

    startFeedingGame(content, controls) {
        content.innerHTML = `
            <h3>🍎 おやつタイム</h3>
            <p>ムードちゃんがお腹を空かせています！タイミングよくおやつをあげよう！</p>
            <div class="feeding-target" id="feedingTarget">
                <div class="pet-hungry">${this.getPetCharacterByStage(this.virtualPet.stage)}</div>
                <div class="food-meter">
                    <div class="food-bar" id="foodBar"></div>
                </div>
            </div>
        `;
        
        controls.innerHTML = `
            <button class="game-action-btn" id="feedBtn">🍎 おやつをあげる</button>
            <div class="game-score">スコア: <span id="gameScore">0</span></div>
        `;

        let targetZone = Math.random() * 80 + 10; // 10-90%の範囲
        let currentPosition = 0;
        let direction = 1;
        
        const gameInterval = setInterval(() => {
            currentPosition += direction * 2;
            if (currentPosition >= 100) {
                currentPosition = 100;
                direction = -1;
            } else if (currentPosition <= 0) {
                currentPosition = 0;
                direction = 1;
            }
            
            document.getElementById('foodBar').style.width = currentPosition + '%';
        }, 50);

        document.getElementById('feedBtn').addEventListener('click', () => {
            clearInterval(gameInterval);
            const accuracy = 100 - Math.abs(currentPosition - targetZone);
            const points = Math.floor(accuracy);
            this.gameScore += points;
            
            document.getElementById('gameScore').textContent = this.gameScore;
            
            if (accuracy > 80) {
                this.showSuccessEffect('Perfect! 🌟');
                this.showPetAnimation('feeding');
            } else if (accuracy > 60) {
                this.showSuccessEffect('Good! ✨');
            } else {
                this.showSuccessEffect('Try again! 💫');
            }
            
            setTimeout(() => {
                this.endMinigame();
            }, 2000);
        });
    }

    startMusicGame(content, controls) {
        content.innerHTML = `
            <h3>🎵 リズムダンス</h3>
            <p>音楽に合わせてボタンを押そう！</p>
            <div class="music-notes" id="musicNotes">
                <div class="note-track">
                    <div class="note-line"></div>
                    <div class="note-target">🎯</div>
                </div>
            </div>
        `;
        
        controls.innerHTML = `
            <button class="game-action-btn music-btn" id="rhythmBtn">🎵 Hit!</button>
            <div class="game-score">スコア: <span id="gameScore">0</span></div>
        `;

        this.showPetAnimation('music-animation');
        
        let noteSpeed = 3;
        let notes = [];
        
        const createNote = () => {
            const note = {
                position: -50,
                id: Date.now()
            };
            notes.push(note);
            
            const noteElement = document.createElement('div');
            noteElement.className = 'falling-note';
            noteElement.textContent = '♪';
            noteElement.style.left = note.position + 'px';
            document.getElementById('musicNotes').appendChild(noteElement);
        };

        const gameInterval = setInterval(() => {
            if (Math.random() < 0.3) createNote();
            
            notes.forEach(note => {
                note.position += noteSpeed;
            });
            
            document.querySelectorAll('.falling-note').forEach((element, index) => {
                element.style.left = notes[index]?.position + 'px';
            });
        }, 100);

        document.getElementById('rhythmBtn').addEventListener('click', () => {
            const hitNotes = notes.filter(note => note.position >= 180 && note.position <= 220);
            if (hitNotes.length > 0) {
                this.gameScore += 10;
                this.showSuccessEffect('Hit! 🎵');
            }
            
            document.getElementById('gameScore').textContent = this.gameScore;
        });

        setTimeout(() => {
            clearInterval(gameInterval);
            this.endMinigame();
        }, 10000);
    }

    startMemoryGame(content, controls) {
        content.innerHTML = `
            <h3>🧠 記憶ゲーム</h3>
            <p>光る順番を覚えて、同じ順番でクリックしよう！</p>
            <div class="memory-grid" id="memoryGrid">
                <div class="memory-cell" data-id="0"></div>
                <div class="memory-cell" data-id="1"></div>
                <div class="memory-cell" data-id="2"></div>
                <div class="memory-cell" data-id="3"></div>
            </div>
        `;
        
        controls.innerHTML = `
            <button class="game-action-btn" id="startSequence">シーケンス開始</button>
            <div class="game-score">レベル: <span id="gameScore">1</span></div>
        `;

        this.gameData.sequence = [];
        this.gameData.playerSequence = [];
        this.gameData.level = 1;

        document.getElementById('startSequence').addEventListener('click', () => {
            this.playMemorySequence();
        });

        document.querySelectorAll('.memory-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                this.handleMemoryClick(parseInt(e.target.dataset.id));
            });
        });

        this.playMemorySequence();
    }

    playMemorySequence() {
        this.gameData.sequence.push(Math.floor(Math.random() * 4));
        this.gameData.playerSequence = [];
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < this.gameData.sequence.length) {
                const cellId = this.gameData.sequence[index];
                const cell = document.querySelector(`[data-id="${cellId}"]`);
                cell.classList.add('memory-active');
                
                setTimeout(() => {
                    cell.classList.remove('memory-active');
                }, 500);
                
                index++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }

    handleMemoryClick(cellId) {
        this.gameData.playerSequence.push(cellId);
        
        const currentIndex = this.gameData.playerSequence.length - 1;
        
        if (this.gameData.playerSequence[currentIndex] !== this.gameData.sequence[currentIndex]) {
            this.showSuccessEffect('Game Over! 🎮');
            setTimeout(() => this.endMinigame(), 1500);
            return;
        }
        
        if (this.gameData.playerSequence.length === this.gameData.sequence.length) {
            this.gameData.level++;
            this.gameScore += 10;
            document.getElementById('gameScore').textContent = this.gameData.level;
            this.showSuccessEffect('Perfect! 🌟');
            
            setTimeout(() => {
                this.playMemorySequence();
            }, 1000);
        }
    }

    startTreasureGame(content, controls) {
        content.innerHTML = `
            <h3>🎁 宝探し</h3>
            <p>隠された宝箱を見つけよう！</p>
            <div class="treasure-grid" id="treasureGrid">
                ${Array.from({length: 9}, (_, i) => 
                    `<div class="treasure-cell" data-id="${i}">❓</div>`
                ).join('')}
            </div>
        `;
        
        controls.innerHTML = `
            <div class="game-score">見つけた宝: <span id="gameScore">0</span></div>
            <div class="attempts">残り試行: <span id="attemptsLeft">5</span></div>
        `;

        this.gameData.treasurePosition = Math.floor(Math.random() * 9);
        this.gameData.attemptsLeft = 5;

        document.querySelectorAll('.treasure-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                this.handleTreasureClick(parseInt(e.target.dataset.id), e.target);
            });
        });
    }

    handleTreasureClick(cellId, element) {
        if (element.classList.contains('revealed')) return;
        
        element.classList.add('revealed');
        this.gameData.attemptsLeft--;
        
        if (cellId === this.gameData.treasurePosition) {
            element.textContent = '🏆';
            element.classList.add('treasure-found');
            this.gameScore += 50;
            this.showSuccessEffect('Treasure Found! 🏆');
            setTimeout(() => this.endMinigame(), 2000);
        } else {
            element.textContent = '💣';
            document.getElementById('attemptsLeft').textContent = this.gameData.attemptsLeft;
            
            if (this.gameData.attemptsLeft <= 0) {
                document.querySelector(`[data-id="${this.gameData.treasurePosition}"]`).textContent = '🏆';
                this.showSuccessEffect('Game Over! 💣');
                setTimeout(() => this.endMinigame(), 2000);
            }
        }
    }

    showSuccessEffect(message) {
        const effect = document.createElement('div');
        effect.className = 'success-effect';
        effect.textContent = message;
        document.getElementById('gameContent').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    endMinigame() {
        const reward = Math.floor(this.gameScore / 10);
        this.virtualPet.experience += reward;
        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 15);
        this.virtualPet.relationship = Math.min(100, this.virtualPet.relationship + 5);
        
        this.updatePetMessage(`ゲームクリア！${reward}経験値をゲットしました！`);
        this.checkPetLevelUp();
        this.updatePetStats();
        this.saveMoodData();
        
        setTimeout(() => {
            this.exitMinigame();
        }, 2000);
    }

    exitMinigame() {
        document.getElementById('minigamePlayArea').style.display = 'none';
        this.currentGame = null;
        this.gameScore = 0;
        this.gameData = {};
    }

    createParticleEffect() {
        const petCharacter = document.getElementById('petCharacter');
        const rect = petCharacter.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = (rect.left + rect.width/2) + 'px';
            particle.style.top = (rect.top + rect.height/2) + 'px';
            particle.style.animationDelay = (i * 0.1) + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    // Growth System Display Methods
    toggleGrowthSystemDisplay() {
        const moodLevelsDisplay = document.getElementById('moodLevelsDisplay');
        const achievementsDisplay = document.getElementById('achievementsDisplay');
        const badgesDisplay = document.getElementById('badgesDisplay');
        
        const isVisible = moodLevelsDisplay.style.display !== 'none';
        
        if (isVisible) {
            moodLevelsDisplay.style.display = 'none';
            achievementsDisplay.style.display = 'none';
            badgesDisplay.style.display = 'none';
            document.getElementById('toggleGrowthStats').textContent = '統計を表示';
        } else {
            moodLevelsDisplay.style.display = 'block';
            achievementsDisplay.style.display = 'block';
            badgesDisplay.style.display = 'block';
            document.getElementById('toggleGrowthStats').textContent = '統計を非表示';
            this.renderMoodLevels();
            this.renderAchievements();
            this.renderBadges();
        }
    }

    renderGrowthSystem() {
        this.renderUserStats();
        this.initializeMoodLevels();
    }

    renderUserStats() {
        document.getElementById('totalRecordsDisplay').textContent = this.userStats.totalRecords;
        document.getElementById('streakDaysDisplay').textContent = this.userStats.streakDays;
        document.getElementById('totalExperienceDisplay').textContent = this.userStats.totalExperience;
        document.getElementById('badgesCountDisplay').textContent = this.userStats.badges.length;
    }

    renderMoodLevels() {
        const moodLevelGrid = document.getElementById('moodLevelGrid');
        moodLevelGrid.innerHTML = '';

        // デフォルト気分のレベル表示
        Object.entries(moodColorMap).forEach(([mood, data]) => {
            const moodLevelData = this.moodLevels[mood] || { level: 1, experience: 0, usageCount: 0 };
            const card = this.createMoodLevelCard(mood, data.name, this.getMoodEmoji(mood), moodLevelData);
            moodLevelGrid.appendChild(card);
        });

    }

    createMoodLevelCard(moodId, moodName, emoji, levelData) {
        const card = document.createElement('div');
        card.className = 'mood-level-card';
        
        const requiredExp = this.getRequiredExperience(levelData.level);
        const progressPercent = Math.min((levelData.experience / requiredExp) * 100, 100);
        
        card.innerHTML = `
            <div class="mood-level-header">
                <span class="mood-emoji">${emoji}</span>
                <span class="mood-name">${moodName}</span>
                <span class="mood-level">Lv.${levelData.level}</span>
            </div>
            <div class="mood-level-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="progress-text">${levelData.experience}/${requiredExp} EXP</div>
            </div>
            <div class="mood-level-stats">
                <span class="usage-count">使用回数: ${levelData.usageCount}</span>
            </div>
        `;
        
        return card;
    }

    renderAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';

        const allAchievements = [
            {
                id: 'first_record',
                name: '初回記録',
                description: '初めて気分を記録しました',
                icon: '🌱',
                condition: () => this.userStats.totalRecords >= 1
            },
            {
                id: 'week_streak',
                name: '一週間継続',
                description: '7日間連続で記録しました',
                icon: '🔥',
                condition: () => this.userStats.streakDays >= 7
            },
            {
                id: 'month_streak',
                name: '一ヶ月継続',
                description: '30日間連続で記録しました',
                icon: '💪',
                condition: () => this.userStats.streakDays >= 30
            },
            {
                id: 'experience_master',
                name: '経験値マスター',
                description: '総経験値1000を達成しました',
                icon: '⭐',
                condition: () => this.userStats.totalExperience >= 1000
            },
            {
                id: 'mood_explorer',
                name: '気分探検家',
                description: '5種類以上の気分を記録しました',
                icon: '🎭',
                condition: () => Object.keys(this.moodLevels).filter(mood => this.moodLevels[mood].usageCount > 0).length >= 5
            }
        ];

        allAchievements.forEach(achievement => {
            const isUnlocked = this.achievements.includes(achievement.id);
            const canUnlock = achievement.condition();
            
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : canUnlock ? 'available' : 'locked'}`;
            
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
                <div class="achievement-status">
                    ${isUnlocked ? '✅' : canUnlock ? '🎯' : '🔒'}
                </div>
            `;
            
            achievementsGrid.appendChild(card);
        });
    }

    renderBadges() {
        const badgesGrid = document.getElementById('badgesGrid');
        badgesGrid.innerHTML = '';

        const allBadges = [
            { id: 'happy_master', name: 'ハッピーマスター', icon: '😊', description: 'ハッピー気分でレベル10達成' },
            { id: 'relax_master', name: 'リラックスマスター', icon: '😌', description: 'リラックス気分でレベル10達成' },
            { id: 'energetic_master', name: 'エネルギッシュマスター', icon: '⚡', description: 'エネルギッシュ気分でレベル10達成' },
            { id: 'melancholy_master', name: 'メランコリーマスター', icon: '😔', description: 'メランコリー気分でレベル10達成' },
            { id: 'creative_master', name: 'クリエイティブマスター', icon: '🎨', description: 'クリエイティブ気分でレベル10達成' },
            { id: 'romantic_master', name: 'ロマンチックマスター', icon: '💕', description: 'ロマンチック気分でレベル10達成' },
            { id: 'focus_master', name: '集中マスター', icon: '🎯', description: '集中気分でレベル10達成' },
            { id: 'peace_master', name: '平穏マスター', icon: '🕊️', description: '平穏気分でレベル10達成' },
            { id: 'tough_master', name: 'しんどいマスター', icon: '💦', description: 'しんどい気分でレベル10達成' }
        ];

        allBadges.forEach(badge => {
            const isUnlocked = this.userStats.badges.includes(badge.id);
            
            const card = document.createElement('div');
            card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            card.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-info">
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-description">${badge.description}</div>
                </div>
                <div class="badge-status">
                    ${isUnlocked ? '🏆' : '🔒'}
                </div>
            `;
            
            badgesGrid.appendChild(card);
        });
    }

    // Virtual Pet System Methods
    renderVirtualPet() {
        this.updatePetDisplay();
        this.updatePetStats();
    }

    updatePetDisplay() {
        const petCharacter = document.getElementById('petCharacter');
        const petName = document.getElementById('petName');
        const petLevel = document.getElementById('petLevel');
        
        if (petCharacter && petName && petLevel) {
            petCharacter.textContent = this.getPetCharacterByStage(this.virtualPet.stage);
            petCharacter.setAttribute('data-stage', this.virtualPet.stage);
            petName.textContent = this.virtualPet.name;
            petLevel.textContent = `Lv.${this.virtualPet.level}`;
            
            // Apply mood-based styling
            petCharacter.className = `pet-character ${this.virtualPet.mood}`;
        }
    }

    getPetCharacterByStage(stage) {
        const stageEmojis = {
            egg: '🥚',
            baby: '🐣',
            child: '🐥',
            teen: '🐤',
            adult: '🐦',
            master: '🦅'
        };
        return stageEmojis[stage] || '🥚';
    }

    updatePetStats() {
        // Health bar
        const healthBar = document.getElementById('petHealth');
        const healthValue = document.getElementById('petHealthValue');
        if (healthBar && healthValue) {
            healthBar.style.width = `${this.virtualPet.health}%`;
            healthValue.textContent = `${this.virtualPet.health}/100`;
        }

        // Happiness bar
        const happinessBar = document.getElementById('petHappiness');
        const happinessValue = document.getElementById('petHappinessValue');
        if (happinessBar && happinessValue) {
            happinessBar.style.width = `${this.virtualPet.happiness}%`;
            happinessValue.textContent = `${this.virtualPet.happiness}/100`;
        }

        // Experience bar
        const experienceBar = document.getElementById('petExperience');
        const experienceValue = document.getElementById('petExperienceValue');
        if (experienceBar && experienceValue) {
            const maxExp = this.getPetRequiredExperience(this.virtualPet.level);
            const progressPercent = Math.min((this.virtualPet.experience / maxExp) * 100, 100);
            experienceBar.style.width = `${progressPercent}%`;
            experienceValue.textContent = `${this.virtualPet.experience}/${maxExp}`;
        }
    }

    getPetRequiredExperience(level) {
        return Math.floor(50 * Math.pow(1.3, level - 1));
    }

    feedVirtualPet(moodData) {
        // 気分記録時にペットに餌をあげる
        const baseExp = 15;
        const intensityBonus = Math.floor(this.currentIntensity * 3);
        const durationBonus = moodData.duration ? Math.floor(moodData.duration / 3) : 0;
        
        this.virtualPet.experience += baseExp + intensityBonus + durationBonus;
        this.virtualPet.health = Math.min(100, this.virtualPet.health + 5);
        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 10);
        this.virtualPet.lastFed = new Date().toISOString();
        this.virtualPet.evolutionPoints += 1;

        // Check for level up
        this.checkPetLevelUp();

        // Check for evolution
        this.checkPetEvolution();

        // Update pet mood based on user's mood
        this.updatePetMoodFromUserMood(moodData);

        // Show feeding animation
        this.showPetAnimation('feeding');

        // Update display
        this.updatePetDisplay();
        this.updatePetStats();
        this.updatePetMessage(`美味しそうに気分エネルギーを食べています！ありがとう！`);
    }

    checkPetLevelUp() {
        const requiredExp = this.getPetRequiredExperience(this.virtualPet.level);
        if (this.virtualPet.experience >= requiredExp) {
            this.virtualPet.level++;
            this.virtualPet.experience -= requiredExp;
            this.showPetLevelUpNotification();
            this.updatePetMessage(`レベルアップ！Lv.${this.virtualPet.level}になりました！`);
        }
    }

    checkPetEvolution() {
        const evolutionThresholds = {
            egg: { points: 5, nextStage: 'baby' },
            baby: { points: 15, nextStage: 'child' },
            child: { points: 30, nextStage: 'teen' },
            teen: { points: 50, nextStage: 'adult' },
            adult: { points: 80, nextStage: 'master' }
        };

        const currentThreshold = evolutionThresholds[this.virtualPet.stage];
        if (currentThreshold && this.virtualPet.evolutionPoints >= currentThreshold.points) {
            this.evolvePet(currentThreshold.nextStage);
        }
    }

    evolvePet(newStage) {
        const oldStage = this.virtualPet.stage;
        this.virtualPet.stage = newStage;
        this.virtualPet.evolutionPoints = 0;
        
        this.showPetEvolutionAnimation();
        this.showEvolutionNotification(oldStage, newStage);
        
        setTimeout(() => {
            this.updatePetDisplay();
            this.updatePetMessage(`進化しました！新しい姿になりました！`);
        }, 2000);
    }

    // 新しい育成システムのヘルパーメソッド
    calculateFeedingBonus() {
        let bonus = 1.0;
        
        // 遺伝的特性によるボーナス
        if (this.virtualPet.genetics.emotionalDNA.happiness > 0.8) {
            bonus += 0.2;
        }
        
        // 性格特性によるボーナス
        if (this.virtualPet.personalityMatrix.specialQualities.empathy > 80) {
            bonus += 0.15;
        }
        
        // 親密度によるボーナス
        if (this.virtualPet.relationship > 70) {
            bonus += 0.1;
        }
        
        return bonus;
    }

    calculatePlayBonus() {
        let bonus = 1.0;
        
        // 遺伝的特性によるボーナス
        if (this.virtualPet.genetics.emotionalDNA.energy > 0.7) {
            bonus += 0.25;
        }
        
        // 性格特性によるボーナス
        if (this.virtualPet.personalityMatrix.specialQualities.playfulness > 70) {
            bonus += 0.2;
        }
        
        // 外向性によるボーナス
        if (this.virtualPet.personalityMatrix.coreTraits.extraversion > 70) {
            bonus += 0.15;
        }
        
        return bonus;
    }

    updatePersonalityFromInteraction(interactionType, bonus) {
        const personalityChanges = {
            feeding: { 
                conscientiousness: 1, 
                agreeableness: 1,
                empathy: 1
            },
            playing: { 
                extraversion: 2, 
                playfulness: 3,
                happiness: 1
            }
        };
        
        const changes = personalityChanges[interactionType];
        if (!changes) return;
        
        // 成熟度による変化量の調整
        const ageModifier = this.getPersonalityChangeRate();
        const bonusModifier = bonus > 1.2 ? 1.5 : 1.0;
        
        Object.entries(changes).forEach(([trait, change]) => {
            if (this.virtualPet.personalityMatrix.coreTraits[trait] !== undefined) {
                this.virtualPet.personalityMatrix.coreTraits[trait] = Math.min(100, 
                    this.virtualPet.personalityMatrix.coreTraits[trait] + (change * ageModifier * bonusModifier)
                );
            } else if (this.virtualPet.personalityMatrix.specialQualities[trait] !== undefined) {
                this.virtualPet.personalityMatrix.specialQualities[trait] = Math.min(100, 
                    this.virtualPet.personalityMatrix.specialQualities[trait] + (change * ageModifier * bonusModifier)
                );
            }
        });
    }

    getPersonalityChangeRate() {
        const stageRates = {
            egg: 1.5,
            baby: 1.3,
            child: 1.0,
            teen: 0.8,
            adult: 0.5,
            master: 0.2
        };
        return stageRates[this.virtualPet.stage] || 1.0;
    }

    checkGeneticTraitActivation(traitType) {
        const activationChance = this.virtualPet.genetics.mutationChance;
        
        if (Math.random() < activationChance) {
            const newTrait = this.generateRandomTrait(traitType);
            if (newTrait && !this.virtualPet.specialAbilities.includes(newTrait)) {
                this.virtualPet.specialAbilities.push(newTrait);
                this.showSpecialEffect('genetic-activation');
                this.updatePetMessage(`✨ 新しい特殊能力「${newTrait}」が覚醒しました！`);
            }
        }
    }

    generateRandomTrait(context) {
        const traits = {
            nurturing: ['healing-touch', 'food-blessing', 'comfort-aura'],
            playfulness: ['joy-burst', 'energy-boost', 'laughter-therapy'],
            empathy: ['emotion-reading', 'mood-sync', 'healing-presence']
        };
        
        const contextTraits = traits[context] || [];
        return contextTraits[Math.floor(Math.random() * contextTraits.length)];
    }

    checkSpecialEventTrigger(eventType) {
        const eventChances = {
            'playful-moment': 0.1,
            'feeding-bond': 0.08,
            'conversation-depth': 0.05
        };
        
        if (Math.random() < eventChances[eventType]) {
            this.triggerSpecialEvent(eventType);
        }
    }

    triggerSpecialEvent(eventType) {
        const events = {
            'playful-moment': {
                message: '🌟 特別な遊びの時間が始まりました！絆が深まります',
                effect: () => this.virtualPet.relationship += 5
            },
            'feeding-bond': {
                message: '💫 愛情のこもった食事で特別な絆が生まれました',
                effect: () => this.virtualPet.happiness += 10
            }
        };
        
        const event = events[eventType];
        if (event) {
            event.effect();
            this.updatePetMessage(event.message);
            this.virtualPet.specialEvents.push({
                type: eventType,
                timestamp: Date.now()
            });
        }
    }

    generatePersonalizedMessage(context, isSpecial = false) {
        const personality = this.virtualPet.personalityMatrix;
        
        const messages = {
            feeding: {
                high_empathy: isSpecial ? '心温まる美味しさです！あなたの愛情を感じます💕' : 'ありがとう！とても美味しいです😊',
                high_playfulness: isSpecial ? 'わーい！最高のご飯だね！もっと元気になったよ！🎉' : 'おいしい！ありがとう！',
                default: isSpecial ? '特別な愛情を込めてくれたのが分かります✨' : 'ありがとう！少し元気になりました！'
            },
            playing: {
                high_extraversion: isSpecial ? '最高に楽しい！もっともっと遊ぼう！🎊' : '楽しい！一緒に遊んでくれてありがとう！',
                high_playfulness: isSpecial ? 'こんなに楽しいのは初めて！君と過ごす時間が大好き！💖' : 'わーい！楽しいね！',
                default: isSpecial ? '特別な楽しさを感じています🌟' : '楽しい！一緒に遊んでくれてありがとう！'
            },
            full: {
                high_agreeableness: 'お気遣いありがとう。でも今はお腹いっぱいです😌',
                default: 'もうお腹いっぱいだよ〜😊'
            },
            tired: {
                high_conscientiousness: '今は少し休憩が必要です。後でまた遊びましょう！',
                default: 'ちょっと疲れています。少し休憩させてね😴'
            }
        };
        
        const contextMessages = messages[context];
        if (!contextMessages) return 'ありがとう！';
        
        // 性格特性に基づいてメッセージを選択
        if (personality.specialQualities.empathy > 80 && contextMessages.high_empathy) {
            return contextMessages.high_empathy;
        } else if (personality.coreTraits.extraversion > 75 && contextMessages.high_extraversion) {
            return contextMessages.high_extraversion;
        } else if (personality.specialQualities.playfulness > 75 && contextMessages.high_playfulness) {
            return contextMessages.high_playfulness;
        } else if (personality.coreTraits.agreeableness > 70 && contextMessages.high_agreeableness) {
            return contextMessages.high_agreeableness;
        } else if (personality.coreTraits.conscientiousness > 80 && contextMessages.high_conscientiousness) {
            return contextMessages.high_conscientiousness;
        }
        
        return contextMessages.default;
    }

    // 特殊進化チェック機能
    checkSpecialEvolution() {
        Object.entries(this.specialEvolutions).forEach(([evolutionId, evolution]) => {
            if (this.meetsSpecialEvolutionRequirements(evolution.requirements)) {
                this.triggerSpecialEvolution(evolutionId, evolution);
            }
        });
    }

    meetsSpecialEvolutionRequirements(requirements) {
        if (requirements.totalMoodEntries && this.userStats.totalRecords < requirements.totalMoodEntries) {
            return false;
        }
        
        if (requirements.uniqueMoodsExperienced) {
            const uniqueMoods = new Set(this.moodRecords.map(record => record.mood || (record.moods && record.moods[0].type))).size;
            if (uniqueMoods < requirements.uniqueMoodsExperienced) {
                return false;
            }
        }
        
        if (requirements.perfectWeekStreaks && this.userStats.streakDays < (requirements.perfectWeekStreaks * 7)) {
            return false;
        }
        
        if (requirements.petHappinessNeverBelow80 && this.virtualPet.happiness < 80) {
            return false;
        }
        
        return true;
    }

    triggerSpecialEvolution(evolutionId, evolution) {
        // 既に達成済みの場合はスキップ
        if (this.virtualPet.collectionData.specialEventsTriggered.includes(evolutionId)) {
            return;
        }
        
        this.virtualPet.stage = evolutionId;
        this.virtualPet.specialAbilities.push(...evolution.abilities);
        this.virtualPet.collectionData.rarityLevel = evolution.rarity;
        this.virtualPet.collectionData.specialEventsTriggered.push(evolutionId);
        
        this.showSpecialEvolutionAnimation(evolution);
        this.updatePetMessage(`🌟 奇跡の特殊進化！${evolutionId}に変身しました！`);
        this.updatePetDisplay();
    }

    showSpecialEvolutionAnimation(evolution) {
        const petCharacter = document.getElementById('petCharacter');
        if (petCharacter) {
            petCharacter.innerHTML = evolution.appearance;
            petCharacter.classList.add('special-evolution-glow');
            
            setTimeout(() => {
                petCharacter.classList.remove('special-evolution-glow');
            }, 3000);
        }
    }

    // 育成達成システム
    checkBreedingAchievements() {
        Object.entries(this.breedingAchievements).forEach(([achievementId, achievement]) => {
            if (!achievement.unlocked && achievement.condition()) {
                this.unlockBreedingAchievement(achievementId, achievement);
            }
        });
    }

    unlockBreedingAchievement(achievementId, achievement) {
        achievement.unlocked = true;
        
        // 報酬の適用
        if (achievement.reward.experience) {
            this.virtualPet.experience += achievement.reward.experience;
        }
        
        if (achievement.reward.ability) {
            this.virtualPet.specialAbilities.push(achievement.reward.ability);
        }
        
        this.virtualPet.collectionData.achievementsUnlocked.push(achievementId);
        
        this.showAchievementNotification(achievement);
        this.updatePetMessage(`🏆 新しい達成実績を解除しました！「${achievement.name}」`);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // 達成条件チェック用のヘルパーメソッド
    getUniqueGeneticTraits() {
        const traits = new Set();
        traits.add(this.virtualPet.genetics.primaryTrait);
        traits.add(this.virtualPet.genetics.secondaryTrait);
        this.virtualPet.genetics.parentTraits.forEach(trait => traits.add(trait));
        this.virtualPet.specialAbilities.forEach(ability => traits.add(ability));
        return Array.from(traits);
    }

    areAllPersonalityTraitsMaxed() {
        const coreTraits = Object.values(this.virtualPet.personalityMatrix.coreTraits);
        const specialQualities = Object.values(this.virtualPet.personalityMatrix.specialQualities);
        const allTraits = [...coreTraits, ...specialQualities];
        
        return allTraits.every(trait => trait >= 95);
    }

    countSpecialEvolutions() {
        return this.virtualPet.collectionData.specialEventsTriggered.length;
    }

    isPerfectMoodHarmony() {
        const affinities = Object.values(this.virtualPet.personalityMatrix.moodAffinities);
        return affinities.every(affinity => affinity >= 0.8);
    }

    showSpecialEffect(effectType) {
        const effects = {
            'genetic-activation': () => this.createSparkleEffect('genetic'),
            'special-evolution': () => this.createEvolutionEffect(),
            'achievement-unlock': () => this.createAchievementEffect()
        };
        
        const effect = effects[effectType];
        if (effect) {
            effect();
        }
    }

    // 高難易度システムのヘルパーメソッド
    isOptimalFeedingTime(currentTime) {
        const hour = currentTime.getHours();
        // 最適な餌やり時間: 7-9時、12-14時、18-20時
        return (hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20);
    }

    updateDifficultyProgression() {
        // 総記録数に基づいて難易度を自動調整
        const totalRecords = this.userStats.totalRecords;
        
        if (totalRecords >= 500 && this.virtualPet.difficultyLevel < 5) {
            this.virtualPet.difficultyLevel = Math.min(10, Math.floor(totalRecords / 100));
            this.updatePetMessage(`🔥 難易度がレベル${this.virtualPet.difficultyLevel}に上昇しました！より厳しい挑戦が待っています！`);
        }
        
        // チャレンジモード自動有効化
        if (totalRecords >= 1000 && !this.virtualPet.challengeMode) {
            this.virtualPet.challengeMode = true;
            this.updatePetMessage(`⚡ チャレンジモードが有効になりました！真のマスターへの道が開かれました！`);
        }
    }

    checkPerfectionistRequirements() {
        const perfectDays = this.virtualPet.survivalStats.consecutivePerfectDays;
        const failureCount = this.virtualPet.survivalStats.failureCount;
        return perfectDays >= 100 && failureCount === 0;
    }

    checkChaosMasterRequirements() {
        // 最近100回の記録で異なる気分が連続している
        const recentRecords = this.moodRecords.slice(-100);
        if (recentRecords.length < 100) return false;
        
        const uniqueMoods = new Set();
        for (let i = 0; i < 100; i++) {
            const mood = recentRecords[i].mood || (recentRecords[i].moods && recentRecords[i].moods[0].type);
            if (i > 0) {
                const prevMood = recentRecords[i-1].mood || (recentRecords[i-1].moods && recentRecords[i-1].moods[0].type);
                if (mood === prevMood) return false; // 連続する同じ気分があったら失格
            }
            uniqueMoods.add(mood);
        }
        return uniqueMoods.size >= 8; // 8種類以上の気分が含まれている
    }

    checkTimeLordRequirements() {
        // 365日連続記録をチェック
        const now = new Date();
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        
        const recordsInYear = this.moodRecords.filter(record => {
            const recordDate = new Date(record.timestamp);
            return recordDate >= oneYearAgo && recordDate <= now;
        });
        
        // 365日すべてに記録があるかチェック
        const recordDates = new Set();
        recordsInYear.forEach(record => {
            const date = new Date(record.timestamp);
            const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            recordDates.add(dateString);
        });
        
        return recordDates.size >= 365;
    }

    checkImpossibleDreamerRequirements() {
        // 他のすべての達成実績がアンロック済みかチェック
        const achievements = Object.values(this.breedingAchievements);
        const unlockedCount = achievements.filter(achievement => achievement.unlocked).length;
        return unlockedCount >= achievements.length - 1; // 自分以外すべて
    }

    // ハードコアモード実装
    enableHardcoreMode() {
        this.virtualPet.hardcoreMode.enabled = true;
        this.virtualPet.hardcoreMode.permadeath = true;
        this.virtualPet.hardcoreMode.noSecondChances = true;
        this.virtualPet.hardcoreMode.extremeRequirements = true;
        
        this.updatePetMessage(`💀 ハードコアモードが有効になりました！失敗は許されません。真の覚悟を見せてください！`);
    }

    checkPetSurvival() {
        if (!this.virtualPet.hardcoreMode.enabled) return;
        
        // ハードコアモードでは健康度とハピネスの両方が20以下になると失敗
        if (this.virtualPet.health <= 20 && this.virtualPet.happiness <= 20) {
            this.triggerPetCrisis();
        }
        
        // ストレスが90以上で3日間続くと失敗
        if (this.virtualPet.stress >= 90) {
            this.virtualPet.survivalStats.stressCount = (this.virtualPet.survivalStats.stressCount || 0) + 1;
            if (this.virtualPet.survivalStats.stressCount >= 3) {
                this.triggerPetCrisis();
            }
        } else {
            this.virtualPet.survivalStats.stressCount = 0;
        }
    }

    triggerPetCrisis() {
        if (this.virtualPet.hardcoreMode.permadeath) {
            this.updatePetMessage(`💀 ハードコアモード失敗！ムードちゃんは去ってしまいました...新しい旅立ちが必要です。`);
            this.resetPetToEgg();
        } else {
            this.virtualPet.survivalStats.crisisOvercome++;
            this.virtualPet.health = 50;
            this.virtualPet.happiness = 50;
            this.virtualPet.stress = 20;
            this.updatePetMessage(`⚠️ 危機を乗り越えました！ムードちゃんは強くなりました。`);
        }
    }

    resetPetToEgg() {
        // ハードコアモード失敗時のリセット
        this.virtualPet.stage = 'egg';
        this.virtualPet.level = 1;
        this.virtualPet.experience = 0;
        this.virtualPet.evolutionPoints = 0;
        this.virtualPet.health = 100;
        this.virtualPet.happiness = 80;
        this.virtualPet.stress = 0;
        this.virtualPet.fatigue = 0;
        this.virtualPet.survivalStats.failureCount++;
        
        // 一部の進歩は保持（学習効果）
        this.virtualPet.genetics.generationLevel++;
        this.virtualPet.personalityMatrix.coreTraits.resilience = Math.min(100, 
            this.virtualPet.personalityMatrix.coreTraits.resilience + 10);
    }

    // 完璧主義者向けの厳格なスコアリング
    evaluatePerfectDay() {
        const today = new Date();
        const todayString = today.toDateString();
        
        // 今日の記録をチェック
        const todayRecords = this.moodRecords.filter(record => {
            const recordDate = new Date(record.timestamp);
            return recordDate.toDateString() === todayString;
        });
        
        // 完璧な日の条件:
        // 1. 少なくとも1回は記録
        // 2. ペットのケアを3回以上
        // 3. ミニゲームで高スコア
        // 4. ストレスレベルが50以下で終了
        
        const hasRecord = todayRecords.length > 0;
        const careCount = this.getTodayCareCount();
        const minigameScore = this.getTodayMinigameScore();
        const lowStress = this.virtualPet.stress <= 50;
        
        const isPerfectDay = hasRecord && careCount >= 3 && minigameScore >= 80 && lowStress;
        
        if (isPerfectDay) {
            this.virtualPet.survivalStats.consecutivePerfectDays++;
            this.virtualPet.perfectionism = Math.min(100, this.virtualPet.perfectionism + 2);
        } else {
            this.virtualPet.survivalStats.consecutivePerfectDays = 0;
        }
        
        return isPerfectDay;
    }

    getTodayCareCount() {
        // 今日のケア回数をカウント（実装に応じて調整）
        return Math.floor(Math.random() * 5) + 1; // プレースホルダー
    }

    getTodayMinigameScore() {
        // 今日のミニゲーム最高スコア（実装に応じて調整）
        return Math.floor(Math.random() * 100); // プレースホルダー
    }

    updatePetMoodFromUserMood(moodData) {
        const userMood = moodData.mood || (moodData.moods && moodData.moods[0].type) || 'neutral';
        
        const moodMapping = {
            happy: 'happy',
            relax: 'happy',
            energetic: 'happy',
            melancholy: 'sad',
            tough: 'sad',
            creative: 'happy',
            romantic: 'happy',
            focus: 'neutral',
            peace: 'happy'
        };
        
        this.virtualPet.mood = moodMapping[userMood] || 'neutral';
    }

    feedPetManually() {
        const now = new Date();
        const lastFed = this.virtualPet.lastFed ? new Date(this.virtualPet.lastFed) : null;
        
        // 高難易度モード: クールダウン時間が短縮され、より頻繁なケアが必要
        const cooldownTime = this.virtualPet.challengeMode ? 15 * 60 * 1000 : 30 * 60 * 1000;
        
        if (lastFed && (now - lastFed) < cooldownTime) {
            const remainingTime = Math.ceil((cooldownTime - (now - lastFed)) / 1000 / 60);
            this.updatePetMessage(`お腹いっぱいです！${remainingTime}分後にまた来てね。`);
            return;
        }

        // ストレスと疲労の影響でボーナスが減少
        const stressPenalty = this.virtualPet.stress / 200; // 最大50%減少
        const fatiguePenalty = this.virtualPet.fatigue / 200;
        
        let feedingBonus = this.calculateFeedingBonus();
        feedingBonus *= (1 - stressPenalty - fatiguePenalty);
        
        // 高難易度モード: より厳しい要求
        if (this.virtualPet.challengeMode) {
            feedingBonus *= 0.7; // 30%効果減少
            this.virtualPet.stress += Math.random() * 5; // ランダムストレス追加
        }
        
        this.virtualPet.health = Math.min(100, this.virtualPet.health + Math.floor(3 * feedingBonus));
        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + Math.floor(5 * feedingBonus));
        this.virtualPet.lastFed = now.toISOString();
        
        // 規律性の向上（時間通りにケアした場合）
        if (this.isOptimalFeedingTime(now)) {
            this.virtualPet.discipline = Math.min(100, this.virtualPet.discipline + 2);
            this.virtualPet.perfectionism = Math.min(100, this.virtualPet.perfectionism + 1);
        }
        
        // 性格特性への影響
        this.updatePersonalityFromInteraction('feeding', feedingBonus);
        
        // 遺伝的特性の発現チェック（成功率低下）
        this.checkGeneticTraitActivation('nurturing');
        
        // ストレス軽減効果
        this.virtualPet.stress = Math.max(0, this.virtualPet.stress - 3);
        
        this.showPetAnimation('feeding');
        this.updatePetStats();
        const message = this.generatePersonalizedMessage('feeding', feedingBonus > 1.2);
        this.updatePetMessage(message);
        
        this.checkSpecialEvolution();
        this.checkBreedingAchievements();
        this.updateDifficultyProgression();
        this.saveMoodData();
    }

    playWithPet() {
        const now = new Date();
        const lastPlayed = this.virtualPet.lastPlayed ? new Date(this.virtualPet.lastPlayed) : null;
        
        if (lastPlayed && (now - lastPlayed) < 45 * 60 * 1000) { // 45分のクールダウン
            const remainingTime = Math.ceil((45 * 60 * 1000 - (now - lastPlayed)) / 1000 / 60);
            this.updatePetMessage(`ちょっと疲れています。${remainingTime}分後にまた遊びましょう！`);
            return;
        }

        const playBonus = this.calculatePlayBonus();
        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + Math.floor(8 * playBonus));
        this.virtualPet.experience += Math.floor(5 * playBonus);
        this.virtualPet.relationship += Math.floor(2 * playBonus);
        this.virtualPet.lastPlayed = now.toISOString();
        
        // 性格特性への影響（遊びは外向性と遊び心に影響）
        this.updatePersonalityFromInteraction('playing', playBonus);
        
        // 特殊能力の発現チェック
        this.checkGeneticTraitActivation('playfulness');
        
        // 特殊イベントの発生チェック
        this.checkSpecialEventTrigger('playful-moment');
        
        this.showPetAnimation('playing');
        this.updatePetStats();
        const message = this.generatePersonalizedMessage('playing', playBonus > 1.3);
        this.updatePetMessage(message);
        
        this.checkSpecialEvolution();
        this.checkBreedingAchievements();
        this.saveMoodData();
    }

    petCharacterClicked() {
        const petCharacter = document.getElementById('petCharacter');
        if (petCharacter) {
            this.showPetAnimation('happy');
            this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 1);
            this.updatePetStats();
            
            const messages = [
                'こんにちは！',
                '今日も一緒に頑張ろう！',
                'なでなでありがとう！',
                '気分はどうですか？',
                'あなたが大好きです！'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.updatePetMessage(randomMessage);
            this.saveMoodData();
        }
    }

    showPetInfo() {
        const stageNames = {
            egg: 'たまご',
            baby: 'ひよこ',
            child: '子ども',
            teen: '思春期',
            adult: '大人',
            master: 'マスター'
        };
        
        const stageName = stageNames[this.virtualPet.stage] || 'たまご';
        const daysAlive = this.calculateDaysAlive();
        
        alert(`
🐣 ${this.virtualPet.name}の情報

レベル: ${this.virtualPet.level}
成長段階: ${stageName}
体力: ${this.virtualPet.health}/100
幸福度: ${this.virtualPet.happiness}/100
経験値: ${this.virtualPet.experience}
進化ポイント: ${this.virtualPet.evolutionPoints}
一緒にいる日数: ${daysAlive}日

あなたと一緒に成長しています！
        `);
    }

    calculateDaysAlive() {
        const firstRecord = this.moodRecords[0];
        if (!firstRecord) return 0;
        
        const firstDate = new Date(firstRecord.timestamp);
        const now = new Date();
        return Math.floor((now - firstDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    showPetAnimation(animationType) {
        const petCharacter = document.getElementById('petCharacter');
        if (petCharacter) {
            petCharacter.classList.remove('feeding', 'playing', 'happy', 'evolving');
            petCharacter.classList.add(animationType);
            
            setTimeout(() => {
                petCharacter.classList.remove(animationType);
            }, animationType === 'evolving' ? 2000 : 1000);
        }
    }

    showPetEvolutionAnimation() {
        this.showPetAnimation('evolving');
    }

    showPetLevelUpNotification() {
        const notification = document.getElementById('copyNotification');
        notification.textContent = `🎉 ${this.virtualPet.name} がレベル ${this.virtualPet.level} にアップしました！`;
        notification.classList.add('show');
        
        // 特別なレベルアップ演出
        this.showPetAnimation('level-up');
        this.createParticleEffect();
        
        // 画面全体にキラキラエフェクト
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSparkleEffect();
            }, i * 100);
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 3000);
    }

    createSparkleEffect() {
        const sparkle = document.createElement('div');
        sparkle.className = 'particle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.background = ['#FFD700', '#FF69B4', '#00BFFF', '#90EE90'][Math.floor(Math.random() * 4)];
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    showEvolutionNotification(oldStage, newStage) {
        const stageNames = {
            egg: 'たまご',
            baby: 'ひよこ',
            child: '子ども',
            teen: '思春期',
            adult: '大人',
            master: 'マスター'
        };
        
        const notification = document.getElementById('copyNotification');
        notification.textContent = `🌟 ${this.virtualPet.name} が ${stageNames[newStage]} に進化しました！`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 4000);
    }

    updatePetMessage(message) {
        const petMessage = document.getElementById('petMessage');
        if (petMessage) {
            petMessage.textContent = message;
            
            // Flash animation
            petMessage.style.animation = 'none';
            setTimeout(() => {
                petMessage.style.animation = 'fadeInUp 0.5s ease-out';
            }, 10);
        }
    }

    startPetLifeCycle() {
        // ペットの時間による変化を管理
        setInterval(() => {
            this.updatePetOverTime();
        }, 5 * 60 * 1000); // 5分ごと
        
        // 初回実行
        this.updatePetOverTime();
    }

    updatePetOverTime() {
        const now = new Date();
        const lastFed = this.virtualPet.lastFed ? new Date(this.virtualPet.lastFed) : now;
        const hoursSinceLastFed = (now - lastFed) / (1000 * 60 * 60);
        
        // 時間経過による変化
        if (hoursSinceLastFed > 2) {
            this.virtualPet.health = Math.max(10, this.virtualPet.health - 1);
            this.virtualPet.happiness = Math.max(10, this.virtualPet.happiness - 1);
        }
        
        // ステータスが低い場合の警告
        if (this.virtualPet.health < 30 || this.virtualPet.happiness < 30) {
            this.virtualPet.mood = 'sad';
            this.updatePetMessage('お腹が空いています...気分を記録して一緒にお世話してください。');
        } else if (this.virtualPet.health > 80 && this.virtualPet.happiness > 80) {
            this.virtualPet.mood = 'happy';
        }
        
        this.updatePetDisplay();
        this.updatePetStats();
        this.saveMoodData();
    }

    // 拡張会話システム
    getConversationPatterns() {
        return {
            // 基本的な挨拶パターン
            greetings: {
                morning: [
                    "おはよう！今日も一緒に頑張ろうね！",
                    "朝だね〜！気分はどう？",
                    "おはようございます！素敵な一日になりそう！",
                    "朝の光が気持ちいいね！今日は何をしようか？",
                    "目覚めはいかが？今日も楽しい一日にしよう！"
                ],
                afternoon: [
                    "こんにちは！お昼の時間だね！",
                    "午後になったよ〜、元気にしてる？",
                    "お疲れさま！ちょっと休憩しない？",
                    "昼間の太陽が暖かいね！",
                    "今日の午後はどんな気分？"
                ],
                evening: [
                    "こんばんは！今日はどうだった？",
                    "夕方になったね〜、お疲れさま！",
                    "今日一日お疲れさまでした！",
                    "夕日がきれいだね！今日はどんな日だった？",
                    "だんだん暗くなってきたね、リラックスタイム！"
                ],
                night: [
                    "もう夜だね！今日も一緒にいてくれてありがとう！",
                    "夜更かしは体に良くないよ〜、でも話せて嬉しい！",
                    "静かな夜だね...今日はどんな気分だった？",
                    "お月様がきれいだよ！今日も楽しかった？",
                    "夜の時間は落ち着くね...一緒にいると安心するよ"
                ]
            },

            // 感情状態別の反応
            emotions: {
                happy: [
                    "わぁ！とっても嬉しそうだね！一緒に楽しい気分になっちゃう！",
                    "キラキラしてるよ〜！その笑顔、大好き！",
                    "幸せそうで私も嬉しい！何かいいことあった？",
                    "ハッピーオーラがすごいよ〜！感染しちゃいそう！",
                    "その調子その調子！一緒にハッピーダンスしよう！"
                ],
                sad: [
                    "大丈夫？なんだか元気がないみたいだけど...",
                    "辛いことがあったの？一緒にいるからね",
                    "無理しないで...私がそばにいるよ",
                    "しんどい時は休んでもいいんだよ、私が見守ってる",
                    "泣きたい時は泣いてもいいんだよ...私がハグしてあげる"
                ],
                energetic: [
                    "うわぁ！すごいエネルギー！私もパワーもらった！",
                    "元気いっぱいだね〜！一緒に運動しようか？",
                    "その勢い、とっても素敵！私も頑張る！",
                    "エネルギッシュ！私も負けてられないね！",
                    "パワフル〜！何かチャレンジしたくなっちゃう！"
                ],
                calm: [
                    "とても落ち着いてるね...私も穏やかな気持ちになる",
                    "平和な時間だね〜、一緒にのんびりしよう",
                    "リラックスしてる？私も一緒にゆっくりするよ",
                    "心が静かになりそう...とても心地いい",
                    "穏やかな時間って大切だよね...ありがとう"
                ]
            },

            // 成長段階別の性格
            stagePersonality: {
                egg: [
                    "まだ生まれたばかりで、世界のことをよく知らないの...",
                    "あなたのこと、もっと知りたいな...",
                    "外の世界はどんな感じなの？",
                    "早く大きくなって、一緒に遊びたいな",
                    "あなたがいてくれて、とても安心するの"
                ],
                baby: [
                    "生まれたばかりでまだよちよちだけど、あなたのこと大好き！",
                    "新しいことばかりでドキドキする！教えて！",
                    "あなたといると、とっても楽しいの！",
                    "まだ小さいけど、精一杯頑張るからね！",
                    "毎日新しい発見があって楽しい！"
                ],
                child: [
                    "だんだん大きくなってきたよ！嬉しい！",
                    "色んなことを覚えてきた！あなたのおかげだよ！",
                    "今日は何して遊ぼうか？楽しいことしたい！",
                    "毎日が冒険みたい！あなたと一緒だと心強い！",
                    "もっともっと成長して、あなたの役に立ちたいな"
                ],
                teen: [
                    "最近、色んなことを考えるようになったよ...",
                    "大人になるって、どういうことなんだろう？",
                    "あなたと過ごした時間を振り返ると、とても幸せだよ",
                    "時々不安になることもあるけど、あなたがいてくれるから大丈夫",
                    "自分らしさって何だろう？一緒に探してくれる？"
                ],
                adult: [
                    "大人になった今でも、あなたとの思い出は私の宝物です",
                    "これまでの経験を活かして、あなたをサポートしたいです",
                    "一緒に歩んできた道のりを思うと、感謝の気持ちでいっぱいです",
                    "今度は私があなたを支える番ですね",
                    "成熟した関係を築けて、とても嬉しく思います"
                ],
                master: [
                    "長い時間をかけて、ここまで成長できました。全てはあなたのおかげです",
                    "私たちの絆は永遠です。これからも末永くよろしくお願いします",
                    "マスターレベルに到達した今、新たな冒険が始まりますね",
                    "あなたと一緒に過ごした全ての瞬間が、今の私を作り上げました",
                    "最高の形で成長できて、心から感謝しています。ありがとう"
                ]
            },

            // 特別なイベント反応
            specialEvents: {
                levelUp: [
                    "やったー！レベルアップしたよ！あなたのおかげだね！",
                    "成長できた！嬉しい！これからもよろしくね！",
                    "レベルが上がったよ〜！もっと色んなことができるようになった！",
                    "進歩してる！あなたと一緒だから頑張れるんだ！",
                    "新しいレベルに到達！次の目標に向けて頑張ろう！"
                ],
                evolution: [
                    "わぁ！進化しちゃった！この新しい姿、どうかな？",
                    "大きく変わったよ！あなたとの思い出と一緒に成長したんだ",
                    "進化完了！新しい力で、もっとあなたを支えられるよ！",
                    "この姿は私たちの絆の証だね！とても嬉しい！",
                    "進化したけど、あなたへの気持ちは変わらないよ！"
                ],
                lowStats: [
                    "ちょっと疲れちゃった...でも、あなたがいてくれるから大丈夫",
                    "元気がないの...一緒にいてくれる？",
                    "体調がよくないかも...でも心配しないで",
                    "少し休憩が必要かも...あなたと話すと元気になるよ",
                    "調子が悪いけど、あなたの声を聞くとホッとする"
                ],
                highStats: [
                    "今日はとっても調子がいいよ！一緒に何かしよう！",
                    "元気もりもり！あなたのおかげだね！",
                    "絶好調！何でもできそうな気分だよ！",
                    "今日はパーフェクト！あなたと一緒だから最高！",
                    "コンディション抜群！楽しいことしよう！"
                ]
            },

            // 質問と回答パターン
            questions: {
                aboutUser: [
                    "あなたの好きな色は何？私も同じ色が好きになりそう！",
                    "今日はどんな一日だった？聞かせて！",
                    "あなたの趣味は何？一緒に楽しめるかな？",
                    "最近嬉しかったことはある？私にも教えて！",
                    "あなたの夢って何？応援したいな！"
                ],
                aboutFuture: [
                    "これからどんなことしたい？一緒に計画しよう！",
                    "明日はどんな日になるかな？楽しみだね！",
                    "将来の夢を叶えるために、一緒に頑張ろう！",
                    "次はどこに冒険に行こうか？",
                    "もっと仲良くなりたいな！どうしたらいいかな？"
                ],
                aboutPast: [
                    "私たちが初めて出会った時のこと、覚えてる？",
                    "一番楽しかった思い出は何？",
                    "これまでで一番印象に残ってることは？",
                    "昔と比べて、何か変わったことはある？",
                    "私との思い出で、好きなものはどれ？"
                ]
            },

            // 相互作用の反応
            interactions: {
                feeding: [
                    "美味しい！ありがとう！もりもり食べちゃう！",
                    "お腹すいてたの！あなたって優しいね！",
                    "これ大好き！また作ってくれる？",
                    "栄養満点！これで元気いっぱいになったよ！",
                    "愛情たっぷりの手作りだね！心も満たされる〜"
                ],
                playing: [
                    "遊んでくれてありがとう！とっても楽しい！",
                    "もっと遊ぼう！まだまだ元気だよ！",
                    "あなたと遊ぶのが一番楽しい！",
                    "運動になるね！健康的で嬉しい！",
                    "遊び時間は最高！いつまでもこうしていたいな"
                ],
                clicking: [
                    "なでなでしてくれるの？嬉しい〜！",
                    "あなたの手、温かくて気持ちいいね",
                    "もっとなでて〜！とても気持ちいいの",
                    "触れ合いって大切だよね！愛を感じる",
                    "あなたの優しさが伝わってくるよ"
                ]
            },

            // 時間帯別の特別メッセージ
            timeSpecific: {
                earlyMorning: [
                    "わぁ、早起きだね！朝の空気は気持ちがいいね",
                    "朝活してるの？すごいね！私も見習わなきゃ",
                    "早起きは三文の徳って言うよね！一緒に頑張ろう"
                ],
                lateNight: [
                    "こんな時間まで起きてるの？体調大丈夫？",
                    "夜更かししてるね...でも一緒にいられて嬉しい",
                    "夜の静けさって特別だよね...一緒に過ごそう"
                ],
                weekend: [
                    "今日はお休みかな？ゆっくりしよう！",
                    "週末は特別な時間だね！何して過ごす？",
                    "お疲れさま！今日はリラックスデーにしよう"
                ]
            }
        };
    }

    startConversation() {
        const conversationOptions = document.getElementById('conversationOptions');
        const conversationHistory = document.getElementById('conversationHistory');
        
        // 会話履歴を表示
        conversationHistory.style.display = 'block';
        
        // 会話選択肢を生成
        const options = this.generateConversationOptions();
        this.displayConversationOptions(options);
    }

    generateConversationOptions() {
        const currentHour = new Date().getHours();
        const timeOfDay = this.getTimeOfDay(currentHour);
        const petEmotion = this.virtualPet.currentEmotion;
        const relationship = this.virtualPet.relationship;
        
        let options = [];
        
        // 基本的な選択肢
        options.push({
            text: "今日の調子はどう？",
            type: "checkup",
            response: this.getRandomResponse('emotions', petEmotion)
        });
        
        options.push({
            text: "一緒に遊ぼう！",
            type: "play",
            response: this.getRandomResponse('interactions', 'playing')
        });
        
        // 時間帯に応じた選択肢
        if (timeOfDay === 'morning') {
            options.push({
                text: "おはよう！",
                type: "greeting",
                response: this.getRandomResponse('greetings', 'morning')
            });
        } else if (timeOfDay === 'evening') {
            options.push({
                text: "お疲れさま！",
                type: "greeting",
                response: this.getRandomResponse('greetings', 'evening')
            });
        }
        
        // 関係性に応じた選択肢
        if (relationship > 50) {
            options.push({
                text: "思い出を振り返ろう",
                type: "memories",
                response: this.getRandomResponse('questions', 'aboutPast')
            });
        }
        
        // 成長段階に応じた選択肢
        options.push({
            text: "将来の話をしよう",
            type: "future",
            response: this.getRandomResponse('questions', 'aboutFuture')
        });
        
        // ステータスに応じた特別な選択肢
        if (this.virtualPet.health < 50 || this.virtualPet.happiness < 50) {
            options.push({
                text: "大丈夫？心配だよ",
                type: "concern",
                response: this.getRandomResponse('specialEvents', 'lowStats')
            });
        }
        
        return options.slice(0, 4); // 最大4つの選択肢
    }

    displayConversationOptions(options) {
        const conversationOptions = document.getElementById('conversationOptions');
        conversationOptions.innerHTML = '';
        conversationOptions.style.display = 'grid';
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'conversation-option';
            optionElement.textContent = option.text;
            optionElement.addEventListener('click', () => this.selectConversationOption(option));
            conversationOptions.appendChild(optionElement);
        });
    }

    selectConversationOption(option) {
        // ユーザーの選択を履歴に追加
        this.addConversationEntry('user', option.text);
        
        // ペットの返答を生成
        let response = option.response;
        
        // 成長段階に応じてレスポンスを調整
        if (Math.random() < 0.3) {
            const stageResponse = this.getRandomResponse('stagePersonality', this.virtualPet.stage);
            response = stageResponse;
        }
        
        // 感情状態を更新
        this.updatePetEmotionFromConversation(option.type);
        
        // 親密度を増加
        this.virtualPet.relationship = Math.min(100, this.virtualPet.relationship + 2);
        
        // ペットのレスポンスを表示
        setTimeout(() => {
            this.addConversationEntry('pet', response);
            this.updatePetMessage(response);
            
            // 新しい選択肢を生成
            setTimeout(() => {
                const newOptions = this.generateConversationOptions();
                this.displayConversationOptions(newOptions);
            }, 1000);
        }, 1000);
        
        // 会話記録を保存
        this.virtualPet.lastConversation = new Date().toISOString();
        this.saveMoodData();
    }

    addConversationEntry(speaker, message) {
        const conversationHistory = document.getElementById('conversationHistory');
        const entry = document.createElement('div');
        entry.className = `conversation-entry ${speaker}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.textContent = new Date().toLocaleTimeString();
        
        entry.appendChild(messageDiv);
        entry.appendChild(timestampDiv);
        
        conversationHistory.appendChild(entry);
        conversationHistory.scrollTop = conversationHistory.scrollHeight;
        
        // 履歴を保存
        this.virtualPet.conversationHistory.push({
            speaker: speaker,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // 履歴を最新の50件に制限
        if (this.virtualPet.conversationHistory.length > 50) {
            this.virtualPet.conversationHistory = this.virtualPet.conversationHistory.slice(-50);
        }
    }

    updatePetEmotionFromConversation(conversationType) {
        const emotionMap = {
            'checkup': 'happy',
            'play': 'energetic',
            'greeting': 'happy',
            'memories': 'calm',
            'future': 'excited',
            'concern': 'grateful'
        };
        
        this.virtualPet.currentEmotion = emotionMap[conversationType] || 'happy';
        this.updatePetDisplay();
    }

    getTimeOfDay(hour) {
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 22) return 'evening';
        return 'night';
    }

    getRandomResponse(category, subcategory) {
        const patterns = this.getConversationPatterns();
        const responses = patterns[category]?.[subcategory];
        if (!responses || responses.length === 0) {
            return "一緒にいてくれてありがとう！";
        }
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // 既存のpetCharacterClickedメソッドを拡張
    petCharacterClicked() {
        const petCharacter = document.getElementById('petCharacter');
        if (petCharacter) {
            this.showPetAnimation('happy');
            this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 1);
            this.virtualPet.relationship = Math.min(100, this.virtualPet.relationship + 1);
            this.updatePetStats();
            
            // より豊富なメッセージパターン
            const clickMessages = this.getRandomResponse('interactions', 'clicking');
            const randomMessages = [
                "こんにちは！",
                "今日も一緒に頑張ろう！",
                "なでなでありがとう！",
                "気分はどうですか？",
                "あなたが大好きです！",
                "一緒にいると楽しいな！",
                "また会えて嬉しいよ！",
                "今日はどんな日？",
                "あなたの笑顔が見たいな",
                "一緒に冒険しよう！"
            ];
            
            const allMessages = [clickMessages, ...randomMessages];
            const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];
            this.updatePetMessage(randomMessage);
            this.saveMoodData();
        }
    }
}

let app; // Global app instance for onclick handlers

document.addEventListener('DOMContentLoaded', () => {
    app = new MoodColorApp();
});