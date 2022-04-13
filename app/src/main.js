import words from "./words.json" assert { type: "json" }

console.log({words})

const mergeHeatMap = (targetHeatMap, incrementalHeatMap) => {
  targetHeatMap = targetHeatMap || []
  return incrementalHeatMap.map((increment, index)=> (targetHeatMap[index] || 0) + (increment || 0))
}

// const mergeHeatMap = (increment, ...targetHeatMaps) => {
//   targetHeatMap = targetHeatMap || []
//   return incrementalHeatMap.map((increment, index)=> (targetHeatMap[index] || 0) + increment)
// }

const letterHeatMaps = words
// Map to lists of letters.
.map(word => ([...word]))
// Reduce to object of letter, heat map pairs.
.reduce((letterHeatMaps, letters) => {
  const incrementalHeatMaps = letters.reduce((incrementalHeatMaps, letter, i)=> {
    const defaultHeatMap = new Array(letters.length).fill(0)
    const currentHeatMap = incrementalHeatMaps[letter]
    const heatMap = (currentHeatMap || defaultHeatMap).map((increment, index)=> index === i ? 1 : increment)
    return {
    ...incrementalHeatMaps,
    [letter]: heatMap
  }}, {})

  // console.log({incrementalHeatMaps})


  const modifiedHeatMaps = Object.keys(incrementalHeatMaps).reduce((obj, letter)=> ({
    ...obj,
    [letter]: mergeHeatMap(letterHeatMaps[letter], incrementalHeatMaps[letter])
  }), {})

  return {
    ...letterHeatMaps,
    ...modifiedHeatMaps
  }
}, {})

console.log({letterHeatMaps})