// ===================================
// Authentication & LocalStorage
// ===================================

// LocalStorage Functions
function getUsers() {
    const users = localStorage.getItem('algebraRPG_users');
    return users ? JSON.parse(users) : {};
}

function saveUser(username, password, playerData) {
    const users = getUsers();
    users[username] = { password, playerData };
    localStorage.setItem('algebraRPG_users', JSON.stringify(users));
}

function loadUserData(username) {
    const users = getUsers();
    return users[username]?.playerData || null;
}

function getCurrentUser() {
    return localStorage.getItem('algebraRPG_currentUser');
}

function setCurrentUser(username) {
    localStorage.setItem('algebraRPG_currentUser', username);
}

function clearCurrentUser() {
    localStorage.removeItem('algebraRPG_currentUser');
}

// Auth Functions
function handleRegister(gameState) {
    const { username, password, confirmPassword } = gameState.registerForm;
    
    if (!username || !password || !confirmPassword) {
        gameState.error = 'Semua field harus diisi!';
        return false;
    }

    if (password !== confirmPassword) {
        gameState.error = 'Password tidak cocok!';
        return false;
    }

    if (password.length < 4) {
        gameState.error = 'Password minimal 4 karakter!';
        return false;
    }

    const users = getUsers();
    if (users[username]) {
        gameState.error = 'Username sudah digunakan!';
        return false;
    }

    // Save new user
    saveUser(username, password, gameState.player);
    gameState.currentUser = username;
    setCurrentUser(username);
    gameState.player.name = username;
    gameState.screen = 'category';
    gameState.error = '';
    return true;
}

function handleLogin(gameState) {
    const { username, password } = gameState.loginForm;
    
    if (!username || !password) {
        gameState.error = 'Username dan password harus diisi!';
        return false;
    }

    const users = getUsers();
    const user = users[username];

    if (!user || user.password !== password) {
        gameState.error = 'Username atau password salah!';
        return false;
    }

    // Load user data
    const playerData = loadUserData(username);
    if (playerData) {
        gameState.player = playerData;
    }
    gameState.currentUser = username;
    setCurrentUser(username);
    gameState.player.name = username;
    gameState.screen = 'category';
    gameState.error = '';
    return true;
}

function handleLogout(gameState) {
    saveProgress(gameState);
    gameState.currentUser = null;
    gameState.selectedCategory = null;
    clearCurrentUser();
    gameState.screen = 'welcome';
    gameState.player = {
        name: 'Hero',
        level: 1,
        exp: 0,
        expToNext: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,
        defense: 5,
        gold: 0
    };
}

function saveProgress(gameState) {
    if (gameState.currentUser) {
        const users = getUsers();
        const user = users[gameState.currentUser];
        if (user) {
            saveUser(gameState.currentUser, user.password, gameState.player);
            showNotification('Progress berhasil disimpan! ✓');
        }
    }
}

// Check for existing session
function checkExistingSession(gameState) {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userData = loadUserData(currentUser);
        if (userData) {
            gameState.currentUser = currentUser;
            gameState.player = userData;
            gameState.player.name = currentUser;
            gameState.screen = 'category';
            return true;
        }
    }
    return false;
}