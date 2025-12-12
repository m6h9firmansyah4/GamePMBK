🎮 Algebra Quest RPG
Educational RPG game for learning Mathematics from basic to advanced levels

Tampilkan Gambar
Tampilkan Gambar

📋 Table of Contents
About
Features
Installation
Project Structure
How to Play
Math Categories
Development
Contributing
License
🎯 About
Algebra Quest RPG adalah game edukatif berbasis RPG yang mengajarkan matematika melalui sistem battle turn-based. Pemain akan menjawab soal matematika untuk menyerang musuh, naik level, dan membuka area baru.

Genre: Educational RPG / Edutainment
Platform: Web Browser (HTML5)
Target Audience: Pelajar SD-SMA (8-17 tahun)

✨ Features
🎓 Educational Content
✅ 4 Kategori Matematika: Bilangan, Aljabar, Geometri, Peluang
✅ 3 Tingkat Kesulitan: Basic → Intermediate → Advanced
✅ Real-time Feedback: Penjelasan setiap jawaban
✅ Progressive Learning: Materi bertahap sesuai level
🎮 RPG Mechanics
⚔️ Turn-Based Battle: Jawab soal → Serang musuh
📊 Leveling System: EXP, HP, ATK, DEF
💰 Economy: Gold untuk beli item
🗺️ Multiple Stages: 3 area per kategori
🏆 Achievements: Unlock area baru
💾 Progress System
🔐 Login/Register: Akun pengguna lokal
💾 Auto-Save: Progress tersimpan otomatis
📱 LocalStorage: Data disimpan di browser
🔄 Session Management: Auto-login
🚀 Installation
Quick Start
Clone repository:
bash
git clone https://github.com/yourusername/algebra-quest-rpg.git
cd algebra-quest-rpg
Open in browser:
bash
# Buka file index.html di browser
# Atau gunakan live server
python -m http.server 8000
# Buka http://localhost:8000
Play! 🎉
Requirements
Modern web browser (Chrome, Firefox, Safari, Edge)
JavaScript enabled
No backend required!
📁 Project Structure
algebra-quest-rpg/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles & animations
├── js/
│   ├── main.js         # Main app & render functions
│   ├── game.js         # Game logic & mechanics
│   ├── auth.js         # Authentication & storage
│   ├── questions.js    # Question generation
│   └── icons.js        # SVG icons
├── README.md           # This file
└── LICENSE             # MIT License
File Descriptions
File	Description
index.html	Entry point, loads all scripts
styles.css	Animations, custom styling
main.js	Game state, render engine, UI
game.js	Battle logic, enemy AI, stages
auth.js	Login, register, save/load
questions.js	Math question generators
icons.js	SVG icon components
🎮 How to Play
1. Register/Login
New Player: Click "Register" → Create username & password
Returning Player: Click "Login" → Enter credentials
2. Choose Category
Select math category: Aljabar (currently available)
Other categories coming soon!
3. Select Stage
Choose difficulty level
Higher levels require higher player level
4. Battle!
Read the math question
Enter your answer
Correct answer → Attack enemy
Wrong answer → Enemy attacks you
5. Level Up
Defeat enemies to gain EXP & Gold
Level up to increase stats
Unlock new stages
📚 Math Categories
📐 Aljabar (Available)
3 Stages:

Forest of Basic Algebra - Basic operations
Variable substitution
Simple equations
Combining like terms
Cave of Equations - Intermediate level
Linear equations
Two-variable expressions
Distributive property
Mountain of Quadratics - Advanced level
Quadratic equations
Factorization
Vertex form
🔢 Bilangan (Coming Soon)
Number operations
Integers
Fractions & decimals
📏 Geometri (Coming Soon)
2D shapes
Angles & lines
Area & perimeter
🎲 Peluang (Coming Soon)
Probability basics
Combinations & permutations
Basic statistics
🛠️ Development
Adding New Content
1. Add New Category
Edit js/game.js:

javascript
const categories = {
    newCategory: {
        name: 'Category Name',
        icon: '🎯',
        description: 'Description here',
        color: 'from-blue-600 to-cyan-600',
        available: true // Enable it
    }
};
2. Add New Stages
javascript
const newCategoryStages = {
    1: { 
        name: 'Stage Name', 
        difficulty: 'basic', 
        enemies: ['Enemy 1', 'Enemy 2'] 
    }
};
3. Add Questions
Edit js/questions.js:

javascript
function generateNewQuestion(difficulty) {
    // Your question generation logic
    return { question, answer, explanation };
}
Local Testing
bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open Pull Request
Contribution Ideas
🎨 Improve UI/UX design
📚 Add more math categories
🌍 Add language translations
🎵 Add sound effects & music
📊 Add leaderboard system
🎓 Add difficulty customization
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Your Name

GitHub: @yourusername
Email: your.email@example.com
🙏 Acknowledgments
Icons by Lucide Icons
Styling by Tailwind CSS
Inspired by educational games like Prodigy Math
📊 Stats
Total Lines of Code: ~2000+
File Size: ~150KB
Load Time: <1 second
Browser Support: All modern browsers
🗺️ Roadmap
Version 2.1 (Next)
 Add Bilangan category
 Add sound effects
 Add animations
Version 2.2
 Add Geometri category
 Add dark/light theme
 Add mobile optimization
Version 3.0
 Add multiplayer mode
 Add leaderboard
 Add achievements system
⭐ Star this repo if you find it helpful!

🎮 Play, Learn, and Level Up! 🚀

