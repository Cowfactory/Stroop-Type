"use strict"

/* 
 * Sanitizes input by returning only lowercase a-z chars,
 * or null for invalid keys
*/
var inputSanitizer = (function() {
    function keyInputIsValid(key) {
        let input = key.toLowerCase();
        switch(input) {
            case "a": case "b": case "c": case "d": case "e": case "f":
            case "g": case "h": case "i": case "j": case "k": case "l":
            case "m": case "n": case "o": case "p": case "q": case "r":
            case "s": case "t": case "u": case "v": case "w": case "x":
            case "y": case "z": 
                return true;
            default:
                return false;
        }
    }

    /* returns a lowercase a-z char, or null */
    function strictToLowerCase(key) {
        return (keyInputIsValid(key)) ? key.toLowerCase() : null; 
    }

    return {
        strictToLowerCase: strictToLowerCase
    };
})();

