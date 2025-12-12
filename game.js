// ===================================
// Game Logic & Data
// ===================================

// Math Categories
const categories = {
    bilangan: {
        name: 'Bilangan',
        icon: '🔢',
        description: 'Pelajari operasi bilangan dan sifat-sifatnya',
        color: 'from-blue-600 to-cyan-600',
        available: false
    },
    aljabar: {
        name: 'Aljabar',
        icon: '📐',
        description: 'Kuasai variabel, persamaan, dan fungsi',
        color: 'from-purple-600 to-pink-600',
        available: true
    },
    geometri: {
        name: 'Geometri',
        icon: '📏',
        description: 'Jelajahi bentuk, sudut, dan ruang',
        color: 'from-green-600 to-emerald-600',
        available: false
    },
    peluang: {
        name: 'Peluang',
        icon: '🎲',
        description: 'Pahami probabilitas dan statistika',
        color: 'from-orange-600 to-red-600',
        available: false
    }
};

// Stages for Aljabar
const algebraStages = {
    1: { name: 'Forest of Basic Algebra', difficulty: 'basic', enemies: ['Goblin Penjumlah', 'Slime Pengurangan'] },
    2: { name: 'Cave of Equations', difficulty: 'intermediate', enemies: ['Orc Persamaan', 'Troll Variabel'] },
    3: { name: 'Mountain of Quadratics', difficulty: 'advanced', enemies: ['Dragon Kuadrat', 'Phoenix Fungsi'] }
};

// Get current stages based on selected category
function getCurrentStages(selectedCategory) {
    if (selectedCategory === 'aljabar') {
        return algebraStages;
    }
    return {};
}

// Generate enemy
function generateEnemy(stageNum, selectedCategory) {
    const stages = getCurrentStages(selectedCategory);
    const stageData = stages[stageNum];
    if (!stageData) return null;
    
    const enemyName = stageData.enemies[Math.floor(Math.random() * stageData.enemies.length)];
    const baseHp = 50 + stageNum * 30;
    const baseAtk = 5 + stageNum * 5;
    
    return {
        name: enemyName,
        hp: baseHp,
        maxHp: baseHp,
        attack: baseAtk,
        difficulty: stageData.difficulty
    };
}

// Start battle - now with tutorial option
function startBattle(stageNum, gameState) {
    const stages = getCurrentStages(gameState.selectedCategory);
    if (!stages[stageNum]) {
        showNotification('Stage tidak tersedia!', 'error');
        return;
    }
    
    // Check if tutorial available
    const tutorial = getTutorial(gameState.selectedCategory, stageNum);
    
    if (tutorial && !gameState.tutorialCompleted) {
        // Show tutorial first
        gameState.currentTutorial = tutorial;
        gameState.pendingStage = stageNum;
        gameState.screen = 'tutorial';
    } else {
        // Go directly to battle
        gameState.stage = stageNum;
        gameState.enemy = generateEnemy(stageNum, gameState.selectedCategory);
        
        if (!gameState.enemy) {
            showNotification('Gagal membuat musuh!', 'error');
            return;
        }
        
        gameState.currentQuestion = generateQuestion(gameState.enemy.difficulty);
        gameState.battleLog = [`${gameState.enemy.name} muncul!`];
        gameState.feedback = '';
        gameState.userAnswer = '';
        gameState.screen = 'game';
    }
}

// Complete tutorial and start battle
function completeTutorial(gameState) {
    gameState.tutorialCompleted = true;
    gameState.screen = 'game';
    
    const stageNum = gameState.pendingStage;
    gameState.stage = stageNum;
    gameState.enemy = generateEnemy(stageNum, gameState.selectedCategory);
    
    if (!gameState.enemy) {
        showNotification('Gagal membuat musuh!', 'error');
        return;
    }
    
    gameState.currentQuestion = generateQuestion(gameState.enemy.difficulty);
    gameState.battleLog = [`${gameState.enemy.name} muncul!`];
    gameState.feedback = '';
    gameState.userAnswer = '';
}

// Skip tutorial
function skipTutorial(gameState) {
    completeTutorial(gameState);
}

