//Ejemplo de acticaxuion de hort relOAD
//console.log("Hola desde NodeJS, esto esta en hot reload")

//*******************+Declaracion de COMMON********************** 
// express= require ('express')
//const app = express();  


import express from 'express';
const app = express()

const port = 3000

app.listen(port, ()=>{
    console.log(`La aplicacion ha iniciado en el puerto ${port}`)  
})

//Routing- Enritamiento para peticiones
app.get("/", function(req, res){
    res.send("Hola desde la Web, en NodeJS")
})

app.get("/quienEres", function(req, res){
    res.json({
        "nombre" : "Derek Sesni Carreño",
        "carrerar" : "TI DSM",
        "grado" : "4",
        "grupo"  : "A"   

    })
})