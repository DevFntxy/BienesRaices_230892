import express, { application } from 'express';
import { formularioLogin,formularioRegister,register,confirm,formularioPasswordRecovery,passwordReset, verfyTokenPasswordChange, updatePassword }  from '../controllers/usuarioController.js';
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
    response.send(`Se ha solicitato el remplazo de toda la informacion del usuario: ${request.params.name}, con correo ${request.params.email}
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


router.get("/login", formularioLogin);
router.get("/login", formularioLogin);

router.get("/createAccount",formularioRegister);
router.post("/createAccount", register);
router.get('/accountConfirmed/:token', confirm); // Asegúrate de que exista

router.get("/passwordRecovery",formularioPasswordRecovery);
router.post("/passwordRecovery",passwordReset)

//Almacena el nuevo password

router.get("/passwordRecovery/:token",verfyTokenPasswordChange)
router.post("/passwordRecovery/:token",updatePassword)

export default router;