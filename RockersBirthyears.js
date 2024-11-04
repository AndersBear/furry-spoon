const rocker = document.getElementById('rocker');
const rockerBirthyear = document.getElementById('rocker-birthyear');
const yearForm = document.getElementById('year-form');
const yearInput = document.getElementById('year-input');
const yearOutput = document.getElementById('answerYear');
const submitButton = document.getElementById('submit-button');
const totalDone = document.getElementById('totalDone');
const resetButton = document.getElementById('reset-button');
const scoreElem = document.getElementById('score-elem');
const goButton = document.getElementById('go-button');

const rockers = {

    "Shannon Hoon (Blind Melon)": 1967,
    "Billy Corgan (Smashing Pumpkins)": 1967,
    "Anthony Kiedis (RHCP)": 1962,
    "Flea (RHCP)": 1962,
    "Chad Smith (RHCP)": 1961,
    "Perry Ferrell (Jane's Addiction)": 1959,
    "Eddie Vedder (Pearl Jam)": 1964,
    "Kurt Kobain (Nirvana)": 1967,
    "Chris Barron (Spin Doctors)": 1968,
    "Layne Staley (Alice in Chains)": 1967,
    "Chris Cornell (Soundgarden, Audioslave)": 1964,
    "Scott Weiland (STP)": 1967,
    "Royston Langdon (Spacehog)": 1972,
    "Michael Stipe (R.E.M.)": 1960,
    "Delores O'Riordan (The Cranberries)": 1971,
    "Dexter Holland (the Offspring)": 1965,
    "James Hetfield (Metallica)": 1963,
    "Gwen Stefani (No Doubt)": 1969,
    "Dave Mustaine (Megadeth)": 1961,
    "Ian Astbury (the Cult)": 1962,
    "Rivers Cuomo (Weezer)": 1970,
    "Glen Phillips (Toad the Wet Sprocket)": 1970,
    "Beck": 1970,
    "Nick Hexum (311)": 1970,
    "Brad Arnold (3 Doors Down)": 1978,
    "Serj Tankian (System of a Down)": 1967,
    "Sully Erna (Godsmack)": 1968,
    "Thom Yorke (Radiohead)": 1968,
    "Gavin Rossdale (Bush)": 1965,
    "Andy Kuehl (drifter, drinker, womanizer)": 1971,
    "Jimmy Fallon (The Roots)": 1974,
    "SHAQ (The NBA)": 1972,
    "Brad Wilk (Rage Against the Machine)": 1968,
    "Kevin Griffin (Better Than Ezra)": 1968,
    "Chris Traynor (Bush)": 1973,
    "Ed Roland (Collective Soul)": 1963,
    "Scott Stapp (Creed)": 1973,
    "J.R. Richards (Dishwalla)": 1967,
    "Art Alexakis (Everclear)": 1962,
    "Jon Siebels (Eve 6)": 1979,
    "Richard Patrick (Filter)": 1968,
    "Carl Bell (Fuel)": 1967,
    "John Rzeznik (Goo Goo Dolls)": 1965,
    "Doug Robb (Hoobastank)": 1970,
    "Brandon Boyd (Incubus)": 1976,
    "Ed Kowalczyk (Live)": 1971,
    "Dave Matthews": 1967,
    "Rob Thomas (Matchbox Twenty)": 1972,
    "Michelle Branch": 1983,
    "Eagle-Eye Lanoo Cherry": 1968,
    "Chad Kroeger (Nickelback)": 1974,
    "Les Claypool (Primus)": 1963,
    "Billie Joe Armstrong (Green Day)": 1972,
    "Whitfield Crane (Ugly Kid Joe)": 1968,
    "Wes Scantlin (Puddle of Mudd)": 1972,
    "Dan Wilson (Semisonic)": 1961,
    "Kate Hudson": 1979,
    "Chris Robinson (The Black Crowes)": 1966,
    "Aaron Lewis (Staind)": 1972,
    "Joan Jett (& the Blackhearts)":  1958,
    "Stephan Jenkins (Third Eye Blind)": 1964,
    "Brian Vander Ark (The Verve Pipe)": 1964,
    "Adam Duritz (Counting Crows)": 1964,
    "Jake Clemons (The E Street Band)": 1980,
    "Jay Weinberg (Slipknot, Suicidal Tendencies)": 1990
    
    };


let NUM_PEOPLE = 65;
let rand = 0;

let usedArr = [];

//fill the usedArr with NUM_PEOPLE numbers (consecutively):
for(i = 0; i < NUM_PEOPLE; i++)
    usedArr.push(i);

let score = 0;
let tot = 0;

let rockerName = "";

let submittedAlready = false;


const getRocker = () => {   
     
  //no year displayed:
  if (yearInput.textContent == ""){
    alert("No skipping.  Enter a year and click Submit.");
    return;
   }

  if (yearInput.textContent != "" && !submittedAlready){
    alert("Click Submit before Go.");
    return; 
  }

   if (usedArr.length == 0)                                //when usedArr reaches NUM_PEOPLE, game over
   {
     alert("Game Over.  All out of rockers.  Go country.");
     return;
   }

yearInput.value = "";

//select an item from usedArr randomly:
rand = usedArr[(Math.floor(Math.random() * usedArr.length - 1) + 1)];  
//remove it from usedArr:
const ind = usedArr.indexOf(rand);
usedArr.splice(ind, 1);
console.log(usedArr);
console.log(rand); 

rockerName = Object.keys(rockers)[rand];
// Display rocker info
rocker.textContent = rockerName;  
submittedAlready = false;
  
}

const checkYear = () =>{  

    if(rockerName == ""){
        alert("Click go first.");
        return;
    }

    if(submittedAlready){
        alert("You submitted this one already.  Click Go for a fresh rocker.");
        return;
    }

    if(yearInput.value < 1900 || yearInput.value > 2000 || yearInput.value == "    "){
        alert("Enter a number between 1900 and 2000.");
        return; 
    }

    if (yearInput.value  ==  Object.values(rockers)[rand]){               //a deep check (===) here will return false (?)
        score++;
    }

    tot++;

    yearOutput.textContent = rockers[rockerName];
    scoreElem.textContent = score;
    totalDone.textContent = tot;    
    submittedAlready = true; 

}

const resetGame = () => {
    usedArr = [];
    //fill the usedArr with NUM_PEOPLE numbers (consecutively):
    for(i = 0; i < NUM_PEOPLE; i++)
      usedArr.push(i);
    rand = 0;
    score = 0;    
    tot = 0;
    scoreElem.textContent = score;
    totalDone.textContent = tot;  
    rocker.textContent = "";
    yearInput.value = "";
    answerYear.textContent = "";
    submittedAlready = false;
    rockerName = "";
  };

goButton.addEventListener('click', function(event) {
    event.preventDefault();
    getRocker();
  });

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    checkYear();
});

resetButton.addEventListener('click', function(event) {
    event.preventDefault();
    resetGame();
});



