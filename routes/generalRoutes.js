import express from 'express';
const router = express.Router()

//Routing- Enritamiento para peticiones
//Home o la que se muestra al principio
router.get("/", function(req, res){
    res.send("Hola desde la Web, en NodeJS")
})

router.get("/quienEres", function(req, res){
    res.json({
        "nombre" : "Derek Sesni Carreño",
        "carrerar" : "TI DSM",
        "grado" : "4",
        "grupo"  : "A"   

    })
})

export default router;  //Esta palabra  permite exportar estas peticiones por 