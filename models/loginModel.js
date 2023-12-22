// const { DataTypes } = require("sequelize");

module.exports= (sequelize, DataTypes)=>{
    const Login = sequelize.define("login",{
        login_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },

    })
    return Login
}