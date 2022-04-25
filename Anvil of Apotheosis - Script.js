
//   ||||||   ||||||||  ||||||||  |||||||         |||
//  ||    ||     ||     ||        ||    ||       ||||
//  ||           ||     ||        ||    ||      || ||
//   ||||||      ||     ||||||    |||||||   ||     ||
//        ||     ||     ||        ||               ||
//  ||    ||     ||     ||        ||        ||     ||
//   ||||||      ||     ||||||||  ||            ||||||||

// --- scripts on step 1 ------------------------------
// set points limit ------------------------------
function setPointLimit(ptLimit) {
  if (ptLimit == "20") {
    document.getElementById("champion").checked = true;
    document.getElementById("conqueror").checked = false;
  } else {
    document.getElementById("champion").checked = false;
    document.getElementById("conqueror").checked = true;
  };
  document.getElementById("ptsMax").innerHTML = ptLimit;
  document.getElementById("validateStep1").innerHTML = "validated";
};

function resetStep1() {
  document.getElementById("ptsMax").innerHTML = "-";
  document.getElementById("champion").checked = false;
  document.getElementById("conqueror").checked = false;
  document.getElementById("validateStep1").innerHTML = "not valid";
};
// --- end of scripts on step 1 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||        ||||||
//  ||    ||     ||     ||        ||    ||      ||    ||
//  ||           ||     ||        ||    ||            ||
//   ||||||      ||     ||||||    |||||||   ||      |||
//        ||     ||     ||        ||              |||
//  ||    ||     ||     ||        ||        ||  |||
//   ||||||      ||     ||||||||  ||            ||||||||

// --- scripts on step 2 ------------------------------
// chose char and display stats ------------------------------
function clickChar(charId) {
  document.getElementById("dmgTable99check").innerHTML = "false";
  resetStep2();
  document.getElementById(charId).style.backgroundColor = "rgb(185 178 137)";
  var charN = document.getElementById(charId).getElementsByClassName("charName")[0].innerHTML;
  var charNclear = charN.replace("<b>", "");
      charNclear = charN.replace("</b>", "");
  var char1 = document.getElementById(charId).getElementsByClassName("q1")[0].innerHTML;
  var char2 = document.getElementById(charId).getElementsByClassName("q2")[0].innerHTML;
  var char3 = document.getElementById(charId).getElementsByClassName("q3")[0].innerHTML;
  var char4 = document.getElementById(charId).getElementsByClassName("q4")[0].innerHTML;
  var char5 = document.getElementById(charId).getElementsByClassName("p1")[0].innerHTML;
  var charK = document.getElementById(charId).getElementsByClassName("charKeys")[0].innerHTML;
  
  var charTab = document.getElementById(charId).getElementsByTagName("tr")
  for (i = 1; i < charTab.length; i++) {
    for (j = 0; j < charTab[i].cells.length; j++) {
      actCell = charTab[i].cells[j].innerHTML;
      if (actCell.includes("Ability") === true) { /*document.getElementById("demo1").innerHTML = charTab[i].cells[j + 1].innerHTML;*/ };
    };
  };
  
  document.getElementById("heroName").innerHTML = charN;
  document.getElementById("yourHerosName").innerHTML = charNclear;
  document.getElementById("move").innerHTML = char1;
  document.getElementById("save").innerHTML = char2;
  document.getElementById("brav").innerHTML = char3;
  document.getElementById("woun").innerHTML = char4;
  document.getElementById("ptsAct").innerHTML = char5;
  document.getElementById("heroKeys").innerHTML = charK;
  document.getElementById("orgHeroAncestry").innerHTML = charN;
  
  if (char1.substr(char1.length - 1,1) == '"') {
    document.getElementById("orgMove02").innerHTML = char1.substr(0,char1.length - 1); } 
  else {document.getElementById("orgMove02").innerHTML = char1; };
  if (char2 == "-") {
    document.getElementById("orgSave02").innerHTML = "0" } 
  else if (char2.substr(char2.length - 1,1) == "+") {
    document.getElementById("orgSave02").innerHTML = char2.substr(0,char2.length - 1); } 
  else {document.getElementById("orgSave02").innerHTML = char2; };
  document.getElementById("orgBrav02").innerHTML = char3;
  document.getElementById("orgWoun02").innerHTML = char4;
  document.getElementById("orgPts02").innerHTML = char5;
  document.getElementById("orgKeys02").innerHTML = charK;
  
  if (charK.includes("ARMY") === false) {
    document.getElementById("validateStep2").innerHTML = "validated";
  };
  
  document.getElementById("allCommandAbilities").style.display = "none";
  document.getElementById("allSpells").style.display = "none";
  document.getElementById("damageTable").style.display = "none";
  if (charK.includes("MALIGNANT") === true) {
    addToWS(Fly, "description", currentTab);
    addToWS(Ethereal, "abilities", currentTab); }
  else if (charK.includes("BLOODTHIRSTER") === true) {
    document.getElementById("allCommandAbilities").style.display = "block";
    document.getElementById("dmgTable99check").innerHTML = "true";
    addToWS(Bloodthirster_DmgTable, "damageTable", currentTab); }
  else if (charK.includes("LORD OF CHANGE") === true) {
    document.getElementById("allSpells").style.display = "block";
    document.getElementById("dmgTable99check").innerHTML = "true";
    addToWS(LordOfChange_DmgTable, "damageTable", currentTab); };
};

// add command abilities  and spells to warscroll ------------------------------
function extendedAddToWS(theNameExt, wsPartExt, theTabExt, checkIdExt) {
  charK = document.getElementById("orgKeys0" + currentTab);
  actSpellName = document.getElementById("r1_" + checkIdExt + "c1").innerHTML
  if (currentTab == 2) { remStepFromWS() };

  if (document.getElementById("spe_01").checked == true 
  || document.getElementById("spe_02").checked == true) { 
    document.getElementById("rewriteSpellsCommand").innerHTML = ""
    var clone = Magic_Abi0.cloneNode(true);
    clone.id = Magic_Abi0.id + "1";
    document.getElementById("rewriteSpellsCommand").appendChild(clone);
    document.getElementById("Magic_Abi01").innerHTML = document.getElementById("Magic_Abi01").innerHTML.replace(" and Mystic Shield spells. In addition, they know any spells you have picked for them from the Spell Table.", ", Mystic Shield and " + actSpellName + " spells.");    
    addToWS(Magic_Abi01, "magic", theTabExt);
  };
  //document.getElementById("demo1").innerHTML = theNameExt + wsPartExt + theTabExt + checkIdExt
  //document.getElementById("orgKeys0" + currentTab).innerHTML = actKeys;
  addToWS(theNameExt, wsPartExt, theTabExt, checkIdExt);
  document.getElementById("validateStep" + currentTab).innerHTML = "validated";
};

// change <ARMY> keyword to next keyword on list ------------------------------
function selectArmy(charId, charInner) {
  var actId = charId.substr(3, charId.length)
  var armies = ["ARMY"]
  var armiesAll = charInner.split("&gt;, &lt;");
  for (i = 0; i < armiesAll.length; i++) {
    armiesAll[i] = armiesAll[i].replace(/&lt;/g, "");
    armiesAll[i] = armiesAll[i].replace(/&gt;/g, "");
    armiesAll[i] = armiesAll[i].toUpperCase()
  };
  //armies.push(armiesAll);  // join a single string ------------------------------
  armies = armies.concat(armiesAll); // concat two arrays
  armiesCur = document.getElementById("Keys" + actId).innerHTML.replace("&lt;ARMY&gt;", "ARMY");
  for (i = 0; i < armies.length; i++) {
    j = i + 1
    n = armiesCur.includes(armies[i])
    if (n === true) {
      if (j >= armies.length) {
        armiesNew = armiesCur.replace(armies[i], armies[0]);
      } else {
        armiesNew = armiesCur.replace(armies[i], armies[j]);
      };
      break;
    };
  };
  
  n = armiesNew.includes("ARMY")
  if (n === true) {
    armiesNew = armiesNew.replace("ARMY", "&lt;ARMY&gt;")
  };
  document.getElementById("Keys" + actId).innerHTML = armiesNew;
  showChange(actId);
};

// show changes by highlight for 1 second
function showChange(actID) {
  var el = document.getElementById("Keys" + actID);
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

// show/hide choosen alliance(ancestries) ------------------------------
function showAlliance(allianceId) {
  alli = allianceId.substr(5, allianceId.length);
  
  resetAllianceShown();
 
  var squares = document.getElementsByClassName("charSquare")
  if (alli == "ALL") {
    resetAllianceShown();
  } else {
    for (i = 0; i < squares.length; i++) {
      squareId = squares[i].id;
      squareKey = document.getElementById("Keys" + squareId).innerHTML;
      if (squareKey.includes(alli) === false) {
        squares[i].style.display = "none";        
      } else {
        squares[i].style.display = "block";
      };
    };
  };
  fixAlliIndicator(allianceId)
};

// reset shown alliance(ancestries) ------------------------------
function resetAllianceShown() {
  var squares = document.getElementsByClassName("charSquare")
  for (i = 0; i < squares.length; i++) {
    squares[i].style.display = "block";
  };
};

// fix shown alliance(ancestries) ------------------------------
function fixAlliIndicator(allianceId) {  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("grandButton");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  document.getElementById(allianceId).className += " active";  //... and adds the "active" class on the current step
};

// reset Step 2 ------------------------------
function resetStep2() {
  var cBoxes = document.getElementById("commandAbilitiesForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'radio') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
    }
  };
  var cBoxes = document.getElementById("spellsForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'radio' || cBoxes[i].type == 'checkbox') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
    }
  };
  
  var charT = document.getElementById("step2chars").getElementsByClassName("charSquare")
  for (i = 0; i < charT.length; i++) {
    charT[i].style.backgroundColor = "";
  };
  document.getElementById("heroName").innerHTML = "your heros name";
  document.getElementById("yourHerosName").innerHTML = "Your hero";
  document.getElementById("yourHeroArmoury").innerHTML = "currently unarmed";
  document.getElementById("validateStep2").innerHTML = "not valid";
  document.getElementById("orgHeroAncestry").innerHTML = "";
  
  resetAllStats();
  remStepFromWS();
};
// --- end of scripts on step 2 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||        ||||||
//  ||    ||     ||     ||        ||    ||      ||    ||
//  ||           ||     ||        ||    ||            ||
//   ||||||      ||     ||||||    |||||||   ||   ||||||
//        ||     ||     ||        ||                  ||
//  ||    ||     ||     ||        ||        ||  ||    ||
//   ||||||      ||     ||||||||  ||             ||||||

// --- scripts on step 3 ------------------------------
// set variables ------------------------------
var ohW = 0  // one Hand Wea
var oh2 = 0  // one Hand Wea 2nd
var thW = 0  // two Hand Wea
var ohM = 0  // one Hand Mi-Wea
var thM = 0  // two Hand Mi-Wea
var shi = 0  // shield

var ohWs = ["ohW_01", "ohW_02", "ohW_03", "ohW_04", "ohW_05", "ohW_06", "ohW_07"]
var thWs = ["thW_01", "thW_02", "thW_03", "thW_04", "thW_05", "thW_06"]
var ohMs = ["ohM_01"]
var thMs = ["thM_01"]
var shis = ["shi_01"]
var weaCh = ["  1 one-handed melee weapon.", 
       "  2 one-handed melee weapons.", 
       "  1 one-handed melee weapon and a shield.", 
       "  1 two-handed melee weapon.", 
       "  1 Handbow and 1 one-handed melee weapon.", 
       "  1 Bow and 1 one-handed melee weapon."]
var weaChV = 99

// reset checkboxes to uncheck & reset weapon names ------------------------------
function resetCheckStep3() {
  var cBoxes = document.getElementById("weaponsForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'checkbox') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
    }
  };
  document.getElementById("yourHeroArmoury").innerHTML = "currently unarmed";
  text = weaChTxt(99);
  ohW = 0; oh2 = 0; thW = 0; ohM = 0; thM = 0; shi = 0;
  var weaponCode = "0-" + ohW + oh2 + thW + ohM + thM + shi;
  
  resetWeaName();
  resetWeaDisplay();
  resetRestrictionsStep3();
};

// reset weapon names to origin ------------------------------
function resetWeaName() {
  var hideCol = document.getElementById("weaponsForm").getElementsByTagName("tr")
  for (i = 0; i < hideCol.length; i++) {
    for (j = 1; j < hideCol[i].cells.length; j++) {
      if (hideCol[i].cells[j].id.substr(hideCol[i].cells[j].id.length - 2,2) == "hi" 
      && hideCol[i].cells[j].id.substr(0,2) == "r1"
      && hideCol[i].cells[j].id.substr(3,3) != "shi") {
        document.getElementById(hideCol[i].cells[j].id.substr(0,hideCol[i].cells[j].id.length -3) + "1").innerHTML = hideCol[i].cells[j].innerHTML
       };
    };    
  };
};

