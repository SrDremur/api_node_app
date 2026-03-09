const mongoose = require('mongoose');
require('dotenv').config();

const conectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexion exitosa a Mongo');
    } catch (error) {
        console.error('Error al conectarse a Mongo: ', error.message);
        process.exit(1);
    }
}

module.exports = conectDB;