// Check answer
function checkAnswer(gameState) {
    if (!gameState.userAnswer) return;
    
    const numAnswer = parseFloat(gameState.userAnswer);
    const isCorrect = Math.abs(numAnswer - gameState.currentQuestion.answer) < 0.01;
    
    if (isCorrect) {
        const damage = gameState.player.attack + Math.floor(Math.random() * 10);
        gameState.enemy.hp = Math.max(0, gameState.enemy.hp - damage);
        
        gameState.battleLog.push(`✓ Benar! Kamu menyerang ${damage} damage!`);
        gameState.feedback = `Correct! ${gameState.currentQuestion.explanation}`;
        
        if (gameState.enemy.hp <= 0) {
            const expGain = 50 + gameState.stage * 25;
            const goldGain = 20 + gameState.stage * 10;
            gameState.player.exp += expGain;
            gameState.player.gold += goldGain;
            
            let leveledUp = false;
            if (gameState.player.exp >= gameState.player.expToNext) {
                gameState.player.level++;
                gameState.player.exp -= gameState.player.expToNext;
                gameState.player.expToNext = 100 * gameState.player.level;
                gameState.player.maxHp += 20;
                gameState.player.hp = gameState.player.maxHp;
                gameState.player.attack += 5;
                gameState.player.defense += 2;
                leveledUp = true;
            }
            
            gameState.battleLog.push(`${gameState.enemy.name} dikalahkan! +${expGain} EXP, +${goldGain} Gold${leveledUp ? ' LEVEL UP!' : ''}`);
            
            setTimeout(() => {
                saveProgress(gameState);
                gameState.screen = 'menu';
                render();
            }, 3000);
        } else {
            setTimeout(() => enemyAttack(gameState), 1500);
        }
    } else {
        gameState.feedback = `Salah! ${gameState.currentQuestion.explanation}`;
        gameState.battleLog.push(`✗ Salah! ${gameState.enemy.name} menyerang balik!`);
        setTimeout(() => enemyAttack(gameState), 1500);
    }
    
    gameState.userAnswer = '';
}

// Enemy attack
function enemyAttack(gameState) {
    const damage = Math.max(1, gameState.enemy.attack - gameState.player.defense + Math.floor(Math.random() * 5));
    gameState.player.hp = Math.max(0, gameState.player.hp - damage);
    
    gameState.battleLog.push(`${gameState.enemy.name} menyerang ${damage} damage!`);
    
    if (gameState.player.hp <= 0) {
        gameState.battleLog.push('Kamu kalah! EXP dan Gold dikurangi.');
        gameState.player.hp = gameState.player.maxHp;
        gameState.player.exp = Math.max(0, gameState.player.exp - 25);
        gameState.player.gold = Math.max(0, gameState.player.gold - 10);
        
        setTimeout(() => {
            saveProgress(gameState);
            gameState.screen = 'menu';
            render();
        }, 2000);
    } else {
        gameState.currentQuestion = generateQuestion(gameState.enemy.difficulty);
        gameState.feedback = '';
    }
    
    render();
}

// Heal player
function heal(gameState) {
    if (gameState.player.gold >= 30 && gameState.player.hp < gameState.player.maxHp) {
        gameState.player.hp = gameState.player.maxHp;
        gameState.player.gold -= 30;
        gameState.battleLog = ['Kamu menggunakan Potion! HP penuh.'];
        saveProgress(gameState);
    }
}

// Select category
function selectCategory(category, gameState) {
    const categoryData = categories[category];
    if (!categoryData.available) {
        showNotification('Kategori ini belum tersedia! Coming soon...', 'warning');
        return;
    }
    gameState.selectedCategory = category;
    gameState.screen = 'menu';
}

// Navigation
function goBack(gameState) {
    if (gameState.screen === 'game') {
        gameState.screen = 'menu';
    } else if (gameState.screen === 'menu') {
        gameState.screen = 'category';
        gameState.selectedCategory = null;
    } else if (gameState.screen === 'login' || gameState.screen === 'register') {
        gameState.screen = 'welcome';
        gameState.error = '';
    } else if (gameState.screen === 'category') {
        handleLogout(gameState);
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification ${type} fade-in`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}