// reset/hide displayed weaponTable ------------------------------
function resetWeaDisplay() {
  var wTables = ["melee", "missile"]
  for (w = 0; w < wTables.length; w++) {
    var wTable = document.getElementById(wTables[w] + "WeaTable")
    var rows = wTable.getElementsByTagName("tr").length
    var wTablePre = document.getElementById(wTables[w] + "WeaTablePre")
    var rowsPre = wTablePre.getElementsByTagName("tr").length

    text = "wTable:" + rows;
    do {
      if (rows > 1) {
        wTable.deleteRow(1);
      };
      rows = wTable.getElementsByTagName("tr").length;
    }
    while (rows > 1);
    
    do {
      if (rowsPre > 1) {
        wTablePre.deleteRow(1);
      };
      rowsPre = wTablePre.getElementsByTagName("tr").length;
    }
    while (rowsPre > 1);
    
    document.getElementById(wTables[w] + "Table").style.display = "none";
    document.getElementById(wTables[w] + "TablePre").style.display = "none";
  };  
  //document.getElementById("missileTable").style.display = "none";
  //document.getElementById("meleeTable").style.display = "none";
};

// check & reset restrictions ------------------------------
function resetRestrictionsStep3() {
  var str = document.getElementById("heroKeys").innerHTML
  if (str.includes("MALIGNANT") === true) {
    for (i = 0; i < shis.length; i++) {
      document.getElementById(shis[i]).disabled = true;      
    };    
  };
};

// display weaponTable ------------------------------
function showWeaDisplay() {
  var weas = [thMs, ohMs, thWs, ohWs]
  for (w = 0; w < weas.length; w++) {
        
  };
  
  for (i = 0; i < thMs.length; i++) {
    var checkBox = document.getElementById(thMs[i]);
    if (checkBox.checked == true) {
      var table = document.getElementById("missileWeaTable");
      var row = table.insertRow(1);
      var tablePre = document.getElementById("missileWeaTablePre");
      var rowPre = tablePre.insertRow(1);

      for (n = 1; n < 8; n++) {
        cellId = "r1_" + checkBox.id + "c" + n;
        cellTxt = document.getElementById(cellId).innerHTML;
        row.insertCell(n - 1).innerHTML = cellTxt;
        rowPre.insertCell(n - 1).innerHTML = cellTxt;
      };
      document.getElementById("missileTable").style.display = "block";
      document.getElementById("missileTablePre").style.display = "block";
    };
  };
  
  for (i = 0; i < ohMs.length; i++) {
    var checkBox = document.getElementById(ohMs[i]);
    if (checkBox.checked == true) {
      var table = document.getElementById("missileWeaTable");
      var row = table.insertRow(1);
      var tablePre = document.getElementById("missileWeaTablePre");
      var rowPre = tablePre.insertRow(1);

      for (n = 1; n < 8; n++) {
        cellId = "r1_" + checkBox.id + "c" + n;
        cellTxt = document.getElementById(cellId).innerHTML;
        row.insertCell(n - 1).innerHTML = cellTxt;
        rowPre.insertCell(n - 1).innerHTML = cellTxt;
      };
      document.getElementById("missileTable").style.display = "block";
      document.getElementById("missileTablePre").style.display = "block";
    };
  };
  
  for (i = 0; i < thWs.length; i++) {
    var checkBox = document.getElementById(thWs[i]);
    if (checkBox.checked == true) {
      var table = document.getElementById("meleeWeaTable");
      var row = table.insertRow(1);
      var tablePre = document.getElementById("meleeWeaTablePre");
      var rowPre = tablePre.insertRow(1);

      for (n = 1; n < 8; n++) {
        cellId = "r1_" + checkBox.id + "c" + n;
        cellTxt = document.getElementById(cellId).innerHTML;
        row.insertCell(n - 1).innerHTML = cellTxt;
        rowPre.insertCell(n - 1).innerHTML = cellTxt;
      };
      document.getElementById("meleeTable").style.display = "block";
      document.getElementById("meleeTablePre").style.display = "block";
    };
  };
  
  for (i = 0; i < ohWs.length; i++) {
    var checkBox = document.getElementById(ohWs[i]);
    if (checkBox.checked == true) {
      var table = document.getElementById("meleeWeaTable");
      var row = table.insertRow(1);
      var tablePre = document.getElementById("meleeWeaTablePre");
      var rowPre = tablePre.insertRow(1);

      for (n = 1; n < 8; n++) {
        cellId = "r1_" + checkBox.id + "c" + n;
        cellTxt = document.getElementById(cellId).innerHTML;
        row.insertCell(n - 1).innerHTML = cellTxt;
        rowPre.insertCell(n - 1).innerHTML = cellTxt;
      };
      document.getElementById("meleeTable").style.display = "block";
      document.getElementById("meleeTablePre").style.display = "block";
    };
  };
};

// select weapon with checkboxes & disabled other checkboxes
function clickWea(checkId) {  
  var checkBox = document.getElementById(checkId);  // Get the checkbox
  var nameCheck = document.getElementById("r1_" + checkId + "c1").innerHTML;
  var nameOrg = document.getElementById("r1_" + checkId + "c9hi").innerHTML;
  var n = nameCheck.search("<button");
 
  if (n != -1) {
    document.getElementById("r1_" + checkId + "c1").innerHTML = nameOrg;
  };
  
  var heroArmoury = ""
  var txtArmed = document.getElementById("yourHeroArmoury")
  var aeiou = nameCheck.lastIndexOf(" ");  // find first letter
  if (aeiou != -1) { firstL = nameCheck.substr(aeiou + 1, 1) }
  else { firstL = nameCheck.substr(0, 1) };
  firstL = firstL.toUpperCase();
  var weaPrefix = "a "
  if (firstL == "A" || firstL == "E" || firstL == "I" || firstL == "O" || firstL == "U") { weaPrefix = "an " };
  if (checkBox.checked == true && checkId.includes("shi") == false && checkId.includes("dbl") == false) {
    if (txtArmed.innerHTML == "currently unarmed") {
      heroArmoury = "armed with " + weaPrefix + nameCheck;
      txtArmed.innerHTML = heroArmoury;
    } else if (txtArmed.innerHTML.includes(" and ") == false) {
      txtArmed.innerHTML = txtArmed.innerHTML + " and " + weaPrefix + nameCheck;
    };
  } else if (checkBox.checked == false && checkId.includes("shi") == false && checkId.includes("dbl") == false) {
    if (txtArmed.innerHTML.includes(" and ") == false) {
      txtArmed.innerHTML = "currently unarmed"
    } else if (txtArmed.innerHTML.includes(" and " + weaPrefix + nameCheck) == true) {
      heroArmoury = txtArmed.innerHTML.replace(" and " + weaPrefix + nameCheck, "");
      txtArmed.innerHTML = heroArmoury;
    } else {
      heroArmoury = txtArmed.innerHTML.replace(weaPrefix + nameCheck + " and ", "");
      txtArmed.innerHTML = heroArmoury;
    };
  } else if (checkId.includes("dbl") == true) {
    if (checkBox.checked == true) {
      heroArmoury = txtArmed.innerHTML.replace(weaPrefix, "two ");
      heroArmoury = txtArmed.innerHTML.replace(nameCheck, nameCheck + "s");
    } else {
      heroArmoury = txtArmed.innerHTML.replace("two ", weaPrefix);
      heroArmoury = txtArmed.innerHTML.replace(nameCheck + "s", nameCheck);
    };
  };

  resetWeaDisplay();
  showWeaDisplay();
  
  var pointCell = document.getElementById("orgPts03");  
  var DPs = document.getElementById("r1_" + checkId + "c8").innerHTML;
  // If the checkbox is checked, display the output text
  if (checkId.substring(0,3) == "ohW") {    
    if (checkBox.checked == true) { ohW += 1; } else { ohW -= 1; };
  } else if (checkId.substring(0,3) == "oh2") {
    if (checkBox.checked == true) { oh2 += 1; } else { oh2 -= 1; };    
  } else if (checkId.substring(0,3) == "thW") {
    if (checkBox.checked == true) { thW += 1; } else { thW -= 1; };    
  } else if (checkId.substring(0,3) == "ohM") {    
    if (checkBox.checked == true) { ohM += 1; } else { ohM -= 1; };
  } else if (checkId.substring(0,3) == "thM") {    
    if (checkBox.checked == true) { thM += 1; } else { thM -= 1; };
  } else if (checkId.substring(0,3) == "shi") {
    if (checkBox.checked == true) {
      shi += 1;
      document.getElementById("orgSave03").innerHTML = 1;
    } else {
      shi -= 1;
      document.getElementById("orgSave03").innerHTML = 0;
    };
  };
  // If the checkbox is checked, add destiny points
  if (checkBox.checked == true) {
    pointCell.innerHTML = parseInt(pointCell.innerHTML) + parseInt(DPs);
  } else {
    pointCell.innerHTML = parseInt(pointCell.innerHTML) - parseInt(DPs);
  };

  var weaponCode = "0-" + ohW + oh2 + thW + ohM + thM + shi;
  var i = 0
  
  switch (weaponCode) {
    case "0-100000":  //  1 one-handed melee weapon.
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = false;};
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = false;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = false;};
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = false;};
      text = weaChTxt(0);  // text = "  1 one-handed melee weapons.";   
      break;      
    case "0-200000":  //  2 one-handed melee weapons.
      weaSwitch(ohWs)  // ohWs
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(1);  // text = "  2 one-handed melee weapons.";     
      break;      
    case "0-100001":  //  1 one-handed melee weapon and a shield.
      weaSwitch(ohWs)  // ohWs      
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
      weaSwitch(shis)  // shis
      text = weaChTxt(2);  // text = "  1 one-handed melee weapon and a shield.";
      break;      
    case "0-001000":  //  1 two-handed melee weapon.
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = true;};
      weaSwitch(thWs)  // thWs
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(3);  //text = "  1 two-handed melee weapon.";
      break;      
    case "0-100100":  //  1 Handbow and 1 one-handed melee weapon.
      weaSwitch(ohWs)  // ohWs
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      weaSwitch(ohMs)  // ohMs      
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(4);  // text = "  1 missile weapon and 1 one-handed melee weapon.";
      break;
    case "0-100010":  //  1 Bow and 1 one-handed melee weapon.
      weaSwitch(ohWs)  // ohWs
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      weaSwitch(thMs)  // thMs      
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(5);  // text = "  1 missile weapon and 1 one-handed melee weapon.";
      break;
    case "0-000001":  // only a shield.
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = false;};
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
      weaSwitch(shis)  // shis
      text = weaChTxt(99);  // text = "  only a shield.";
      break;
    case "0-000100":  // only a one-handed missile weapon.
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = false;};
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      weaSwitch(ohMs)  // ohMs
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = true;};
    for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(99);  // text = "  only a missile weapon.";
      break;
    case "0-000010":  // only a two-handed missile weapon.
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = false;};
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = true;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = true;};
      weaSwitch(thMs)  // thMs      
    for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = true;};
      text = weaChTxt(99);  // text = "  only a missile weapon.";
      break;
    default:
      for (i = 0; i < ohWs.length; i++) {document.getElementById(ohWs[i]).disabled = false;};
      for (i = 0; i < thWs.length; i++) {document.getElementById(thWs[i]).disabled = false;};
      for (i = 0; i < ohMs.length; i++) {document.getElementById(ohMs[i]).disabled = false;};
      for (i = 0; i < thMs.length; i++) {document.getElementById(thMs[i]).disabled = false;};
      for (i = 0; i < shis.length; i++) {document.getElementById(shis[i]).disabled = false;};
      text = weaChTxt(99);  // text = "No weapons choosen yet.";
  };
  displayAllSteps();
  resetRestrictionsStep3();
};

// change enabled/disabled checkboxes
function weaSwitch(weaArray) {
  for (i = 0; i < weaArray.length; i++) {
    var checkBox = document.getElementById(weaArray[i]);
    if (checkBox.checked == true) {
      document.getElementById(weaArray[i]).disabled = false;
    } else {document.getElementById(weaArray[i]).disabled = true;};
  };
};

// highlight text depending on chosen weapons ------------------------------
function weaChTxt(weaChV) {
  document.getElementById("validateStep3").innerHTML = "not valid";
  var text = "";
  var i;
  for (i = 0; i < weaCh.length; i++) {
    if (i === weaChV) {
      document.getElementById("validateStep3").innerHTML = "validated";
      text += "<b>" + weaCh[i] + "</b><br>"; continue;
    }
    text += weaCh[i] + "<br>";
  }
  document.getElementById("weaChosen").innerHTML = text;
};

