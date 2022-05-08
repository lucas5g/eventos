import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.mjs'

export const Invite = sequelize.define('invitations', {
    name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN
    },
})