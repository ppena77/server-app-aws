// * IMPORTS

const express = require('express');
const router = express.Router();

const Temp = require('../models/temps');  // Importamos modelo mongoDB "Temp" 

const tempCalc = require('../js/tempCalc'); // Importamos lo métodos para extraer y calcular los datos de interés (temperatura mínima, máxima, media y número de registros)


// * GET TEMPERATURES (Para extraer la temperatura máxima, mínima, media y número de registros)

router.get('/', (req, res) => {

  Temp.find({}) // Queremos encontrar todos los documentos registrados en la colección Temps de MongoDB
    .then( tempRecords => tempCalc.getTemps(tempRecords)) // Extraemos las temperaturas
    .then( tempArray => Promise.all([ // Extraemos max, min, suma total y num. registros (se puede hacer en paralelo porque ninguna de estas promesas depende de las otras)
        tempCalc.getMaxTemp(tempArray),
        tempCalc.getMinTemp(tempArray),
        tempCalc.addTemps(tempArray),
        tempCalc.getLength(tempArray),
      ])
    )
    .then( dataWithoutAverage => tempCalc.getAverageAndSendEverything(dataWithoutAverage)) // Extraemos la media y guardamos todos los datos en un objeto
    .then( finalData => res.json(finalData) ) // Mandamos respuesta con los datos en formato json
    .catch( err => {  // Si hay un error, lo mandamos como respuesta y lo imprimimos en consola
      console.log(err);
      res.send(err)
    })

});

//* POST TEMPERATURES (Registro temperatura en MongoDB)

router.post('/reg', (req, res) => {

  /* Validación para comprobar que los datos recibidos vienen en Json */
  if (req.headers['content-type'] === 'application/json') {

    const data = req.body; // Guardamos datos recibidos en variable "data"

    // Apuntamos a la colección de mongoDB "Temps" y mandamos a inyectar los datos como un nuevo Documento
    Temp.create(data) 
      .then( result => { 
        res.json(result) // Si todo va bien, mandamos el resultado que nos devuelve el método "create" de mongoose como respuesta
      })
      .catch( err => {
        console.log(err)
        res.send(err)
      } ) // Si no va bien, imprimimos el error a la vez que lo mandamos como respuesta también
    
  } else {
    /* Si los datos que llegan no vienen como json, mandamos respuesta a Sensor App e imprimimos en consola igualmente */
    console.log('Recieved request in /temp/reg url is not a Json object');
    res.send('Recieved request in /temp/reg is not a Json object');
  }    
});

module.exports = router;