// identify header, weapons, shield ------------------------------
var rows = document.getElementById("weaponsTable")/*.getElementsByTagName('tbody')[0]*/.getElementsByTagName("tr");
for (i = 0; i < rows.length; i++) {
  rows[i].addEventListener('click', function() {
    //this.classList.toggle('marked');
    actRow = this.rowIndex;
    var weaProperties = ""

    if (rows[actRow].cells[0].id.substr(0,1) == "h") {
       weaProperties = "none (header)";
    } else if (rows[actRow].cells[0].id.substr(3,3) == "shi") {
       weaProperties = "none (shield)";
    } else {
      weaProperties = "";
      for (j = 1; j < rows[actRow].cells.length; j++) {
        if (weaProperties == "") {
          weaProperties = rows[actRow].cells[j].innerHTML;
        } else {
          weaProperties = weaProperties + " | " + rows[actRow].cells[j].innerHTML;
          // rows[actRow].cells[j].style.display="none";
        }
      }
    }
  });
};
// --- end of scripts on step 3 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||          ||
//  ||    ||     ||     ||        ||    ||        ||
//  ||           ||     ||        ||    ||       ||
//   ||||||      ||     ||||||    |||||||   ||  ||  ||
//        ||     ||     ||        ||            ||||||||
//  ||    ||     ||     ||        ||        ||      ||
//   ||||||      ||     ||||||||  ||                ||

// --- scripts on step 4 ------------------------------
// add prayers and spells to warscroll ------------------------------
function extAddToWS(theNameExt, wsPartExt, theTabExt, checkIdExt) {
  charK = document.getElementById("orgKeys0" + currentTab);
  actKeys = charK.innerHTML;
  actSpellPrayName = document.getElementById("r1_" + checkIdExt + "c1").innerHTML
  if (currentTab == 4) { remStepFromWS() };
  
  if (document.getElementById("arc_03").checked == true 
  || document.getElementById("arc_04").checked == true) { 
    addToWS(Divine_Prayers, "abilities", theTabExt);
    if (actKeys.includes("PRIEST") === false) { actKeys = actKeys + ", PRIEST" };
  } else {
    if (actKeys.includes("PRIEST") === true) { actKeys = actKeys.replace(", PRIEST", ""); };
  };
  if (document.getElementById("arc_05").checked == true 
  || document.getElementById("arc_06").checked == true 
  || document.getElementById("arc_07").checked == true 
  || document.getElementById("arc_08").checked == true) { 
    
    document.getElementById("rewriteSpellsPrayers").innerHTML = ""
    var clone = Magic_Abi.cloneNode(true);
  clone.id = Magic_Abi.id + "1";
  document.getElementById("rewriteSpellsPrayers").appendChild(clone);
    document.getElementById("Magic_Abi1").innerHTML = document.getElementById("Magic_Abi1").innerHTML.replace(" and Mystic Shield spells. In addition, they know any spells you have picked for them from the Spell Table.", ", Mystic Shield and " + actSpellPrayName + " spells.");    
    addToWS(Magic_Abi1, "magic", theTabExt);
    
    if (actKeys.includes("WIZARD") === false) { actKeys = actKeys + ", WIZARD" };
  } else {
    if (actKeys.includes("WIZARD") === true) { actKeys = actKeys.replace(", WIZARD", ""); };
  };
  document.getElementById("orgKeys0" + currentTab).innerHTML = actKeys;
  addToWS(theNameExt, wsPartExt, theTabExt, checkIdExt);
  document.getElementById("validateStep4").innerHTML = "validated";
};

// reset checkboxes to uncheck & reset archetype names ------------------------------
function resetCheckStep4() {
  var cBoxes = document.getElementById("archetypeForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'radio') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
    }
  };
  document.getElementById("validateStep4").innerHTML = "not valid";
  resetDescrName("archetypeForm");
  resetRestrictionsStep4();
};

// check & reset restrictions ------------------------------
function resetRestrictionsStep4() {
  var str = document.getElementById("heroKeys").innerHTML
  if (str.includes("DEATHMAGE") === true 
  || str.includes("MASTERCLAN") === true) {
    document.getElementById("arc_01").disabled = true;
    document.getElementById("arc_02").disabled = true;
  };
  if (str.includes("DAEMON") === true 
  || str.includes("DEATHMAGE") === true 
  || str.includes("SAURUS") === true 
  || str.includes("MASTERCLAN") === true 
  || str.includes("CLANS VERMINUS") === true 
  || str.includes("CALNS SKRYRE") === true 
  || str.includes("CLANS MOULDER") === true 
  || str.includes("CLANS ESHIN") === true) {
    document.getElementById("arc_03").disabled = true;
    document.getElementById("arc_04").disabled = true;
  };
  if (str.includes("DUARDIN") === true 
  || str.includes("KHORNE") === true 
  || str.includes("SAURUS") === true) {
    document.getElementById("arc_05").disabled = true;
    document.getElementById("arc_06").disabled = true;
    document.getElementById("arc_07").disabled = true;
    document.getElementById("arc_08").disabled = true;
  };  
};
// --- end of scripts on step 4 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||       ||||||||
//  ||    ||     ||     ||        ||    ||      ||
//  ||           ||     ||        ||    ||      ||
//   ||||||      ||     ||||||    |||||||   ||   ||||||
//        ||     ||     ||        ||                  ||
//  ||    ||     ||     ||        ||        ||  ||    ||
//   ||||||      ||     ||||||||  ||             ||||||

// --- scripts on step 5 ------------------------------
// add beastial companion to warscroll ------------------------------
function beastAddToWS(theNameExt, wsPartExt, theTabExt, checkIdExt) {
  charK = document.getElementById("orgKeys05");
  actKeys = charK.innerHTML;
  document.getElementById("rewriteBeasts").innerHTML = "";
  //actBeastName = document.getElementById("r1_" + checkIdExt + "c1").innerHTML
  //if (currentTab == 5) { remStepFromWS() };
  remStepFromWS();
  resetCheckStep5_2();
  resetStepWeaponStats("orgBeastTable");
  
  if (typeof checkIdExt !== "undefined" && theNameExt.innerHTML != "x") {
    for (s = 0; s <= 3; s++) {
      if (s === 1) { continue; }
      var subCheckId = checkIdExt.substr(0, (checkIdExt.length - 1)) + s;
      var nameCheck = document.getElementById("r1_" + subCheckId + "c1").innerHTML;
      var nameOrg = document.getElementById("r1_" + subCheckId + "c9hi").innerHTML;
      var n = nameCheck.search("<button");
      if (n != -1) { document.getElementById("r1_" + subCheckId + "c1").innerHTML = nameOrg };
    };
  };
  
  document.getElementById("dmgTable99").innerHTML = "";
  resetBeaDisplay();
  showBeaDisplay();
  
  var move = 0, wounds = 0, DPs = 0
  if (document.getElementById("noB_01").checked == true) { 
    move = 0;
    wounds = 0;
    DPs = 0;
    //document.getElementById("rewriteBeasts").innerHTML = "none chosen"
    document.getElementById("showBeaAbis").style.display = "none";
  } else {
    DPs = document.getElementById("r1_" + checkIdExt + "c8").innerHTML;
    document.getElementById("showBeaAbis").style.display = "block";
  };
  
  if (document.getElementById("miB_01").checked == true) { 
    wounds = 1;
    //document.getElementById("rewriteBeasts").innerHTML = "";
    var clone = Minor_Beast.cloneNode(true);
    clone.id = Minor_Beast.id + "1";
    document.getElementById("rewriteBeasts").appendChild(clone);
    actBeaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "0c1").innerHTML;
    if (actBeaName != "[double-click here to name your beast]") {
      document.getElementById("Minor_Beast1").innerHTML = document.getElementById("Minor_Beast1").innerHTML.replace("Minor Beast", actBeaName);
    } else { actBeaName = "Minor Beast" };
    actClaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "2c1").innerHTML;
    actMawName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "3c1").innerHTML;
    document.getElementById("Minor_Beast1").innerHTML = document.getElementById("Minor_Beast1").innerHTML.replace("Claws and Maw.", actClaName + " and " + actMawName + ".");
    addToWS(Minor_Beast1, "description", theTabExt);
  };
  
  if (document.getElementById("moB_01").checked == true) { 
    wounds = 2;
    var actMove = 0;
    for (m = 1; m < currentTab; m++) { 
      actMove = parseInt(actMove) + parseInt(document.getElementById("orgMove0" + m).innerHTML);
    };
    if (actMove < 8) { move = 8 - parseInt(actMove) };  
    //document.getElementById("rewriteBeasts").innerHTML = "";
    var clone = Mounted_Beast.cloneNode(true);
    clone.id = Mounted_Beast.id + "1";
    document.getElementById("rewriteBeasts").appendChild(clone);
    actBeaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "0c1").innerHTML;
    if (actBeaName != "[double-click here to name your beast]") {
      document.getElementById("Mounted_Beast1").innerHTML = document.getElementById("Mounted_Beast1").innerHTML.replace("Mounted Beast", actBeaName);
    } else { actBeaName = "Mounted Beast" };
    actClaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "2c1").innerHTML;
    actMawName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "3c1").innerHTML;
    document.getElementById("Mounted_Beast1").innerHTML = document.getElementById("Mounted_Beast1").innerHTML.replace("Claws and Maw.", actClaName + " and " + actMawName + ".");
    addToWS(Mounted_Beast1, "description", theTabExt);
  };
  
  if (document.getElementById("gaB_01").checked == true) { 
    wounds = 8;
    var blackstar = document.createElement("IMG");
    blackstar.setAttribute("src", "AoS_WS_blackstar.png");
    blackstar.setAttribute("alt", "WarhammerAoS");
    blackstar.setAttribute("style", "display:block; margin: auto auto -5px;");
    //document.getElementById("move").innerHTML = ""
    //document.getElementById("move").appendChild(blackstar);
    //<img src=AoS_WS_blackstar.png alt="WarhammerAoS" style="display:block; margin: auto auto -5px;";>
    //document.getElementById("rewriteBeasts").innerHTML = "";
    var clone = Gargantuan_Beast.cloneNode(true);
    clone.id = Gargantuan_Beast.id + "1";
    document.getElementById("rewriteBeasts").appendChild(clone);
    actBeaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "0c1").innerHTML;
    if (actBeaName != "[double-click here to name your beast]") {
      document.getElementById("Gargantuan_Beast1").innerHTML = document.getElementById("Gargantuan_Beast1").innerHTML.replace("Gargantuan Beast", actBeaName);
    } else { actBeaName = "Gargantuan Beast" };
    actClaName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "2c1").innerHTML;
    actMawName = document.getElementById("r1_" + checkIdExt.substr(0, 5) + "3c1").innerHTML;
    document.getElementById("Gargantuan_Beast1").innerHTML = document.getElementById("Gargantuan_Beast1").innerHTML.replace("Claws and Maw.", actClaName + " and " + actMawName + ".");
    addToWS(Gargantuan_Beast1, "description", theTabExt);
    
    dmgTable = document.getElementById("GarBeast_DmgTable").getElementsByTagName("th")
    dmgTable[3].innerHTML = actClaName;
    dmgTable[4].innerHTML = actMawName;

    if (actKeys.includes("MONSTER") === false) { actKeys = actKeys + ", MONSTER" };
    addToWS(GarBeast_DmgTable, "damageTable", currentTab);
  } else {
    document.getElementById("move").innerHTML = "";
    dmgTable = document.getElementById("GarBeast_DmgTable").getElementsByTagName("th");
    dmgTable[3].innerHTML = "Claws";
    dmgTable[4].innerHTML = "Maw";

    if (actKeys.includes("MONSTER") === true) { 
      actKeys = actKeys.replace(", MONSTER", "");
      //remFromWS(GarBeast_DmgTable, "damageTable");
    };
  };
  document.getElementById("orgKeys05").innerHTML = actKeys;
  
  // overwrite actual values
  var moveCell = document.getElementById("orgMove05");
  var woundCell = document.getElementById("orgWoun05");
  var pointCell = document.getElementById("orgPts05");
  if (document.getElementById("gaB_01").checked == true) { moveCell.innerHTML =  ""; moveCell.appendChild(blackstar); } 
  else { moveCell.innerHTML = parseInt(move); };  
  woundCell.innerHTML = parseInt(wounds);
  pointCell.innerHTML = parseInt(DPs);
  
  //addToWS(theNameExt, wsPartExt, theTabExt, checkIdExt);
  displayAllSteps();        // remove if addToWS() is active
  document.getElementById("validateStep5").innerHTML = "validated";
};

