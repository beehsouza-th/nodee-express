require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projeto',
    password: 'BRENDALINDA',
    port: 5432,
   
});

app.use(cors());
app.use(express.json());

// Rota para obter todos os clientes
app.get("/clientes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
});

// Rota para criar um cliente (exemplo)
app.post("/clientes", async (req, res) => {
    const { nome, nascimento, cpf } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, nascimento, cpf) VALUES ($1, $2, $3) RETURNING *',
            [nome, nascimento, cpf]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar cliente", error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});
