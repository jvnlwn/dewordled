const mergeEvaluations = require("../src/mergeEvaluations")
const testEvaluations = require("../src/testEvaluations")
const words = require("../words/allowed.json")

const wordles = {
  forgo: [
    {
      guess: "meson",
      evaluations: [
        ["m", "absent"],
        ["e", "absent"],
        ["s", "absent"],
        ["o", "present"],
        ["n", "absent"]
      ],
      mergedEvaluations: [
        [
          ["m", "absent"],
          ["e", "absent"],
          ["s", "absent"],
          ["n", "absent"]
        ],
        [
          ["m", "absent"],
          ["e", "absent"],
          ["s", "absent"],
          ["n", "absent"]
        ],
        [
          ["m", "absent"],
          ["e", "absent"],
          ["s", "absent"],
          ["n", "absent"]
        ],
        [
          ["o", "present"],
          ["o", "absent-deduced"],
          ["m", "absent"],
          ["e", "absent"],
          ["s", "absent"],
          ["n", "absent"]
        ],
        [
          ["m", "absent"],
          ["e", "absent"],
          ["s", "absent"],
          ["n", "absent"]
        ]
      ],
      words: ["aboil", "abord", "abort", "about", "acock", "acold", "addio", "adobo", "adopt", "afoul", "aggro", "ahold", "aioli", "aloft", "aloha", "aloud", "altho", "aorta", "aport", "appro", "aroba", "aroha", "aroid", "atoll", "atopy", "audio", "avoid", "awato", "awork", "axoid", "azido", "azoic", "azoth", "bacco", "bardo", "barro", "biffo", "bilbo", "biota", "bizzo", "bloat", "block", "blowy", "board", "boart", "bobac", "bobak", "bobby", "bocca", "bocci", "bodhi", "boffo", "boggy", "bolar", "bolix", "booai", "booay", "booby", "boody", "boofy", "boogy", "booky", "boord", "booth", "booty", "boozy", "boppy", "borak", "boral", "borax", "borgo", "boric", "borty", "bortz", "botch", "bothy", "botty", "bough", "boult", "bourd", "bourg", "bovid", "bowat", "boxla", "boxty", "boyar", "boyau", "boyla", "bravo", "broad", "broch", "brock", "brogh", "broil", "broth", "bucko", "buffo", "burro", "cacao", "carbo", "cargo", "chaco", "chado", "chiao", "chico", "chiro", "chock", "choco", "choil", "choir", "choko", "choky", "chola", "choli", "cholo", "chord", "chota", "chott", "chout", "choux", "chowk", "claro", "cloak", "clock", "cloff", "cloth", "cloud", "clour", "clout", "coach", "coact", "coady", "coala", "coaly", "coapt", "coarb", "coati", "cobby", "cobia", "cobra", "cobza", "cocci", "cocco", "cocky", "cohab", "colby", "colic", "colly", "colza", "cooch", "cooky", "cooly", "coopt", "copal", "copay", "coppy", "copra", "coqui", "coral", "corby", "corgi", "coria", "corky", "cotta", "couch", "cough", "could", "courb", "courd", "court", "couta", "couth", "cowal", "cowry", "coxal", "coxib", "coyau", "coyly", "coypu", "croak", "croci", "crock", "croft", "croup", "crout", "crowd", "crudo", "cuffo", "curio", "cutto", "cyclo", "daiko", "datto", "dhobi", "dholl", "dhoti", "diazo", "dildo", "diota", "ditto", "dobby", "dobla", "dobra", "dobro", "docht", "doddy", "dodgy", "doggo", "doggy", "dohyo", "doilt", "doily", "dolci", "dolia", "dolly", "doody", "dooly", "doozy", "dorad", "dorba", "doric", "dorky", "dorty", "dotal", "dotty", "douar", "doubt", "dough", "doula", "doura", "dowar", "dowdy", "dowly", "dowry", "doyly", "draco", "droid", "droil", "droit", "droll", "dropt", "drouk", "dubbo", "farro", "fibro", "fillo", "fiord", "fjord", "float", "flock", "flora", "flory", "flota", "flour", "flout", "focal", "foggy", "folia", "folic", "folio", "folky", "folly", "foody", "footy", "foray", "forby", "fordo", "forgo", "forky", "forth", "forty", "forza", "fouat", "fouth", "fowth", "frock", "frory", "froth", "frowy", "fugio", "gadjo", "galvo", "garbo", "ghoul", "gippo", "gloat", "globi", "globy", "glogg", "glory", "glout", "goary", "goaty", "gobar", "gobbi", "gobbo", "gobby", "godly", "gogga", "goldy", "golly", "gooby", "goody", "goofy", "gooky", "goold", "gooly", "goopy", "goory", "gopak", "gopik", "goral", "gotch", "gothy", "gotta", "gouch", "goura", "gourd", "gouty", "groat", "grody", "grouf", "group", "grout", "grovy", "growl", "guaco", "guiro", "gyoza", "gyppo", "hallo", "hillo", "hippo", "hoagy", "hoard", "hoary", "hobby", "hodad", "hodja", "hoick", "hokku", "holla", "hollo", "holly", "hooch", "hoody", "hooka", "hooky", "hooly", "hoord", "hooty", "hopak", "hoppy", "horah", "horal", "hotch", "hotly", "hotty", "houff", "hough", "houri", "howdy", "howff", "hullo", "hydro", "hyoid", "idola", "igapo", "iodic", "iodid", "iroko", "ivory", "ixora", "jocko", "jocky", "jolly", "jolty", "jotty", "joual", "jowar", "jowly", "khoja", "kiddo", "koala", "kofta", "kogal", "kokra", "kooky", "koori", "koppa", "korai", "korat", "kotch", "koura", "largo", "lazzo", "litho", "loach", "loath", "lobar", "lobby", "local", "lofty", "loggy", "logia", "logic", "lolly", "looby", "loofa", "looky", "loopy", "loord", "loppy", "loral", "lordy", "loric", "lorry", "lotah", "lotic", "lotta", "lotto", "lough", "loury", "lovat", "lowly", "lowry", "loyal", "obiit", "oboli", "occur", "ochry", "octad", "octal", "octyl", "oculi", "oddly", "odour", "offal", "oflag", "oidia", "okapi", "ollav", "ology", "oobit", "ootid", "optic", "orach", "oracy", "orbit", "orgia", "orgic", "oribi", "orixa", "ortho", "orval", "otaku", "otary", "ottar", "oubit", "oucht", "ought", "ouija", "outby", "outdo", "outgo", "outro", "outta", "ovary", "ovoid", "ovoli", "ovolo", "oxlip", "paoli", "paolo", "pargo", "parvo", "patio", "phoca", "photo", "pilao", "ploat", "plotz", "plouk", "pluto", "poach", "poaka", "pocky", "podal", "poddy", "podgy", "podia", "poilu", "pokal", "polar", "polio", "polka", "polly", "polyp", "pooch", "poofy", "pooja", "pooka", "poopy", "poori", "poort", "poovy", "poppa", "poppy", "poral", "porch", "porgy", "porky", "porta", "porty", "potch", "potto", "potty", "pouch", "pouff", "poulp", "poult", "poupt", "pouty", "pozzy", "proll", "proto", "proud", "proul", "prowl", "proxy", "pubco", "pulao", "putto", "pyoid", "quipo", "quoad", "quoif", "quoit", "quoll", "quota", "quoth", "radio", "ratio", "raupo", "rhody", "rioja", "roach", "roary", "rocky", "roguy", "roily", "rojak", "rolag", "roofy", "rooky", "roopy", "rooty", "roral", "roric", "rorid", "rorty", "rotal", "rotch", "rough", "roupy", "routh", "rowdy", "rowth", "royal", "rozit", "tacho", "taiko", "tardo", "thoft", "tholi", "thoro", "thorp", "thowl", "toady", "tocky", "today", "toddy", "toffy", "tokay", "tolar", "tolly", "tolyl", "tooth", "topaz", "tophi", "topic", "toppy", "torah", "torch", "toric", "torii", "torta", "total", "totty", "touch", "tough", "touzy", "towzy", "toxic", "trigo", "troad", "troak", "troat", "trock", "troll", "troth", "trout", "trugo", "turbo", "typto", "viola", "viold", "vitro", "vocab", "vocal", "voddy", "vodka", "voila", "volar", "volta", "volti", "volva", "vouch", "voulu", "vozhd", "vrouw", "vulgo", "wacko", "waldo", "whorl", "whort", "wilco", "woald", "woful", "wokka", "wolly", "woody", "woofy", "woold", "wooly", "woopy", "wootz", "woozy", "wordy", "world", "worry", "worth", "would", "wroth", "yarco", "yarto", "yobbo", "yobby", "yogic", "yoick", "yokul", "yolky", "yourt", "youth", "yowza", "yucko", "zippo", "zloty", "zocco", "zooid", "zooty", "zoppa", "zoppo", "zoril", "zorro"] // prettier-ignore
    },
    {
      guess: "total",
      evaluations: [
        ["t", "absent"],
        ["o", "correct"],
        ["t", "absent"],
        ["a", "absent"],
        ["l", "absent"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"]
        ],
        [["o", "correct"]],
        [
          ["a", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"]
        ],
        [
          ["a", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["o", "absent-deduced"],
          ["s", "absent"],
          ["t", "absent"]
        ],
        [
          ["a", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"]
        ]
      ],
      words: ["bobby", "bocci", "bodhi", "boffo", "boggy", "booby", "boody", "boofy", "boogy", "booky", "boord", "boozy", "boppy", "borgo", "boric", "bough", "bourd", "bourg", "bovid", "cobby", "cocci", "cocco", "cocky", "cooch", "cooky", "coppy", "coqui", "corby", "corgi", "corky", "couch", "cough", "courb", "courd", "cowry", "coxib", "coypu", "dobby", "dobro", "doddy", "dodgy", "doggo", "doggy", "dohyo", "doody", "doozy", "doric", "dorky", "dough", "dowdy", "dowry", "foggy", "foody", "forby", "fordo", "forgo", "forky", "gobbi", "gobbo", "gobby", "gooby", "goody", "goofy", "gooky", "goopy", "goory", "gopik", "gouch", "gourd", "hobby", "hoick", "hokku", "hooch", "hoody", "hooky", "hoord", "hoppy", "houff", "hough", "houri", "howdy", "howff", "iodic", "iodid", "jocko", "jocky", "kooky", "koori", "pocky", "poddy", "podgy", "pooch", "poofy", "poopy", "poori", "poovy", "poppy", "porch", "porgy", "porky", "pouch", "pouff", "pozzy", "rocky", "roguy", "roofy", "rooky", "roopy", "roric", "rorid", "rough", "roupy", "rowdy", "voddy", "vouch", "vozhd", "woody", "woofy", "woopy", "woozy", "wordy", "worry", "yobbo", "yobby", "yogic", "yoick", "zocco", "zooid", "zoppo", "zorro"] // prettier-ignore
    },
    {
      guess: "bobby",
      evaluations: [
        ["b", "absent"],
        ["o", "correct"],
        ["b", "absent"],
        ["b", "absent"],
        ["y", "absent"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["y", "absent"]
        ],
        [["o", "correct"]],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["y", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["o", "absent-deduced"],
          ["s", "absent"],
          ["t", "absent"],
          ["y", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["y", "absent"]
        ]
      ],
      words: ["cocci", "cocco", "cooch", "coqui", "corgi", "couch", "cough", "courd", "doggo", "doric", "dough", "fordo", "forgo", "gopik", "gouch", "gourd", "hoick", "hokku", "hooch", "hoord", "houff", "hough", "houri", "howff", "iodic", "iodid", "jocko", "koori", "pooch", "poori", "porch", "pouch", "pouff", "roric", "rorid", "rough", "vouch", "vozhd", "zocco", "zooid", "zoppo", "zorro"] // prettier-ignore
    },
    {
      guess: "houri",
      evaluations: [
        ["h", "absent"],
        ["o", "correct"],
        ["u", "absent"],
        ["r", "present"],
        ["i", "absent"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["h", "absent"],
          ["i", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["u", "absent"],
          ["y", "absent"]
        ],
        [["o", "correct"]],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["h", "absent"],
          ["i", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["u", "absent"],
          ["y", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["h", "absent"],
          ["i", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["o", "absent-deduced"],
          ["r", "absent-deduced"],
          ["r", "present"],
          ["s", "absent"],
          ["t", "absent"],
          ["u", "absent"],
          ["y", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["e", "absent"],
          ["h", "absent"],
          ["i", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["s", "absent"],
          ["t", "absent"],
          ["u", "absent"],
          ["y", "absent"]
        ]
      ],
      words: ["fordo", "forgo"]
    },
    {
      guess: "fordo",
      evaluations: [
        ["f", "correct"],
        ["o", "correct"],
        ["r", "correct"],
        ["d", "absent"],
        ["o", "correct"]
      ],
      mergedEvaluations: [
        [["f", "correct"]],
        [["o", "correct"]],
        [["r", "correct"]],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["d", "absent"],
          ["e", "absent"],
          ["h", "absent"],
          ["i", "absent"],
          ["l", "absent"],
          ["m", "absent"],
          ["n", "absent"],
          ["o", "absent-deduced"],
          ["r", "absent-deduced"],
          ["s", "absent"],
          ["t", "absent"],
          ["u", "absent"],
          ["y", "absent"]
        ],
        [["o", "correct"]]
      ],
      words: ["forgo"]
    },
    {
      guess: "forgo",
      evaluations: [
        ["f", "correct"],
        ["o", "correct"],
        ["r", "correct"],
        ["g", "correct"],
        ["o", "correct"]
      ],
      mergedEvaluations: [
        [["f", "correct"]],
        [["o", "correct"]],
        [["r", "correct"]],
        [["g", "correct"]],
        [["o", "correct"]]
      ],
      words: ["forgo"]
    }
  ],
  sears: [
    {
      guess: "apsis",
      evaluations: [
        ["a", "present"],
        ["p", "absent"],
        ["s", "present"],
        ["i", "absent"],
        ["s", "correct"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent-deduced"],
          ["a", "present"],
          ["i", "absent"],
          ["p", "absent"]
        ],
        [
          ["i", "absent"],
          ["p", "absent"]
        ],
        [
          ["i", "absent"],
          ["p", "absent"],
          ["s", "absent-deduced"],
          ["s", "present"]
        ],
        [
          ["i", "absent"],
          ["p", "absent"]
        ],
        [["s", "correct"]]
      ],
      words: ["brass", "class", "crass", "eyass", "frass", "gauss", "glass", "grass", "ksars", "kvass", "quass", "saags", "sabes", "sacks", "sades", "sados", "safes", "sagas", "sages", "sagos", "sakes", "sales", "salts", "samas", "sames", "sands", "sanes", "sangs", "sants", "sards", "sarks", "saros", "sarus", "sates", "sauls", "sauts", "saves", "saxes", "sazes", "scabs", "scads", "scags", "scams", "scans", "scars", "scats", "scaws", "seals", "seams", "seans", "sears", "seats", "senas", "shads", "shags", "shahs", "shams", "shans", "shaws", "shays", "sheas", "shwas", "skags", "skats", "skaws", "skuas", "slabs", "slaes", "slags", "slams", "slats", "slaws", "slays", "snabs", "snags", "snars", "snaws", "soaks", "soars", "sobas", "socas", "sodas", "sofas", "sojas", "solas", "somas", "soras", "soyas", "stabs", "stags", "stars", "stats", "staws", "stays", "stoas", "subas", "suras", "swabs", "swads", "swags", "swans", "swats", "sways", "trass", "tsars"] // prettier-ignore
    },
    {
      guess: "abase",
      evaluations: [
        ["a", "absent"],
        ["b", "absent"],
        ["a", "correct"],
        ["s", "present"],
        ["e", "present"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["a", "absent-deduced"],
          ["b", "absent"],
          ["i", "absent"],
          ["p", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["i", "absent"],
          ["p", "absent"]
        ],
        [
          ["a", "correct"],
          ["s", "present"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["i", "absent"],
          ["p", "absent"],
          ["s", "absent-deduced"]
        ],
        [
          ["e", "present"],
          ["s", "correct"]
        ]
      ],
      words: ["seals", "seams", "seans", "sears", "seats", "slaes"]
    },
    {
      guess: "erase",
      evaluations: [
        ["e", "present"],
        ["r", "present"],
        ["a", "correct"],
        ["s", "present"],
        ["e", "absent"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["a", "absent-deduced"],
          ["b", "absent"],
          ["e", "absent-deduced"],
          ["e", "present"],
          ["i", "absent"],
          ["p", "absent"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["i", "absent"],
          ["p", "absent"],
          ["r", "absent-deduced"],
          ["r", "present"]
        ],
        [
          ["a", "correct"],
          ["s", "present"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["i", "absent"],
          ["p", "absent"],
          ["s", "absent-deduced"]
        ],
        [["s", "correct"]]
      ],
      words: ["sears"]
    },
    {
      guess: "reads",
      evaluations: [
        ["r", "present"],
        ["e", "correct"],
        ["a", "correct"],
        ["d", "absent"],
        ["s", "correct"]
      ],
      mergedEvaluations: [
        [
          ["a", "absent"],
          ["a", "absent-deduced"],
          ["b", "absent"],
          ["d", "absent"],
          ["e", "absent"],
          ["e", "absent-deduced"],
          ["i", "absent"],
          ["p", "absent"],
          ["r", "absent-deduced"],
          ["r", "present"]
        ],
        [["e", "correct"]],
        [
          ["a", "correct"],
          ["s", "present"]
        ],
        [
          ["a", "absent"],
          ["b", "absent"],
          ["d", "absent"],
          ["e", "absent"],
          ["i", "absent"],
          ["p", "absent"],
          ["s", "absent-deduced"]
        ],
        [["s", "correct"]]
      ],
      words: ["sears"]
    },
    {
      guess: "sears",
      evaluations: [
        ["s", "correct"],
        ["e", "correct"],
        ["a", "correct"],
        ["r", "correct"],
        ["s", "correct"]
      ],
      mergedEvaluations: [
        [["s", "correct"]],
        [["e", "correct"]],
        [["a", "correct"]],
        [["r", "correct"]],
        [["s", "correct"]]
      ],
      words: ["sears"]
    }
  ]
}

// console.log("Object.entries(wordles)", Object.entries(wordles))

// For ensuring expect.toEqual compares Array elements in same position.
const sortMergedEvaluation = (mergedEvaluations) =>
  mergedEvaluations.map((evaluations) =>
    // Sort each type be letter.
    evaluations.sort((e1, e2) => {
      // Combining letter and type in ordr to first sort by
      // letter, then if equal, sort by type.
      const e1v = e1.join("")
      const e2v = e2.join("")
      return e1v > e2v ? 1 : e1v === e2v ? 0 : -1
    })
  )

describe.each(Object.entries(wordles))("wordle: %p", (word, guesses) => {
  const allEvaluations = []

  describe.each(guesses)(
    `guess: "$guess"`,
    ({
      guess,
      evaluations,
      mergedEvaluations: expectedMergedEvaluations,
      words: expectedWords
    }) => {
      allEvaluations.push(evaluations)
      // Merge and sort all evaluations.
      const mergedEvaluations = sortMergedEvaluation(
        mergeEvaluations(allEvaluations)
      )
      // Sort expected merged evaluations.
      expectedMergedEvaluations = sortMergedEvaluation(
        expectedMergedEvaluations
      )
      // Helpful to look at full mergedEvaluations output.
      console.log(guess, mergedEvaluations)

      // Break isEqual check out, checking mergedEvaluations at each
      // letter index, for easier debugging.
      mergedEvaluations.forEach((mergedEvaluation, i) => {
        test(`letter "${guess[i]}"`, () => {
          // Expected the sorted evaluations to equal.
          expect(mergedEvaluation).toEqual(expectedMergedEvaluations[i])
        })
      })

      test("words", () => {
        // Test that the expected words remain from the words list after testing
        // them against the regex patterns derived from the merged evaluations.
        expect(testEvaluations(mergedEvaluations, words)).toEqual(expectedWords)
      })
    }
  )
})