// add beasts characteristic enhancements ------------------------------
function addBeastEnh(checkId) {
  var checkBox = document.getElementById(checkId);  // Get the checkbox  
  if (checkId.endsWith("b") || checkId.endsWith("c")) {
    checkId = checkId.substr(0, checkId.length - 1)
  };
  
  var enhancement = document.getElementById("r1_" + checkId + "c1").innerHTML
  var pointCell = document.getElementById("orgPts0" + currentTab);
  var DPs = document.getElementById("r1_" + checkId + "c8").innerHTML;
  
  var addValue = 0
  var addTimes = 1
  var saveBreak = false
  
  // find weapon stats
  findWeaponStats("orgBeastTable");  
  var wea01nam = wea01nam0, wea01rng = wea01rng0, wea01att = wea01att0, wea01hit = wea01hit0, wea01wnd = wea01wnd0, wea01rnd = wea01rnd0, wea01dmg = wea01dmg0
  var wea02nam = wea02nam0, wea02rng = wea02rng0, wea02att = wea02att0, wea02hit = wea02hit0, wea02wnd = wea02wnd0, wea02rnd = wea02rnd0, wea02dmg = wea02dmg0
  
  if (checkBox.id.endsWith("b")) { addCount = document.getElementById(checkId + "c"); }
  else { addCount = document.getElementById(checkId + "a"); };
  
  if (addCount != null) {
    if (addCount.value > 3) { addCount.value = 3 };
    if (addCount.value <= 0) { addCount.value = 1 };
    addTimes = addCount.value;
  };
  bStar = false;
  
  switch (enhancement) {
    case "Savage Frenzy":    // attacks
      statCol = 2;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02att.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02att);
        newStat = parseInt(wea02att) + parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01att.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01att);
        newStat = parseInt(wea01att) + parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else { 
        if (checkBox.checked == true) { usedStat = newStat; } 
        else { usedStat = oldStat; };
        changeWeaStatPrev(actWeaName, usedStat, statCol);
      };
      break;
      
    case "Savage Ferocity":  // to hit
      statCol = 3;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02hit.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02hit);
        newStat = parseInt(wea02hit) - parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01hit.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01hit);
        newStat = parseInt(wea01hit) - parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat > 0) {  // restrict to 1+
          if (checkBox.checked == true) { usedStat = newStat; } 
          else { usedStat = oldStat; };
          changeWeaStatPrev(actWeaName, usedStat + "+", statCol) }
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    case "Savage Strength":  // to wound
      statCol = 4;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02wnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02wnd);
        newStat = parseInt(wea02wnd) - parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01wnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01wnd);
        newStat = parseInt(wea01wnd) - parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat > 0) {  // restrict to 1+
          if (checkBox.checked == true) { usedStat = newStat; } 
          else { usedStat = oldStat; };
          changeWeaStatPrev(actWeaName, usedStat + "+", statCol) }
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    case "Razor-sharp Claws":  // rend
      statCol = 5;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02rnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02rnd);
        newStat = parseInt(wea02rnd) + parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01rnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01rnd);
        newStat = parseInt(wea01rnd) + parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat <= 3) {  // restrict to -3
          if (checkBox.checked == true) { usedStat = "-" + newStat; } 
          else if (oldStat == 0) { usedStat = "-" } 
          else { usedStat = "-" + oldStat; };
          changeWeaStatPrev(actWeaName, usedStat, statCol) } 
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    default:  // empty
  };  // end switch

  // if the checkbox is checked, add destiny points
  addDP = parseInt(DPs) * addTimes;
  if (checkBox.checked == true) {
    pointCell.innerHTML = parseInt(pointCell.innerHTML) + parseInt(addDP);
    if (addCount != null) { addCount.disabled = true; };
  } else {
    if (saveBreak == false) { pointCell.innerHTML = parseInt(pointCell.innerHTML) - parseInt(addDP); };
    if (addCount != null) { addCount.disabled = false; };
  };
  displayAllSteps();
};

// reset/hide displayed weaponTable ------------------------------
function resetBeaDisplay() {
  var wTable = document.getElementById("meleeWeaBeastTable")
  var rows = wTable.getElementsByTagName("tr").length
  var wTablePre = document.getElementById("meleeWeaTablePre")
  var rowsPre = wTablePre.getElementsByTagName("tr").length

  var bea01 = "", bea02 = ""
  do {
    if (rows > 1) { 
      if (bea01 == "") { bea01 = wTable.rows[1].cells[0].innerHTML }
      else if (bea02 == "") { bea02 = wTable.rows[1].cells[0].innerHTML };
      wTable.deleteRow(1);
    };
    rows = wTable.getElementsByTagName("tr").length;
  }
  while (rows > 1);
  
  rowsPre = wTablePre.getElementsByTagName("tr").length;
  for (r = 1; r < rowsPre; r++) {
    if (wTablePre.rows[r].cells[0].innerHTML == bea01 
    || wTablePre.rows[r].cells[0].innerHTML == bea02) { 
      wTablePre.deleteRow(r);
      r = r - 1;
    };
    rowsPre = wTablePre.getElementsByTagName("tr").length;
  };
  
  document.getElementById("showBeaAbis").style.display = "none";
  
  document.getElementById("meleeBeastTable").style.display = "none";
  if (rowsPre > 1) { document.getElementById("meleeTablePre").style.display = "block"; }
  else { document.getElementById("meleeTablePre").style.display = "none"; };
};

// display weaponTable ------------------------------
function showBeaDisplay() {
  var beWs = ["miB_01", "moB_01", "gaB_01"]
  for (i = 0; i < beWs.length; i++) {
    var checkBox = document.getElementById(beWs[i]);
    if (checkBox.checked == true) {
      var tableBea = document.getElementById("meleeWeaBeastTable");
      var tablePre = document.getElementById("meleeWeaTablePre");
      var actRows = 0
      
      for (b = 2; b <= 3; b++) {
        actRows = tablePre.getElementsByTagName("tr").length;
        var rowBea = tableBea.insertRow(b - 1);
        var rowPre = tablePre.insertRow(actRows);
        
        for (n = 1; n < 8; n++) {
          cellId = "r1_" + checkBox.id.substr(0, 5) + b + "c" + n;
          cellTxt = document.getElementById(cellId).innerHTML;
          rowBea.insertCell(n - 1).innerHTML = cellTxt;
          rowPre.insertCell(n - 1).innerHTML = cellTxt;
        };
      };
      document.getElementById("meleeBeastTable").style.display = "block";
      document.getElementById("meleeTablePre").style.display = "block";
    };
  };
};

// show/hide beastial companion enhancements & abilities ------------------------------
function showBeastAbis(thisId) {
  actText = document.getElementById(thisId);
  
  if (actText.innerHTML == "SHOW BEASTIAL COMPANION ENHANCEMENTS AND ABILITIES") {
    actText.innerHTML = "BACK TO BESTIAL COMPANIONS";
    //actText.setAttribute("style", "width: 320px;");
    //document.getElementById("resetBeastEnhAbis").style.display = "inline";
    document.getElementById("beastialCompanions1").style.display = "none";
    document.getElementById("beastialCompanions2").style.display = "block";
  } else {
    actText.innerHTML = "SHOW BEASTIAL COMPANION ENHANCEMENTS AND ABILITIES";
    //actText.setAttribute("style", "width: 500px;");
    //document.getElementById("resetBeastEnhAbis").style.display = "none";
    document.getElementById("beastialCompanions1").style.display = "block";
    document.getElementById("beastialCompanions2").style.display = "none";
  };
};

// reset checkboxes to uncheck beasts & reset claws'n'maw names ------------------------------
function resetCheckStep5() {
  var cBoxes = document.getElementById("beastsForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'radio') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
    };
  };
  resetDescrName("beastsForm");

  dmgTable = document.getElementById("GarBeast_DmgTable").getElementsByTagName("th")
  dmgTable[3].innerHTML = "Claws";
  dmgTable[4].innerHTML = "Maw";
  //document.getElementById("move").innerHTML = "";
  document.getElementById("validateStep5").innerHTML = "not valid";
  
  document.getElementById("beastEnhAbis").innerHTML = "SHOW BEASTIAL COMPANION ENHANCEMENTS AND ABILITIES";
  document.getElementById("beastEnhAbis").setAttribute("style", "width: 500px;");
  //document.getElementById("resetBeastEnhAbis").style.display = "none";
  document.getElementById("showBeaAbis").style.display = "none";
  document.getElementById("beastialCompanions1").style.display = "block";
  document.getElementById("beastialCompanions2").style.display = "none";
  document.getElementById("dmgTable99").innerHTML = "";
  
  resetBeaDisplay();
  resetCheckStep5_2();
  resetRestrictionsStep5();
};

// reset checkboxes to uncheck beasts enhancements & abis ------------------------------
function resetCheckStep5_2() {
  var cBoxes = document.getElementById("beastsAbiForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'checkbox' || cBoxes[i].type == 'number') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
      if (cBoxes[i].type == 'number') { cBoxes[i].value = 1; };
    };
  };
  resetDescrName("beastsAbiForm");
  // set restrictions to beasts
  if (document.getElementById("gaB_01").checked != true) {
    document.getElementById("bea_06").disabled = true;
    document.getElementById("bea_09").disabled = true;
    document.getElementById("bea_10").disabled = true;
    document.getElementById("bea_11").disabled = true;
    document.getElementById("bea_12").disabled = true;
  };
  if (document.getElementById("miB_01").checked == true) {
    document.getElementById("bea_05").disabled = true;
  };
  // check if "FLY" is already shown
  var idCount = document.querySelectorAll('.warscroll [id*=Clone]').length;
  if (idCount > 0) {
    for (c = 0; c < idCount; c++) {
      idCloneName = document.querySelectorAll('.warscroll [id*=Clone]')[c].id;
      if (idCloneName.includes("Fly") === true) {
        document.getElementById("bea_05").disabled = true;
      };
    };
  };
};

// check & reset restrictions ------------------------------
function resetRestrictionsStep5() {
  var str = document.getElementById("heroKeys").innerHTML
  if (str.includes("BULLGOR") === true || str.includes("DRAGON OGOR") === true) {
    document.getElementById("moB_01").disabled = true;
    document.getElementById("gaB_01").disabled = true;
  };
};
// --- end of scripts on step 5 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||        ||||||
//  ||    ||     ||     ||        ||    ||      ||    ||
//  ||           ||     ||        ||    ||      ||
//   ||||||      ||     ||||||    |||||||   ||  |||||||
//        ||     ||     ||        ||            ||    ||
//  ||    ||     ||     ||        ||        ||  ||    ||
//   ||||||      ||     ||||||||  ||             ||||||

