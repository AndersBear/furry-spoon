
const adjectives = ["nanomolecular", "reducing", "experimental", "corrosive", 
"limiting", "photosynthetic", "ribose-containing", "diphosphorylated"]

const substances = ["NH₄CN", "polypeptide", "aminoimidazole carbonitrile", 
"a thermodynamically plausible source of ammonium nitrite", 
"formamide CHONH₂", "phenylacetylene C₈H₆", "aldehyde", "isoguanine"]

const gib_nouns = ["technique", "macromolecular hydrogenation", "photochemical spectrum", "bombardment", 
"Butlerov synthesis", "short aliphatic acid", "autotrophic metabolism", "a base-paired double helix", 
"evolutionary progression", "a carboxylic acid group", "a nonbiological mirror image", 
"experimentation", "empirical analysis", "pedagogical photogenesis", "autocatalytic synthesis", 
"8-cyanoadenine phosphate", "purification and emergence", "glucose", 
"enzymatic enhancement", "a catabolic branching pattern", 
"GC-MS (gas chromatotography - mass spectrometry", "pyrimidine", "an enzymatic replication ligate", 
"a chemolithotrophic metabolic system", "glycolic acid", "a long prebiotic oligomer", 
"scientific evaluation", 
"abiogenesis", "a cyanobacterium", "a super-kingdom-like grouping", "electrical discharge", 
"Proust's uncharacterized side-product", "a heterooligomer", "centrifugal force", "an ƒ-nucleotide", 
"gravitational attraction", "a pyranosyl isomer of ribose", "polymerase", "a high amount of cytosine", 
"α-arginine", "dilute cyanide solution", "a group of peptide nucleic acids (PNAs)", 
"a score of ketones", 
"transcribed messenger RNA", "paleobiologic evidence", "glycoaldehyde monophosphate", "formaldehyde", 
"a Last Common Ancestor", "a massive sheet of lava", "a hydrothermal vent at 300° C", 
"probability", "CH₄", "subterfugality", "crystalline graphite", "methanogen", "isopolymerization", 
"diaminopyrimidine", "thioacetic acid C₂H₄OS", 
"cataclysmic transitional metamorphosis", "ribozyme", "librarianism", "an amide-derived polypeptide", 
"a group of tholin-carrying dust particles", "unicellular life", "biochemical remodeling", 
"levorotatory configuration", 
"recombinant DNA technique", "a ß-structure of alternating polypeptidal workflow", "magnetic field"]

const gib_verbs = ["autosynthesize", "physiologically branch", "evaporate", "reactivate", "microbially diverge", 
"decarboxylate", "overcomplicate", "geochemically respire"]

const phrase_1 = ["The study of ", "We don't know ", "I propose ", "This "]
const phrase_2 = ["experiments must ", "studies should ", "evidence should ", "funded experiments should not "]
const phrase_3 = ["most of ", "usually ", "nothing but "]
const phrase_4 = ["or our funding is doomed.", "or the world will entropy and the human species will de-evolve.", 
                  "or we will cease to dominate the Venutians.", "or we're screwed, dude.", "or we're fractillated."]

function generate_Sci()    		
{     
  var i_rand_nm;
  var p_rand_nm;
  var j_rand_nm;
  var jv_rand_nm;
  var jv2_rand_nm;
  var j2_rand_nm; 
  var ph1_rand_nm;
  var ph2_rand_nm;
  var ph3_rand_nm;
  var ph4_rand_nm;

  ph1_rand_nm = Math.floor((Math.random() * 4));  
  document.getElementById("phrase_1").innerHTML = phrase_1[ph1_rand_nm];

  p_rand_nm = Math.floor((Math.random() * 8));  
  document.getElementById("substance").innerHTML = substances[p_rand_nm] + " is ";
    
  i_rand_nm = Math.floor((Math.random() * 8));  
  document.getElementById("adjective").innerHTML = adjectives[i_rand_nm] + " and ";

  ph2_rand_nm = Math.floor((Math.random() * 4));  
  document.getElementById("phrase_2").innerHTML = phrase_2[ph2_rand_nm];

  jv_rand_nm = Math.floor((Math.random() * 8)); 
  document.getElementById("gib_verb").innerHTML = gib_verbs[jv_rand_nm] + ", because ";

  ph3_rand_nm = Math.floor((Math.random() * 3));  
  document.getElementById("phrase_3").innerHTML = phrase_3[ph3_rand_nm];
  
  j_rand_nm = Math.floor((Math.random() * 69)); 
  document.getElementById("gib_noun").innerHTML = gib_nouns[j_rand_nm] + " is ";

  i_rand_nm = Math.floor((Math.random() * 8)); 
  document.getElementById("adjective_2").innerHTML = adjectives[i_rand_nm] + ".  The experiment should ";

  jv2_rand_nm = Math.floor((Math.random() * 8)); 
  document.getElementById("gib_verb_2").innerHTML = gib_verbs[jv2_rand_nm] + " all of ";

  j2_rand_nm = Math.floor((Math.random() * 69)); 
  document.getElementById("gib_noun_2").innerHTML = gib_nouns[j2_rand_nm] + " ";

  ph4_rand_nm = Math.floor((Math.random() * 5));  
  document.getElementById("phrase_4").innerHTML = phrase_4[ph4_rand_nm];

}

