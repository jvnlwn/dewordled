// Order matters (only when assing the max "present")!
// As long as "present" precedes "correct", we're good.
const evaluationTypes = ["absent", "present", "correct"]

// Wraps a letterTotals obj that keeps track of the total occurrences of a letter
// for a given evaluation type. Returns a function that acts as both a setter and getter.
// Sets the total for the letter/evaluation and returns it.
const createLetterTotals = () => {
  const letterTotals = {}

  // Gets and sets the total for the provided letter and evaluationType.
  // The value arg can be either undefined, a number, or a function that is called
  // with the current total for the letter/evaluation.
  const fn = (letter, evaluationType, value) => {
    if (!letterTotals[letter]) {
      letterTotals[letter] = {}
    }

    // Get the current value, defaulting to 0.
    const currentValue = letterTotals[letter][evaluationType] || 0
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
    letterTotals[letter][evaluationType] = nextValue
    return nextValue
  }

  // Store current letterTotals as _totals on function for convenient access
  // to wrapped letterTotals.
  fn._totals = letterTotals

  return fn
}

// Returns true if the letterEvaluation provided can be found in the providedn letterEvaluations.
const getLetterEvaluationExists = (letterEvaluations, letterEvaluation) => {
  return Boolean(
    letterEvaluations.find(
      (le) =>
        le.evaluation === letterEvaluation.evaluation &&
        le.letter === letterEvaluation.letter
    )
  )
}

// TODO: update this comment.
// 1. Merge all "correct" evaluations.
// 2. Merge all "present" evaluations, ignoring indexes where a "correct" evaluation already exists.
// 3. Merge all "absent" evaluations, ignoring indexes where a "correct" evaluation already exists.
//     - Push a new "absent" evaluation into each other index as long as no "present" evaluation exists
//       for the same letter anywhere.
const mergeEvaluations = (wordEvaluations) => {
  // Infer total expected letters from first wordEvaluation.
  const totalEvaluationsPerWord = wordEvaluations[0].length
  let mergedEvaluations = new Array(totalEvaluationsPerWord).fill([])
  const maxLetterTotals = createLetterTotals()

  // For each word evaluation...
  wordEvaluations.forEach((wordEvaluation) => {
    const currentLetterTotals = createLetterTotals()

    const addLetterEvaluation = (letterEvaluation, index) => {
      // Avoid exact duplicates in same column.
      if (
        !getLetterEvaluationExists(mergedEvaluations[index], letterEvaluation)
      ) {
        // Inserting current letterEvaluation.
        mergedEvaluations[index] = mergedEvaluations[index]
          ? [...mergedEvaluations[index], letterEvaluation]
          : [letterEvaluation]
      }

      // Increment total for letterEvaluation.
      currentLetterTotals(
        letterEvaluation.letter,
        letterEvaluation.evaluation,
        (total) => total + 1
      )
    }

    // For each letter evaluation in the word evaluation...
    wordEvaluation.forEach((letterEvaluation, i) => {
      addLetterEvaluation(letterEvaluation, i)

      // Auto-adding an "absent" letter evaluation for any "present" letter evaluation.
      if (letterEvaluation.evaluation === "present") {
        const absentLetterEvaluation = {
          letter: letterEvaluation.letter,
          evaluation: "absent"
        }

        addLetterEvaluation(absentLetterEvaluation, i)
      }
    })

    // Get a complete list of all letters currently being assessed.
    const letters = new Set([
      ...Object.keys(maxLetterTotals._totals),
      ...Object.keys(currentLetterTotals._totals)
    ])

    console.log(
      wordEvaluation.map((le) => le.letter),
      currentLetterTotals._totals
    )

    // For each letter being assessed, get the maximum total for the letter/evaluation.
    letters.forEach((letter) => {
      evaluationTypes.forEach((eType) => {
        let maxTotal = 0

        // Deriving the "present" maxTotal is unique in that the process requires
        // factoring in the max "correct" letter evaluations for the word.
        if (eType === "present") {
          // Get total of "present" and "correct" evaluations
          // for the current totals.
          const currentPossible =
            currentLetterTotals(letter, "present") +
            currentLetterTotals(letter, "correct")

          // Get total of "present" and "correct" evaluations
          // for the max totals.
          const maxPossible =
            maxLetterTotals(letter, "present") +
            maxLetterTotals(letter, "correct")

          // Finding the max of currentPossible and maxPossible
          // will give us the minumum number of occurrences of the
          // current letter that we can expect in the wordle.
          const minExpected = Math.max(currentPossible, maxPossible)

          // Of the minExpected, we can expect a maxCorrect to be at most
          // equal to minExpected.
          const maxCorrect = Math.max(
            currentLetterTotals(letter, "correct"),
            maxLetterTotals(letter, "correct")
          )

          // The difference of minExpected and maxCorrect gives us the
          // maxTotal which, in this case, is the maximum number of "present"
          // letter evaluations currently possible in the wordle.
          maxTotal = minExpected - maxCorrect
        } else {
          // Get maxTotal.
          maxTotal = Math.max(
            currentLetterTotals(letter, eType),
            maxLetterTotals(letter, eType)
          )
        }

        // Update with maxTotal.
        maxLetterTotals(letter, eType, maxTotal)
      })
    })
  })

  // Now, for each letter, ensure that no more "present" letter evaluations
  // exist for that letter than are allowed.
  const letters = Object.keys(maxLetterTotals._totals)
  letters.forEach((letter) => {
    // Derive the max number of "present" letter evaluations for the current letter.
    let maxPresent = maxLetterTotals(letter, "present")
    // Update mergedEvaluations with the maximum allowed "present" letter evaluations
    // for the current letter.
    mergedEvaluations = mergedEvaluations.map((letterEvaluations) => {
      // If the max "present" letter evaluations has been reached, from this point on,
      // filter out remaining "present" letter evaluations for current letter.
      if (maxPresent === 0) {
        return letterEvaluations.filter(
          (letterEvaluation) =>
            letterEvaluation.letter !== letter ||
            letterEvaluation.evaluation !== "present"
        )
      }

      if (
        letterEvaluations.find(
          (letterEvaluation) =>
            letterEvaluation.letter === letter &&
            letterEvaluation.evaluation === "present"
        )
      ) {
        // Decrement maxPresent, using up one of the available "present" letter evaluations.
        maxPresent--
      }
      // Max "present" letter evaluations has not yet been reached. Safe to include all.
      return letterEvaluations
    })
  })

  console.log("maxLetterTotals", maxLetterTotals._totals)

  // Spread the "absent" letter evaluations.
  letters.forEach((letter) => {
    // As long as there is at least 1 "absent" letter evaluation and there does not exist
    // any "present" letter evaluations, the letter can be considered "absent" from the word
    // entirely, so the "absent" letter evaluation can bee spread in the mergedEvaluations.
    if (
      maxLetterTotals(letter, "absent") &&
      !maxLetterTotals(letter, "present")
    ) {
      mergedEvaluations = mergedEvaluations.map((letterEvaluations) => {
        const letterEvaluation = { letter, evaluation: "absent" }
        // If the "absent" letter evaluation already exists for this letter, ignore it.
        if (
          getLetterEvaluationExists(letterEvaluations, letterEvaluation) ||
          getLetterEvaluationExists(letterEvaluations, {
            letter: letterEvaluation.letter,
            evaluation: "correct"
          })
        )
          return letterEvaluations
        // Otherwise, push it in with the other letter evaluations.
        return letterEvaluations.concat(letterEvaluation)
      })
    }
  })

  return mergedEvaluations
}

module.exports = mergeEvaluations
