// Order matters! The "present" evaluation must come before "correct"

const { createEvaluationTotals } = require("./utils")

// and the "correct" evaluation must come before "absent".
const evaluationTypes = ["absent", "present", "correct"]

// Returns true if the evaluations contains the evaluation.
const getEvaluationExists = (evaluations, eLetter, eType) => {
  return Boolean(
    evaluations.find(
      ([_eLetter, _eType]) =>
        _eType === eType &&
        // Can simply check if any evaluation exists for the given evaluation.
        (_eLetter === eLetter || !eLetter)
    )
  )
}

// In this order...
// 1. Merge all "absent" evaluations.
// 2. Merge all "present" evaluations.
//   - Merge a new "absent" evaluation in the same column.
// 3. Merge all "correct" evaluations.
const mergeEvaluations = (guesses) => {
  // Infer total expected letters from first guess.
  const totalEvaluationsPerWord = guesses[0] ? guesses[0].length : 0
  let mergedEvaluations = new Array(totalEvaluationsPerWord).fill([])
  const maxEvaluationTotals = createEvaluationTotals()

  // For each word evaluation...
  guesses.forEach((guess) => {
    const currentEvaluationTotals = createEvaluationTotals()

    const addEvaluation = (evaluation, index) => {
      // Avoid exact duplicates in same column.
      if (!getEvaluationExists(mergedEvaluations[index], ...evaluation)) {
        // Inserting current evaluation.
        mergedEvaluations[index] = mergedEvaluations[index]
          ? [...mergedEvaluations[index], evaluation]
          : [evaluation]
      }

      // Increment total for evaluation.
      currentEvaluationTotals(...evaluation, (total) => total + 1)
    }

    // For each evaluation in the word evaluation...
    guess.forEach((evaluation, i) => {
      addEvaluation(evaluation, i)

      // Auto-adding an "absent" evaluation for any "present" evaluation.
      if (evaluation[1] === "present") {
        const absentLe = [evaluation[0], "absent-deduced"]

        addEvaluation(absentLe, i)
      }
    })

    // Get a complete list of all letters currently being assessed.
    const letters = new Set([
      ...Object.keys(maxEvaluationTotals._totals),
      ...Object.keys(currentEvaluationTotals._totals)
    ])

    // For each letter being assessed, get the maximum total for the letter/evaluation.
    letters.forEach((letter) => {
      evaluationTypes.forEach((eType) => {
        let maxTotal = 0

        // Deriving the "present" maxTotal is unique in that the process requires
        // factoring in the max "correct" evaluations for the word.
        if (eType === "present") {
          // Get total of "present" and "correct" evaluations
          // for the current totals.
          const currentPossible =
            currentEvaluationTotals(letter, "present") +
            currentEvaluationTotals(letter, "correct")

          // Get total of "present" and "correct" evaluations
          // for the max totals.
          const maxPossible =
            maxEvaluationTotals(letter, "present") +
            maxEvaluationTotals(letter, "correct")

          // Finding the max of currentPossible and maxPossible
          // will give us the minumum number of occurrences of the
          // current letter that we can expect in the wordle.
          const minExpected = Math.max(currentPossible, maxPossible)

          // Of the minExpected, we can expect a maxCorrect to be at most
          // equal to minExpected.
          const maxCorrect = Math.max(
            currentEvaluationTotals(letter, "correct"),
            maxEvaluationTotals(letter, "correct")
          )

          // The difference of minExpected and maxCorrect gives us the
          // maxTotal which, in this case, is the maximum number of "present"
          // evaluations currently possible in the wordle.
          maxTotal = minExpected - maxCorrect
        } else {
          // Get maxTotal.
          maxTotal = Math.max(
            currentEvaluationTotals(letter, eType),
            maxEvaluationTotals(letter, eType)
          )
        }

        // Update with maxTotal.
        maxEvaluationTotals(letter, eType, maxTotal)
      })
    })
  })

  // Now, for each letter, ensure that no more "present" evaluations
  // exist for that letter than are allowed.
  const letters = Object.keys(maxEvaluationTotals._totals)
  letters.forEach((letter) => {
    // Derive the max number of "present" evaluations for the current letter.
    let maxPresent = maxEvaluationTotals(letter, "present")
    // Update merged evaluations with the maximum allowed "present" evaluations
    // for the current letter.
    mergedEvaluations = mergedEvaluations.map((evaluations) => {
      // If the max "present" evaluations has been reached, from this point on,
      // filter out remaining "present" evaluations for current letter.
      if (maxPresent === 0) {
        evaluations = evaluations.filter(
          ([eLetter, eType]) => eLetter !== letter || eType !== "present"
        )
      } else if (
        // Max "present" evaluations has not yet been reached. Safe to include all.
        evaluations.find(
          ([eLetter, eType]) => eLetter === letter && eType === "present"
        )
      ) {
        // Decrement maxPresent, using up one of the available "present" evaluations.
        maxPresent--
      }

      // Spread the "absent" evaluations.
      // As long as there is at least 1 "absent" evaluation and there does not exist
      // any "present" evaluations, the letter can be considered "absent" from the word
      // entirely, so the "absent" evaluation can bee spread in the merged evaluations.
      if (
        maxEvaluationTotals(letter, "absent") &&
        !maxEvaluationTotals(letter, "present")
      ) {
        const evaluation = [letter, "absent"]
        // If the "absent" evaluation already exists for this letter, ignore it.
        if (!getEvaluationExists(evaluations, ...evaluation)) {
          // Otherwise, push it in with the other evaluations.
          evaluations.push(evaluation)
        }
      }

      // Remove all "absent" evaluations from a column in which there exists a
      // "correct" evaluation. These essentially are canceled out.
      evaluations = evaluations.filter(
        ([eLetter, eType]) =>
          // Keep the evalution if it is not "absent" or the column doesn
          // not contain a "correct" evalution.
          (eType !== "absent" && eType !== "absent-deduced") ||
          !getEvaluationExists(evaluations, null, "correct")
      )

      return evaluations
    })
  })

  return mergedEvaluations
}

module.exports = mergeEvaluations
