// Wraps a evaluationTotals obj that keeps track of the total occurrences of a letter
// for a given evaluation type. Returns a function that acts as both a setter and getter.
// Sets the total for the letter/evaluation and returns it.
const createEvaluationTotals = () => {
  const evaluationTotals = {}

  // Gets and sets the total for the provided letter and evaluationType.
  // The value arg can be either undefined, a number, or a function that is called
  // with the current total for the letter/evaluation.
  const fn = (letter, evaluationType, value) => {
    if (!evaluationTotals[letter]) {
      evaluationTotals[letter] = {}
    }

    // Get the current value, defaulting to 0.
    const currentValue = evaluationTotals[letter][evaluationType] || 0
    // By default, retain current value.
    let nextValue = currentValue

    // Alter the nextValue by use of a function or directly setting via number.
    switch (typeof value) {
      case "function":
        nextValue = value(currentValue)
        break
      case "number":
        nextValue = value
        break
    }

    // Updatee the letter/evaluation total.
    evaluationTotals[letter][evaluationType] = nextValue
    return nextValue
  }

  // Store current evaluationTotals as _totals on function for convenient access
  // to wrapped evaluationTotals.
  fn._totals = evaluationTotals

  return fn
}

const mergeHeatMap = (targetHeatMap, incrementalHeatMap) => {
  targetHeatMap = targetHeatMap || []
  return incrementalHeatMap.map(
    (increment, index) => (targetHeatMap[index] || 0) + (increment || 0)
  )
}

/**
 * Example letter heat map:
 *
 * {
 *   a: [ 736, 2260, 1235, 1073, 679 ],
 *   b: [ 908, 81, 334, 242, 59 ],
 *   c: [ 920, 176, 392, 406, 127 ],
 *   d: [ 681, 84, 390, 471, 822 ],
 *   e: [ 303, 1626, 882, 2323, 1519 ],
 *   f: [ 595, 24, 178, 233, 82 ],
 *   g: [ 637, 75, 362, 422, 143 ],
 *   h: [ 488, 544, 120, 235, 367 ],
 *   i: [ 165, 1380, 1047, 880, 280 ],
 *   j: [ 202, 11, 46, 29, 3 ],
 *   k: [ 375, 95, 268, 500, 257 ],
 *   l: [ 575, 697, 848, 771, 475 ],
 *   m: [ 693, 188, 510, 402, 182 ],
 *   n: [ 325, 345, 962, 786, 530 ],
 *   o: [ 262, 2093, 989, 696, 388 ],
 *   p: [ 857, 228, 363, 418, 147 ],
 *   q: [ 78, 15, 13, 2, 4 ],
 *   r: [ 628, 940, 1197, 716, 673 ],
 *   s: [ 1560, 93, 531, 515, 3950 ],
 *   t: [ 815, 239, 615, 897, 726 ],
 *   u: [ 189, 1185, 666, 401, 67 ],
 *   v: [ 242, 52, 240, 155, 4 ],
 *   w: [ 411, 163, 271, 128, 64 ],
 *   x: [ 16, 57, 133, 12, 70 ],
 *   y: [ 181, 267, 213, 108, 1297 ],
 *   z: [ 105, 29, 142, 126, 32 ],
 * }
 */

const generateHeatMap = (words) =>
  words
    // Map to lists of letters.
    .map((word) => [...word])
    // Reduce to object of letter, heat map pairs.
    .reduce((letterHeatMaps, letters) => {
      const incrementalHeatMaps = letters.reduce(
        (incrementalHeatMaps, letter, i) => {
          const defaultHeatMap = new Array(letters.length).fill(0)
          const currentHeatMap = incrementalHeatMaps[letter]
          const heatMap = (currentHeatMap || defaultHeatMap).map(
            (increment, index) => (index === i ? 1 : increment)
          )
          return {
            ...incrementalHeatMaps,
            [letter]: heatMap
          }
        },
        {}
      )

      // console.log({incrementalHeatMaps})

      const modifiedHeatMaps = Object.keys(incrementalHeatMaps).reduce(
        (obj, letter) => ({
          ...obj,
          [letter]: mergeHeatMap(
            letterHeatMaps[letter],
            incrementalHeatMaps[letter]
          )
        }),
        {}
      )

      return {
        ...letterHeatMaps,
        ...modifiedHeatMaps
      }
    }, {})

// TODO: "cares" is top word, but "tares" should at least come before "cares"
// and possibly others? We're giving to much preference to the positional count of the letter,
// since "c" is the highest occurring letter in position 1 but "t" occurs much more overall
// and occurs only just a little less than "c" in position 1.
const getWordValue = (word, words, heatMap) => {
  const totalWords = words.length
  const totalLetters = word.length
  // Only evaluate non-duplicate letters.
  const letters = [...new Set([...word])]
  // Calculates the sum of all (non-duplicate) letter percentages in the word.
  const sumPercentage = letters.reduce((acc, letter, i) => {
    // Gete the total letter count for the letter in current position.
    const letterCount = heatMap[letter][i]
    // Get the total letter count occurrances for this letter in all words.
    const letterTotalCount = heatMap[letter].reduce(
      (acc, count) => acc + count,
      0
    )
    // Get a percentage value related to the number of words that could be matched
    // by the current letter in the current position.
    return acc + (letterCount / totalWords) * (letterTotalCount / totalWords)
  }, 0)
  // Divide by total letters evaluated, ensuring words with duplicates get less value.
  const avgPercentage = sumPercentage / totalLetters
  return avgPercentage
}

// Sort words by their value.
const sortWords = (words) => {
  const heatMap = generateHeatMap(words)
  const sortedWords = words.sort(
    (word1, word2) =>
      getWordValue(word2, words, heatMap) - getWordValue(word1, words, heatMap)
  )
  return sortedWords
}

module.exports = {
  createEvaluationTotals,
  sortWords
}