// --- scripts on step 6 ------------------------------
// add characteristic enhancements ------------------------------
function addCharEnh(checkId) {
  var checkBox = document.getElementById(checkId);  // Get the checkbox  
  if (checkId.endsWith("b") || checkId.endsWith("c")) {
    checkId = checkId.substr(0, checkId.length - 1)
  };
  
  var enhancement = document.getElementById("r1_" + checkId + "c1").innerHTML
  var pointCell = document.getElementById("orgPts0" + currentTab);
  var DPs = document.getElementById("r1_" + checkId + "c8").innerHTML;
  
  var addValue = 0
  var addTimes = 1
  var saveBreak = false
  
  // find weapon stats
  findWeaponStats("orgWeaponTable");  
  var wea01nam = wea01nam0, wea01rng = wea01rng0, wea01att = wea01att0, wea01hit = wea01hit0, wea01wnd = wea01wnd0, wea01rnd = wea01rnd0, wea01dmg = wea01dmg0
  var wea02nam = wea02nam0, wea02rng = wea02rng0, wea02att = wea02att0, wea02hit = wea02hit0, wea02wnd = wea02wnd0, wea02rnd = wea02rnd0, wea02dmg = wea02dmg0
  
  if (checkBox.id.endsWith("b")) { addCount = document.getElementById(checkId + "c"); }
  else { addCount = document.getElementById(checkId + "a"); };
  
  if (addCount != null) {
    if (addCount.value > 3) { addCount.value = 3 };
    if (addCount.value <= 0) { addCount.value = 1 };
    addTimes = addCount.value
  };
  bStar = false;
  
  switch (enhancement) {
    case "Superior Speed":   // move
      move = document.getElementById("orgMove06")
      if (checkBox.checked == true) { addValue = parseInt(move.innerHTML) + parseInt(addTimes); } 
      else { addValue = parseInt(move.innerHTML) - parseInt(addTimes); };
      move.innerHTML = addValue;
      
      actStat = document.getElementById("move").innerHTML.search("blackstar")       // check if blackstar
      if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
      actWeaName = "Move"
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); };
      break;
      
    case "Superior Vitality":   // wounds
      woun = document.getElementById("orgWoun06")
      if (checkBox.checked == true) { addValue = parseInt(woun.innerHTML) + parseInt(addTimes); } 
      else { addValue = parseInt(woun.innerHTML) - parseInt(addTimes); };
      woun.innerHTML = addValue;
      
      actStat = document.getElementById("woun").innerHTML.search("blackstar")       // check if blackstar
      if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
      actWeaName = "Wounds"
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); };
      break;
      
    case "Superior Leadership":   // bravery
      brav = document.getElementById("orgBrav06")
      if (checkBox.checked == true) { addValue = parseInt(brav.innerHTML) + parseInt(addTimes); } 
      else { addValue = parseInt(brav.innerHTML) - parseInt(addTimes); };
      brav.innerHTML = addValue;
      
      actStat = document.getElementById("brav").innerHTML.search("blackstar")       // check if blackstar
      if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
      actWeaName = "Bravery"
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); };
      break;
      
    case "Extra Armour":   // save
      save = document.getElementById("orgSave06")
      saveAll = ["orgSave02", "orgSave03", "orgSave04", "orgSave05", "orgSave06"]
      numTextN = 0;
      for (i = 0; i < saveAll.length; i++) {
        if (i == 0) {
          if (parseInt(document.getElementById(saveAll[i]).innerHTML) == 0) { numTextN = 7; }
          else { numTextN = parseInt(document.getElementById(saveAll[i]).innerHTML); };
        } else {
          numTextN = numTextN - parseInt(document.getElementById(saveAll[i]).innerHTML);
        };
      };
      addSave = addTimes
      numTextN = numTextN - addSave
      
      actStat = document.getElementById("save").innerHTML.search("blackstar")       // check if blackstar
      if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
      actWeaName = "Save"
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); }
      else {
        if (checkBox.checked == true) {
          if (numTextN >= 3) { addValue = parseInt(save.innerHTML) + parseInt(addTimes); }
          else {
            checkBox.checked = false;
            saveBreak = true;
          };
        } else { addValue = parseInt(save.innerHTML) - parseInt(addTimes); };
        save.innerHTML = addValue;
      };
      break;
      
    case "Battle Standard Bearer":
      if (checkBox.checked == true) { addKey = document.getElementById("orgKeys06").innerHTML + ", TOTEM"; } 
      else { addKey = document.getElementById("orgKeys06").innerHTML.replace(", TOTEM", ""); };
      document.getElementById("orgKeys06").innerHTML = addKey;
      break;
      
    case "Ferocity":    // attacks
      statCol = 2;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02att.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02att);
        newStat = parseInt(wea02att) + parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01att.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01att);
        newStat = parseInt(wea01att) + parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else { 
        if (checkBox.checked == true) { usedStat = newStat; } 
        else { usedStat = oldStat; };
        changeWeaStatPrev(actWeaName, usedStat, statCol);
      };
      break;
      
    case "Weapon Master":  // to hit
      statCol = 3;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02hit.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02hit);
        newStat = parseInt(wea02hit) - parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01hit.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01hit);
        newStat = parseInt(wea01hit) - parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat > 0) {  // restrict to 1+
          if (checkBox.checked == true) { usedStat = newStat; } 
          else { usedStat = oldStat; };
          changeWeaStatPrev(actWeaName, usedStat + "+", statCol) }
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    case "Superior Strength":  // to wound
      statCol = 4;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02wnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02wnd);
        newStat = parseInt(wea02wnd) - parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01wnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01wnd);
        newStat = parseInt(wea01wnd) - parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat > 0) {  // restrict to 1+
          if (checkBox.checked == true) { usedStat = newStat; } 
          else { usedStat = oldStat; };
          changeWeaStatPrev(actWeaName, usedStat + "+", statCol) }
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    case "Sharpened Edge":  // rend
      statCol = 5;
      if (checkBox.id.endsWith("b")) { 
        actWeaName = wea02nam;
        actStat = wea02rnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02rnd);
        newStat = parseInt(wea02rnd) + parseInt(addTimes); } 
      else { 
        actWeaName = wea01nam;
        actStat = wea01rnd.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01rnd);
        newStat = parseInt(wea01rnd) + parseInt(addTimes); };
      
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else {
        if (newStat <= 3) {  // restrict to -3
          if (checkBox.checked == true) { usedStat = "-" + newStat; } 
          else if (oldStat == 0) { usedStat = "-" } 
          else { usedStat = "-" + oldStat; };
          changeWeaStatPrev(actWeaName, usedStat, statCol) } 
        else {
          checkBox.checked = false;
          saveBreak = true; };
      };
      break;
      
    case "Mighty Weapon":  // damage
      statCol = 6;
      if (checkBox.id.endsWith("b")) { 
        if (wea02dmg == "D3") { 
          checkBox.checked = false;
          saveBreak = true;
          break; 
      };
        actWeaName = wea02nam;
        actStat = wea02dmg.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea02dmg);
        newStat = parseInt(wea02dmg) + parseInt(addTimes); } 
      else { 
        if (wea01dmg == "D3") { 
          checkBox.checked = false;
          saveBreak = true;
          break; 
      };
        actWeaName = wea01nam;
        actStat = wea01dmg.search("blackstar")       // check if blackstar
        if (actStat != -1) { bStar = true; };   // if blackstar then bStar=true and get dmgTable
        oldStat = parseInt(wea01dmg);
        newStat = parseInt(wea01dmg) + parseInt(addTimes); };
        
      if (bStar == true && checkBox.checked == true) { changeDmgTable(actWeaName, addTimes, "add"); } 
      else if (bStar == true && checkBox.checked == false) { changeDmgTable(actWeaName, addTimes, "rem"); } 
      else { 
        if (checkBox.checked == true) { usedStat = newStat; } 
        else { usedStat = oldStat; };
        changeWeaStatPrev(actWeaName, usedStat, statCol);
      };
      break;
      
    default:  
  };  // end switch

  // if the checkbox is checked, add destiny points
  addDP = parseInt(DPs) * addTimes;
  if (checkBox.checked == true) {
    pointCell.innerHTML = parseInt(pointCell.innerHTML) + parseInt(addDP);
    if (addCount != null) { addCount.disabled = true; };
  } else {
    if (saveBreak == false) { pointCell.innerHTML = parseInt(pointCell.innerHTML) - parseInt(addDP); };
    if (addCount != null) { addCount.disabled = false; };
  };
  displayAllSteps();
};

// change weapon stats on warscroll
function changeWeaStatPrev(actWeaName, usedStat, statCol) {
  var prevRow = document.getElementById("weaTablePreview").getElementsByTagName("tr")      
  for (i = 0; i < prevRow.length; i++) {
    if (prevRow[i].cells[0].innerHTML == actWeaName) { prevRow[i].cells[statCol].innerHTML = usedStat };
  };
};

// reset checkboxes to uncheck & reset abilites names ------------------------------
function resetCheckStep6() {
  var cBoxes = document.getElementById("abilitiesForm").getElementsByTagName("input")
  for (i = 0; i < cBoxes.length; i++) {
    if (cBoxes[i].type == 'checkbox' || cBoxes[i].type == 'number') {
      cBoxes[i].checked = false;
      cBoxes[i].disabled = false;
      if (cBoxes[i].type == 'number') { cBoxes[i].value = 1; };
    };
  };
  
  resetDescrName('abilitiesForm');
  resetRestrictionsStep6();
};

// check & reset restrictions ------------------------------
function resetRestrictionsStep6() {
  var str = document.getElementById("heroKeys").innerHTML
  if (str.includes("MALIGNANT") === true) {
    document.getElementById("abi_01").disabled = true;
    document.getElementById("abi_03").disabled = true;
    /*for (i = 0; i < shis.length; i++) {
      document.getElementById(shis[i]).disabled = true;
    };*/    
  };
  if (str.includes("WIZARD") === false) { document.getElementById("abi_08").disabled = true; };
  if (str.includes("PRIEST") === false) { document.getElementById("abi_09").disabled = true; };
  
  // check if "FLY" is already shown
  var idCount = document.querySelectorAll('.warscroll [id*=Clone]').length;
  if (idCount > 0) {
    for (c = 0; c < idCount; c++) {
      idCloneName = document.querySelectorAll('.warscroll [id*=Clone]')[c].id;
      if (idCloneName.includes("Fly") === true) { document.getElementById("abi_03").disabled = true; };
    };
  };
  
  var hideCol = document.getElementById("orgWeaponTable").getElementsByTagName("td")  
  weaCount = 7  // 7 stats for each weapon
  // hideCol.length -14 if bestial companion was chosen
  if (hideCol.length <= weaCount) {
    
    var input2nds = document.getElementById("abilitiesForm").getElementsByTagName("input")
    for (i = 0; i < input2nds.length; i++) {
      if ( (input2nds[i].type == 'checkbox' || input2nds[i].type == 'number') 
      && (input2nds[i].id.endsWith("b") || input2nds[i].id.endsWith("c") ) ) {
        input2nds[i].checked = false;
        input2nds[i].disabled = true;
        if (input2nds[i].type == 'number') { input2nds[i].value = 1; };
      };
    };
  };  
};
// --- end of scripts on step 6 ------------------------------

//   ||||||   ||||||||  ||||||||  |||||||       ||||||||
//  ||    ||     ||     ||        ||    ||      ||    ||
//  ||           ||     ||        ||    ||           ||
//   ||||||      ||     ||||||    |||||||   ||      ||
//        ||     ||     ||        ||               ||
//  ||    ||     ||     ||        ||        ||     ||
//   ||||||      ||     ||||||||  ||               ||

// --- scripts on step 7 ------------------------------
// change size of warscroll
function changeSize() {  
  document.getElementById("showhideCard").checked = true;
  //document.getElementById("warscrollcard").style.display = "block";
  clickCard();
  
  var format = document.getElementById("cardFormats");
  var fIndex = format.selectedIndex;
  var fOptio = format.options;
  
  var V = fOptio[fIndex].value
  var W = fOptio[fIndex].getAttribute("data-card-width");
  var H = fOptio[fIndex].getAttribute("data-card-height");
  //var O = fOptio[fIndex].getAttribute("data-card-orientation");

  WS = document.getElementById("yourWarscroll");
  if (V == "autosize-card") { WS.setAttribute("style", "width: " + W + "mm; height: ''"); } 
  else { WS.setAttribute("style", "width: " + W + "mm; height: " + H + "mm;"); }; 
};

// print warscroll as png ------------------------------
//$(document).ready(function () {
//  var element = $("#yourWarscroll"); // global variable
//  var getCanvas; //global variable
//  html2canvas(element, {
//    onrendered: function (canvas) { getCanvas = canvas; }
//  });
// 
//  $("#download_your_warscroll").on('click', function () {
//    var imgageData = getCanvas.toDataURL("image/png");
//    //Now browser starts downloading it instead of just showing it
//    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//    $("#download_your_warscroll").attr("download", "your_AoS_hero.png").attr("href", newData);
//  });
//});

function downloadWS() {
  var container = document.getElementById("warscrollcard");
  html2canvas(container).then(function (canvas) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "html_image.png";
    link.href = canvas.toDataURL("image/png");
    link.target = '_blank';
    link.click();
  });
};

// name your hero ------------------------------
function nameYourHero() {
  var nameNew = document.getElementById("heroesName").value;
  var nameAct1 = document.getElementById("heroName");
  var nameAct2 = document.getElementById("yourHerosName");
  var nameOrg = document.getElementById("orgHeroAncestry").innerHTML
  if (nameNew == "") { 
    if (nameOrg != "") {
      nameAct1.innerHTML = nameOrg;
      nameAct2.innerHTML = nameOrg; }
    else {
      nameAct1.innerHTML = "your heros hame";
      nameAct2.innerHTML = "YOUR HERO"; }; }
  else {
    nameAct1.innerHTML = nameNew;
    nameAct2.innerHTML = nameNew; };
};
// describe your hero ------------------------------
function describeYourHero() {
  var descrNew = document.getElementById("heroesDescr").value;
  var descrAct = document.getElementById("heroDescr");
  var descrOrg = document.getElementById("heroDescr").value;
  if (descrNew == "") { descrAct.innerHTML = "a description of your hero"; }
  else { descrAct.innerHTML = descrNew; };
};
// --- end of scripts on step 7 ------------------------------

//    ||||    ||        ||
//   ||  ||   ||        ||
//  ||    ||  ||        ||
//  ||||||||  ||        ||
//  ||    ||  ||        ||
//  ||    ||  ||        ||
//  ||    ||  ||||||||  ||||||||

// --- scripts on all steps ------------------------------
// show or hide hidden column with weapon origin names ------------------------------
function show_hide(handler) {
  forms = ["commandAbilitiesForm", "spellsForm", "weaponsForm", "archetypeForm", "beastsForm", "beastsAbiForm", "abilitiesForm"]
    for (f = 0; f < forms.length; f++) {
    var hideCol = document.getElementById(forms[f]).getElementsByTagName("tr")
    var text = hideCol.length
    for (i = 0; i < hideCol.length; i++) {
      for (j = 1; j < hideCol[i].cells.length; j++) {
         if (hideCol[i].cells[j].id.substr(hideCol[i].cells[j].id.length - 2,2) == "hi") {
           var element = document.getElementById(hideCol[i].cells[j].id);
           element.style.display = handler;
         };
      };
    };
  };
};

