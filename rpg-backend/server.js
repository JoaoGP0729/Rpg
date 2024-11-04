const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let characters = [];

// Rota para obter todos os personagens
app.get('/api/characters', (req, res) => {
    res.json(characters);
});

// Rota para adicionar um novo personagem
app.post('/api/characters', (req, res) => {
    const { name, health, mana, maxHealth, maxMana, gold, silver, bronze } = req.body;
    const character = { name, health, mana, maxHealth, maxMana, gold, silver, bronze };
    characters.push(character);
    res.status(201).json(character);
});

// Rota para editar um personagem
app.put('/api/characters/:index', (req, res) => {
    const index = req.params.index;
    const updates = req.body;
    if (characters[index]) {
        Object.keys(updates).forEach(key => {
            if (key === 'health' || key === 'mana') {
                characters[index][key] = Math.max(0, characters[index][key] + updates[key]);
            } else {
                characters[index][key] += updates[key];
            }
        });
        res.json(characters[index]);
    } else {
        res.status(404).send('Personagem não encontrado');
    }
});

// Rota para deletar um personagem
app.delete('/api/characters/:index', (req, res) => {
    const index = req.params.index;
    if (characters[index]) {
        characters.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Personagem não encontrado');
    }
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
