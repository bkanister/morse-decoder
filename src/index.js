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
    const arrayOf10 = splitToWords(expr).map(word => {
        return divide(word, 10)
    })
    const lettersWithout0 = arrayOf10.map(letter => letter.map(letter => {
        return removeZeros(letter)
    }))
    const arrayOf2 = lettersWithout0.map(word => word.map(word => {
        return divide(word, 2)
    }))
    const arrayInMorse = arrayOf2.map(b => b.map(b=> b.map(b => {
        let newStr = ''
        b === '10' ? newStr += '.' : newStr += '-'
        return newStr
    }).join('')))
    return arrayInMorse.map(letter => letter.map(letter => {
        for (let i of Object.keys(MORSE_TABLE)) {
            if (i === letter) {
                return MORSE_TABLE[i]
            }
        }
    }).join('')).join(' ')
}

function splitToWords(str) {
    return str.split('**********')
}

function divide(word, length) {
    let regexp = new RegExp(`.{${length}}`, 'g')
    return word.match(regexp)
}

function removeZeros(letter) {
    return letter.substring(letter.indexOf('1'))
}

module.exports = {
    decode
}