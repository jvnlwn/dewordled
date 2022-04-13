// Order matters! As long as "correct" preceeds "present", we're good.
const evaluationTypes = ["correct", "present", "absent"]

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

    // For each letter evaluation in the word evaluation...
    wordEvaluation.forEach((letterEvaluation, i) => {
      // Avoid exact duplicates in same column.
      if (!getLetterEvaluationExists(mergedEvaluations[i], letterEvaluation)) {
        // Inserting current letterEvaluation.
        mergedEvaluations[i] = mergedEvaluations[i]
          ? [...mergedEvaluations[i], letterEvaluation]
          : [letterEvaluation]

        // Auto-adding an "absent" letter evaluation for any "present" letter evaluation.
        if (letterEvaluation.evaluation === "present") {
          mergedEvaluations[i].push({
            letter: letterEvaluation.letter,
            evaluation: "absent"
          })

          // Increment total for letter/"absent" evaluation.
          currentLetterTotals(
            letterEvaluation.letter,
            "absent",
            (total) => total + 1
          )
        }
      }

      // Increment total for letter/evaluation.
      currentLetterTotals(
        letterEvaluation.letter,
        letterEvaluation.evaluation,
        (total) => total + 1
      )
    })

    // Get a complete list of all letters currently being assessed.
    const letters = new Set([
      ...Object.keys(maxLetterTotals._totals),
      ...Object.keys(currentLetterTotals._totals)
    ])

    // For each letter being assessed, get the maximum total for the letter/evaluation.
    letters.forEach((letter) => {
      evaluationTypes.forEach((eType) => {
        // Get total of "present" and "correct" evaluations,
        // favoring in a tie the one that has most "correct"

        // Only proceed to update "present" totals if the "correct" totals
        // at least meet the current max total. If so, we
        if (eType === "present") {
          // Assuming that if currentLetterTotals "correct" IS equal to the
          // maxLetterTotals "correct", then the currentLetterTotals is responsible
          // for the latest update.
          if (
            currentLetterTotals(letter, "correct") !==
            maxLetterTotals(letter, "correct")
          ) {
            // Early return...
            return
          }
          // Get maxTotal.
          const maxTotal = Math.max(
            currentLetterTotals(letter, eType),
            // Augment the current max for "present" letter evaluations by the
            // current max for "correct" letter evaluations to ensure that the
            // max "preset" letter evaluations is capped.
            maxLetterTotals(letter, eType) - maxLetterTotals(letter, "correct")
          )

          // Update with maxTotal.
          maxLetterTotals(letter, eType, maxTotal)
        } else {
          // Get maxTotal.
          const maxTotal = Math.max(
            currentLetterTotals(letter, eType),
            maxLetterTotals(letter, eType)
          )

          // Update with maxTotal.
          maxLetterTotals(letter, eType, maxTotal)
        }
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
