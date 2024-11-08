import {check, validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js";

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
   // await check('nombre').notEmpty().run(request)

    let resultado = validationResult (request)
    response.json(resultado.array)

    const usuario = await Usuario.create(request.body)
    response.json(usuario)
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