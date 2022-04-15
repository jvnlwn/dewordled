const mergeEvaluations = require("../src/mergeEvaluations")

// TODO: maybe just exclude all "absent" letter evaluations for
// an index in which a "correct" letter evaluation exists.
// This is not necessry, but would simplify things.

const wordles = {
  sears: {
    evaluations: {
      apsis: [
        { letter: "a", evaluation: "present" },
        { letter: "p", evaluation: "absent" },
        { letter: "s", evaluation: "present" },
        { letter: "i", evaluation: "absent" },
        { letter: "s", evaluation: "correct" }
      ],
      abase: [
        { letter: "a", evaluation: "absent" },
        { letter: "b", evaluation: "absent" },
        { letter: "a", evaluation: "correct" },
        { letter: "s", evaluation: "present" },
        { letter: "e", evaluation: "present" }
      ],
      erase: [
        { letter: "e", evaluation: "present" },
        { letter: "r", evaluation: "present" },
        { letter: "a", evaluation: "correct" },
        { letter: "s", evaluation: "present" },
        { letter: "e", evaluation: "absent" }
      ],
      reads: [
        { letter: "r", evaluation: "present" },
        { letter: "e", evaluation: "correct" },
        { letter: "a", evaluation: "correct" },
        { letter: "d", evaluation: "absent" },
        { letter: "s", evaluation: "correct" }
      ]
    },
    expects: new Map([
      [
        "apsis",
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "absent" },
              { letter: "a", evaluation: "present" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" },
              { letter: "s", evaluation: "present" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "correct" }
            ]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "apsis"],
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "present" },
              { letter: "a", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" },
              { letter: "s", evaluation: "present" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "correct" }
            ]
          ],
          patterns: []
        }
      ],
      [
        "abase",
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "correct" },
              { letter: "b", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "s", evaluation: "present" },
              { letter: "s", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "e", evaluation: "present" },
              { letter: "e", evaluation: "absent" }
            ]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "abase"],
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "correct" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" },
              { letter: "s", evaluation: "present" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "e", evaluation: "present" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "correct" }
            ]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "abase", "erase"],
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "e", evaluation: "present" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "r", evaluation: "absent" },
              { letter: "r", evaluation: "present" }
            ],
            [
              { letter: "a", evaluation: "correct" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" },
              { letter: "s", evaluation: "present" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "correct" }
            ]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "abase", "erase", "reads"],
        {
          mergedEvaluations: [
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "d", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "r", evaluation: "absent" },
              { letter: "r", evaluation: "present" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "d", evaluation: "absent" },
              { letter: "e", evaluation: "correct" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "r", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "correct" },
              { letter: "b", evaluation: "absent" },
              { letter: "d", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" },
              { letter: "s", evaluation: "present" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "d", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "absent" }
            ],
            [
              { letter: "a", evaluation: "absent" },
              { letter: "b", evaluation: "absent" },
              { letter: "d", evaluation: "absent" },
              { letter: "e", evaluation: "absent" },
              { letter: "i", evaluation: "absent" },
              { letter: "p", evaluation: "absent" },
              { letter: "s", evaluation: "correct" }
            ]
          ],
          patterns: []
        }
      ]
    ])
  }
}

// /^([^api])([^pi])([^spi])([^pi])([s])$/.test(word) && /([s].*?){2,}/.test(word)

// For ensuring expect.toEqual compares Array elements in same position.
const sortMergedEvaluation = (mergedEvaluations) =>
  mergedEvaluations.map((evaluations) =>
    // Sort each evaluation be letter.
    evaluations.sort((e1, e2) => {
      // Combining letter and evaluation in ordr to first sort by
      // letter, then if equal, sort by evaluation.
      const e1v = `${e1.letter}${e1.evaluation}`
      const e2v = `${e2.letter}${e2.evaluation}`
      return e1v > e2v ? 1 : e1v === e2v ? 0 : -1
    })
  )

describe.each(Object.entries(wordles))(
  "wordle: %p",
  (word, { evaluations, expects }) => {
    describe.each([...expects])(
      "merged evaluations for guesses: %p",
      (guesses, expects) => {
        // Ensure guesses is an array as it may be a string.
        guesses = [].concat(guesses)
        // Get all evaluations for each guess.
        const allEvaluations = guesses.map((guess) => {
          const evaluation = evaluations[guess]
          if (!evaluation) {
            throw Error(`Now word evaluation found for "${guess}".`)
          }
          return evaluation
        })
        // Merge and sort all evaluations.
        const mergedEvaluations = sortMergedEvaluation(
          mergeEvaluations(allEvaluations)
        )
        // Sort expected merged evaluations.
        const expectedMergedEvaluations = sortMergedEvaluation(
          expects.mergedEvaluations
        )
        // Helpful to look at full mergedEvaluations output.
        console.log(guesses, mergedEvaluations)

        // Break isEqual check out, checking mergedEvaluations at each
        // letter index, for easier debugging.
        mergedEvaluations.forEach((mergedEvaluation, i) => {
          test(`for letter index [${i}]`, () => {
            // Expected the sorted evaluations to equal.
            expect(mergedEvaluation).toEqual(expectedMergedEvaluations[i])
          })
        })
      }
    )
  }
)
