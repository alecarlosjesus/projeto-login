import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
    await client.connect();
    console.log('Conectado ao MongoDB!');
} catch (erro) {
    console.error('Erro ao conectar com o MongoDB:', erro);
}

export default client;