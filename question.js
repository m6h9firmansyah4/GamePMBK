// ===================================
// Question Generation System
// ===================================

// Generate algebra questions based on difficulty
function generateQuestion(difficulty) {
    let question, answer, explanation;
    
    if (difficulty === 'basic') {
        const types = ['simple', 'combine', 'solve'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'simple') {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            question = `Berapakah nilai dari ${a}x jika x = ${b}?`;
            answer = a * b;
            explanation = `${a}x dengan x = ${b} adalah ${a} × ${b} = ${answer}`;
        } else if (type === 'combine') {
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 5) + 1;
            question = `Sederhanakan: ${a}x + ${b}x`;
            answer = a + b;
            explanation = `${a}x + ${b}x = ${a + b}x, koefisiennya adalah ${answer}`;
        } else {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 10) + 5;
            answer = Math.floor(b / a);
            const result = a * answer;
            question = `Selesaikan: ${a}x = ${result}`;
            explanation = `x = ${result} ÷ ${a} = ${answer}`;
        }
    } else if (difficulty === 'intermediate') {
        const types = ['linear', 'twovar', 'distribute'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'linear') {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 10) + 5;
            const c = Math.floor(Math.random() * 10) + 10;
            answer = Math.floor((c - b) / a);
            question = `Selesaikan: ${a}x + ${b} = ${c}`;
            explanation = `${a}x = ${c} - ${b} = ${c - b}, maka x = ${answer}`;
        } else if (type === 'twovar') {
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 3) + 1;
            question = `Sederhanakan: ${a}x + ${b}y - x + 2y. Berapa koefisien x?`;
            answer = a - 1;
            explanation = `(${a}x - x) + (${b}y + 2y) = ${a - 1}x + ${b + 2}y, koefisien x adalah ${answer}`;
        } else {
            const a = Math.floor(Math.random() * 3) + 2;
            const b = Math.floor(Math.random() * 3) + 1;
            question = `Jabarkan: ${a}(x + ${b}). Berapa koefisien x?`;
            answer = a;
            explanation = `${a}(x + ${b}) = ${a}x + ${a * b}, koefisien x adalah ${answer}`;
        }
    } else { // advanced
        const types = ['quadratic', 'factor', 'complete'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'quadratic') {
            const roots = [2, 3, 4, 5];
            const r1 = roots[Math.floor(Math.random() * roots.length)];
            const r2 = roots[Math.floor(Math.random() * roots.length)];
            const b = -(r1 + r2);
            const c = r1 * r2;
            question = `Selesaikan x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0. Berapa salah satu nilai x?`;
            answer = Math.min(r1, r2);
            explanation = `Faktorisasi: (x - ${r1})(x - ${r2}) = 0, maka x = ${r1} atau x = ${r2}`;
        } else if (type === 'factor') {
            const a = Math.floor(Math.random() * 3) + 2;
            const b = Math.floor(Math.random() * 3) + 2;
            question = `Faktorkan: x² + ${a + b}x + ${a * b}. Berapa konstanta di faktor pertama?`;
            answer = Math.min(a, b);
            explanation = `x² + ${a + b}x + ${a * b} = (x + ${a})(x + ${b})`;
        } else {
            const h = Math.floor(Math.random() * 4) + 1;
            const k = Math.floor(Math.random() * 5) + 1;
            question = `Titik puncak parabola y = (x - ${h})² + ${k} ada di x = ?`;
            answer = h;
            explanation = `Bentuk vertex y = (x - h)² + k memiliki puncak di (h, k) = (${h}, ${k})`;
        }
    }
    
    return { question, answer, explanation };
}

// Generate questions for other categories (to be implemented)
function generateBilanganQuestion(difficulty) {
    // TODO: Implement bilangan questions
    return { 
        question: "Coming soon...", 
        answer: 0, 
        explanation: "Kategori ini sedang dalam pengembangan" 
    };
}

function generateGeometriQuestion(difficulty) {
    // TODO: Implement geometri questions
    return { 
        question: "Coming soon...", 
        answer: 0, 
        explanation: "Kategori ini sedang dalam pengembangan" 
    };
}

function generatePeluangQuestion(difficulty) {
    // TODO: Implement peluang questions
    return { 
        question: "Coming soon...", 
        answer: 0, 
        explanation: "Kategori ini sedang dalam pengembangan" 
    };
}