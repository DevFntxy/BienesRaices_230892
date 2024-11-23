import { DataTypes } from "sequelize";
import bcryp from 'bcrypt'
import db from '../db/config.js'


const Usuario = db.define('usuarios' , {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    fechaNacimiento: {
        type: DataTypes.DATEONLY,  // Utiliza DATEONLY si solo quieres la fecha sin hora
        allowNull: false
    },
 

    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks:{
        beforeCreate: async function (usuario) {
            //Encryptando contraseña con hash y bcryp 
            //Salt es como voy a disfrazar el mensaje, generamos la clave para el hasheo , se recp,oemdam 10 rondas de aleotorizacion para no consumir demasiados recuersos de hardware
           const salt = await bcryp.genSalt(10);
           usuario.password = await bcryp.hash( usuario.password, salt) 
        }
    }
})

export default Usuario 