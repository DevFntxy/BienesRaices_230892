//Ejemplo de acticaxuion de hort relOAD
//console.log("Hola desde NodeJS, esto esta en hot reload")

//*******************+Declaracion de COMMON********************** 
// express= require ('express')
//const app = express();  

import express from 'express';
import generalRoutes from  './routes/generalRoutes.js';
import userRoutes from  './routes/userRoutes.js';

const app = express();

const port = 3000;

app.listen(port, ()=>{
    console.log(`La aplicacion ha iniciado en el puerto ${port}`)  
})

app.use('/', generalRoutes);
app.use('/usuario/', userRoutes);

