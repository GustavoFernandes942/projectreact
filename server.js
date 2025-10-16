import express from "express";
import cors from "cors"; 
import { DatabasePostgres } from "./databasePostgres.js";
import "./createTable.js";
import bcrypt from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dontev from "dotenv";

dontev.config();

const app = express();
app.use(cors());
app.use(express.json());

const database = new DatabasePostgres();

app.post('/auth/register', async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({msg : 'preencha todos os campos!'});
    }

    const existingUser = await database.findByEmail(email);
    if(existingUser){
        return res.status(400).json({ msg : 'Email já esta cadastrado!'});
    }

    await database.create({ name, email, password});
    res.status(201).json({ msg : 'Usuario criado!'});
});

app.post('/auth/login', async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({ msg : 'preencha email e senha!'});
    }

    const user = await database.findByEmail(email);
    if(!user){
        return res.status(400).json({ msg: 'Usuario nao encontrado! '});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({ msg : 'senha Invalida'});
    }

    const token = jwt.sign(
        { id: user.id, email: user.email},
        process.env.JWT_SECRET || 'minhaChaveUltraSecreta',
        { expiresIn: 'id'}
    );

    res.json({
        msg: 'login realizado!',
        token,
        user: { id: user.id, name: user.name, email: user.email}
    });
});

app.get('/projected', (req,res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ msg: 'token nao oferecido! '});

    const token = authHeader.split('')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MinhaChaveSuperSecreta');
        res.json({ msg: 'Acesso autorizado!'}, decoded);
    }catch(err){
        res.status(401).json({ msg: 'token Invalido! '});
    }
});

app.get('/users', async (req, res) => {
    const users = await database.list();
    res.json(users);
})