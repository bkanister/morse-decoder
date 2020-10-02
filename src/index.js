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
    const arrayOfWords = expr.split('**********')
    console.log(arrayOfWords)
    const preparedArray = arrayOfWords.map(word => {
        return word.match(/.{10}/g);
    })
    const aaa = preparedArray.map(word => word.map(word => {
        return word.split('').splice(word.indexOf('1')).join('')
    }))
    const bbb = aaa.map(word => word.map(word => {
        return word.match(/.{2}/g);
    }))
    console.log('bbb', bbb)
    const ccc = bbb.map(b => b.map(b=> b.map(b => {
        let newStr = ''
        if (b === '10') {
            newStr += '.'
        }
        if (b === '11') {
            newStr += '-'
        }
        return newStr
    }).join('')))
    console.log(ccc)
    return ccc.map(letter => letter.map(letter => {
        for (let i of Object.keys(MORSE_TABLE)) {
            if (i === letter) {
                return MORSE_TABLE[i]
            }
        }
    }).join('')).join(' ')
}

module.exports = {
    decode
}