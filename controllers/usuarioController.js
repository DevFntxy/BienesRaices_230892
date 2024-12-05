import { check, checkExact, validationResult } from 'express-validator';
import bcryp from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarID } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';
import { emailChangePassword } from '../helpers/emails.js';
import { request, response } from 'express';
import { where } from 'sequelize';
import csurf from 'csurf';


const formularioLogin = (request, response) => {
  response.render('auth/login', {
    page: 'Inicia Sesión',
    csrfToken: request.csrfToken(),

  });
};


const formularioRegister = (request, response) => {
  
  console.log(request.csrfToken())
  response.render('auth/register', {
    csrfToken: request.csrfToken(),
    page: 'Crear Cuenta',
    
  });
};
const register = async (request, response) => {
  // Validación
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacío').run(request);
  await check('email').isEmail().withMessage('Debe ser un email válido').run(request);
  await check('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres').run(request);
  await check('repetpassword').equals(request.body.password).withMessage('Las contraseñas no coinciden').run(request);
  await check('fechaNacimiento')
  .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
  .custom((value) => {
    const hoy = new Date();
    const fechaNacimiento = new Date(value);
    
    // Calcula la diferencia en años entre la fecha de hoy y la fecha de nacimiento
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // Si la diferencia es menor a 18 o si cumple 18 años en el año actual pero aún no ha llegado a su cumpleaños
    if (edad < 18 || (edad === 18 && hoy < new Date(fechaNacimiento.setFullYear(hoy.getFullYear())))) {
      throw new Error('Debes ser mayor de 18 años para registrarte');
    }

    return true;
  })
  .run(request);

  const resultado = validationResult(request);

  if (!resultado.isEmpty()) {
    return response.render('auth/register', {
      csrfToken: request.csrfToken(),
      page: 'Crear Cuenta',
      errores: resultado.array(),
      usuario: {
        nombre: request.body.nombre,
        email: request.body.email,
      },
    });
  }

  const { nombre, email, password,fechaNacimiento } = request.body;

  // Verificar usuario duplicado
  const usuarioExistente = await Usuario.findOne({ where: { email } });

  if (usuarioExistente) {
    return response.render('auth/register', {
      csrfToken: request.csrfToken(),
      page: 'Crear Cuenta',
      errores: [{ msg: 'El usuario ya está registrado' }],
      usuario: {
        nombre,
        email,
      },
    });
  }

  // Crear nuevo usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    fechaNacimiento,
    token: generarID(),
  });

  // Enviar email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  response.render('templates/message', {
    page: 'Reestablece tu contraseña',
    mensaje: `Hemos enviado un correo a ${email} para confirmar cambiar tu cuenta`,
  });
};

const confirm = async (request, response) => {
  const { token } = request.params;

  // Buscar usuario por token
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return response.render('auth/accountConfirmed', {
      page: 'Error al confirmar tu cuenta',
      mensaje: 'El token no es válido o ha expirado.',
      error: true,
    });
  }

  // Confirmar cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  response.render('auth/accountConfirmed', {
    page: 'Cuenta Confirmada',
    mensaje: 'Tu cuenta ha sido confirmada con éxito.',
    error: false,
  });
};

const formularioPasswordRecovery = (request, response) => {
  response.render('auth/passwordRecovery', {
    page: 'Recuperar Contraseña',
    csrfToken: request.csrfToken()
  });
};

const passwordReset = async ( request, response) =>{
   console.log("Validando los datos para la recuperacion de la contraseña")
   //Validacion de los campos que se revibem del formulario
  await check ('email').notEmpty().withMessage("El correo electronico  es un campo obligatorio").isEmail().withMessage("El correo electronico no tiene el formato de: usaurio").run(request)
  
  let result = validationResult(request)

  if(!result.isEmpty())
    {
      return response.render("auth/passwordRecovery",{
        page: 'Error al intentar resetear la contraseña',
        csrfToken: request.csrfToken(),
        errores: result.array()
     })
    }

    const {email:email} = request.body

    const existingUser = await Usuario.findOne({where: {email, confirmado:1}})

    if (!existingUser) {
      return response.render('auth/passwordRecovery', {
        csrfToken: request.csrfToken(),
        page: 'El usuario no esta autentificado o la cuenta no existe',
        errores: [{ msg: 'El usuario no existe' }],
        usuario: {
          email
        }
      })
    }

    existingUser.password= "";
    existingUser.token =  generarID();
    existingUser.save();

    emailChangePassword({
      nombre: existingUser.nombre,
      email: existingUser.email,
      token: existingUser.token 
    })

    response.render('templates/message', {
      page: 'Reestablece tu contraseña',
      mensaje: `Hemos enviado un correo a ${email} para cambiar tu contraseña`,
    });

}

const verfyTokenPasswordChange = async (request, response) => {

  const { token } = request.params;

    // Asegúrate de que la función sea async para usar await
    const userTokenOwner = await Usuario.findOne({ where: { token }});
  
    if (!userTokenOwner) {
      return response.render('auth/accountConfirmed', {
        page: 'Restablece tu password',
        mensaje: 'El token no es válido o el usuario no existe',
        error : true
      })
    }
    //Mosttarr formulario para arreglar el password
    response.render('auth/resetPassword' ,{
      page: 'Reestablece tu contraseña',
      csrfToken: request.csrfToken()
    })
  }
  
    


const updatePassword  = async (request, response) =>{

  await check('newpassword').notEmpty().withMessage('Las contraseñas son un campo obligatorio').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres').run(request);
  await check('confirmpassword').equals(request.body.newpassword).withMessage('Las contraseñas no coinciden').run(request);
  
  const resultado = validationResult(request);

  if (!resultado.isEmpty()) {
    return response.render('auth/resetPassword', {
      csrfToken: request.csrfToken(),
      page: 'Restablece tu password',
      errores: resultado.array(),
    });
  }

  const {token} = request.params
  const {password} = request.body

  const usuario = await Usuario.findOne({where: {token}})

    usuario.password= request.body.newpassword
    usuario.token=null;
    usuario.save();//update tb_user set password= new_password
  
  response.render('auth/accountConfirmed',{
    page: 'Password Reestablecido Correctamente',
    mensaje: 'El passwdord se actualizo correctamente'
  })

}
export {
  formularioLogin,
  formularioRegister,
  register,
  confirm,
  formularioPasswordRecovery,
  passwordReset,
  verfyTokenPasswordChange,
  updatePassword
};
