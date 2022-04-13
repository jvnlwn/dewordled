const puppeteer = require("puppeteer")

// const getGameNode = document => document.querySelector("game-app").shadowRoot.querySelector("game-theme-manager")

// const evaluateArgs = {getGameNode}

// const evaluateFn = (fn, ...options)=> ([
//   fn, evaluateArgs, ...options
// ])

const act = async () => {
  const browser = await puppeteer.launch()
  // const context = browser.defaultBrowserContext();
  // context.overridePermissions('https://www.nytimes.com/games/wordle/index.html', ['persistent-storage']);
  // const page = await context.newPage();
  const page = await browser.newPage()

  // Debug
  page.on("console", (msg) => console.log(msg.text()))

  // const page = await browser.newPage();
  await page.goto("https://www.nytimes.com/games/wordle/index.html")
  // await page.evaluate(()=> {
  //   localStorage.setItem("nyt-wordle-darkmode", true)
  // })

  // const gameNode = await page.evaluate((options)=>
  //   document.querySelector("game-app").shadowRoot.querySelector("game-theme-manager")
  // ))

  await page.evaluate((options) => {
    document
      .querySelector("game-app")
      .shadowRoot.querySelector("game-theme-manager")
      .querySelector("game-modal")
      .shadowRoot.querySelector(".close-icon")
      .click()
  })

  let row = 0
  let evaluations = []
  while (row < 2) {
    const evaluation = await page.evaluate((row) => {
      // Select all game rows.
      // gameNode.querySelectorAll("game-row")

      const word = "tears↵"
      const letters = [...word]

      letters.forEach((letter) => {
        document
          .querySelector("game-app")
          .shadowRoot.querySelector("game-theme-manager")
          .querySelector("game-keyboard")
          .shadowRoot.querySelector(`button[data-key="${letter}"]`)
          .click()
      })

      const tiles = document
        .querySelector("game-app")
        .shadowRoot.querySelector("game-theme-manager")
        .querySelectorAll("game-row")
        [row].shadowRoot.querySelectorAll("game-tile")

      const evaluation = [...tiles].map((tileNode) => ({
        letter: tileNode.attributes.letter.value,
        evaluation: tileNode.attributes.evaluation.value
      }))

      return evaluation

      // document.querySelector("game-app").shadowRoot.querySelector("game-theme-manager").querySelector("game-keyboard").shadowRoot.querySelector("button[data-key='t']").click()
    }, row)

    await page.screenshot({ path: __dirname + "/screenshots/example.png" })

    evaluations.push(evaluation)
    row++

    console.log("evaluations", evaluations)
  }

  await browser.close()
}

act()
