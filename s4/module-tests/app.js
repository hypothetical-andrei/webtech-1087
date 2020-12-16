const nothing = require('./nothing')
const SimpleConstructor = require('./simple-constructor')
const first = require('./first')
const second = require('./second')

nothing.doNothing()

const mySimpleConstructor = new SimpleConstructor('some name')
mySimpleConstructor.doStuff()

first.doStuff()
second.doStuff()
