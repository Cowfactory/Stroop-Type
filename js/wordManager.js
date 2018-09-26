"use strict"

var wordManager = (function() {
    var gameWords = []; //holds the gameWord objects    
    var currentWord = null;

    function handleKeyInput(key) {
        if(!currentWord) currentWord = findFirstMatchingWord(key);
        typeNextLetter(key); 
    }
    
    /*
    * 1. reject keypresses when there are no words out
    * 2. reject keypress if it doesn't match gameWord's next letter
    * 3. progress the gameWord to the next letter
    * 4. explode the gameWord if the word is finished
    */
    function typeNextLetter(key) {
        //reject keypresses when there are no words out
        if(!currentWord) return;

        //reject keypress if it doesn't match gameWord's next letter
        let nextChar = currentWord.word[currentWord.nextCharIdx];
        if(key !== nextChar) {
            //add to miss count and statistics
            return;
        }

        //Otherwise, color letter
        let letters = currentWord.domElementRef.children;
        let span = letters[currentWord.nextCharIdx];
        setStyle(span);

        //then progress the gameWord to the next letter
        currentWord.nextCharIdx++;

        //explode the gameWord if the word is finished
        if(currentWord.nextCharIdx === currentWord.word.length) 
            deleteCurrentWord();  
            
    }

    function deleteCurrentWord() {
        //remove word from internal array
        let idx = gameWords.indexOf(currentWord);
        gameWords.splice(idx, 1);

        //remove word from dom
        //give the exploded word some style
        let wordToDelete = currentWord;
        let domRef = wordToDelete.domElementRef;
        domRef.textContent = "BOOM";
        domRef.style.color = "yellow";

        //delete element on a delay
        setTimeout(function() {
            wordToDelete.removeSelfFromDom();
        }, 500);

        currentWord = null;
    }

    function findFirstMatchingWord(key) {
        let firstWord = gameWords.find(function(gameWord) {
            if(key === gameWord.word[0]) return true;
        });
        return firstWord === undefined ? null : firstWord;
    }

    function addWord(gameWord) {
        gameWords.push(gameWord);
    }

    function stopAnimations() {
        gameWords.forEach(function(gameWord) {
            gameWord.stopAnimation();
        });
    }

    function setStyle(span) {
        span.style.color = "red";
    }

    function clearAll() {
        stopAnimations();
        let main = document.querySelector("main");
        gameWords.forEach(function(gameWord) { 
            main.removeChild(gameWord.domElementRef);
        });
    }

    return {
        addWord: addWord, 
        handleInput: handleKeyInput,
        stopAnimations: stopAnimations,
        clearAll: clearAll
    };
})();