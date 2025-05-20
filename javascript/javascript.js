"use strict";

(function () {

  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  const getEl = (el) => { return document.getElementById(el) };
  
  // ----------------------------------------------------------
  // INITIALIZES VARIABLES
  let sliders = 0;
  const choicesY = {};
  const choicesN = {};
  let choicesYsum = 0;
  let choicesNsum = 0;

  // ----------------------------------------------------------
  // LISTENS FOR USERS TO INPUT TEXT AND HIT "RETURN"
  const reasons = document.querySelectorAll("#reasons input");
  reasons.forEach(el => {
    el.addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        addReason(e);
        e.target.value = "";
      }
    });
  });

  // ----------------------------------------------------------
  // ADDS REASON TO DOM (INPUT:RANGE ELEMENT) AS IT’S INPUT
  function addReason(e) {
    let text = e.target.value || "";
    let fornot = e.target.id;
    const proORcon = fornot == "for" ? `pro${sliders+1}` : `con${sliders+1}`;
    // console.log(`Adding ${fornot} slider`);
    
    
    if (text) {
      // Creates new slider HTML and adds to DOM
      // FIX: FOR AND NOT HAVE SAME ID
      let newSlider = `
      <label for="${proORcon}">${text}<input type="range" id="${proORcon}" max="10" value="0">
      <output for="${proORcon}" class="${proORcon}">0</output></label>`
      
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // Add new slider to choices object with default value
      // if (fornot === "for") choicesY[`pro${sliders+1}`] = 0;
      // if (fornot === "not") choicesN[`con${sliders+1}`] = 0;
            
      // console.log(choicesYsum, choicesNsum)

      // Show default percentage when first added on Y or N
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0;
        if (fornot === "not") choiceN.innerHTML = 0;
      }
    
      sliders += 1;
    }
  } // END addReason()
  
  
  // ----------------------------------------------------------
  // ADDS UP THE VALUES OF PRO AND CON CHOICES
  function sumChoices(choices) {
    return Object.values(choices).reduce((a, b) => a + b, 0);
  }


  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choiceID) {
    document.querySelector(`.${choiceID}`).innerHTML = choiceID.value;      
    let sliderID = choiceID;

    // console.dir(parseInt(choiceID.value));
    // console.log(choiceID, choiceID.value, sliderID);
    
    // gets number of forReasons and notReasons sliders
    const forReasons = document.querySelectorAll("#forReasons output");
    const notReasons = document.querySelectorAll("#notReasons output");
    
    // check if slider is "pro" or "con"
    let procon = getEl(choiceID);
    let forOrNot = procon.parentElement.parentElement.id;

    // console.log(forOrNot, forReasons.length );
    
    // Add slider ID and value to "pro" or "con" sliders
    if (forReasons.length > 0 && forOrNot === "forReasons") {
      // console.log(parseInt(choiceID));
      choicesY[sliderID] = parseInt(choiceID.value);
      // console.log(`Adjusting value of 'yes' slider ${sliderID}`);
    }
    if (notReasons.length > 0 && forOrNot === "notReasons") {
      // console.log(parseInt(choiceID.value));
      choicesN[sliderID] = parseInt(choiceID.value);
      // console.log(`Adjusting value of 'not' slider ${sliderID}`);
    }
    // console.log("PRO:", choicesY, "CON:", choicesN);
    
    choicesYsum = sumChoices(choicesY);
    choicesNsum = sumChoices(choicesN);
    // console.log(`Add choicesY: ${choicesYsum}`);
    // console.log(`Add choicesN: ${choicesNsum}`);
    
    // calculates average percentage from both y/n slider values:
    let choiceYtotal = choicesYsum / Object.keys(choicesY).length * 10;
    let choiceNtotal = choicesNsum / Object.keys(choicesN).length * 10;
    
    //  numbers < 100 .toPrecision(2) = decimals to 9.99 then integers to 99.99…
    if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toFixed(2);
    if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toFixed(2);
    
    isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;
    
    // console.log(`choiceYtotal: ${choiceYtotal}, choiceNtotal: ${choiceNtotal}`);

    // displays overall choice
    if (isNaN(choiceYtotal) || isNaN(choiceNtotal)) {
      getEl("decision").innerHTML  = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
      getEl("decision").className = "dunno";
    } else if (getEl("choiceY").innerHTML > getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Seems you want to!";
      getEl("decision").className = "yes";
    } else if(getEl("choiceY").innerHTML < getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Seems you don't want to!";
      getEl("decision").className = "not";
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").className = "dunno";
    }
  } // END populate()


  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS AND STORES THEM
  choices.addEventListener("input", function(e) {
    const [...pro] = document.querySelectorAll('[id^="pro"]');
    const [...con] = document.querySelectorAll('[id^="con"]');
    const procon = con.concat(pro);
    const proconMap = procon.map(p => p.value);
    const ourDict = {};
    
    console.log(ourDict);
    
    procon.forEach((pc,i) => {
      ourDict[pc.id] = proconMap[i];
    });

    populate(procon);
  }, false);

})();
