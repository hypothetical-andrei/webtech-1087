function doStuff(a, b, c) {
  for (let i = 0; i < 10000; i++) {
    console.log(a + b + c + i)
  }
}

function getTimedFunction(f) {
  return function (...args) {
    let before = Date.now()
    let result = f(...args)
    let after = Date.now()
    console.log(`excution took ${after - before}ms`)
    return result
  }
}

// doStuff(1,2,3)
const timedDoStuff = getTimedFunction(doStuff)
timedDoStuff(1,2,3)