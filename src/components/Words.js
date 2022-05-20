var words = [
	"python",
	"javascript",
	"amazing",
	"pancake",
	"lava",
	"food",
	"hungry",
	"sharp",
	"singapore",
	"tired",
	"anime",
	"may",
	"ruby",
	"train",
  "their",
  "would",
  "about",
  "there",
  "think",
  "which",
  "people",
  "could",
  "other",
  "these",
  "first",
  "thing",
  "those",
  "woman",
  "child",
  "there",
  "after",
  "should",
  "world",
  "school",
  "still"
]

function randomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

export { randomWord }