export class NotificationManager {
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