// rename weapons/beast wepaons/abilties/etc ------------------------------
function renameOne(event) {
  var oneCellId = event.target.id;
  var oneName = document.getElementById(oneCellId).innerHTML;
  var oneNameOrgId = oneCellId.substr(0,oneCellId.length - 1) + "9hi";
  var oneNameOrg = document.getElementById(oneNameOrgId).innerHTML;
  var n = oneName.search("<input");
  var usedName = "";
  var cellWidth = Math.floor( ( (document.getElementById(oneCellId).offsetWidth * 0.48) ) / 5 )  // 0.48 = 48%

  var checkBox = document.getElementById(oneCellId.substr(3, 6));
  if (currentTab == 5 && checkBox === null) { checkBox = document.getElementById(oneCellId.substr(3, 5) + "1"); };
  if (checkBox.checked == true) { return; };
  if (checkBox.disabled == true) { return; };
  
  if (n == -1) {
    document.getElementById(oneCellId).innerHTML = "";
    var inputField = document.createElement("INPUT");
    var inputId = oneCellId + "Input"
    inputField.setAttribute("id", inputId);
    inputField.setAttribute("size", cellWidth);
    inputField.setAttribute("value", oneName);
    document.getElementById(oneCellId).appendChild(inputField);
    var newId = "setName" + inputId
    
    var setInput = document.createElement("BUTTON");
    setInput.setAttribute("id", newId);
    setInput.setAttribute("onclick", "enterName('" + oneCellId + "', '" + inputId + "', '" + oneNameOrgId + "')");
    setInput.setAttribute("class", "setButton");
    setInput.innerHTML = "set";
    document.getElementById(oneCellId).appendChild(setInput);
    
    var input = document.getElementById(inputId);
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById(newId).click();
      }
    });  
  } else if (n == 0) {
    document.getElementById(oneCellId).innerHTML = oneNameOrg;
  };
};

// set new weapon/ability/etc name ------------------------------
function enterName(Ident, IdentNew, IdentOrg) {
  var nameNew = document.getElementById(IdentNew).value;
  var nameOrg = document.getElementById(IdentOrg).innerHTML;
  var nameUsed = "";
  if (nameNew != "") {
    nameUsed = nameNew;
  } else {
    nameUsed = nameOrg;
  };
  document.getElementById(Ident).innerHTML = nameUsed;

  if (currentTab == 2 || currentTab == 4 || currentTab == 5 || currentTab == 6) {
    //r1_abi_10c3
    var oneDescr = Ident.substr(0,Ident.length - 1) + "2";
    var onePart = document.getElementById(oneDescr).innerHTML;
    var beg = onePart.search("<t1>") + 4;
    var end = onePart.search("</t1>");
    var nameAct = onePart.substr((beg), (end - beg - 1))

  var res = onePart.replace("<t1>" + nameAct + ":</t1>", "<t1>" + nameUsed + ":</t1>");
    document.getElementById(oneDescr).innerHTML = res;
  };
  //document.getElementById("buttonHolder").innerHTML = "";
};

// reset archetype & abilities names to origin ------------------------------
function resetDescrName(usedForm) {
  var hideCol = document.getElementById(usedForm).getElementsByTagName("tr")
  for (i = 0; i < hideCol.length; i++) {
    for (j = 1; j < hideCol[i].cells.length; j++) {
      if (hideCol[i].cells[j].id.substr(hideCol[i].cells[j].id.length - 2,2) == "hi" 
      && hideCol[i].cells[j].id.substr(0,2) == "r1") {
        actAbiId = hideCol[i].cells[j].id;
        nameOrg = hideCol[i].cells[j].innerHTML;
        // reset name
        document.getElementById(actAbiId.substr(0,actAbiId.length -3) + "1").innerHTML = nameOrg;
        // resest name in text
        var oneDescr = actAbiId.substr(0,actAbiId.length - 3) + "2";
        if (document.getElementById(oneDescr) !== null) {
          var onePart = document.getElementById(oneDescr).innerHTML;
          var beg = onePart.search("<t1>") + 4;
          var end = onePart.search("</t1>");
          var nameAct = onePart.substr((beg), (end - beg - 1));
          var res = onePart.replace("<t1>" + nameAct + ":</t1>", "<t1>" + nameOrg + ":</t1>");
          document.getElementById(oneDescr).innerHTML = res;
        };        
      };
    };    
  };
};

// add text to Warscroll preview ------------------------------
function addToWS(theName, wsPart, theTab, checkId) {
  usedTab = theTab;
  if (typeof theTab === "undefined") {
    usedTab = currentTab;
  };
  if (typeof checkId !== "undefined") {
    var nameCheck = document.getElementById("r1_" + checkId + "c1").innerHTML;
    var nameOrg = document.getElementById("r1_" + checkId + "c9hi").innerHTML;
    var n = nameCheck.search("<button");
    if (n != -1) {
      document.getElementById("r1_" + checkId + "c1").innerHTML = nameOrg
    };
  };
  
  var clone = theName.cloneNode(true);
  clone.id = theName.id + "Clone" + usedTab;
  idCount = document.querySelectorAll('.warscroll [id=' + clone.id + ']').length;
  
  if (idCount == 0) {
    document.getElementById(wsPart).appendChild(clone);
    document.getElementById(clone.id).style.fontSize = "100%";
    if (theName.id == "Magic_Abi01") { 
      //document.getElementById("demo1").innerHTML = "the magic: " + theName.id;
      //document.getElementById(clone.id).style.backgroundColor = "blue";
      //document.getElementById(clone.id).style.fontSize = "98%";
    };
  };
  document.getElementById(wsPart).style.display = "block";
  
  if (typeof checkId === "undefined") {  }
  else {
    var checkBox = document.getElementById(checkId);  // Get the checkbox
    var pointCell = document.getElementById("orgPts0" + usedTab);
    if (usedTab != 4) { // on tab 4 select archetype, which do not cost DPs
      var DPs = document.getElementById("r1_" + checkId + "c8").innerHTML;

      // If the checkbox is checked, add destiny points
      if (checkBox.checked == true) {
        pointCell.innerHTML = parseInt(pointCell.innerHTML) + parseInt(DPs); }
      else {
        pointCell.innerHTML = parseInt(pointCell.innerHTML) - parseInt(DPs);
        remFromWS(theName, wsPart, checkId);
      };
    };
  };
  
  displayAllSteps();
};

// change stats in dmgTable ------------------------------
function changeDmgTable(actStatName, addTimes, operator) {
  // operator: "add" or "rem" , increase or decrease stats when added or removed
  var dmgTable = document.getElementById("damageTable").getElementsByTagName("tr")
  var colL = dmgTable.length
  var usedCol = ""
  var orgTableName = document.getElementById("damageTable").children[1].id
      //orgTableName = orgTableName.substr(0, (orgTableName.length - 6))
      orgTableName = orgTableName + "Clone99";
  idCount = document.querySelectorAll('.dmgTable99 [id=' + orgTableName + ']').length;
  if (idCount == 0) { 
    orgTableName = document.getElementById("damageTable").children[1].id;
    orgTableName = orgTableName.substr(0, (orgTableName.length - 6)); };
  var orgDmgTable = document.getElementById(orgTableName).getElementsByTagName("tr")
  
  for (j = 0; j < dmgTable[1].cells.length; j++) {
    cellT = dmgTable[1].cells[j].innerHTML;
    if (cellT == actStatName) { usedCol = j };
  };
  
  if (usedCol != "") {
    for (i = 2; i < colL; i++) {
      var plusV = "", minusV = "";
      cellV = dmgTable[i].cells[usedCol].innerHTML;
      
      if (operator == "add") { 
        // for: toHit, toWound
        if (cellV.substr((cellV.length - 1), 1) == "+" && actStatName != "Save") {
          cellV = cellV.substr(0, (cellV.length - 1));
          plusV = "+";
          cellVN = parseInt(cellV) - parseInt(addTimes);
          if (cellVN < 1) { cellVN = 1 };
        } 
        // for: move, range
        else if (cellV.substr((cellV.length - 1), 1) == '"') {
          cellV = cellV.substr(0, (cellV.length - 1));
          plusV = '"';
          cellVN = parseInt(cellV) + parseInt(addTimes);
        }
        // for: save
        else if (actStatName == "Save") {
          if (cellV == "-") { cellV = 7 }
          else { cellV = cellV.substr(0, (cellV.length - 1)); };
          plusV = "+";
          cellVN = parseInt(cellV) - parseInt(addTimes);
          if (cellVN < 3) { cellVN = 3 };
        }
        // for: rend
        else if (cellV.substr(0, 1) == "-") {
          if (cellV == "-") { cellV = 0 }
          else { cellV = cellV.substr(1, (cellV.length - 1)); };
          minusV = "-";
          cellVN = parseInt(cellV) + parseInt(addTimes);
          if (cellVN > 3) { cellVN = 3 };
        }
        // for: damage(random)
        else if (cellV.substr(0, 1) == "D") {
          cellVN = cellV + "+" + parseInt(addTimes);
        }
        // for: wounds, bravery, attacks, damage(normal)
        else {
          cellVN = parseInt(cellV) + parseInt(addTimes);
        };
        cellVN = minusV + cellVN + plusV;
      }
      else if (operator == "rem") { 
        cellVN = orgDmgTable[i].cells[usedCol].innerHTML;
      };
      
      dmgTable[i].cells[usedCol].innerHTML = cellVN;
    }; } 
  else {  };
};

// save changed dmgTable ------------------------------
function saveDmgTable() {
  // only used after step 5 was completed
  var getDmgT = document.getElementById("dmgTable99").getElementsByTagName("tr")
  var getDmgL = getDmgT.length
  if (getDmgL <= 0 ) {
    document.getElementById("dmgTable99").innerHTML = ""
  };  
  var dmgTable = document.getElementById("damageTable").getElementsByTagName("tr")
  var colL = dmgTable.length
  if (colL >= 1) {
    var orgTableName = document.getElementById("damageTable").children[1].id
        orgDmgTable = document.getElementById(orgTableName)
    addToWS(orgDmgTable, "dmgTable99", 99);
  };
};

// reset shown dmgTable completely ------------------------------
function resetDmgTable() {
  // only used on step 6
  var dmgTable = document.getElementById("damageTable").getElementsByTagName("tr")
  var colL = dmgTable.length
  if (colL >= 1) {
    var orgTableName = document.getElementById("damageTable").children[1].id
        //orgTableName = orgTableName.substr(0, (orgTableName.length - 6));
        orgTableName = orgTableName + "Clone99";
    var orgDmgTable = document.getElementById(orgTableName).getElementsByTagName("tr");
    
    for (i = 1; i < colL; i++) {
      for (j = 0; j < dmgTable[1].cells.length; j++) {
        cellVN = orgDmgTable[i].cells[j].innerHTML;
        dmgTable[i].cells[j].innerHTML = cellVN;
      };
    };
  };
};

// show/hide Warscroll ------------------------------
function clickCard() {
  if (document.getElementById("showhideCard").checked == true) { 
    document.getElementById("warscrollcard").style.display = "block"
  } else { document.getElementById("warscrollcard").style.display = "none" }
};

//  |||||||   ||||||||  ||    ||   ||||||   ||    ||  ||||||||
//  ||    ||  ||        |||  |||  ||    ||  ||    ||  ||
//  ||    ||  ||        ||||||||  ||    ||  ||    ||  ||
//  |||||||   ||||||    || || ||  ||    ||  ||    ||  ||||||
//  ||  ||    ||        ||    ||  ||    ||   ||  ||   ||
//  ||   ||   ||        ||    ||  ||    ||    ||||    ||
//  ||    ||  ||||||||  ||    ||   ||||||      ||     ||||||||

// remove single text to Warscroll preview ------------------------------
function remFromWS(theName, wsPart, checkId) {
  var clone = theName.id + "Clone" + currentTab
  idCount = document.querySelectorAll('.warscroll [id=' + clone + ']').length;
  
  if (idCount > 0) {
    do {
      document.getElementById(clone).remove();
      idCount = document.querySelectorAll('.warscroll [id=' + clone + ']').length;
    }
    while (idCount > 0);
    cloneCount = document.querySelectorAll('.' + wsPart + ' [id*=Clone]').length;
    if (cloneCount >  0) {
      document.getElementById(wsPart).style.display = "block";
    } else {
      document.getElementById(wsPart).style.display = "none";
    };
  };
};

