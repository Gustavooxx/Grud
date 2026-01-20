import express, { Router } from "express";
import { adicionarUser, atualizarUser, deletarUSer, listarUsers, listarUsersLId } from "../repository/grud/listarUsers.js";

const lista = Router();

lista.get("/listarUser/:nome", async (req, res) => {
    try {
        const nome = req.params.nome;
        const users = await listarUsers(nome);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

lista.get("/listarUser/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const users = await listarUsersLId(id);
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
});

lista.post("/adicionarUser", async (req, res) => {
    try {
        const novoUser = req.body;
        const id = await adicionarUser(novoUser);
        res.status(201).json({ id: id });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    })


lista.put("/atualizarUser/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const atualizar = await atualizarUser(id, user);
        res.status(200).json("User do id " + id + " atualizado com sucesso");
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
})

lista.delete("/deletarUser/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const deletar = await deletarUSer(id);
        res.status(200).json(`User do id ${id} deletado com sucesso`);
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
})

export default lista;