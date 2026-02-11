// ./controllers/usuario-controller.js

import { validarUsuario, inserirUsuario } from "../models/usuario-model.js";

export function loginView(req, res) {
    res.render('login', {
        title: 'Login'
    });
}

export async function validarUsuarioPost(req, res) {
    const { email, senha } = req.body;

    const usuario = await validarUsuario(email, senha);

    if (usuario) {
        req.session.usuario = usuario.email;
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
}

export function cadastroView(req, res) {
    res.render('cadastrar', {
        title: 'Cadastro'
    });
}

export async function cadastroUsuarioPost(req, res) {
    const { email, senha } = req.body;

    const resultado = await inserirUsuario({ email, senha });

    if (resultado) {
        res.redirect('/login');
    } else {
        res.redirect('/cadastro');
    }
}

export function homeView(req, res) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    res.render('home', {
        title: 'Página Inicial',
        usuario: req.session.usuario
    });
}

export function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
        }
        res.redirect('/login');
    });
}

export default {
    loginView,
    validarUsuarioPost,
    cadastroView,
    cadastroUsuarioPost,
    homeView,
    logout
};