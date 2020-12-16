module.exports = (sequelize, DataTypes) => {
  return sequelize.define('car', {
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    series: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['SUV', 'TRUCK', 'CABRIO']
    }
  })
}
  

