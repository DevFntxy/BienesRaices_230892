import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
     const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      const {email, nombre , token} = datos 

      //enviar el email

      await transport.sendMail({
        from: 'BienesRaices.com',
        to : email,
        subject: 'Confirma tu cuenta en bienes raices.com',
        text: 'Confirma tu cuenta en bienes raices.com',
        html:  `
            <p> Hola ${nombre} comprueba tu cuenta en bienesracices.com </p>

            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
            <href=""Confirma cuenta</a> </p>

            <p> Si tu no creaste esta cuenta solo ignora este mensaje</p>
        `
      })
}

export {
    emailRegistro
}