// remove all text from actual step on Warscroll preview ------------------------------
function remStepFromWS() {
  rangesWS = ["damageTable", "description", "abilities", "magic", "command"];
  /*
  [id^='someId'] will match all ids starting with someId.
  [id$='someId'] will match all ids ending with someId.
  [id*='someId'] will match all ids containing someId.
  */
  for (i = 0; i < rangesWS.length; i++) {
    var idCount = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']').length;
    if ( !(rangesWS[i] == "damageTable" &&  document.getElementById("dmgTable99check").innerHTML == "true") ) {
      if (idCount > 0) {
        do {
          idCloneName = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']')[0].id;
          document.getElementById(idCloneName).remove();
          idCount = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']').length;
        }
        while (idCount > 0);
      };
    };
  };
  rangesWS = ["damageTable", "abilities", "magic", "command"];
  for (i = 0; i < rangesWS.length; i++) {
    cloneCount = document.querySelectorAll('.' + rangesWS[i] + ' [id*=Clone]').length;
    if (cloneCount >  0) { document.getElementById(rangesWS[i]).style.display = "block"; } 
    else { document.getElementById(rangesWS[i]).style.display = "none"; };
  };
};
// remove text from actual step on Warscroll preview, except dmgTable ------------------------------
function remStepFromWSspec() {
  rangesWS = ["abilities", "magic", "command"]
  /*
  [id^='someId'] will match all ids starting with someId.
  [id$='someId'] will match all ids ending with someId.
  [id*='someId'] will match all ids containing someId.
  */
  for (i = 0; i < rangesWS.length; i++) {
    var idCount = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']').length;
    if (idCount > 0) {
      do {
        idCloneName = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']')[0].id;
        document.getElementById(idCloneName).remove();
        idCount = document.querySelectorAll('.' + rangesWS[i] + ' [id$=Clone' + currentTab + ']').length;
      }
      while (idCount > 0);
    };
  };
  for (i = 0; i < rangesWS.length; i++) {
    cloneCount = document.querySelectorAll('.' + rangesWS[i] + ' [id*=Clone]').length;
    if (cloneCount >  0) { document.getElementById(rangesWS[i]).style.display = "block"; } 
    else { document.getElementById(rangesWS[i]).style.display = "none"; };
  };
};

// restore original weapon stats ------------------------------
function resetStepWeaponStats(orgTable) {
  // find weapon stats
  findWeaponStats(orgTable);  
  var wea01nam = wea01nam0, wea01rng = wea01rng0, wea01att = wea01att0, wea01hit = wea01hit0, wea01wnd = wea01wnd0, wea01rnd = wea01rnd0, wea01dmg = wea01dmg0
  var wea02nam = wea02nam0, wea02rng = wea02rng0, wea02att = wea02att0, wea02hit = wea02hit0, wea02wnd = wea02wnd0, wea02rnd = wea02rnd0, wea02dmg = wea02dmg0
  
  var weaXStatsFull = [wea01nam, wea01rng, wea01att, wea01hit, wea01wnd, wea01rnd, wea01dmg];
  actWeaName = weaXStatsFull[0];
  for (s = 2; s < (weaXStatsFull.length); s++) {
    usedStat = parseInt(weaXStatsFull[s]);
    statCol = parseInt(s);
    if (s == 3) { usedStat = usedStat + "+" }
    else if (s == 4) { usedStat = usedStat + "+" }
    else if (s == 5 && usedStat == 0 ) { usedStat = "-" }
    else if (s == 5 ) { usedStat = "-" + usedStat };
    if (weaXStatsFull[s]  != "D3") { changeWeaStatPrev(actWeaName, usedStat, statCol); };
  };

  var hideCol = document.getElementById(orgTable).getElementsByTagName("td")  
  weaCount = 7  // 7 stats for each weapon
  // hideCol.length -14 if bestial companion was chosen
  if (hideCol.length > weaCount) {
    var weaXStatsFull = [wea02nam, wea02rng, wea02att, wea02hit, wea02wnd, wea02rnd, wea02dmg];
    actWeaName = weaXStatsFull[0];
    for (s = 2; s <= (weaXStatsFull.length - 1); s++) {
      usedStat = parseInt(weaXStatsFull[s]);
      statCol = parseInt(s);
      if (s == 3) { usedStat = usedStat + "+" }
      else if (s == 4) { usedStat = usedStat + "+" }
      else if (s == 5 && usedStat == 0 ) { usedStat = "-" }
      else if (s == 5 ) { usedStat = "-" + usedStat };
      if (weaXStatsFull[s]  != "D3") { changeWeaStatPrev(actWeaName, usedStat, statCol); };
    };
  };
};

// find weapon stats to use and manipulate ------------------------------
function findWeaponStats(orgTable) {
  // find weapon stats
  var fullRow = document.getElementById(orgTable).getElementsByTagName("tr")
  var wea01nam = "", wea01rng = "", wea01att = "", wea01hit = "", wea01wnd = "", wea01rnd = "", wea01dmg = ""
  var wea02nam = "", wea02rng = "", wea02att = "", wea02hit = "", wea02wnd = "", wea02rnd = "", wea02dmg = ""
  for (i = 0; i < fullRow.length; i++) {
    if (fullRow[i].cells[0].innerHTML == "MELEE WEAPONS" || fullRow[i].cells[0].innerHTML == "MISSILE WEAPONS") {}
    else {

      for (j = 0; j < fullRow[i].cells.length; j++) {
        actUsedRow = fullRow[i].cells[j]
        if (j == 0 && wea01nam == "") { wea01nam = actUsedRow.innerHTML } 
        else if (j == 0 && wea02nam == "") { wea02nam = actUsedRow.innerHTML };

        if (j == 1 && wea01rng == "") { wea01rng = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 1 && wea02rng == "") { wea02rng = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 2 && wea01att == "") { wea01att = actUsedRow.innerHTML } 
        else if (j == 2 && wea02att == "") { wea02att = actUsedRow.innerHTML };

        if (j == 3 && wea01hit == "") { wea01hit = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 3 && wea02hit == "") { wea02hit = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 4 && wea01wnd == "") {wea01wnd = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 4 && wea02wnd == "") {wea02wnd = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 5 && wea01rnd == "") {
          wea01rnd = actUsedRow.innerHTML.substr(1, 1);
          if (wea01rnd == "") { wea01rnd = "0" };
        } else if (j == 5 && wea02rnd == "") {
          wea02rnd = actUsedRow.innerHTML.substr(1, 1);
          if (wea02rnd == "") { wea02rnd = "0" };
        };

        if (j == 6 && wea01dmg == "") { wea01dmg = actUsedRow.innerHTML } 
        else if (j == 6 && wea02dmg == "") { wea02dmg = actUsedRow.innerHTML };
      };    // end for
    };
  };    // end find weapon stats
  // new names needed to give back to former function
  wea01nam0 = wea01nam, wea01rng0 = wea01rng, wea01att0 = wea01att, wea01hit0 = wea01hit, wea01wnd0 = wea01wnd, wea01rnd0 = wea01rnd, wea01dmg0 = wea01dmg
  wea02nam0 = wea02nam, wea02rng0 = wea02rng, wea02att0 = wea02att, wea02hit0 = wea02hit, wea02wnd0 = wea02wnd, wea02rnd0 = wea02rnd, wea02dmg0 = wea02dmg
};

// remove completely all text on Warscroll preview ------------------------------
function remAllFromWS() {
  var idCount = document.querySelectorAll('.warscroll [id*=Clone]').length;
  /*
  [id^='someId'] will match all ids starting with someId.
  [id$='someId'] will match all ids ending with someId.
  [id*='someId'] will match all ids containing someId.
  */  
  if (idCount > 0) {
    do {
      idCloneName = document.querySelectorAll('.warscroll [id*=Clone]')[0].id;
      document.getElementById(idCloneName).remove();
      idCount = document.querySelectorAll('.warscroll [id*=Clone]').length;
    }
    while (idCount > 0);
  };
  document.getElementById("damageTable").style.display = "none";
  //document.getElementById("description").style.display = "none";
  document.getElementById("abilities").style.display = "none";
  document.getElementById("magic").style.display = "none";
  document.getElementById("command").style.display = "none";  
  
  // exception for MALIGNANT after step 2
  charK = document.getElementById("heroKeys").innerHTML
  if (currentTab > 2 && charK.includes("MALIGNANT") === true) {
    addToWS(Fly, "description", 2);
    addToWS(Ethereal, "abilities", 2);
  };
  if (currentTab > 4) {
    //arcTypes = ["arc_01", "arc_02", "arc_03", "arc_04", "arc_05", "arc_06", "arc_07", "arc_08"]
    if (document.getElementById("arc_01").checked == true) { addToWS(Lead_the_Attack, "command", 4); };
    if (document.getElementById("arc_02").checked == true) { addToWS(Lead_the_Defence, "command", 4); };
    if (document.getElementById("arc_03").checked == true) { 
      addToWS(Divine_Prayers, "abilities", 4);
      addToWS(Wrathful_Invocation, "abilities", 4);
    };
    if (document.getElementById("arc_04").checked == true) { 
      addToWS(Divine_Prayers, "abilities", 4);
      addToWS(Shield_of_Faith, "abilities", 4);
    };
    if (document.getElementById("arc_05").checked == true) { 
      addToWS(Magic_Abi1, "magic", 4);
      addToWS(Aura_of_Protection, "magic", 4);
    };
    if (document.getElementById("arc_06").checked == true) { 
      addToWS(Magic_Abi1, "magic", 4);
      addToWS(Curse_of_Damnation, "magic", 4);
    };
    if (document.getElementById("arc_07").checked == true) { 
      addToWS(Magic_Abi1, "magic", 4);
      addToWS(Wildfire, "magic", 4);
    };
    if (document.getElementById("arc_08").checked == true) { 
      addToWS(Magic_Abi1, "magic", 4);
      addToWS(Raise_Dead, "magic", 4);
    };
  };
  
  // find weapon stats
  var fullRow = document.getElementById("orgWeaponTable").getElementsByTagName("tr")
  var wea01nam = "", wea01rng = "", wea01att = "", wea01hit = "", wea01wnd = "", wea01rnd = "", wea01dmg = ""
  var wea02nam = "", wea02rng = "", wea02att = "", wea02hit = "", wea02wnd = "", wea02rnd = "", wea02dmg = ""
  for (i = 0; i < fullRow.length; i++) {
    if (fullRow[i].cells[0].innerHTML == "MELEE WEAPONS") {}
    else if (fullRow[i].cells[0].innerHTML == "MISSILE WEAPONS") {}
    else {

      for (j = 0; j < fullRow[i].cells.length; j++) {
        actUsedRow = fullRow[i].cells[j]
        if (j == 0 && wea01nam == "") { wea01nam = actUsedRow.innerHTML } 
        else if (j == 0 && wea02nam == "") { wea02nam = actUsedRow.innerHTML };

        if (j == 1 && wea01rng == "") { wea01rng = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 1 && wea02rng == "") { wea02rng = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 2 && wea01att == "") { wea01att = actUsedRow.innerHTML } 
        else if (j == 2 && wea02att == "") { wea02att = actUsedRow.innerHTML };

        if (j == 3 && wea01hit == "") { wea01hit = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 3 && wea02hit == "") { wea02hit = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 4 && wea01wnd == "") {wea01wnd = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) } 
        else if (j == 4 && wea02wnd == "") {wea02wnd = actUsedRow.innerHTML.substr(0, actUsedRow.innerHTML.length - 1) };

        if (j == 5 && wea01rnd == "") {
          wea01rnd = actUsedRow.innerHTML.substr(1, 1);
          if (wea01rnd == "") { wea01rnd = "0" };
        } else if (j == 5 && wea02rnd == "") {
          wea02rnd = actUsedRow.innerHTML.substr(1, 1);
          if (wea02rnd == "") { wea02rnd = "0" };
        };

        if (j == 6 && wea01dmg == "") { wea01dmg = actUsedRow.innerHTML } 
        else if (j == 6 && wea02dmg == "") { wea02dmg = actUsedRow.innerHTML };
      };  // end for
    };
  };  // end find weapon stats
  
  var weaXStatsFull = [wea01nam, wea01rng, wea01att, wea01hit, wea01wnd, wea01rnd, wea01dmg];
  actWeaName = weaXStatsFull[0];
  for (s = 2; s < (weaXStatsFull.length); s++) {
    usedStat = parseInt(weaXStatsFull[s]);
    statCol = parseInt(s);
    if (s == 3) { usedStat = usedStat + "+" }
    else if (s == 4) { usedStat = usedStat + "+" }
    else if (s == 5 && usedStat == 0 ) { usedStat = "-" }
    else if (s == 5 ) { usedStat = "-" + usedStat };
    if (weaXStatsFull[s]  != "D3") { changeWeaStatPrev(actWeaName, usedStat, statCol); };
  };

  var hideCol = document.getElementById("orgWeaponTable").getElementsByTagName("td")  
  weaCount = 7  // 7 stats for each weapon
  // hideCol.length -14 if bestial companion was chosen
  if (hideCol.length > weaCount) {
    var weaXStatsFull = [wea02nam, wea02rng, wea02att, wea02hit, wea02wnd, wea02rnd, wea02dmg];
    actWeaName = weaXStatsFull[0];
    for (s = 2; s <= (weaXStatsFull.length - 1); s++) {
      usedStat = parseInt(weaXStatsFull[s]);
      statCol = parseInt(s);
      if (s == 3) { usedStat = usedStat + "+" }
      else if (s == 4) { usedStat = usedStat + "+" }
      else if (s == 5 && usedStat == 0 ) { usedStat = "-" }
      else if (s == 5 ) { usedStat = "-" + usedStat };
      if (weaXStatsFull[s]  != "D3") { changeWeaStatPrev(actWeaName, usedStat, statCol); };
    };
  };
};

