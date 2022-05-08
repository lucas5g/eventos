import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.mjs'

export const Profile = sequelize.define('profiles', {
    name: {
        type: DataTypes.STRING,
    },

})