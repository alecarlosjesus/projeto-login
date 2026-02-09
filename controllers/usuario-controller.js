import { validarUsuario as validarNoBanco, inserirUsuario } from "../models/usuario-model.js";


export function loginView(req, res) {
    res.render('login', {
        title: 'Login'
    });
}

export async function validarUsuario(req, res) {
    const { email, senha } = req.body;
    
    const usuario = await validarNoBanco(email, senha);
    
    if (usuario) {
        req.session.usuario = usuario.email;
        res.redirect('/home');
    } else {
        res.redirect('/login');
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

export function cadastrarView(req, res) {
    res.render('cadastrar', {
        title: 'Cadastro'
    });
}

export async function cadastrarUsuario(req, res) {
    const { email, senha } = req.body;
    
    await inserirUsuario(email, senha);
    res.redirect('/login');
}

// Exportando as funções do controlador
export default { loginView, validarUsuario, homeView, logout };