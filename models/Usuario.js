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
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks:{
        beforeCreate: async function (usuario) {
            //Encryptando contraseña con hash y bcryp 
           const salt = await bcryp.genSalt(10);
           usuario.password = await bcryp.hash( usuario.password, salt) 
        }
    }
})

export default Usuario 