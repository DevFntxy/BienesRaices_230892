
const formularioLogin = function(request,response) {
    response.render('auth/login', {
      

    })
}

const formularioRegister = function(request,response) {
    response.render('auth/register', {
      

    })
}

const formularioPasswordRecovery = function(request,response) {
    response.render('auth/paswordRecovery', {
      
    })
}

export {
    formularioLogin,
    formularioRegister,
    formularioPasswordRecovery

} 