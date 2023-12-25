// // const bcrypt = require('bcrypt')

// module.exports= (sequelize, DataTypes)=>{
//     const Register = sequelize.define("register",{
//         register_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         firstname:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         lastname:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email:{
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 isEmail: true
//             }
//         },
//         number:{
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         gender:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         age:{
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         password:{
//             type: DataTypes.STRING,
//             allowNull: false
//         },

//     })
// // 569087

//     // Register.beforeCreate(async (user) =>{
//     //     try{
//     //         const salt = await bcrypt.genSalt(12);
//     //         const hashedPwd = await bcrypt.hash(user.password, salt);
//     //         user.password = hashedPwd;
//     //     }catch (error){
//     //         console.error('Error encrypting password:', error);
//     //         throw new Error('Error encrypting password');
//     //     }
//     // })
//     return Register
// }

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define("register", {
        register_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        adminCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Register.beforeCreate(async (user) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPwd = await bcrypt.hash(user.password, salt);
            user.password = hashedPwd;
        } catch (error) {
            console.error('Error encrypting password:', error);
            throw new Error('Error encrypting password');
        }
    });
    Register.prototype.isValidPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    };


    return Register;
};
