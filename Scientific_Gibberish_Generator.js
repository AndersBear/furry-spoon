
const adjectives = ["nanomolecularly", "reducing", "experimentally", "corrosive", "limiting", "photosynthetic", "ribose-containing", "diphophorylated"]

const substances = ["NH₄CN", "polypeptide", "aminoimidazole carbonitrile", "thermodynamically plausible source of ammonium nitrite", "formamide CHONH₂", "phenylacetylene C₈H₆", "aldehyde", "isoguanine"]

const gib_nouns = ["technique","macromolecular hydrogenation","photochemical spectrum","bombardment",
    "Butlerov synthesis","short aliphatic acid","autotrophic metabolism","base-paired double helix","evolutionary progression","carboxylic acid group","nonbiological mirror image",
    "experimental studies","empirical analysis","pedagogical photogenesis","autocatalytic synthesis","8-cyanoadenine phosphate","purification and emergence","glucose","enzymatic enhancement","catabolic branching pattern",
    "GC-MS (gas chromatotography - mass spectrometry","pyrimidine","enzymatic replication ligate","chemolithotrophic metabolic system","glycolic acid","long prebiotic oligomer","scientific evaluation",
    "abiogenesis","cyanobacteria","super-kingdom-like groupings","electrical discharge","Proust's uncharacterized side-products","heterooligomers","centrifugal forces","ƒ-nucleotides",
    "gravitational attraction","pyranosyl isomer of ribose","polymerase","high amounts of cytosine","α-arginine","dilute cyanide solutions","peptide nucleic acids (PNAs)","a score of ketones",
    "transcribed messenger RNA","paleobiologic evidence","glycoaldehyde monophosphate","formaldehyde","Last Common Ancestor","massive sheets of lava","hydrothermal vents at 300° C",
    "probability","CH₄","subterfugality","crystalline graphite","methanogen","isopolymerization","diaminopyrimidine","thioacetic acid C₂H₄OS",
    "cataclysmic transitional metamorphosis","ribozyme","librarianism","amide-derived polypeptides","tholin-carrying dust particles","unicellular life","biochemical remodeling","levorotatory configuration",
    "recombinant DNA technique","ß-structures of alternating polypeptidal workflows","magnetic field"]

const gib_verbs = ["autosynthesize", "physiologically branch", "evaporate", "reactivate", "microbially diverge", "decarboxylate", "overcomplicate", "geochemically respire"]

const phrase_1 = ["The study of ", "We don't know ", "I propose ", "This "]
const phrase_2 = ["experiments must ", "studies better ", "evidence should ", "funded experiments should not "]
const phrase_3 = ["most of the ", "too much ", "nothing but "]
const phrase_4 = ["or our funding is doomed.", "or the world will entropy and the human species will de-evolve.", "or we will cease to dominate the Venutians.", "or we're screwed, dude.", "or we're fractillated."]

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
  document.getElementById("adjective").innerHTML = adjectives[i_rand_nm] + ".  The experiment should ";

  jv2_rand_nm = Math.floor((Math.random() * 8)); 
  document.getElementById("gib_verb_2").innerHTML = gib_verbs[jv2_rand_nm] + " the entire ";

  j2_rand_nm = Math.floor((Math.random() * 69)); 
  document.getElementById("gib_noun_2").innerHTML = gib_nouns[j2_rand_nm] + " ";

  ph4_rand_nm = Math.floor((Math.random() * 5));  
  document.getElementById("phrase_4").innerHTML = phrase_4[ph4_rand_nm];

}

