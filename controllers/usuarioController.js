
const formularioLogin = function(request,response) {
    response.render('auth/login', {
      page : 'Inicia Sesion'

    })
}

const formularioRegister = function(request,response) {
    response.render('auth/register', {
        page : 'Crear Cuenta'
    })
}

const formularioPasswordRecovery = function(request, response) {
    response.render('auth/passwordRecovery', {
        // Agrega aquí cualquier dato que desees pasar a la vista
        page : 'Recupera Contraseña '
    })
}


export {
    formularioLogin,
    formularioRegister,
    formularioPasswordRecovery

} 