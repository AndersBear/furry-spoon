
let numGuesses = document.getElementById('exPower') 

let currentGuess = Math.pow(2, numGuesses.value) / 2

let currentGuessOrdinal = 0
let currentDiff = currentGuess / 2 
let upper_limit_num = document.getElementById('upper_limit')


//  working with two different techniques at the same time:
//  #guess is the <span>, #headerwords is the <h3>

const guessDisplay = document.querySelectorAll('#guess')            //span

const headerSentence = document.querySelectorAll('#headerWords')    //header 





//numGuesses.addEventListener("change", func())





//TO-DO:
//still need to clear if they select the same number
//or just tell them to refresh the page


numGuesses.onchange = function()

{

 upper_limit_num.textContent = ((Math.pow(2, numGuesses.value))-1)

//initialize all vars and clear all subsequent headers
currentGuessOrdinal = 0

for(var i=0; i<9; i++)  
 {
	headerSentence[i].style = 'visibility:hidden'
	guessDisplay[i].textContent = ""
  } 

  //alert("after for loop") not happening on first html page, why? No headerSentence id tag found CRASH?


currentGuess = (Math.pow(2, numGuesses.value) / 2) 
  
currentDiff = currentGuess / 2
  
guessDisplay[currentGuessOrdinal].textContent = currentGuess

 
 //alert(numGuesses.value-1) //not happening on first html page
//on html, it's working, select 6, numGuesses.value-1 is 5

//display the proper number of guess headers
for(var j=0; j<(numGuesses.value-1); j++) //show number of guesses as headers
  
 {
	headerSentence[j].style = 'visibility:visible'
  }


}//end function




//span, fill in the guess
guessDisplay[currentGuessOrdinal].textContent = currentGuess







function higher()

{
  
currentGuess = currentGuess + currentDiff
       //going upward		
currentGuessOrdinal++
		
guessDisplay[currentGuessOrdinal].textContent = currentGuess
 
 
//if (currentGuessOrdinal = numGuesses)
		 
//{}//game over, do a reset
 
   
currentDiff = currentDiff/2

}






function lower()

{
  
  

currentGuess = currentGuess - (currentDiff)
	//going downward	
currentGuessOrdinal++
		
guessDisplay[currentGuessOrdinal].textContent = currentGuess
  
//if (currentGuessOrdinal = numGuesses)
		
// {}

//game over, do a reset
 
currentDiff = currentDiff/2

}

