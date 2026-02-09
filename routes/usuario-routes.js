// routes/usuario-routes.js

import express from "express";
import {
loginView,
validarUsuario,
homeView,
logout,
cadastrarView,
cadastrarUsuario
} from '../controllers/usuario-controller.js';

const router = express.Router();

// Rota GET para exibir a página de login
router.get('/login', loginView);

// Rota POST para processar o formulário de login
router.post('/validacao', validarUsuario);

// Rota GET protegida para exibir a página inicial
router.get('/home', homeView);

// Rota GET para encerrar a sessão e redirecionar ao login
router.get('/logout', logout);




// Rota GET para exibir a página de cadastro
router.get('/cadastrar', cadastrarView);

// Rota POST para processar o formulário de cadastro
router.post('/cadastrar', cadastrarUsuario);

export default router;