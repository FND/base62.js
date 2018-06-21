let CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function encode(int) {
    if(!Number.isInteger(int)) { // convert strings -- XXX: YAGNI?
        let _int = parseInt(int, 10);
        if(_int.toString() !== int) {
            throw
        }
    }

    if(int === 0) {
        return CHARSET[0];
    } else if(int < 0) {
        throw
    }

    let res = "";
    while(int > 0) {
        res = CHARSET[int % 62] + res;
        int = Math.floor(int / 62);
    }
    return res;
}

export function decode(str) {
    if(!str.substr) {
        throw
    }

    let res = 0;
    let { length } = str;
    for(let i = 0; i < length; i++) {
        let char = str.charCodeAt(i);
        if(char < 58) { // 0-9
            char = char - 48;
        } else if(char < 91) { // A-Z
            char = char - 29;
        } else { // a-z
            char = char - 87;
        }
        res += char * (62 ** (length - i - 1));
    }
    return res;
}
