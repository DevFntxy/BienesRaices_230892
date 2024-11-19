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
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #004481; color: #fff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Bienvenido/a a Bienes Raíces 230892</h1>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
                <p style="font-size: 16px;">¡Gracias por unirte a <strong>Bienes Raíces 230892</strong>! Tu cuenta está casi lista, solo necesitas confirmarla haciendo clic en el botón a continuación:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/usuario/findOut${token}" 
                       style="display: inline-block; background-color: #004481; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Confirmar cuenta
                    </a>
                </div>
                <p style="font-size: 14px;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                <p style="font-size: 14px; color: #777;">Atentamente,<br>El equipo de Bienes Raíces 230892</p>
            </div>
            <div style="background-color: #f7f7f7; color: #777; padding: 10px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">© 2024 Bienes Raíces 230892. Todos los derechos reservados.</p>
            </div>
        </div>
    `
    
      })
}

export {
    emailRegistro
}