// reset all steps ------------------------------
function resetAllStats() {
  var actTab = currentTab;
  document.getElementById("orgMove0" + actTab).innerHTML = 0;
  document.getElementById("orgSave0" + actTab).innerHTML = 0;
  document.getElementById("orgBrav0" + actTab).innerHTML = 0;
  document.getElementById("orgWoun0" + actTab).innerHTML = 0;
  document.getElementById("orgKeys0" + actTab).innerHTML = "";
  document.getElementById("orgPts0" + actTab).innerHTML = 0;
  
  displayAllSteps();
};

// display all steps ------------------------------
function displayAllSteps() {
  var actTab = currentTab;
  var numTextP = 0;  // add+
  var numTextN = 0;  // sub-
  var onlyText = " ";
  var fullText = "";

  var blackstarM = document.createElement("IMG");
      blackstarM.setAttribute("src", "AoS_WS_blackstar.png");
      blackstarM.setAttribute("alt", "WarhammerAoS");
      blackstarM.setAttribute("style", "display:block; margin: auto auto -5px;");
  var blackstarS = document.createElement("IMG");
      blackstarS.setAttribute("src", "AoS_WS_blackstar.png");
      blackstarS.setAttribute("alt", "WarhammerAoS");
      blackstarS.setAttribute("style", "display:block; margin: auto auto -5px;");
  var blackstarB = document.createElement("IMG");
      blackstarB.setAttribute("src", "AoS_WS_blackstar.png");
      blackstarB.setAttribute("alt", "WarhammerAoS");
      blackstarB.setAttribute("style", "display:block; margin: auto auto -5px;");
  var blackstarW = document.createElement("IMG");
      blackstarW.setAttribute("src", "AoS_WS_blackstar.png");
      blackstarW.setAttribute("alt", "WarhammerAoS");
      blackstarW.setAttribute("style", "display:block; margin: auto auto -5px;");
      
  if (actTab == 1) {
    document.getElementById("move").innerHTML = "1" + '"'
    document.getElementById("save").innerHTML = "-"  //document.getElementById("save").value;
    document.getElementById("brav").innerHTML = "1"  //document.getElementById("brav").value;
    document.getElementById("woun").innerHTML = "1"  //document.getElementById("woun").value;
    document.getElementById("heroKeys").innerHTML = ""
    document.getElementById("ptsAct").innerHTML = "-"
  } else {
  
    var rows = document.getElementById("orgStatsTable").getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
      var blackRow = false;
      for (j = 2; j < actTab + 1; j++) {
        blackCheck = rows[i].cells[j].innerHTML;
        blackCheck = blackCheck.search("blackstar");       // check if blackstar
        if (blackCheck != -1) { blackRow = true; };
        numTextP = numTextP + parseInt(rows[i].cells[j].innerHTML);
        if (i == 2) {
          if (j == 2) {
            if (parseInt(rows[i].cells[j].innerHTML) == 0) {
              numTextN = 7;
            } else {
              numTextN = parseInt(rows[i].cells[j].innerHTML);
            };
          } else {
            numTextN = numTextN - parseInt(rows[i].cells[j].innerHTML);
          };
        };
        if (i == 5) {
          if (rows[i].cells[j].innerHTML != "") {
            onlyText = onlyText + rows[i].cells[j].innerHTML;
          };
        };
      };
      if (i == 1) {
        if ( blackRow == true ) {
          document.getElementById("move").innerHTML = "";
          document.getElementById("move").appendChild(blackstarM);
          text = text + " move:done"; } 
        else { document.getElementById("move").innerHTML = numTextP + '"'; };
      };
      if (i == 2) {
        if ( blackRow == true ) { 
          document.getElementById("save").innerHTML = "";
          document.getElementById("save").appendChild(blackstarS);
          text = text + " save:done";
        } 
        else { 
          if (numTextN == 0 || numTextN >= 7) { document.getElementById("save").innerHTML = "-"; } 
          else { document.getElementById("save").innerHTML = numTextN + "+"; };
        };
      };
      if (i == 3) {
        if ( blackRow == true ) { 
          document.getElementById("brav").innerHTML = "";
          document.getElementById("brav").appendChild(blackstarB);
          text = text + " brav:done"; } 
        else { document.getElementById("brav").innerHTML = numTextP; };
      };
      if (i == 4) {
        if ( blackRow == true ) { 
          document.getElementById("woun").innerHTML = "";
          document.getElementById("woun").appendChild(blackstarW);
          text = text + " wound:done"; } 
        else { document.getElementById("woun").innerHTML = numTextP; };
      };
      if (i == 5) {
        //onlyText = onlyText.replace(/^\s+|\s+$/g, "");
        onlyText = onlyText.replace(/<br>/g, "");  // <br> = break
        onlyText = onlyText.replace(/\b/g, "");  // \b = backspace
        document.getElementById("heroKeys").innerHTML = onlyText;
      };
      if (i == 6) {
        document.getElementById("ptsAct").innerHTML = numTextP;
        if (parseInt(document.getElementById("ptsAct").innerHTML) > parseInt(document.getElementById("ptsMax").innerHTML)
        && document.getElementById("ptsMax").innerHTML != "-") { document.getElementById("ptsAct").setAttribute("style", "color: darkred"); }
        else { document.getElementById("ptsAct").setAttribute("style", "color: black"); };
      };
      fullText = fullText + numTextP + " | " + numTextN + "<br>";
      numTextP = 0;
      //numTextN = 0;
      onlyText = " ";
      //numText = parseInt(numText).toString()
    };
  };    
};
// --- end of all steps ------------------------------

//  ||    ||    ||||    ||    ||  ||
//  |||   ||   ||  ||   ||    ||  ||
//  ||||  ||  ||    ||  ||    ||  ||
//  || || ||  ||||||||  ||    ||  ||
//  ||  ||||  ||    ||   ||  ||   ||
//  ||   |||  ||    ||    ||||    ||
//  ||    ||  ||    ||     ||     ||

// --- navigation ------------------------------
//
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("anvilSteps");
  x[n].style.display = "block";
  if (n == 0) {      //... and fix the Previous/Next buttons
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("nextBtn").style.width = "350px";
    document.getElementById("nextBtn").innerHTML = "Start creating your hero!";
    document.getElementById("warscrollcard").style.display = "none";
    document.getElementById("warscrollshow").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("resetBtn").style.display = "inline";
    document.getElementById("nextBtn").style.width = "";
    document.getElementById("resetBtn").innerHTML = "Reset";
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("warscrollshow").style.display = "block";
    //document.getElementById("warscrollcard").style.display = "block";
    clickCard();
    document.getElementById("roleDP").style.display = "block";
  };
  if (n == (x.length - 1)) {
    document.getElementById("resetBtn").style.display = "none";
    //document.getElementById("resetBtn").innerHTML = "Start Anew";
    document.getElementById("nextBtn").innerHTML = "Your Warscroll!";
    //document.getElementById("warscrollcard").style.display = "none";
    document.getElementById("roleDP").style.display = "none";
  } else if (n != 0) {
    document.getElementById("resetBtn").style.display = "inline";
    document.getElementById("nextBtn").innerHTML = "Next";
  };
  fixStepIndicator(n);  //... and run a function that will display the correct step indicator
};

function nextPrev(n) {    // This function will figure out which tab to display
  var x = document.getElementsByClassName("anvilSteps");
  // Exit the function if any field in the current tab is invalid:
  //var step = document.getElementsByClassName("step");
  if (n == -1) {
    resetStep(0);
  };
  if(n == 0) {
    resetStep(0);
  };
  if (n == 1 && !validateStep()) return false;
  x[currentTab].style.display = "none";  // Hide the current tab
  currentTab = currentTab + n;           // Increase or decrease the current tab by 1
  if (currentTab >= x.length) {          // if you have reached the end of the form...
    return false;          // ... the form gets submitted:
  };
  showTab(currentTab);     // Otherwise, display the correct tab
  switch (currentTab) {
    case 0:   // start
      
      break;
    case 1:  // step 1
      if (n == 1) {resetStep1();};

      break;
    case 2:   // step 2
      if (n == 1) { showAlliance("grandALL"); };
      break;
    case 3:   // step 3
      if (n == 1) {
        saveDmgTable();
        resetCheckStep3();
      };
      resetRestrictionsStep3();
      break;
    case 4:   // step 4
      if (n == 1) {resetCheckStep4();};
      resetRestrictionsStep4();
      break;
    case 5:   // step 5
      if (n == 1) {
        resetCheckStep5();
        resetStepWeaponStats("orgBeastTable");
      };
      resetRestrictionsStep5();
      break;
    case 6:   // step 6
      if (n == 1) {
        saveDmgTable();
        resetDmgTable();
        resetCheckStep6();
        resetStepWeaponStats("orgWeaponTable");
      };
      resetRestrictionsStep6();
      break;
    case 7:   // step 7
      document.getElementById("showhideCard").checked = true;
      clickCard();
      break;
    default:  // default
      ;
  };
};

function resetStep(mod) {
  var x = document.getElementsByClassName("anvilSteps");
  //y = x[currentTab].id;
  step = document.getElementsByClassName("step");
  if ([currentTab] < step.length) {
    step[currentTab].className = step[currentTab].className.replace(" finish", "");
  };
  switch (currentTab) {
    case 0:   // start
      
      break;
    case 1:   // step 1
      resetStep1();
      break;
    case 2:   // step 2
      resetStep2();
      break;
    case 3:   // step 3
      resetCheckStep3();
      break;
    case 4:   // step 4
      remStepFromWS();
      resetCheckStep4();
      break;
    case 5:   // step 5
      remStepFromWS();
      resetCheckStep5();
      resetStepWeaponStats("orgBeastTable");
      break;
    case 6:   // step 6
      remStepFromWS();
      resetDmgTable();
      resetCheckStep6();
      resetStepWeaponStats("orgWeaponTable");
      break;
    default:  // default
      ;
  };
  if (currentTab != 7) {
    resetAllStats();
  };
};

function validateStep() {  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("anvilSteps");
  //y = x[currentTab].getElementsByTagName("input");
  checkValid = document.getElementById("validateStep" + [currentTab]).innerHTML;
  if (checkValid == "not valid") { valid = false; };
  // If the valid status is true, mark the step as finished and valid
  if (valid) { document.getElementsByClassName("step")[currentTab].className += " finish"; };
  return valid; // return the valid status
};

function fixStepIndicator(n) {  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); };
  x[n].className += " active";  //... and adds the "active" class on the current step
};
// --- end of navigation ------------------------------



// show properties on mouseclick ------------------------------
function showTagProperty(event) { // triggered by...
  var x = event.target;
  test1 = x.id.substring(0,2)
  test2 = x.id.substring(x.id.length - 2)
  test3 = x.id.substr(3,3)
  if (x.id.substring(0,2) == "r1" && x.id.substring(x.id.length - 2) == "c1" && x.id.substr(3,3) != "shi") {
  text = "1) Triggered by a " + x.tagName + " element | eleID:" + x.id + " | weapon name found" + " | T1:" + test1 + " | T2:" + test2 + " | T3:" + test3;
  document.getElementById("triggeredBy").innerHTML = text
  } else if (x.id.substr(3,3) == "shi") {
  text =  "1) Triggered by a " + x.tagName + " element | eleID:" + x.id + " | shield found" + " | T1:" + test1 + " | T2:" + test2 + " | T3:" + test3;
  document.getElementById("triggeredBy").innerHTML = text
  } else {
  text =  "2) Triggered by a " + x.tagName + " element | eleID:" + x.id + " | T1:" + test1 + " | T2:" + test2 + " | T3:" + test3;
  document.getElementById("triggeredBy").innerHTML = text
  }  
};
