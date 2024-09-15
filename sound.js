function startLoop() {
    document.getElementById("sound_2").play();
    //if(timer != 0)
    //setTimeout(startLoop, 5000); check stackoverflow, this is not recursive

    //timer = setInterval(play() {
        //alert("5 seconds are up");
        //document.getElementById('laughtrack3').play();                
    //}, 5000);
}
 
function stopLoop() {
    //alert("Timer stopped");
    //clearInterval(timer);
    //timer = false;
    //clearTimeout(timer);
    document.getElementById("sound_2").pause();
}

// mp3 files:  a_1.mp3, a_half_second.mp3, b, c, d, e, f, g

const a = new Audio('a_1.mp3');
const a5 = new Audio('a_half_second.mp3');
const b = new Audio('b_1.mp3');
const b5 = new Audio('b_half_second.mp3');
const c = new Audio('c_1.mp3');
const c5 = new Audio('c_half_second.mp3');
const d = new Audio('d_1.mp3');
const d5 = new Audio('d_half_second.mp3');
const e = new Audio('e_1.mp3');
const e5 = new Audio('e_half_second.mp3');
const f = new Audio('f_1.mp3');
const f5 = new Audio('f_half_second.mp3');
const g = new Audio('g_1.mp3');
const g5 = new Audio('g_half_second.mp3');

const A = document.createElement('div'); 
A.innerHTML = '<img  src="a_note_pic.png" >';
const B = document.createElement('div'); 
B.innerHTML = '<img  src="b_note_pic.png" >';
const C = document.createElement('div'); 
C.innerHTML = '<img  src="c_note_pic.png" >';
const D = document.createElement('div'); 
D.innerHTML = '<img  src="d_note_pic.png" >';
const E = document.createElement('div'); 
E.innerHTML = '<img  src="e_note_pic.png" >';
const F = document.createElement('div'); 
F.innerHTML = '<img  src="f_note_pic.png" >';
const G = document.createElement('div'); 
G.innerHTML = '<img  src="g_note_pic.png" >';

const TrebSign = document.createElement('div');
TrebSign.innerHTML = '<img src="Treble_Clef_Sign.png" >';

//put the clef there just to show where the notes will be:
document.getElementById("Clef").append(TrebSign);

function Riff()   
{  

//first clear the clef
var element = document.getElementById("Clef"); 
while (element.firstChild) 
  { 
    element.firstChild.remove(); 
  }

//now put the treb clef sign
document.getElementById("Clef").append(TrebSign);

let random_number;      
let prevs = [];
 
for(var count=1; count<6; count++)     // generate 5 notes
{   
 //random_number =  Math.floor(Math.random() * 15);  //random number 0 thru 14 for the sound files 
 //random_number = Math.floor(Math.random() * 7);    //random number 0 thru 7 for the half-second sound files  
    
 //duplicates pics aren't being displayed, so try preventing duplicate random numbers
 do               
  {  
    random_number =  Math.floor(Math.random() * 7);  //random number 0 thru 7 for the half-second sound files       
  }while(prevs.includes(random_number))  
 //should exit with a different random number than the last one 

//didn't work, duplicate pics still not showing  

//either way used below, duplicate pics aren't showing, unless I do the "no duplicate random numbers" algo
//(duplicate files are being played over each other?  I have to research audio in JS)

 // try just the half second notes (could also try counted thru loop backward)
 switch(random_number)
 {     
     case 0:
     setTimeout(() => document.getElementById("a5").play(), 500 * count);
     document.getElementById("Clef").append(A);
     break;

     case 1:
     setTimeout(() => document.getElementById("b5").play(), 500 * count);
     document.getElementById("Clef").append(B);
     break;

     case 2:
     setTimeout(() => document.getElementById("c5").play(), 500 * count);
     document.getElementById("Clef").append(C);
     break;

     case 3:
     setTimeout(() => document.getElementById("d5").play(), 500 * count);
     document.getElementById("Clef").append(D);
     break;

     case 4:
     setTimeout(() => document.getElementById("e5").play(), 500 * count);
     document.getElementById("Clef").append(E);
     break;

     case 5:
     setTimeout(() => document.getElementById("f5").play(), 500 * count);
     document.getElementById("Clef").append(F);
     break;

     case 6:
     setTimeout(() => document.getElementById("g5").play(), 500 * count);
     document.getElementById("Clef").append(G);
     break;

     default:
     setTimeout(() => document.getElementById("a5").play(), 500 * count);
     document.getElementById("Clef").append(A);

 }//end switch

 //that random-number is used, so push it into the array
 prevs.push(random_number);

    }//end for

}//end function Riff()  


