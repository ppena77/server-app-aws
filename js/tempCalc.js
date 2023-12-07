/* La lógica de declarar todas estas funciones -con las que vamos a sacar la temperatura máxima, la temperatura mínima, la media y el número de registros (más algunos pasos intermedios)- como Promesas, es que, si el número de registros fuera alto (por ejemplo, millones), es necesario que el servidor espere a que las funciones devuelvan un resultado. Si no las declaramos como promesas, las funciones se ejecutarían una detras de otra sin esperar a que los calculos finalicen */


// * EXTRAER TEMPERATURAS DEL ARRAY DE DATOS QUE DEVUELVE LA CONSULTA A MONGODB

const getTemps = (tempRecords) =>  { // Pasamos datos de la colección Temps a la función
    return new Promise((resolve, reject) => { // Declaramos que retorne una promesa
        
        let tempArray = []; // Declaramos un array vacío donde volcaremos los datos de temperatura
        tempRecords.forEach( tempRecord => {            
            tempArray.push(tempRecord.temperatura)
        });
       
        if (tempArray.length > 0) { // Validación para comprobar que no tenemos un array vacío

            resolve(tempArray); // Resolvemos y devolvemos el array con las temperaturas

        } else { // Si el array está vacío, o bien no hay datos en la colección MongoDB, la promesa se rechaza

            reject('No hay datos de temperatura')            
        }
    })
};

//* EXTRAER TEMPERATURA MÁXIMA

const getMaxTemp = (tempArray) => {
    return new Promise((resolve, reject) => {

        let maxTemp = Math.max(...tempArray) // Sacamos el valor máximo del array
        if (maxTemp !== undefined) { // Validación para comprobar que la variable tiene un valor

            resolve(maxTemp)

        } else {

            reject('No se detecta temperatura máxima por algún motivo')
        }

    })
};

// * EXTRAER TEMPERATURA MÍNIMA

const getMinTemp = (tempArray) => {
    return new Promise((resolve, reject) => {

        let minTemp = Math.min(...tempArray) // Sacamos el valor mínimo del array
        if (minTemp !== undefined) { // Validación para comprobar que la variable tiene un valor
            resolve(minTemp)
        } else {
            reject('No se detecta temperatura mínima por algún motivo')
        }

    })
};

// * REALIZAR SUMATORIO DE TEMPERATURAS DEL ARRAY (Para calcular media) 

const addTemps = (tempArray) => {
    return new Promise((resolve, reject) => {
        
        let addedTemps = 0; // Declaramos variable donde sumaremos las temperaturas, con valor por defecto 0
        
        tempArray.forEach( temp => { // Sumamos todas las temperaturas
            addedTemps += temp;
        });
        
        if ( addedTemps !== 0 ) { // Validación para comprobar que la variable tiene un valor

            resolve(addedTemps)

        } else {

            reject('No se detecta suma de temperaturas')
        }
    })
};

// * EXTRAER NÚMERO DE REGISTROS DEL ARRAY (Para calcular media)

const getLength = (tempArray) => {
    return new Promise((resolve, reject) => {

        let tempLength = tempArray.length;
        if (tempLength !== undefined) { // Validación para comprobar que 

            resolve(tempLength)

        } else {

            reject('No se detecta número de registro de temperaturas')
        }

    })
};

// * CALCULAR MEDIA Y MANDAR TODOS LOS DATOS

const getAverageAndSendEverything = (dataWithoutAverage) => {
    return new Promise((resolve, reject) => {
        /* 
        La lógica de los datos que recibimos en esta ultima función es la siguiente:
        Recibimos un array con 4 valores que, indexados, se corresponden con:
            0: Temperatura máxima
            1: Temperatura mínima
            2: Suma total de temperaturas
            3: Número de temperaturas registradas
        */

        let tempAverage = -273 // Declaramos varibale donde almacenaremos la media, con un valor por defecto de -273
        tempAverage = dataWithoutAverage[2]/dataWithoutAverage[3]; // Sacamos la media
        
        if ( tempAverage !== -273 ) { // Validación para comprobar que la temperatura media tiene un valor distinto al que le damos por defecto
            let finalResult = { // Guardamos los datos finales en un objeto
                temperaturaMaxima: dataWithoutAverage[0],
                temperaturaMinima: dataWithoutAverage[1],
                temperaturaMedia: tempAverage,
                numeroRegistros: dataWithoutAverage[3]
            };
            resolve(finalResult) // Resolvemos y mandamos el objeto
        } else {
            reject('No se detecta tempratura media')
        }
    })
};

// * EXPORTAMOS TODAS LAS FUNCIONES

module.exports = {
    getTemps,
    getMaxTemp,
    getMinTemp,
    addTemps,
    getLength,
    getAverageAndSendEverything
}