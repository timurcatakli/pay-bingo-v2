const _checkUniqueness = (arr) => {
  if (arr.length <= 1) { return false }
  // check length of indices
  let size = arr[0].size
  for (const set of arr) {
    if (size !== set.size) { return false }
    size = set.size
  }
  return true
}

export const generateBingoBoard = () => {
  const boardLength = 25
  let counter = 0
  const result = []
  while (counter < 4) {
    const bingoSet = new Set()
    while (bingoSet.size < boardLength ) {
      const randomNumber = Math.floor(Math.random() * 100) + 1
      bingoSet.add(randomNumber)
    }
    result.push(bingoSet)
    counter++
  }
  if (!_checkUniqueness(result)) {
    generateBingoBoard()
  }
  return result
}
