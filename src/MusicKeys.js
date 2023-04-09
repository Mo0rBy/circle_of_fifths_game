const C_Major = {
    chord1: "C Major",
    chord2: "D minor",
    chord3: "E minor",
    chord4: "F Major",
    chord5: "G Major",
    chord6: "A minor",
    chord7: "B diminished"
}

const G_Major = {
    chord1: "G Major",
    chord2: "A minor",
    chord3: "B minor",
    chord4: "C Major",
    chord5: "D Major",
    chord6: "E minor",
    chord7: "F# diminished"
}

const D_Major = {
    chord1: "D Major",
    chord2: "E minor",
    chord3: "F# minor",
    chord4: "G Major",
    chord5: "A Major",
    chord6: "B minor",
    chord7: "C# diminished"
}

const A_Major = {
    chord1: "A Major",
    chord2: "B minor",
    chord3: "C# minor",
    chord4: "D Major",
    chord5: "E Major",
    chord6: "F# minor",
    chord7: "G# diminished"
}

const E_Major = {
    chord1: "E Major",
    chord2: "F# minor",
    chord3: "G# minor",
    chord4: "A Major",
    chord5: "B Major",
    chord6: "C# minor",
    chord7: "D# diminished"
}

const B_Major = {
    chord1: "B Major",
    chord2: "C# minor",
    chord3: "D# minor",
    chord4: "E Major",
    chord5: "F# Major",
    chord6: "G# minor",
    chord7: "A# diminished"
}

const F_sharp_Major = {
    chord1: "F# Major",
    chord2: "G# minor",
    chord3: "A# minor",
    chord4: "B Major",
    chord5: "C# Major",
    chord6: "D# minor",
    chord7: "E# diminished"
}

const C_sharp_Major = {
    chord1: "C# Major",
    chord2: "D# minor",
    chord3: "E# minor",
    chord4: "F# Major",
    chord5: "G# Major",
    chord6: "A# minor",
    chord7: "B# diminished"
}

const A_flat_Major = {
    chord1: "A♭ Major",
    chord2: "B♭ minor",
    chord3: "C minor",
    chord4: "D♭ Major",
    chord5: "E♭ Major",
    chord6: "F minor",
    chord7: "G diminished"
}

const E_flat_Major = {
    chord1: "E♭ Major",
    chord2: "F minor",
    chord3: "G minor",
    chord4: "A♭ Major",
    chord5: "B♭ Major",
    chord6: "C minor",
    chord7: "D diminished"
}

const B_flat_Major = {
    chord1: "B♭ Major",
    chord2: "C minor",
    chord3: "D minor",
    chord4: "E♭ Major",
    chord5: "F Major",
    chord6: "G minor",
    chord7: "A diminished"
}

const F_Major = {
    chord1: "F Major",
    chord2: "G minor",
    chord3: "A minor",
    chord4: "B♭ Major",
    chord5: "C Major",
    chord6: "D minor",
    chord7: "E diminished"
}

// How to deal with 'alternative' forms of the key?
// i.e. F# Major = G♭ Major
// How should enharmonic equivalents be dealth with in general??

const musicKeys = [
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

// export default musicKeys;

export { C_Major, G_Major };