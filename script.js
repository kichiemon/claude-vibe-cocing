const moodColorMap = {
    happy: {
        name: 'ハッピー',
        colors: [
            { hex: '#FFD700', name: '金色' },
            { hex: '#FF6347', name: 'トマト' },
            { hex: '#FF69B4', name: 'ピンク' },
            { hex: '#32CD32', name: '緑' }
        ]
    },
    relax: {
        name: 'リラックス',
        colors: [
            { hex: '#87CEEB', name: '空色' },
            { hex: '#DDA0DD', name: 'プラム' },
            { hex: '#98FB98', name: '薄緑' },
            { hex: '#F0F8FF', name: '白' }
        ]
    },
    energetic: {
        name: 'エネルギッシュ',
        colors: [
            { hex: '#FF4500', name: 'オレンジ赤' },
            { hex: '#DC143C', name: '深紅' },
            { hex: '#FF1493', name: 'ピンク' },
            { hex: '#8A2BE2', name: '紫' }
        ]
    },
    melancholy: {
        name: 'メランコリー',
        colors: [
            { hex: '#2F4F4F', name: '暗緑' },
            { hex: '#696969', name: 'グレー' },
            { hex: '#778899', name: '青グレー' },
            { hex: '#B0C4DE', name: '薄青' }
        ]
    },
    creative: {
        name: 'クリエイティブ',
        colors: [
            { hex: '#9370DB', name: '紫' },
            { hex: '#FF8C00', name: 'オレンジ' },
            { hex: '#20B2AA', name: '緑青' },
            { hex: '#FFB6C1', name: '薄ピンク' }
        ]
    },
    romantic: {
        name: 'ロマンチック',
        colors: [
            { hex: '#FF69B4', name: 'ピンク' },
            { hex: '#FFC0CB', name: '薄ピンク' },
            { hex: '#FFB6C1', name: '淡ピンク' },
            { hex: '#F08080', name: 'コーラル' }
        ]
    },
    focus: {
        name: '集中',
        colors: [
            { hex: '#4169E1', name: '青' },
            { hex: '#2E8B57', name: '緑' },
            { hex: '#000080', name: '紺' },
            { hex: '#708090', name: '灰青' }
        ]
    },
    peace: {
        name: '平穏',
        colors: [
            { hex: '#F5F5DC', name: 'ベージュ' },
            { hex: '#E6E6FA', name: '薄紫' },
            { hex: '#F0FFFF', name: '水色' },
            { hex: '#FFFAF0', name: '白' }
        ]
    },
    tough: {
        name: 'しんどい',
        colors: [
            { hex: '#556B2F', name: '暗オリーブ' },
            { hex: '#708090', name: '灰青' },
            { hex: '#2F4F4F', name: '暗緑' },
            { hex: '#4682B4', name: '鋼青' }
        ]
    }
};

