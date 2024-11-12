import { check , validationResult} from 'express-validator';
import Usuario from "../models/Usuario.js";
import { where } from 'sequelize';

const formularioLogin = function(request, response) {
    response.render('auth/login', {
        page: 'Inicia Sesion'
    });
};

const formularioRegister = function(request, response) {
    response.render('auth/register', {
        page: 'Crear Cuenta'
    });
};

const register = async (request, response) => {

    //validacion
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(request)
    await check('email').isEmail().withMessage('Eso no parece un email').run(request)
    await check('password').isLength({min: 6 }).withMessage('El password lleva mas de 6 digitos').run(request)
    await check('repetpassword').equals(request.body.password).withMessage('Las contraseñas no son iguales').run(request);



    let resultado = validationResult (request)
     //Verificar que el resultado este este vacio

     //return response.json(resultado.array())
     if(!resultado.isEmpty()){//El usuario no esta vacio por lo tanto hay errores
        return response.render('auth/register', {
            page: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre :  request.body.nombre,
                email: request.body.email
            }
        }) 
     }

     // extraer los datos
     const {nombre, email, password} = request.body 
     //Verifica que el usuario no este duplicado
     const exiteUsuario = await  Usuario.findOne({where: {email}})
    if(exiteUsuario){
        return response.render('auth/register', {
            page: 'Crear Cuenta',
            errores:[{msg : 'El usuario ya esta registrado '}],
            usuario: {
                nombre :  request.body.nombre,
                email: request.body.email
            }
        })   
    }
     return;
}

const formularioPasswordRecovery = function(request, response) {
    response.render('auth/passwordRecovery', {
        page: 'Recupera Contraseña'
    });
};

export {
    formularioLogin,
    formularioRegister,
    register,
    formularioPasswordRecovery
};