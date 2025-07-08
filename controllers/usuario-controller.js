import { validarUsuario } from '../models/usuario-model.js';

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

import { inserirUsuario } from '../models/usuario-model.js';

export function cadastroView(req, res) {
  res.render('cadastro', {
    title: 'Cadastro'
  });
}

export async function cadastroUsuario(req, res) {
  const { email, senha } = req.body;

  await inserirUsuario({ email, senha });
  res.redirect('/login');
}
