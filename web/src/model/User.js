import { DataTypes } from 'sequelize'
import { sequelize } from '../../src/config/database.mjs'
import { Profile } from './Profile.js'

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,

    },
    profileId: {
        type: DataTypes.INTEGER
    },
    unityId: {
        type: DataTypes.INTEGER
    },
    // ra: {
    //     type: DataTypes.STRING,
    //     unique: true
    // },
    // father: {
    //     type: DataTypes.STRING
    // },
    // mother: {
    //     type: DataTypes.STRING
    // },
    // have_invitation: {
    //     type: DataTypes.BIGINT
    // }

})
User.belongsTo(Profile)

export { User }