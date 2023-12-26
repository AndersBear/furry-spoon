
let numGuesses = document.getElementById("exPower") 
                //selecter box
let curGuess = Math.pow(2, numGuesses.value) / 2

let curGuessOrdinal = 0
let curDiff = curGuess / 2 
let upper_lim_num = document.getElementById("upper_limit")

const guessDisplay = document.querySelectorAll("#guess")            // for each guess 





//TO-DO:
//still need to clear if they select the same number
//or just tell them to refresh the page


function changed()  
{
 
document.getElementById("high").disabled = false
document.getElementById("low").disabled = false

document.getElementById("upper_limit").innerHTML = ((Math.pow(2, numGuesses.value))-1)
 

//initialize all vars and clear all subsequent headers
curGuessOrdinal = 0

for(var i=0; i<=9; i++)  
 {
	guessDisplay[i].innerHTML = ""
  } 



//alert(guessDisplay[8].textContent)
//says it's empty, but when change to 10 prev val still there

curGuess = Math.pow(2, numGuesses.value) / 2 
  
curDiff = curGuess / 2
  
guessDisplay[curGuessOrdinal].innerHTML = curGuess



}//end function 


//span, fill in the first guess
guessDisplay[curGuessOrdinal].innerHTML = curGuess







function higher()

{
  
curGuess = curGuess + curDiff  // going upward, take curGuess and add curDiff to it	
curGuessOrdinal++
		
guessDisplay[curGuessOrdinal].innerHTML = curGuess
 
 
//if (currentGuessOrdinal = numGuesses)
		 
//game over, do a reset
 
   
curDiff = curDiff/2


//alert("currentGuessOrdinal: " + curGuessOrdinal)
//alert("numGuesses: " + numGuesses.value)


if (curGuessOrdinal == (numGuesses.value-1))
{
  document.getElementById("high").disabled = true
  document.getElementById("low").disabled = true
}

}






function lower()

{
  
  

curGuess = curGuess - (curDiff)
	//going downward	
curGuessOrdinal++
		
guessDisplay[curGuessOrdinal].innerHTML = curGuess
  
//if (curGuessOrdinal = numGuesses)
		
//game over, do a reset
 
curDiff = curDiff/2



if (curGuessOrdinal == (numGuesses.value-1))
{
  document.getElementById("low").disabled = true
  document.getElementById("high").disabled = true
}

}

