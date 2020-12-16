const sampleArray = [1, 2, 3, 4, 5, 6, 7]

const sampleTransformation = (x) => x * 2

const map = (a, t) => {
  let result = []
  for (const element of a) {
    result.push(t(element))
  }
  return result
}

console.log(map(sampleArray, sampleTransformation))

console.log(map(['cat', 'bear', 'dog'], (x) => x.length))