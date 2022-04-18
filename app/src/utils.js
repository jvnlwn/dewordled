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

module.exports = {
  createEvaluationTotals
}
