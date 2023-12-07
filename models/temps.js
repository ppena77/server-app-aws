const mongoose = require('mongoose'); // Importamos Mongoose
const Schema = mongoose.Schema; // Importamos método Schema de Mongose

// * Creamos Schema para los datos del sensor

const temps = new Schema({
    sensor: String,
    temperatura: Number,
    fecha: String
});

// * Exportamos una instancia de sensorDataSchema, que será el Modelo "SensorData"

module.exports = mongoose.model('Temp', temps);