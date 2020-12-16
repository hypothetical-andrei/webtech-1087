const state = require('./state')

const doStuff = () => {
  const value = state.getValue('somekey')
  console.log(`value is ${value}`)
}

module.exports = {
  doStuff
}