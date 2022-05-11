const puppeteer = require("puppeteer")
const mergeEvaluations = require("./src/mergeEvaluations")
const testEvaluations = require("./src/testEvaluations")
const words = require("./words/allowed.json")
const fs = require("fs")
const { setupImaging, encodeGif, getPath } = require("./src/imaging")
const { sortWords } = require("./src/utils")

const act = async () => {
  setupImaging()

  const browser = await puppeteer.launch()
  // const context = browser.defaultBrowserContext();
  // context.overridePermissions('https://www.nytimes.com/games/wordle/index.html', ['persistent-storage']);
  // const page = await context.newPage();
  const page = await browser.newPage()

  // We can await all the screenshots before encoding the gif.
  const screenshotPromises = []
  // Takes a screenshot and adds names it sequentially based on the number of
  // existing screenshots.
  const takeScreenshot = async () => {
    console.log("ACTION: taking screenshot")
    const numScreenshots = fs.readdirSync(getPath("screenshots")).length
    const promise = page.screenshot({
      path: getPath("screenshots", { file: numScreenshots, extension: ".png" })
    })
    screenshotPromises.push(promise)
    return promise
  }

  // Debug
  page.on("console", (msg) => console.log(msg.text()))

  // const page = await browser.newPage();
  await page.goto("https://www.nytimes.com/games/wordle/index.html")
  // await page.evaluate(()=> {
  //   localStorage.setItem("nyt-wordle-darkmode", true)
  // })

  // Close out the game modal. This may be doable via setting localStorage?
  const closeButton = await page.$("pierce/.close-icon")
  closeButton.click()

  let isGameOver = false
  let guesses = []
  const allEvaluations = []
  const getIsGameOver = () => {
    const hasLost = guesses.length >= 6
    const hasWon =
      !!allEvaluations.length &&
      allEvaluations[allEvaluations.length - 1].every(
        (evaluation) => evaluation[1] === "correct"
      )
    return hasLost || hasWon
  }

  while (!isGameOver) {
    // Get the currently possible words based on all evaluations
    // accrued thus far.
    const possibleWords = testEvaluations(
      mergeEvaluations(allEvaluations),
      words
    )
    const sortetdWords = sortWords(possibleWords)
    // const guessIndex = Math.floor(Math.random() * possibleWords.length)
    const guessIndex = 0
    const guess = sortetdWords[guessIndex]
    // NOTE: "↵" is the enter key used to submit the guess.
    const letters = [...guess, "↵"]

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i]
      const button = await page.$(`pierce/button[data-key="${letter}"]`)
      // Seems the click event will only register if we wait between clicking each button.
      // Running the clicks in a loop within a page.evaluate does not have this issue.
      // await takeScreenshot()
      await page.waitForTimeout(300)
      await takeScreenshot()
      button.click()
      console.log(`ACTION: clicking letter key ${letter}`)
    }

    // Get the game row matching the guessed word.
    const gameRow = await page.waitForSelector(
      `pierce/game-row[letters="${guess}"]`
    )

    // Capturing animation of letter evaluations being revealed.
    const interval = setInterval(() => {
      takeScreenshot()
    }, 75)

    // Waiting for the letters to be revealed. Would be nice to handle this
    // in a declarative way, but would require piercing multiple shadow roots,
    // which pupeteer doesn't seem to support.
    await page.waitForTimeout(1600)

    clearInterval(interval)

    // Grab all evaluations from the row matching the guessed word.
    const evaluations = await gameRow.$$eval(
      `pierce/game-tile`,
      async (tiles) =>
        tiles.map((tile) => [
          tile.getAttribute("letter"),
          tile.getAttribute("evaluation")
        ])
    )

    // Take a screenshot of the word.
    // await takeScreenshot()

    allEvaluations.push(evaluations)
    isGameOver = getIsGameOver()
  }

  // Capturing animation of letter evaluations being revealed.
  const interval = setInterval(() => {
    takeScreenshot()
  }, 75)

  // Awaiting final animation completion, assuming victory...
  await page.waitForTimeout(1600)

  clearInterval(interval)

  await Promise.all(screenshotPromises)
  await encodeGif()
  await browser.close()
}

act()
