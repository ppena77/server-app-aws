const mongoose = require('mongoose'); // Importamos mongoose

// * Some MongoDB configurations

const mongodbPort = '27017';
const mongodbTargetDB = 'sensorData';

// * MONGOOSE CONNECTION

let connectToDb = async () => {

    /* Nuestro servidor está configurado para usar MongoDB en LOCAL */

    const dev_db_url = `mongodb://127.0.0.1:${mongodbPort}/${mongodbTargetDB}`;

    const mongoDB = process.env.MONGODB_URI || dev_db_url; // Indicamos que para conectarnos a MongoDB, podemos usar la variable de entorno que queramos (no hemos visto aún variables de entorno, pero lo dejo para testar la aplicación) o, la variable dev_db_url previamente definida.

    mongoose.connect(mongoDB); // Hacemos la llamada a MongoDB con la ruta facilitada en la variable mongoDB

    const db = mongoose.connection; // Cargamos el objeto connection de mongoose en una variable para poder escuchar los estados de la conexion

    db.on('error', console.error.bind(console, 'MongoDB connection error')); // Listener del estado de la conexión para cuando se lanza un error y manejar dicho error

    return db;
};

module.exports = {
    connectToDb
}