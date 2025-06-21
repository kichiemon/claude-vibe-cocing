// Minecraft-style biome blocks with their mood associations
export const minecraftBlocks = {
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
export const biomeUnlockRequirements = {
    forest: { biome: 'plains', level: 3 },
    mountain: { biome: 'plains', level: 5 },
    ocean: { biome: 'forest', level: 4 },
    desert: { biome: 'mountain', level: 6 },
    nether: { biome: 'mountain', level: 10 },
    end: { biome: 'nether', level: 15 }
};

// Rarity configurations
export const rarityConfig = {
    common: { class: 'common', name: 'コモン', multiplier: 1 },
    uncommon: { class: 'uncommon', name: 'アンコモン', multiplier: 2 },
    rare: { class: 'rare', name: 'レア', multiplier: 3 },
    legendary: { class: 'legendary', name: 'レジェンダリー', multiplier: 5 },
    mythic: { class: 'mythic', name: 'ミシック', multiplier: 10 }
};
