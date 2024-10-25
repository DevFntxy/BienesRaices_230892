import express from 'express';

const router = express.Router();


//GET
//Endpoints - Rutas para acceder a las secciones o funciones de nuestra aplicacion web
//":" en una ruta definen de manera posicional los parametros de entrada
//1 Ruta , 2 funcion calback de lo que va a hacer
router.get("/findByID/:id", function(request, response){
    response.send(`Se esta solicitando buscar el usuario con ID: ${request.params.id}`);
})


//POST
router.post("/newUser/:name/:email/:password", function(request,response){
    response.send(`Se ha solicitado la creacion de un nuevo usuario de nombre ${request.params.name}, asociado al correo ${request.params.email }
        con la contraseña ${request.params.password}`)
})

//PUT Se utiliza para la acrualizacion total de la indormacion del cliente al servidor

router.put("/replaceUser/:name/:email/:passwd", function(request,response){
    response.send(`Se ha solicitato eñ remplazo de toda la informacion del usuario: ${request.params.name}, con correo ${request.params.email}
        y contraseña: ${request.params.passwd}`)
})
//PATCH- Se solicita para la actualizacion parcial

router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm", function (request, response){

    const {email, newPassword, newPasswordConfirm} = request.params;

    if(newPassword == newPasswordConfirm){
        response.send(`Se ha solicitado la actualizacion de la contraseña del usuaio con correo : ${email} ingresa la nueva contraseña
            ${newPassword} confirma la contraseña ${newPasswordConfirm}`)
    }else{
    response.send(`La contraseña :${newPassword} 
        no coincide con esta contraseña:${newPasswordConfirm}`)
    }
})

router.delete("/deleteUser/:email", function(request, response){
    response.send(`Se ha solicitado la eliminacion del usuario ${request.params.email}`)
})



export default router;