// TODO: How to deal with 'alternative' forms of the key?
// i.e. F# Major = G♭ Major
// How should enharmonic equivalents be dealth with in general??

var C_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "C Major",
    "D minor",
    "E minor",
    "F Major",
    "G Major",
    "A minor",
    "B diminished"
  ]
}

var G_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "G Major",
    "A minor",
    "B minor",
    "C Major",
    "D Major",
    "E minor",
    "F# diminished"
  ]
}

var D_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "D Major",
    "E minor",
    "F# minor",
    "G Major",
    "A Major",
    "B minor",
    "C# diminished"
  ]
}

var A_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "A Major",
    "B minor",
    "C# minor",
    "D Major",
    "E Major",
    "F# minor",
    "G# diminished"
  ]
}

var E_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "E Major",
    "F minor",
    "G# minor",
    "A Major",
    "B Major",
    "C# minor",
    "D# diminished"
  ]
}

var B_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "B Major",
    "C# minor",
    "D# minor",
    "E Major",
    "F# Major",
    "G# minor",
    "A# diminished"
  ]
}

var F_sharp_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "F# Major",
    "G# minor",
    "A# minor",
    "B Major",
    "C# Major",
    "D# minor",
    "E# diminished"
  ]
}

var C_sharp_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "C# Major",
    "D# minor",
    "E# minor",
    "F# Major",
    "G# Major",
    "A# minor",
    "B# diminished"
  ]
}

var A_flat_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "A♭ Major",
    "B♭ minor",
    "C minor",
    "D♭ Major",
    "E♭ Major",
    "F minor",
    "G diminished"
  ]
}

var E_flat_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "E♭ Major",
    "F minor",
    "G minor",
    "A♭ Major",
    "B♭ Major",
    "C minor",
    "D diminished"
  ]
}

var B_flat_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "B♭ Major",
    "C minor",
    "D minor",
    "E♭ Major",
    "F Major",
    "G minor",
    "A diminished"
  ]
}

var F_Major = {
  segmentMetadata: {
    startAngle: null,
    endAngle: null,
    isVisible: false
  },
  chords: [
    "F Major",
    "G minor",
    "A minor",
    "B♭ Major",
    "C Major",
    "D minor",
    "E diminished"
  ]
}

var musicKeys = [
    C_Major,
    G_Major,
    D_Major,
    A_Major,
    E_Major,
    B_Major,
    F_sharp_Major,
    C_sharp_Major,
    A_flat_Major,
    E_flat_Major,
    B_flat_Major,
    F_Major
]

// Generate segment metadata
// Adds the startAngle and endAngle of each segment to an array
// Uses cumulativeAngle to keep track of each segment
const sectorAngle = (Math.PI * 2) / 12;
var cumulativeAngle = 0;
for (let i = 0; i < musicKeys.length; i++) {
  let startAngle = cumulativeAngle;
  cumulativeAngle += sectorAngle;
  let endAngle = cumulativeAngle;
  musicKeys[i].segmentMetadata.startAngle = startAngle;
  musicKeys[i].segmentMetadata.endAngle = endAngle;
}

export default musicKeys;