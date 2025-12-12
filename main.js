// ===================================
// Main Application & Render Engine
// ===================================

// Game State
let gameState = {
    screen: 'welcome', // welcome, login, register, menu, tutorial, game
    currentUser: null,
    loginForm: { username: '', password: '' },
    registerForm: { username: '', password: '', confirmPassword: '' },
    error: '',
    currentTutorial: null,
    tutorialCompleted: false,
    pendingStage: null,
    player: {
        name: 'Hero',
        level: 1,
        exp: 0,
        expToNext: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,
        defense: 5,
        gold: 0
    },
    enemy: null,
    currentQuestion: null,
    userAnswer: '',
    feedback: '',
    battleLog: [],
    stage: 1
};

// ===================================
// Render Functions
// ===================================

function renderWelcomeScreen() {
    return `
        <div class="welcome-screen">
            <div class="welcome-card fade-in">
                <div class="text-yellow-400 flex justify-center mb-4">
                    ${Icons.BookOpen()}
                </div>
                <h1 class="text-4xl font-bold mb-2">Algebra Quest RPG</h1>
                <p class="text-gray-300 mb-2">Petualangan Belajar Aljabar</p>
                <p class="text-lg text-purple-300 mb-8">📐 Dari Basic hingga Advanced</p>
                
                <div class="space-y-4">
                    <button onclick="gameState.screen = 'login'; render()" 
                            class="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg font-bold transition-all">
                        Login - Pengguna Lama
                    </button>
                    <button onclick="gameState.screen = 'register'; render()" 
                            class="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-lg font-bold transition-all">
                        Register - Pengguna Baru
                    </button>
                </div>
                
                <div class="mt-8 text-sm text-gray-400">
                    <p>🎮 3 Level Aljabar: Basic → Intermediate → Advanced</p>
                    <p>📚 Materi Lengkap dengan Video Tutorial</p>
                    <p>⚔️ Battle dengan Sistem RPG</p>
                    <p>📊 Progress Tersimpan Otomatis</p>
                </div>
            </div>
        </div>
    `;
}

function renderLoginScreen() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div class="max-w-md w-full bg-black bg-opacity-50 rounded-lg p-8 text-white fade-in">
                <button onclick="goBack(gameState); render()" class="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
                    ${Icons.ArrowLeft()}
                    <span>Kembali</span>
                </button>
                
                <div class="text-blue-400 flex justify-center mb-4">
                    ${Icons.User()}
                </div>
                <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
                
                ${gameState.error ? `
                    <div class="bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-3 mb-4 text-sm">
                        ${gameState.error}
                    </div>
                ` : ''}
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Username</label>
                        <input type="text" 
                               value="${gameState.loginForm.username}"
                               oninput="gameState.loginForm.username = this.value"
                               placeholder="Masukkan username"
                               class="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Password</label>
                        <input type="password" 
                               value="${gameState.loginForm.password}"
                               oninput="gameState.loginForm.password = this.value"
                               onkeypress="if(event.key === 'Enter') { handleLogin(gameState); render(); }"
                               placeholder="Masukkan password"
                               class="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <button onclick="handleLogin(gameState); render()" 
                            class="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg font-bold transition-all">
                        Masuk
                    </button>
                </div>
                
                <p class="text-center text-gray-400 text-sm mt-6">
                    Belum punya akun? 
                    <button onclick="gameState.screen = 'register'; gameState.error = ''; render()" 
                            class="text-green-400 hover:text-green-300">
                        Daftar di sini
                    </button>
                </p>
            </div>
        </div>
    `;
}

function renderRegisterScreen() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div class="max-w-md w-full bg-black bg-opacity-50 rounded-lg p-8 text-white fade-in">
                <button onclick="goBack(gameState); render()" class="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
                    ${Icons.ArrowLeft()}
                    <span>Kembali</span>
                </button>
                
                <div class="text-green-400 flex justify-center mb-4">
                    ${Icons.User()}
                </div>
                <h2 class="text-3xl font-bold mb-6 text-center">Register</h2>
                
                ${gameState.error ? `
                    <div class="bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-3 mb-4 text-sm">
                        ${gameState.error}
                    </div>
                ` : ''}
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Username</label>
                        <input type="text" 
                               value="${gameState.registerForm.username}"
                               oninput="gameState.registerForm.username = this.value"
                               placeholder="Pilih username"
                               class="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Password</label>
                        <input type="password" 
                               value="${gameState.registerForm.password}"
                               oninput="gameState.registerForm.password = this.value"
                               placeholder="Minimal 4 karakter"
                               class="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Konfirmasi Password</label>
                        <input type="password" 
                               value="${gameState.registerForm.confirmPassword}"
                               oninput="gameState.registerForm.confirmPassword = this.value"
                               onkeypress="if(event.key === 'Enter') { handleRegister(gameState); render(); }"
                               placeholder="Ketik ulang password"
                               class="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <button onclick="handleRegister(gameState); render()" 
                            class="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-lg font-bold transition-all">
                        Daftar
                    </button>
                </div>
                
                <p class="text-center text-gray-400 text-sm mt-6">
                    Sudah punya akun? 
                    <button onclick="gameState.screen = 'login'; gameState.error = ''; render()" 
                            class="text-blue-400 hover:text-blue-300">
                        Login di sini
                    </button>
                </p>
            </div>
        </div>
    `;
}

