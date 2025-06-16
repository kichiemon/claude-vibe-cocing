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
        
        if (savedRecords) {
            this.moodRecords = JSON.parse(savedRecords);
        }
        
        if (savedCustomMoods) {
            this.customMoods = JSON.parse(savedCustomMoods);
        }
    }

    saveMoodData() {
        localStorage.setItem('moodRecords', JSON.stringify(this.moodRecords));
        localStorage.setItem('customMoods', JSON.stringify(this.customMoods));
    }

    addMoodRecord(moodData) {
        this.moodRecords.push({
            ...moodData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        this.saveMoodData();
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

        // Load custom moods on init
        this.renderCustomMoodButtons();
        this.renderCustomMoodList();
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
}

let app; // Global app instance for onclick handlers

document.addEventListener('DOMContentLoaded', () => {
    app = new MoodColorApp();
});