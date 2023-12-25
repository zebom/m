// const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')

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

    Login.beforeCreate(async (user) =>{
        try{
            const salt = await bcrypt.genSalt(12);
            const hashedPwd = await bcrypt.hash(user.password, salt);
            user.password = hashedPwd;
        }catch (error){
            console.error('Error encrypting password:', error);
            throw new Error('Error encrypting password');
        }
    })
    Login.prototype.isValidPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    };
    return Login
}