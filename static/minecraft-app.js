// Minecraft Vibe Crafting - Bundled JavaScript
// Generated on #午後

// === Biomes Module ===
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
            { name:'サボテン', texture: '🌵', durability: 2, rarity: 'uncommon', craftable: ['装飾品'] },
            { name: 'ピラミッド石', texture: '🔺', durability: 8, rarity: 'rare', craftable: ['古代建築'] },
            { name: 'エメラルド', texture: '💚', durability: 12, rarity: 'legendary', craftable: ['魔法装備'] }
        ],
        mood: 'adventurous',
        color: '#FFC107'
    },
    nether: {
        name: 'ネザーバイオーム',
        blocks: [
            { name: 'ネザーラック', texture: '🔥', durability: 2, rarity: 'uncommon', craftable: ['ネザー建材'] },
            { name: 'ソウルサンド', texture: '💀', durability: 3, rarity: 'uncommon', craftable: ['暗黒魔法'] },
            { name: 'グロウストーン', texture: '✨', durability: 6, rarity: 'rare', craftable: ['光源'] },
            { name: 'ネザライト', texture: '⚫💎', durability: 20, rarity: 'legendary', craftable: ['最強ネザー装備'] }
        ],
        mood: 'intense',
        color: '#D32F2F'
    },
    end: {
        name: 'エンドバイオーム',
        blocks: [
            { name: 'エンドストーン', texture: '🌕', durability: 4, rarity: 'rare', craftable: ['エンド建材'] },
            { name: 'コーラスフルーツ', texture: '🍇', durability: 3, rarity: 'rare', craftable: ['テレポート薬'] },
            { name: 'シュルカーシェル', texture: '💜', durability: 10, rarity: 'legendary', craftable: ['シュルカーボックス'] },
            { name: 'ドラゴンエッグ', texture: '🥚✨', durability: 50, rarity: 'mythic', craftable: ['ドラゴンパワー'] }
        ],
        mood: 'mystical',
        color: '#9C27B0'
    }
};
// Biome unlock requirements
const biomeUnlockRequirements = {
    forest: { biome: 'plains', level: 3 },
    mountain: { biome: 'plains', level: 5 },
    ocean: { biome: 'forest', level: 4 },
    desert: { biome: 'mountain', level: 6 },
    nether: { biome: 'mountain', level: 10 },
    end: { biome: 'nether', level: 15 }
};
// Rarity configurations
const rarityConfig = {
    common: { class: 'common', name: 'コモン', multiplier: 1 },
    uncommon: { class: 'uncommon', name: 'アンコモン', multiplier: 2 },
    rare: { class: 'rare', name: 'レア', multiplier: 3 },
    legendary: { class: 'legendary', name: 'レジェンダリー', multiplier: 5 },
    mythic: { class: 'mythic', name: 'ミシック', multiplier: 10 }
};

// === Notifications Module ===
class NotificationManager {
    constructor() {
        this.currentCreature = null;
    }
    showCollectionNotification(block, expGain) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-icon">${block.texture}</div>
                    <div class="notification-text">
                        <strong>${block.name}</strong> を収集！<br>
                        経験値 +${expGain}
                    </div>
                </div>
            `;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    showBiomeLevelUpNotification(biome, newLevel) {
        const notification = `🎉 ${biome} レベル${newLevel}に到達！`;
        this.showNotification(notification);
    }
    showBiomeUnlockNotification(biome) {
        const notification = `🔓 新しいバイオーム「${biome}」が解放されました！`;
        this.showNotification(notification);
    }
    createBlockParticleEffect(block) {
        const character = document.querySelector('.character');
        if (!character) return;
        
        const rect = character.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'block-particle';
            particle.textContent = block.texture;
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    showMiningEffect(message) {
        const effect = document.createElement('div');
        effect.className = 'mining-effect';
        effect.textContent = message;
        document.body.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 2000);
    }
    showAchievementNotification(achievement) {
        const notification = `🏆 実績解除: ${achievement.name} - ${achievement.description}`;
        this.showNotification(notification);
    }
    showPlayerLevelUpNotification(level) {
        const notification = `🌟 プレイヤーレベル${level}に到達！`;
        this.showNotification(notification);
    }
    showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    updateCreatureMessage(message) {
        const messageElement = document.querySelector('.creature-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    generateCreature() {
        const creatures = [
            { sprite: '🐷', name: 'ブタ', message: 'ブヒブヒ〜 今日も採掘頑張ろう！' },
            { sprite: '🐮', name: 'ウシ', message: 'モ〜 新しいブロックを見つけたね！' },
            { sprite: '🐑', name: 'ヒツジ', message: 'メェ〜 ウールが必要な時は声をかけて！' },
            { sprite: '🐺', name: 'オオカミ', message: 'ワンワン！ 一緒に冒険しよう！' },
            { sprite: '🐱', name: 'ネコ', message: 'ニャーン♪ 今日の調子はどう？' }
        ];
        
        return creatures[Math.floor(Math.random() * creatures.length)];
    }
    renderCreatureDisplay() {
        const creatureContainer = document.querySelector('.creature-container');
        if (!creatureContainer) return;
        
        if (!this.currentCreature) {
            this.currentCreature = this.generateCreature();
        }
        
        creatureContainer.innerHTML = `
            <div class="character">${this.currentCreature.sprite}</div>
            <div class="creature-info">
                <div class="creature-name">${this.currentCreature.name}</div>
                <div class="creature-message">${this.currentCreature.message}</div>
            </div>
        `;
    }
    loadCreatureData() {
        const savedCreature = localStorage.getItem('minecraftCreature');
        if (savedCreature) {
            this.currentCreature = JSON.parse(savedCreature);
        }
    }
    saveCreatureData() {
        if (this.currentCreature) {
            localStorage.setItem('minecraftCreature', JSON.stringify(this.currentCreature));
        }
    }
}

// === Player Module ===
class PlayerManager {
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

// === Mining Game Module ===
class MiningGame {
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

// === Building Game Module ===
class BuildingGame {
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

// === Survival/Redstone Games Module ===
class SurvivalGame {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
    }
    start(content, controls) {
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
    endGame(message) {
        this.playerManager.playerStats.totalExperience += 100;
        this.playerManager.saveData();
        this.uiManager.endGame(message);
    }
}
class RedstoneGame {
    constructor(playerManager, uiManager) {
        this.playerManager = playerManager;
        this.uiManager = uiManager;
    }
    start(content, controls) {
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
        this.playerManager.playerStats.totalExperience += 150;
        this.playerManager.saveData();
        this.uiManager.endGame(message);
    }
}

// === Mini Games Manager Module ===
class MiniGameManager {
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

// === UI Module ===
class UIManager {
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

// === Main Module ===
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
