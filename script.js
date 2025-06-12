const allMoods = [
    { key: 'happy', displayText: '😊 ハッピー' },
    { key: 'relax', displayText: '😌 リラックス' },
    { key: 'energetic', displayText: '⚡ エネルギッシュ' },
    { key: 'melancholy', displayText: '😔 メランコリー' },
    { key: 'creative', displayText: '🎨 クリエイティブ' },
    { key: 'romantic', displayText: '💕 ロマンチック' },
    { key: 'focus', displayText: '🎯 集中' },
    { key: 'peace', displayText: '🕊️ 平穏' },
    { key: 'shindoi', displayText: '💦 しんどい' },
    { key: 'saikou', displayText: '💦 最高' }
];

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
    shindoi: {
        name: 'しんどい',
        colors: [
            { hex: '#2F4F4F', name: '暗いスレートグレー' },
            { hex: '#696969', name: 'ディムグレー' },
            { hex: '#708090', name: 'スレートグレー' },
            { hex: '#B0C4DE', name: 'ライトスチールブルー' }
        ]
    },
    saikou: {
        name: '最高',
        colors: [
            { hex: '#FFD700', name: 'ゴールド' },
            { hex: '#FF1493', name: 'ディープピンク' },
            { hex: '#32CD32', name: 'ライムグリーン' },
            { hex: '#1E90FF', name: 'ドジャーブルー' }
        ]
    }
};

class MoodColorApp {
    constructor() {
        this.currentMood = null;
        this.init();
    }

    init() {
        this.displayRandomMoods(); // Generate buttons first
        this.bindEvents();      // Then bind events to them
    }

    displayRandomMoods() {
        const moodButtonsContainer = document.querySelector('.mood-buttons');
        if (!moodButtonsContainer) {
            console.error('Mood buttons container not found!');
            return;
        }
        moodButtonsContainer.innerHTML = ''; // Clear existing buttons

        // Shuffle and select 5 moods
        const shuffledMoods = [...allMoods].sort(() => 0.5 - Math.random());
        const selectedMoods = shuffledMoods.slice(0, 5);

        selectedMoods.forEach(mood => {
            const button = document.createElement('button');
            button.className = 'mood-btn';
            button.dataset.mood = mood.key;
            button.textContent = mood.displayText;
            moodButtonsContainer.appendChild(button);
        });
    }

    bindEvents() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleMoodSelection(e.target.dataset.mood);
            });
        });
    }

    handleMoodSelection(mood) {
        this.currentMood = mood;
        this.updateActiveButton(mood);
        this.displayColorPalette(mood);
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
}

document.addEventListener('DOMContentLoaded', () => {
    new MoodColorApp();
});