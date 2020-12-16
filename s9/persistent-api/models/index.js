const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
  dialect: 'mysql'
})

const Person = require('./person-model')(sequelize, Sequelize)
const Car = require('./car-model')(sequelize, Sequelize)

Person.hasMany(Car)

sequelize.sync({ force: true })

module.exports = {
  Person,
  Car
}

