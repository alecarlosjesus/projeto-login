import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuario-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

app.use(express.static(path.join(__dirname, './public')));

app.use('/usuarios', usuarioRoutes);


// Trecho removido do código para evitar a execução do servidor local
// app.listen(3000, () => {
// console.log("Servidor Iniciando na porta 3000");
// });

/*
Exportando o app para ser utilizado em outros módulos e servidores dentro da
plataforma Vercel.
*/
export default app;