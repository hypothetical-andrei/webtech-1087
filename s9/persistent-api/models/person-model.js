module.exports = (sequelize, DataTypes) => {
  return sequelize.define('person', {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   age: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
       min: 18
     }
   }
 })
}
