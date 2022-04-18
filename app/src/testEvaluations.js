const { createEvaluationTotals } = require("./utils")

// Derives regex patterns from the merged evaluations and
// tests those patterns against the words.
// There are 2 types of regex patterns derived:
//   1. Absolute: this pattern demands that a set of letters at each index
//      either exists or does not exist in the word.
//   2. Minimum: this pattern demands that the word conains at least the
//      minimum possible number of a given letter.

// Derive absolute regex pattern.
const deriveAbsolutePattern = (mergedEvaluations) => {
  const pattern = mergedEvaluations.reduce((acc, evaluations) => {
    let pattern = ""

    // If there are no "correct" evaluations, we can safely negate the pattern.
    if (!evaluations.find((evaluation) => evaluation.type === "correct")) {
      pattern = "^"
    }

    // Get letters for all non-"present" evaluations as "present" evaluations will be handled separately.
    pattern += evaluations
      .filter((evaluation) => evaluation.type !== "present")
      .map((evaluation) => evaluation.letter)
      .join("")

    return `${acc}[${pattern}]`
  }, "")

  const re = new RegExp(pattern, "i")
  return re
}

// Derive minimum regex pattern.
const deriveMiniumumPatterns = (mergedEvaluations) => {
  const evaluationTotals = createEvaluationTotals()

  // Get evaluation totals.
  mergedEvaluations.forEach((evaluations) =>
    evaluations.forEach((evaluation) =>
      evaluationTotals(evaluation.letter, evaluation.type, 1)
    )
  )

  const res = Object.entries(evaluationTotals._totals).reduce(
    (acc, [letter, totals]) => {
      // If the letteer is required to be present at all...
      if (evaluationTotals(letter, "present") > 0) {
        // ... then require that the word contain at least the sum of
        // "present" and "correct" evaluations.
        const minPossible =
          evaluationTotals(letter, "present") +
          evaluationTotals(letter, "correct")

        // A repeating pattern that ensures the letter appears in any position
        // and at least minPossible times.
        const re = new RegExp(`([${letter}].*?){${minPossible},}`, "i")
        acc.push(re)
      }

      return acc
    },
    []
  )

  return res
}

const testEvaluations = (mergedEvaluations, words) => {
  // A list of all required regex patterns each word must match.
  const tests = [
    deriveAbsolutePattern(mergedEvaluations),
    ...deriveMiniumumPatterns(mergedEvaluations)
  ]

  // At this point, tests might look something like:
  // [
  //   /[^abeip][^abipr][a][^abips][s]/i,
  //   /([e].*?){1,}/i,
  //   /([r].*?){1,}/i,
  //   /([s].*?){2,}/i
  // ]

  // Return only those words that pass all tests.
  return words.filter((word) => tests.every((test) => test.test(word)))
}

module.exports = testEvaluations
