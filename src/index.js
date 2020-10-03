const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    const preparedArray = splitToWords(expr)
                        .map(word => divide(word, 10))
                        .map(removeZeros)
                        .map(word => divide(word, 2))
    const arrayInMorse = preparedArray.map(b => b.map(b=> b.map(transformToMorseCode).join('')))
    return arrayInMorse.map(letter => letter.map(transformToAlphabet).join('')).join(' ')
}

function splitToWords(str) {
    return str.split('**********')
}

function divide(input, length) {
    if (typeof input === 'string') {
        let regexp = new RegExp(`.{${length}}`, 'g')
        return input.match(regexp)
    }
    return input.map(word => divide(word, length))
}

function removeZeros(letter) {
    if (typeof letter === 'string') {
        return letter.substring(letter.indexOf('1'))
    }
    return letter.map(removeZeros)
}

function transformToMorseCode(symbol) {
    return symbol === '10' ? '.' : '-';
}

function transformToAlphabet(code) {
    for (let i of Object.keys(MORSE_TABLE)) {
        if (i === code) {
            return MORSE_TABLE[i]
        }
    }
}

module.exports = {
    decode
}