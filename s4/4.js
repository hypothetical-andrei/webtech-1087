const genCheckPrime = () => {
  const cache = []
  const checkPrime = (n) => {
    if (cache.indexOf(n) !== -1) {
      console.log('found in cache')
      return true
    } else {
      if (n === 2 || n === 3) {
        return true
      } else {
        if (n % 2 === 0 || n === 1) {
          return false
        }
        for (let i = 3; i <= n ** 1/2; i = i + 2) {
          if (n % i === 0) {
            return false
          }
        }
        cache.push(n)
        return true
      }
    }
  }
  return checkPrime  
}

const checkPrime = genCheckPrime()

console.log(checkPrime(11))
console.log(checkPrime(7))
console.log(checkPrime(12))
console.log(checkPrime(11))
