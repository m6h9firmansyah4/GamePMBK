// ===================================
// Tutorial & Learning Materials Data
// ===================================

// Tutorial data for each stage
const tutorialData = {
    aljabar: {
        1: {
            title: 'Pengenalan Aljabar Dasar',
            subtitle: 'Memahami variabel, koefisien, dan operasi dasar',
            difficulty: 'Basic',
            duration: '5 menit',
            
            // Content sections
            sections: [
                {
                    type: 'text',
                    title: '📐 Apa itu Aljabar?',
                    content: `
                        Aljabar adalah cabang matematika yang menggunakan <strong>huruf (variabel)</strong> 
                        untuk mewakili angka. Variabel biasanya ditulis dengan huruf seperti x, y, atau z.
                        <br><br>
                        <strong>Contoh:</strong> 
                        <ul>
                            <li>5x artinya 5 dikali x</li>
                            <li>Jika x = 3, maka 5x = 5 × 3 = 15</li>
                        </ul>
                    `
                },
                {
                    type: 'image',
                    title: '🎯 Komponen Aljabar',
                    caption: '5x: 5 adalah koefisien, x adalah variabel',

                },
                {
                    type: 'text',
                    title: '➕ Operasi Dasar',
                    content: `
                        <strong>1. Penjumlahan Suku Sejenis:</strong><br>
                        3x + 2x = 5x (Jumlahkan koefisiennya)<br><br>
                        
                        <strong>2. Substitusi Variabel:</strong><br>
                        Jika x = 4, maka 3x = 3 × 4 = 12<br><br>
                        
                        <strong>3. Persamaan Sederhana:</strong><br>
                        2x = 10, maka x = 10 ÷ 2 = 5
                    `
                },
                {
                    type: 'video',
                    title: '🎥 Video Pembelajaran',
                    videoId: 'NybHckSEQBI', // YouTube video ID (Contoh: Khan Academy)
                    caption: 'Video penjelasan aljabar dasar dari Khan Academy'
                },
                {
                    type: 'example',
                    title: '💡 Contoh Soal & Pembahasan',
                    examples: [
                        {
                            question: 'Berapakah nilai dari 4x jika x = 5?',
                            solution: '4x = 4 × 5 = 20',
                            answer: '20'
                        },
                        {
                            question: 'Sederhanakan: 7x + 3x',
                            solution: '7x + 3x = (7+3)x = 10x',
                            answer: '10x'
                        },
                        {
                            question: 'Selesaikan: 3x = 15',
                            solution: 'x = 15 ÷ 3 = 5',
                            answer: '5'
                        }
                    ]
                }
            ],
            
            // Quick tips before battle
            tips: [
                '💡 Ingat: Suku sejenis bisa dijumlahkan',
                '🎯 Koefisien adalah angka di depan variabel',
                '⚡ Substitusi = mengganti variabel dengan angka'
            ]
        },
        
        2: {
            title: 'Persamaan Linear',
            subtitle: 'Menyelesaikan persamaan dengan satu variabel',
            difficulty: 'Intermediate',
            duration: '8 menit',
            
            sections: [
                {
                    type: 'text',
                    title: '📊 Persamaan Linear',
                    content: `
                        Persamaan linear adalah persamaan yang variabelnya berpangkat satu.
                        Bentuk umum: <strong>ax + b = c</strong>
                        <br><br>
                        <strong>Langkah Penyelesaian:</strong>
                        <ol>
                            <li>Pindahkan konstanta ke ruas kanan</li>
                            <li>Bagi kedua ruas dengan koefisien x</li>
                            <li>Dapatkan nilai x</li>
                        </ol>
                    `
                },
                {
                    type: 'image',
                    caption: 'Contoh persamaan linear sederhana',
                },
                {
                    type: 'text',
                    title: '🔢 Cara Menyelesaikan',
                    content: `
                        <strong>Contoh: 2x + 5 = 13</strong><br><br>
                        <strong>Langkah 1:</strong> Kurangi 5 dari kedua ruas<br>
                        2x + 5 - 5 = 13 - 5<br>
                        2x = 8<br><br>
                        
                        <strong>Langkah 2:</strong> Bagi kedua ruas dengan 2<br>
                        2x ÷ 2 = 8 ÷ 2<br>
                        x = 4<br><br>
                        
                        <strong>✓ Jawaban: x = 4</strong>
                    `
                },
                {
                    type: 'video',
                    title: '🎥 Video Tutorial',
                    videoId: 'ZWyRJDwUlq4', // Khan Academy - Linear Equations
                    caption: 'Cara menyelesaikan persamaan linear'
                },
                {
                    type: 'example',
                    title: '💡 Latihan Soal',
                    examples: [
                        {
                            question: 'Selesaikan: 3x + 4 = 16',
                            solution: '3x = 16 - 4 = 12, maka x = 12 ÷ 3 = 4',
                            answer: '4'
                        },
                        {
                            question: 'Selesaikan: 5x - 2 = 18',
                            solution: '5x = 18 + 2 = 20, maka x = 20 ÷ 5 = 4',
                            answer: '4'
                        }
                    ]
                }
            ],
            
            tips: [
                '💡 Operasi yang sama di kedua ruas!',
                '🎯 Isolasi variabel di satu ruas',
                '⚡ Cek jawaban dengan substitusi kembali'
            ]
        },
        
        3: {
            title: 'Persamaan Kuadrat',
            subtitle: 'Faktorisasi dan menyelesaikan persamaan kuadrat',
            difficulty: 'Advanced',
            duration: '12 menit',
            
            sections: [
                {
                    type: 'text',
                    title: '📐 Persamaan Kuadrat',
                    content: `
                        Persamaan kuadrat adalah persamaan dengan variabel berpangkat dua.
                        Bentuk umum: <strong>ax² + bx + c = 0</strong>
                        <br><br>
                        <strong>Metode Penyelesaian:</strong>
                        <ul>
                            <li>Faktorisasi</li>
                            <li>Rumus ABC (kuadratik)</li>
                            <li>Melengkapkan kuadrat sempurna</li>
                        </ul>
                    `
                },
                {
                    type: 'image',
                    caption: 'Contoh persamaan kuadrat',
                },
                {
                    type: 'text',
                    title: '🔍 Faktorisasi',
                    content: `
                        <strong>Contoh: x² + 5x + 6 = 0</strong><br><br>
                        
                        <strong>Langkah 1:</strong> Cari dua angka yang:
                        <ul>
                            <li>Jika dijumlahkan = 5 (koefisien x)</li>
                            <li>Jika dikalikan = 6 (konstanta)</li>
                        </ul>
                        Angkanya: 2 dan 3<br><br>
                        
                        <strong>Langkah 2:</strong> Faktorkan<br>
                        (x + 2)(x + 3) = 0<br><br>
                        
                        <strong>Langkah 3:</strong> Cari nilai x<br>
                        x + 2 = 0 → x = -2<br>
                        x + 3 = 0 → x = -3<br><br>
                        
                        <strong>✓ Jawaban: x = -2 atau x = -3</strong>
                    `
                },
                {
                    type: 'video',
                    title: '🎥 Video Pembelajaran',
                    videoId: '5ILmeLyzONM', // Khan Academy - Quadratic Equations
                    caption: 'Cara menyelesaikan persamaan kuadrat'
                },
                {
                    type: 'example',
                    title: '💡 Contoh Soal',
                    examples: [
                        {
                            question: 'Faktorkan: x² + 7x + 12',
                            solution: '(x + 3)(x + 4) karena 3+4=7 dan 3×4=12',
                            answer: '(x+3)(x+4)'
                        },
                        {
                            question: 'Selesaikan: x² - 5x + 6 = 0',
                            solution: '(x-2)(x-3)=0, maka x=2 atau x=3',
                            answer: 'x=2 atau x=3'
                        }
                    ]
                }
            ],
            
            tips: [
                '💡 Cari faktor yang jumlah dan kalinya tepat',
                '🎯 Periksa dengan perkalian balik',
                '⚡ Ada 2 solusi untuk persamaan kuadrat'
            ]
        }
    },
    
    // Template untuk kategori lain (belum diisi)
    bilangan: {},
    geometri: {},
    peluang: {}
};

// Get tutorial for specific category and stage
function getTutorial(category, stage) {
    if (tutorialData[category] && tutorialData[category][stage]) {
        return tutorialData[category][stage];
    }
    return null;
}