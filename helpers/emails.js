import nodemailer from 'nodemailer'

 const emailRegistro = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
     });
  
   
     console.log(datos)
      
      const {email, nombre , token} = datos 

      //enviar el email

      await transport.sendMail({
        from: 'BienesRaices230892.com',
        to : email,
        subject: 'Bienvenido/a a  Bienes - Racices - 230892',
        text: `Confirma tu ${nombre} cuenta en para continuar con la experiencia`,
       
html: `
    <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>
    <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
    <a href=" style ="color: tomato , ${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/usuario/findOut${token} ">Confirma cuenta</a></p>
    <p>Si tú no creaste esta cuenta, ignora este mensaje.</p>
` 
      })
}

export {
    emailRegistro
}