function renderTutorialScreen() {
    const tutorial = gameState.currentTutorial;
    if (!tutorial) return '';
    
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div class="max-w-4xl mx-auto">
                <!-- Header -->
                <div class="bg-black bg-opacity-50 rounded-lg p-4 mb-4 text-white fade-in">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            <span class="text-yellow-400">📚</span>
                            Materi Pembelajaran
                        </h1>
                        <button onclick="goBack(gameState); render()" 
                                class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                            ${Icons.ArrowLeft()}
                            <span>Kembali</span>
                        </button>
                    </div>
                </div>

                <!-- Tutorial Header -->
                <div class="bg-black bg-opacity-50 rounded-lg p-6 mb-4 text-white fade-in">
                    <div class="flex items-start justify-between">
                        <div>
                            <h2 class="text-3xl font-bold mb-2">${tutorial.title}</h2>
                            <p class="text-gray-300 text-lg mb-4">${tutorial.subtitle}</p>
                            <div class="flex gap-4 text-sm">
                                <span class="bg-blue-600 px-3 py-1 rounded">📊 ${tutorial.difficulty}</span>
                                <span class="bg-purple-600 px-3 py-1 rounded">⏱️ ${tutorial.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tutorial Content -->
                <div class="space-y-4">
                    ${tutorial.sections.map((section, index) => {
                        if (section.type === 'text') {
                            return `
                                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white slide-in" style="animation-delay: ${index * 0.1}s">
                                    <h3 class="text-2xl font-bold mb-4">${section.title}</h3>
                                    <div class="text-gray-200 leading-relaxed">
                                        ${section.content}
                                    </div>
                                </div>
                            `;
                        }
                        
                        else if (section.type === 'image') {
                            return `
                                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white slide-in" style="animation-delay: ${index * 0.1}s">
                                    <h3 class="text-2xl font-bold mb-4">${section.title}</h3>
                                    <img src="${section.url}" alt="${section.title}" class="w-full rounded-lg mb-3">
                                    <p class="text-sm text-gray-400 text-center">${section.caption}</p>
                                </div>
                            `;
                        }
                        
                        else if (section.type === 'video') {
                            return `
                                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white slide-in" style="animation-delay: ${index * 0.1}s">
                                    <h3 class="text-2xl font-bold mb-4">${section.title}</h3>
                                    <div class="relative" style="padding-bottom: 56.25%; height: 0;">
                                        <iframe 
                                            src="https://www.youtube.com/embed/${section.videoId}" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen
                                            class="absolute top-0 left-0 w-full h-full rounded-lg">
                                        </iframe>
                                    </div>
                                    <p class="text-sm text-gray-400 mt-3">${section.caption}</p>
                                </div>
                            `;
                        }
                        
                        else if (section.type === 'example') {
                            return `
                                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white slide-in" style="animation-delay: ${index * 0.1}s">
                                    <h3 class="text-2xl font-bold mb-4">${section.title}</h3>
                                    <div class="space-y-4">
                                        ${section.examples.map((ex, i) => `
                                            <div class="bg-blue-900 bg-opacity-30 rounded-lg p-4">
                                                <p class="font-bold mb-2">Soal ${i + 1}:</p>
                                                <p class="text-lg mb-3">${ex.question}</p>
                                                <p class="text-sm text-gray-300 mb-1">💡 <strong>Pembahasan:</strong></p>
                                                <p class="text-gray-200">${ex.solution}</p>
                                                <p class="text-green-400 mt-2">✓ Jawaban: <strong>${ex.answer}</strong></p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        }
                        
                        return '';
                    }).join('')}
                </div>

                <!-- Tips Section -->
                <div class="bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-50 rounded-lg p-6 mt-4 text-white">
                    <h3 class="text-xl font-bold mb-3">💡 Tips Sebelum Battle:</h3>
                    <ul class="space-y-2">
                        ${tutorial.tips.map(tip => `
                            <li class="flex items-start gap-2">
                                <span class="text-yellow-400">▸</span>
                                <span>${tip}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <button onclick="skipTutorial(gameState); render()" 
                            class="py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-all">
                        ⏭️ Lewati Tutorial
                    </button>
                    <button onclick="completeTutorial(gameState); render()" 
                            class="py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-lg font-bold text-white transition-all">
                        ✓ Selesai, Mulai Battle!
                    </button>
                </div>
            </div>
        </div>
    `;

    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-black bg-opacity-50 rounded-lg p-4 mb-4 text-white fade-in">
                    <div class="flex justify-between items-center">
                        <h1 class="text-3xl font-bold flex items-center gap-2">
                            <span class="text-yellow-400">${Icons.BookOpen()}</span>
                            Algebra Quest RPG
                        </h1>
                        <button onclick="handleLogout(gameState); render()" 
                                class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors">
                            ${Icons.LogOut()}
                            <span class="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                    <div class="text-sm text-gray-300 mt-2">
                        Player: <span class="text-yellow-400 font-bold">${gameState.currentUser}</span>
                    </div>
                </div>

                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white fade-in">
                    <h2 class="text-2xl font-bold mb-2 text-center">Pilih Bidang Matematika</h2>
                    <p class="text-gray-400 text-center mb-6">Mulai petualangan belajar matematika kamu!</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${Object.entries(categories).map(([key, cat]) => `
                            <button onclick="selectCategory('${key}', gameState); render()" 
                                    class="p-6 rounded-lg text-left transition-all transform hover:scale-105 ${
                                        cat.available 
                                            ? `bg-gradient-to-r ${cat.color} hover:shadow-2xl cursor-pointer` 
                                            : 'bg-gray-700 opacity-50 cursor-not-allowed'
                                    }">
                                <div class="flex items-center gap-4 mb-3">
                                    <div class="text-5xl">${cat.icon}</div>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold mb-1">${cat.name}</h3>
                                        ${!cat.available ? '<span class="text-xs bg-yellow-600 px-2 py-1 rounded">Coming Soon</span>' : ''}
                                    </div>
                                </div>
                                <p class="text-sm text-gray-200">${cat.description}</p>
                            </button>
                        `).join('')}
                    </div>

                    <div class="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
                        <p class="text-sm text-center text-gray-300">
                            💡 <span class="font-bold">Tips:</span> Setiap bidang matematika memiliki tantangan dan musuh yang berbeda!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;    
}

function renderMenuScreen() {
    const p = gameState.player;
    const stages = getCurrentStages();
    
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div class="max-w-4xl mx-auto">
                ${renderPlayerHeader()}
                
                <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white fade-in">
                    <div class="text-center mb-6">
                        <h2 class="text-3xl font-bold mb-2">📐 Petualangan Aljabar</h2>
                        <p class="text-gray-300">Pilih level kesulitan dan mulai belajar!</p>
                    </div>
                    
                    <div class="space-y-3">
                        ${Object.entries(stages).map(([stageNum, stageData]) => {
                            const unlocked = p.level >= (parseInt(stageNum) - 1) * 4 + 1;
                            return `
                                <button onclick="startBattle(${stageNum}, gameState); render()" 
                                        ${!unlocked ? 'disabled' : ''}
                                        class="w-full p-4 rounded-lg text-left transition-all ${
                                            unlocked 
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 cursor-pointer' 
                                                : 'bg-gray-700 opacity-50 cursor-not-allowed'
                                        }">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <div class="font-bold text-lg">${stageData.name}</div>
                                            <div class="text-sm opacity-75 capitalize">Kesulitan: ${stageData.difficulty}</div>
                                        </div>
                                        ${!unlocked ? `<div class="text-sm bg-red-600 px-3 py-1 rounded">Unlock di Level ${(parseInt(stageNum) - 1) * 4 + 1}</div>` : ''}
                                    </div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="mt-6 p-4 bg-green-900 bg-opacity-50 rounded-lg">
                        <button onclick="heal(gameState); render()" 
                                ${p.gold < 30 || p.hp === p.maxHp ? 'disabled' : ''}
                                class="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                            ${Icons.Heart()} Heal (30 Gold) - HP: ${p.hp}/${p.maxHp}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderBattleScreen() {
    const e = gameState.enemy;
    const q = gameState.currentQuestion;
    
    return `
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div class="max-w-4xl mx-auto">
                ${renderPlayerHeader()}
                
                <div class="space-y-4 fade-in">
                    <!-- Enemy -->
                    <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white text-center">
                        <h3 class="text-2xl font-bold mb-2">${e.name}</h3>
                        <div class="mb-2">
                            <div class="flex justify-between text-sm mb-1">
                                <span>HP: ${e.hp}/${e.maxHp}</span>
                                <span>${Math.floor((e.hp / e.maxHp) * 100)}%</span>
                            </div>
                            <div class="bg-gray-700 rounded-full h-4 overflow-hidden">
                                <div class="hp-bar bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-500" 
                                     style="width: ${(e.hp / e.maxHp) * 100}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Question -->
                    <div class="bg-black bg-opacity-50 rounded-lg p-6 text-white">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="text-yellow-400">${Icons.Zap()}</span>
                            <h3 class="text-xl font-bold">Soal Matematika:</h3>
                        </div>
                        <p class="text-lg mb-4 bg-blue-900 bg-opacity-30 p-4 rounded">${q.question}</p>
                        
                        <div class="flex gap-2">
                            <input type="number" step="any" id="answerInput"
                                   value="${gameState.userAnswer}"
                                   oninput="gameState.userAnswer = this.value"
                                   onkeypress="if(event.key === 'Enter') { checkAnswer(gameState); render(); }"
                                   placeholder="Jawaban kamu..."
                                   class="flex-1 px-4 py-3 bg-gray-800 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <button onclick="checkAnswer(gameState); render()"
                                    class="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 rounded-lg font-bold transition-all">
                                Jawab!
                            </button>
                        </div>
                        
                        ${gameState.feedback ? `
                            <div class="mt-4 p-3 rounded ${
                                gameState.feedback.startsWith('Correct') ? 'bg-green-900 bg-opacity-50' : 'bg-red-900 bg-opacity-50'
                            }">
                                ${gameState.feedback}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Battle Log -->
                    <div class="bg-black bg-opacity-50 rounded-lg p-4 text-white">
                        <h4 class="font-bold mb-2">Battle Log:</h4>
                        <div class="battle-log space-y-1 scrollbar-custom">
                            ${gameState.battleLog.map(log => `<div class="text-sm opacity-90">${log}</div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPlayerHeader() {
    const p = gameState.player;
    
    return `
        <div class="bg-black bg-opacity-50 rounded-lg p-4 mb-4 text-white fade-in">
            <div class="flex justify-between items-center mb-2">
                <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span class="text-yellow-400">${Icons.BookOpen()}</span>
                    📐 Algebra Quest RPG
                </h1>
                <div class="flex gap-2">
                    ${gameState.screen === 'game' ? `
                        <button onclick="goBack(gameState); render()" 
                                class="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm">
                            ${Icons.ArrowLeft()}
                            <span class="hidden sm:inline">Menu</span>
                        </button>
                    ` : ''}
                    <button onclick="saveProgress(gameState)" 
                            class="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-sm">
                        ${Icons.Save()}
                        <span class="hidden sm:inline">Save</span>
                    </button>
                    <button onclick="handleLogout(gameState); render()" 
                            class="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-sm">
                        ${Icons.LogOut()}
                        <span class="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
            
            <div class="text-sm text-gray-300 mb-4">
                Player: <span class="text-yellow-400 font-bold">${gameState.currentUser}</span>
            </div>
            
            <!-- Player Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-blue-900 bg-opacity-50 rounded p-3">
                    <div class="text-sm opacity-75">Level</div>
                    <div class="text-2xl font-bold flex items-center gap-2">
                        <span class="text-yellow-400">${Icons.Star()}</span>
                        ${p.level}
                    </div>
                </div>
                <div class="bg-red-900 bg-opacity-50 rounded p-3">
                    <div class="text-sm opacity-75">HP</div>
                    <div class="text-2xl font-bold flex items-center gap-2">
                        <span class="text-red-400">${Icons.Heart()}</span>
                        ${p.hp}/${p.maxHp}
                    </div>
                </div>
                <div class="bg-orange-900 bg-opacity-50 rounded p-3">
                    <div class="text-sm opacity-75">ATK/DEF</div>
                    <div class="text-xl font-bold flex items-center gap-2">
                        <span class="text-orange-400">${Icons.Sword()}</span>
                        ${p.attack}
                        <span class="text-blue-400">${Icons.Shield()}</span>
                        ${p.defense}
                    </div>
                </div>
                <div class="bg-yellow-900 bg-opacity-50 rounded p-3">
                    <div class="text-sm opacity-75">Gold</div>
                    <div class="text-2xl font-bold flex items-center gap-2">
                        <span class="text-yellow-400">${Icons.Trophy()}</span>
                        ${p.gold}
                    </div>
                </div>
            </div>
            
            <!-- EXP Bar -->
            <div class="mt-3">
                <div class="flex justify-between text-sm mb-1">
                    <span>EXP: ${p.exp}/${p.expToNext}</span>
                    <span>${Math.floor((p.exp / p.expToNext) * 100)}%</span>
                </div>
                <div class="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div class="exp-bar bg-gradient-to-r from-green-400 to-blue-500 h-full" 
                         style="width: ${(p.exp / p.expToNext) * 100}%"></div>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// Main Render Function
// ===================================

function render() {
    const app = document.getElementById('app');
    let html = '';
    
    switch (gameState.screen) {
        case 'welcome':
            html = renderWelcomeScreen();
            break;
        case 'login':
            html = renderLoginScreen();
            break;
        case 'register':
            html = renderRegisterScreen();
            break;
        case 'menu':
            html = renderMenuScreen();
            break;
        case 'tutorial':
            html = renderTutorialScreen();
            break;
        case 'game':
            html = renderBattleScreen();
            break;
        default:
            html = renderWelcomeScreen();
    }
    
    app.innerHTML = html;
    
    // Auto-focus input in battle
    if (gameState.screen === 'game') {
        setTimeout(() => {
            const input = document.getElementById('answerInput');
            if (input) input.focus();
        }, 100);
    }
}

// ===================================
// Initialization
// ===================================

window.onload = function() {
    // Check for existing session
    checkExistingSession(gameState);
    
    // Initial render
    render();
    
    console.log('%c🎮 Algebra Quest RPG Started!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('Game Version: 2.0.0');
    console.log('Status: Ready to play!');
};