// ./routes/usuario-routes.js

import express from "express";
import {
    loginView,
    validarUsuarioPost,
    homeView,
    logout,
    cadastroView,
    cadastrarUsuarioPost
} from '../controllers/usuario-controller.js';

const router = express.Router();

// Rota GET para exibir a página de login
router.get('/login', loginView);

// Rota POST para processar o formulário de login
router.post('/login', validarUsuarioPost);

// Rota GET para exibir a página de cadastro
router.get('/cadastro', cadastroView);

// Rota POST para processar o formulário de cadastro
router.post('/cadastro', cadastrarUsuarioPost);

// Rota GET protegida para exibir a página inicial
router.get('/home', homeView);

// Rota GET para encerrar a sessão e redirecionar ao login
router.get('/logout', logout);

// Redireciona a rota raiz para login
router.get('/', (req, res) => res.redirect('/login'));

export default router;