class MoodColorApp {
    constructor() {
        this.currentMood = null;
        this.currentIntensity = 5;
        this.moodRecords = [];
        this.customMoods = {};
        this.activeDurations = new Map();
        
        // 育成システム関連のプロパティ
        this.moodLevels = {};
        this.userStats = {
            totalRecords: 0,
            streakDays: 0,
            lastRecordDate: null,
            badges: [],
            totalExperience: 0
        };
        this.achievements = [];
        
        // バーチャルペット関連のプロパティ
        this.virtualPet = {
            name: 'ムードちゃん',
            level: 1,
            experience: 0,
            health: 100,
            happiness: 80,
            stage: 'egg', // egg -> baby -> child -> teen -> adult -> master
            lastFed: null,
            lastPlayed: null,
            mood: 'neutral',
            evolutionPoints: 0
        };
        
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
        const savedCustomMoods = localStorage.getItem('customMoods');
        const savedMoodLevels = localStorage.getItem('moodLevels');
        const savedUserStats = localStorage.getItem('userStats');
        const savedAchievements = localStorage.getItem('achievements');
        const savedVirtualPet = localStorage.getItem('virtualPet');
        
        if (savedRecords) {
            this.moodRecords = JSON.parse(savedRecords);
        }
        
        if (savedCustomMoods) {
            this.customMoods = JSON.parse(savedCustomMoods);
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
        localStorage.setItem('customMoods', JSON.stringify(this.customMoods));
        localStorage.setItem('moodLevels', JSON.stringify(this.moodLevels));
        localStorage.setItem('userStats', JSON.stringify(this.userStats));
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
        localStorage.setItem('virtualPet', JSON.stringify(this.virtualPet));
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
        
        // カスタム気分のレベル初期化
        Object.keys(this.customMoods).forEach(mood => {
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
        const moodName = moodColorMap[mood]?.name || this.customMoods[mood]?.name || mood;
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

        // Custom mood events
        const toggleCustomMoodForm = document.getElementById('toggleCustomMoodForm');
        const customMoodForm = document.getElementById('customMoodForm');
        const cancelCustomMood = document.getElementById('cancelCustomMood');
        
        if (toggleCustomMoodForm) {
            toggleCustomMoodForm.addEventListener('click', () => this.toggleCustomMoodForm());
        }
        
        if (customMoodForm) {
            customMoodForm.addEventListener('submit', (e) => this.handleCustomMoodSubmit(e));
        }
        
        if (cancelCustomMood) {
            cancelCustomMood.addEventListener('click', () => this.hideCustomMoodForm());
        }

        // Growth system events
        const toggleGrowthStats = document.getElementById('toggleGrowthStats');
        if (toggleGrowthStats) {
            toggleGrowthStats.addEventListener('click', () => this.toggleGrowthSystemDisplay());
        }

        // Virtual pet events
        const feedPetBtn = document.getElementById('feedPetBtn');
        const playWithPetBtn = document.getElementById('playWithPetBtn');
        const petInfoBtn = document.getElementById('petInfoBtn');
        const petCharacter = document.getElementById('petCharacter');
        
        if (feedPetBtn) {
            feedPetBtn.addEventListener('click', () => this.feedPetManually());
        }
        
        if (playWithPetBtn) {
            playWithPetBtn.addEventListener('click', () => this.playWithPet());
        }
        
        if (petInfoBtn) {
            petInfoBtn.addEventListener('click', () => this.showPetInfo());
        }
        
        if (petCharacter) {
            petCharacter.addEventListener('click', () => this.petCharacterClicked());
        }

        // Load custom moods on init
        this.renderCustomMoodButtons();
        this.renderCustomMoodList();
        this.renderGrowthSystem();
        this.renderVirtualPet();
        this.startPetLifeCycle();
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

        // Add default moods
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

        // Add custom moods
        Object.entries(this.customMoods).forEach(([key, data]) => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'mood-checkbox';
            checkboxDiv.innerHTML = `
                <input type="checkbox" value="${key}" id="mood-${key}">
                <span class="mood-icon">${data.emoji}</span>
                <span class="mood-name">${data.name}</span>
            `;
            moodCheckboxes.appendChild(checkboxDiv);

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
            const moodData = moodColorMap[mood] || this.customMoods[mood];
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
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 2000);
    }

    // Custom Mood Methods
    toggleCustomMoodForm() {
        const creator = document.getElementById('customMoodCreator');
        const isVisible = creator.style.display !== 'none';
        creator.style.display = isVisible ? 'none' : 'block';
        
        const toggleBtn = document.getElementById('toggleCustomMoodForm');
        toggleBtn.textContent = isVisible ? '新しい気分を作成' : 'キャンセル';
    }

    hideCustomMoodForm() {
        const creator = document.getElementById('customMoodCreator');
        creator.style.display = 'none';
        
        const toggleBtn = document.getElementById('toggleCustomMoodForm');
        toggleBtn.textContent = '新しい気分を作成';
    }

    handleCustomMoodSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = document.getElementById('customMoodName').value;
        const emoji = document.getElementById('customMoodEmoji').value;
        
        const colors = [
            {
                hex: document.getElementById('color1').value,
                name: document.getElementById('colorName1').value
            },
            {
                hex: document.getElementById('color2').value,
                name: document.getElementById('colorName2').value
            },
            {
                hex: document.getElementById('color3').value,
                name: document.getElementById('colorName3').value
            },
            {
                hex: document.getElementById('color4').value,
                name: document.getElementById('colorName4').value
            }
        ];

        const customMoodId = `custom_${Date.now()}`;
        this.customMoods[customMoodId] = {
            name: name,
            emoji: emoji,
            colors: colors,
            createdAt: new Date().toISOString(),
            usageCount: 0
        };

        this.saveMoodData();
        this.renderCustomMoodButtons();
        this.renderCustomMoodList();
        this.hideCustomMoodForm();
        
        // Reset form
        e.target.reset();
    }

    renderCustomMoodButtons() {
        const moodButtons = document.querySelector('.mood-buttons');
        
        // Remove existing custom mood buttons
        const existingCustom = moodButtons.querySelectorAll('.custom-mood-btn');
        existingCustom.forEach(btn => btn.remove());

        // Add custom mood buttons
        Object.entries(this.customMoods).forEach(([key, data]) => {
            const button = document.createElement('button');
            button.className = 'mood-btn custom-mood-btn';
            button.dataset.mood = key;
            button.innerHTML = `${data.emoji} ${data.name}`;
            button.addEventListener('click', (e) => {
                this.handleCustomMoodSelection(key);
            });
            moodButtons.appendChild(button);
        });
    }

    handleCustomMoodSelection(customMoodId) {
        this.currentMood = customMoodId;
        this.updateActiveButton(customMoodId);
        this.displayCustomColorPalette(customMoodId);
        this.showAdvancedOptions();
        
        // Increment usage count
        this.customMoods[customMoodId].usageCount++;
        this.saveMoodData();
    }

    displayCustomColorPalette(customMoodId) {
        const paletteData = this.customMoods[customMoodId];
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

    renderCustomMoodList() {
        const customMoodList = document.getElementById('customMoodList');
        customMoodList.innerHTML = '';

        Object.entries(this.customMoods).forEach(([key, data]) => {
            const item = document.createElement('div');
            item.className = 'custom-mood-item';
            item.innerHTML = `
                <div class="custom-mood-info">
                    <span class="custom-mood-emoji">${data.emoji}</span>
                    <span class="custom-mood-name">${data.name}</span>
                </div>
                <div class="custom-mood-actions">
                    <button class="edit-btn" onclick="app.editCustomMood('${key}')">編集</button>
                    <button class="delete-btn" onclick="app.deleteCustomMood('${key}')">削除</button>
                </div>
            `;
            customMoodList.appendChild(item);
        });
    }

    editCustomMood(customMoodId) {
        const moodData = this.customMoods[customMoodId];
        
        // Populate form with existing data
        document.getElementById('customMoodName').value = moodData.name;
        document.getElementById('customMoodEmoji').value = moodData.emoji;
        
        moodData.colors.forEach((color, index) => {
            document.getElementById(`color${index + 1}`).value = color.hex;
            document.getElementById(`colorName${index + 1}`).value = color.name;
        });

        // Show form
        this.toggleCustomMoodForm();
        
        // Store editing ID
        this.editingCustomMoodId = customMoodId;
    }

    deleteCustomMood(customMoodId) {
        if (confirm('この気分を削除しますか？')) {
            delete this.customMoods[customMoodId];
            this.saveMoodData();
            this.renderCustomMoodButtons();
            this.renderCustomMoodList();
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

        // カスタム気分のレベル表示
        Object.entries(this.customMoods).forEach(([mood, data]) => {
            const moodLevelData = this.moodLevels[mood] || { level: 1, experience: 0, usageCount: 0 };
            const card = this.createMoodLevelCard(mood, data.name, data.emoji, moodLevelData);
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
        
        if (lastFed && (now - lastFed) < 30 * 60 * 1000) { // 30分のクールダウン
            const remainingTime = Math.ceil((30 * 60 * 1000 - (now - lastFed)) / 1000 / 60);
            this.updatePetMessage(`お腹いっぱいです！${remainingTime}分後にまた来てね。`);
            return;
        }

        this.virtualPet.health = Math.min(100, this.virtualPet.health + 3);
        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 5);
        this.virtualPet.lastFed = now.toISOString();
        
        this.showPetAnimation('feeding');
        this.updatePetStats();
        this.updatePetMessage('ありがとう！少し元気になりました！');
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

        this.virtualPet.happiness = Math.min(100, this.virtualPet.happiness + 8);
        this.virtualPet.experience += 5;
        this.virtualPet.lastPlayed = now.toISOString();
        
        this.showPetAnimation('playing');
        this.updatePetStats();
        this.updatePetMessage('楽しい！一緒に遊んでくれてありがとう！');
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
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'カラーコードをコピーしました！';
        }, 3000);
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
}

let app; // Global app instance for onclick handlers

document.addEventListener('DOMContentLoaded', () => {
    app = new MoodColorApp();
});