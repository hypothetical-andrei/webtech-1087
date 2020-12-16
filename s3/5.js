const checkPrime = (n) => {
  if (n == 1 || n == 2 || n == 3) {
    return true
  } else {
    if (n % 2 === 0) {
      return false
    }
    for (let i = 3; i <= n ** 1/2; i = i + 2) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  }
}

console.log(checkPrime(13))
console.log(checkPrime(23))
console.log(checkPrime(16))

