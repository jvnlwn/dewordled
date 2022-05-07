const path = require("path")
const fs = require("fs")
const GIFEncoder = require("gifencoder")
const pngFileStream = require("png-file-stream")

// Get a formatted date MM-DD-YYYY for folder and file names.
const getFormattedDate = (date) => {
  date = date || new Date()

  let month = (1 + date.getMonth()).toString()
  month = `0${month}`.slice(-2)

  let day = date.getDate().toString()
  day = `0${day}`.slice(-2)

  let year = date.getFullYear()

  return `${month}-${day}-${year}`
}

// Gets a path relative to the app/ folder, automatically
// including the formatted date as either a folder or file name.
const getPath = (folder, { file = "", extension = "" } = {}) => {
  const fmDate = getFormattedDate()
  const basePath = path.join(__dirname, "..", folder)

  if (file === "" && extension) {
    return path.join(__dirname, "..", folder, `${fmDate}${extension}`)
  }
  return path.join(basePath, fmDate, `${file}${extension}`)
}

// Refresh screenshots directory and gif file.
const setupImaging = () => {
  try {
    fs.rmdirSync(getPath("screenshots"), { recursive: true, force: true })
    fs.unlinkSync(getPath("gifs", { extension: ".gif" }))
  } catch (error) {
    // noop
  }
  fs.mkdirSync(getPath("screenshots"))
}

const encodeGif = async () => {
  const encoder = new GIFEncoder(800, 600)
  const gifPath = getPath("gifs", { extension: ".gif" })

  // Get all screenshot files and sort them as a globpath
  // sorts the files lexicographically.
  let files = fs.readdirSync(getPath("screenshots"))
  files = files.sort((f1, f2) => {
    const f1N = parseInt(f1.split(".")[0])
    const f2N = parseInt(f2.split(".")[0])
    return f1N - f2N
  })
  files = files.map((file) => getPath("screenshots", { file }))
  files = [
    ...files
    // Repeat the last frame a number of times.
    // This doesn't work, likely files wiht the same path get filtered out.
    // Could alternatively copy the files instead.
    // ...new Array(4).fill(files[files.length - 1])
  ]

  // Generate the gif.
  const stream = pngFileStream(files)
    .pipe(encoder.createWriteStream({ repeat: 0, delay: 100, quality: 10 }))
    .pipe(fs.createWriteStream(gifPath))

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve)
    stream.on("error", reject)
  })
}

module.exports = {
  getFormattedDate,
  getPath,
  setupImaging,
  encodeGif
}
