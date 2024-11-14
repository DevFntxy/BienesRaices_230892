//Ejemplo de acticaxuion de hort relOAD
//console.log("Hola desde NodeJS, esto esta en hot reload")

//*******************+Declaracion de COMMON********************** 
// express= require ('express')
//const app = express();  

import express from 'express';
import generalRoutes from  './routes/generalRoutes.js';
import userRoutes from  './routes/userRoutes.js';
import db from './db/config.js'

const app = express();

const port = process.env.port ||  3000;

//Habilitar templeate engine Pug 
app.set('view engine','pug')
app.set('views','./views')

//carpeta publica
app.use(express.static('public'))

app.use( express.urlencoded({extended: true}))
//Conexión a la BD
try
{
  await db.authenticate();//Verifica las credenciales del usuario
  db.sync(); //Sincronizo las tablas con los modelos
  console.log("Conexión exitosa a la base de datos :D")
}
catch(error)
{
    console.log("Error de conexion :ccc")
}

app.listen(port, ()=>{
    console.log(`La aplicacion ha iniciado en el puerto ${port}`)  
})

app.use('/', generalRoutes);
app.use('/usuario/', userRoutes);