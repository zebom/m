const dbConfig = require('../config/dbConfig');
const{ Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false
    }
)

sequelize.authenticate()

.then(() =>{
    console.log('database connection succesful... ');
})
.catch(err =>{
    console.log('Error', err);
});

const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.login = require('./loginModel.js')(sequelize,DataTypes);
db.register = require('./registerModel.js')(sequelize,DataTypes)
db.sequelize.sync({ force: false })
.then(() =>{
    console.log('re-sync done')
});

module.exports =db;