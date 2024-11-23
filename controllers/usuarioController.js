import { check, checkExact, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarID } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';

const formularioLogin = (request, response) => {
  response.render('auth/login', {
    page: 'Inicia Sesión',
  });
};

const formularioRegister = (request, response) => {
  
  //console.log(request.csrfToken())
  response.render('auth/register', {
    //csrfToken: request.csrfToken(),
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
    // csrfToken: request.csrfToken(),
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
     // csrfToken: request.csrfToken(),
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
    page: 'Cuenta Creada Correctamente',
    mensaje: `Hemos enviado un correo a ${email} para confirmar tu cuenta.`,
    
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
  });
};

export {
  formularioLogin,
  formularioRegister,
  register,
  confirm,
  formularioPasswordRecovery,
};
