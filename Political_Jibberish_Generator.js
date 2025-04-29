const insults = ["abusive", "denigrating", "malignant", "collusive", "libelishtic", "slurrishtical", "slanderishtic", "offensive"]

const politicians = ["AssemblyKid", "DenigratorMan", "CongressLady", "LocoLegislator", "PrimalSinnator", "SinatorSam", "CabinetMember", "SpeakerDude"]

const jib_nouns = ["allegation","attack","authoritarivegetarianism","bamboozlement",
    "blame","bribe","chickenry","coercion","concealment","corruption","debacle",
    "deception","defamation","demosynagogue","denigration","denial","dictatorialship","empire","endorsalment","exploitation",
    "extortion","feud","fiasco","embargo","FUHRERER!","greed","hypocrisy",
    "illegality","impunity","incidinkal","infringement","intimidation","malfeasance","manipulation","massivity",
    "mendackity","obscurity","obselitism","partiality","patriarchie","persecution","plutocracy","privilege",
    "rebuttal","recrimination","refutal","rejeem","reputability","retaliation","saga",
    "scandaliprobability","scapegoatishness","subterfugality","taint","typhoon","unethicalification","sponsority","vetomanship",
    "referendimorium","idiology","librarianism","meritocracy","oligarchy","properganda","ratification","illegislation",
    "recumbence","indigenality","fashionism"]

const jib_verbs = ["jerseymander", "capitalize", "compease", "Fedspeak", "autonomonomize", "gorillalander", "hardline", "wingify"]

const phrases_1 = ["You know ", "We all know ", "I think ", "This "]
const phrases_2 = ["we must ", "we better ", "we should ", "we will not "]
const phrases_3 = ["all the ", "so much ", "nothing but "]
const phrases_4 = ["or we're doomed.", "or the world will explode.", "or we will cease to exist.", "or we're screwed, dude.", "or we're fruckd."]

function generate()    		
{     
  var i_rand_num;
  var p_rand_num;
  var j_rand_num;
  var jv_rand_num;
  var jv2_rand_num;
  var j2_rand_num; 
  var ph1_rand_num;
  var ph2_rand_num;
  var ph3_rand_num;
  var ph4_rand_num;

  ph1_rand_num = Math.floor((Math.random() * 4));  
  document.getElementById("phrase_1").innerHTML = phrases_1[ph1_rand_num];

  p_rand_num = Math.floor((Math.random() * 8));  
  document.getElementById("politician").innerHTML = politicians[p_rand_num] + " is ";
    
  i_rand_num = Math.floor((Math.random() * 8));  
  document.getElementById("insult").innerHTML = insults[i_rand_num] + " and ";

  ph2_rand_num = Math.floor((Math.random() * 4));  
  document.getElementById("phrase_2").innerHTML = phrases_2[ph2_rand_num];

  jv_rand_num = Math.floor((Math.random() * 8)); 
  document.getElementById("jib_verb").innerHTML = jib_verbs[jv_rand_num] + ", because ";

  ph3_rand_num = Math.floor((Math.random() * 3));  
  document.getElementById("phrase_3").innerHTML = phrases_3[ph3_rand_num];
  
  j_rand_num = Math.floor((Math.random() * 69)); 
  document.getElementById("jib_noun").innerHTML = jib_nouns[j_rand_num] + " is ";

  i_rand_num = Math.floor((Math.random() * 8)); 
  document.getElementById("insult_2").innerHTML = insults[i_rand_num] + ".  We need to ";

  jv2_rand_num = Math.floor((Math.random() * 8)); 
  document.getElementById("jib_verb_2").innerHTML = jib_verbs[jv2_rand_num] + " the whole ";

  j2_rand_num = Math.floor((Math.random() * 69)); 
  document.getElementById("jib_noun_2").innerHTML = jib_nouns[j2_rand_num] + " ";

  ph4_rand_num = Math.floor((Math.random() * 5));  
  document.getElementById("phrase_4").innerHTML = phrases_4[ph4_rand_num];

}
