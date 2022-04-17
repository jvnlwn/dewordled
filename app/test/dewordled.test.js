const mergeEvaluations = require("../src/mergeEvaluations")

// TODO: maybe just exclude all "absent" letter evaluations for
// an index in which a "correct" letter evaluation exists.
// This is not necessry, but would simplify things.

const wordles = {
  sears: {
    evaluations: {
      apsis: [
        { letter: "a", type: "present" },
        { letter: "p", type: "absent" },
        { letter: "s", type: "present" },
        { letter: "i", type: "absent" },
        { letter: "s", type: "correct" }
      ],
      abase: [
        { letter: "a", type: "absent" },
        { letter: "b", type: "absent" },
        { letter: "a", type: "correct" },
        { letter: "s", type: "present" },
        { letter: "e", type: "present" }
      ],
      erase: [
        { letter: "e", type: "present" },
        { letter: "r", type: "present" },
        { letter: "a", type: "correct" },
        { letter: "s", type: "present" },
        { letter: "e", type: "absent" }
      ],
      reads: [
        { letter: "r", type: "present" },
        { letter: "e", type: "correct" },
        { letter: "a", type: "correct" },
        { letter: "d", type: "absent" },
        { letter: "s", type: "correct" }
      ],
      sears: [
        { letter: "s", type: "correct" },
        { letter: "e", type: "correct" },
        { letter: "a", type: "correct" },
        { letter: "r", type: "correct" },
        { letter: "s", type: "correct" }
      ]
    },
    expects: new Map([
      [
        "apsis",
        {
          mergedEvaluations: [
            [
              { letter: "a", type: "absent" },
              { letter: "a", type: "present" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "s", type: "absent" },
              { letter: "s", type: "present" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [{ letter: "s", type: "correct" }]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "apsis"],
        {
          mergedEvaluations: [
            [
              { letter: "a", type: "present" },
              { letter: "a", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "s", type: "absent" },
              { letter: "s", type: "present" }
            ],
            [
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [{ letter: "s", type: "correct" }]
          ],
          patterns: []
        }
      ],
      [
        "abase",
        {
          mergedEvaluations: [
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" }
            ],
            [{ letter: "a", type: "correct" }],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "s", type: "present" },
              { letter: "s", type: "absent" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "e", type: "present" },
              { letter: "e", type: "absent" }
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
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "a", type: "correct" },
              { letter: "s", type: "present" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "s", type: "absent" }
            ],
            [
              { letter: "e", type: "present" },
              { letter: "s", type: "correct" }
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
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "e", type: "absent" },
              { letter: "e", type: "present" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "r", type: "absent" },
              { letter: "r", type: "present" }
            ],
            [
              { letter: "a", type: "correct" },
              { letter: "s", type: "present" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "s", type: "absent" }
            ],
            [{ letter: "s", type: "correct" }]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "abase", "erase", "reads"],
        {
          mergedEvaluations: [
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "d", type: "absent" },
              { letter: "e", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "r", type: "absent" },
              { letter: "r", type: "present" }
            ],
            [{ letter: "e", type: "correct" }],
            [
              { letter: "a", type: "correct" },
              { letter: "s", type: "present" }
            ],
            [
              { letter: "a", type: "absent" },
              { letter: "b", type: "absent" },
              { letter: "d", type: "absent" },
              { letter: "e", type: "absent" },
              { letter: "i", type: "absent" },
              { letter: "p", type: "absent" },
              { letter: "s", type: "absent" }
            ],
            [{ letter: "s", type: "correct" }]
          ],
          patterns: []
        }
      ],
      [
        ["apsis", "abase", "erase", "reads", "sears"],
        {
          mergedEvaluations: [
            [{ letter: "s", type: "correct" }],
            [{ letter: "e", type: "correct" }],
            [{ letter: "a", type: "correct" }],
            [{ letter: "r", type: "correct" }],
            [{ letter: "s", type: "correct" }]
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
    // Sort each type be letter.
    evaluations.sort((e1, e2) => {
      // Combining letter and type in ordr to first sort by
      // letter, then if equal, sort by type.
      const e1v = `${e1.letter}${e1.type}`
      const e2v = `${e2.letter}${e2.type}`
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
          const guessEvaluations = evaluations[guess]
          if (!guessEvaluations) {
            throw Error(`No guess evaluations found for "${guess}".`)
          }
          return guessEvaluations
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
