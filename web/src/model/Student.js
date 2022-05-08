import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.mjs'

const Student = sequelize.define('students', {
    name: {
        type: DataTypes.STRING,
    },
    course: {
        type: DataTypes.STRING
    },
    ra: {
        type: DataTypes.STRING,
        unique: true
    },
    father: {
        type: DataTypes.STRING
    },
    mother: {
        type: DataTypes.STRING
    },
    have_invitation: {
        type: DataTypes.BIGINT
    }

})

export { Student }