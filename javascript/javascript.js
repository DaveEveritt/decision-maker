"use strict";

(function () {
  
  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  
  const getEl = (el) => { return document.getElementById(el) };
  

  // ----------------------------------------------------------
  // HELPER FUNCTION: TO GET MULTIPLE input:range ELEMENTS BY ID

  const getElemsById = function(ids) {
    if(ids === undefined || (typeof ids !== 'object') || (ids.length === 0)) {
      alert('Expecting an array based parameter, or no ids given, exiting');
  		return null;
  	}  
  	for(var i = 0; i < ids.length; i++) {
      elems[i] = document.getElementById(ids[i]);
  	}  
  	return ids;
  };  
  

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
    
    if (text) {
      let newSlider = `
      <label>${text}<input type="range" id="range${sliders+1}" max="100" value="0"></label>
      <output for="range${sliders+1}" class="range${sliders+1}">0</output>`
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // Add new slider to choices object with default value
      if (fornot === "for") choicesY[`range${sliders+1}`] = 0;
      if (fornot === "not") choicesN[`range${sliders+1}`] = 0;
      
      // Show default percentage when first added on Y or N
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0;
        if (fornot === "not") choiceN.innerHTML = 0;
      }
      
      sliders += 1;
    }
  } // END addReason()
  
  
  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS

  function populate(ev) {
    Event.innerHTML = ev.target.value;      
    
    // gets number of for and not Reasons sliders
    const forReasons = document.querySelectorAll("#forReasons output");
    const notReasons = document.querySelectorAll("#notReasons output");
    
    // check if slider is "yes" or "not"
    let forOrNot = ev.target.parentElement.parentElement.id;
    
    // Add slider ID and value to "yes" or "not" sliders
    if (forReasons.length > 0 && forOrNot === "forReasons") {
      choicesY[ev.id] = parseInt(ev.target.value);
    }
    if (notReasons.length > 0 && forOrNot === "notReasons") {
      choicesN[ev.id] = parseInt(ev.target.value);
    }
    
    function sumChoices(choices) {
      return Object.values(choices).reduce((a, b) => a + b, 0);
    }
    
    choicesYsum = sumChoices(choicesY);
    choicesNsum = sumChoices(choicesN);
    
    // CALCULATES AVERAGE PERCENTAGE FROM BOTH Y/N SLIDER VALUES:
    let choiceYtotal = sumChoices(choicesY)  / forReasons.length;
    let choiceNtotal = sumChoices(choicesN)  / notReasons.length;
    // let choiceYtotal = choicesYsum / Object.keys(choicesY).length / 2 * 40;
    // let choiceNtotal = choicesNsum / Object.keys(choicesN).length / 2 * 40;
    
    //  numbers < 100 .toPrecision(2) = decimals to 9.99 then integers to 99.99…
    if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toPrecision(2);
    if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toPrecision(2);
    
    isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;


    // CALCULATES AVERAGE PERCENTAGE FROM BOTH Y/N SLIDER VALUES:
    let sliderval = [];
    function sumSliders(proORcon) {
      for(var i = proORcon; i > 0; i-=1) {
        sliderval += getEl(`range${i}`).value;
        return sliderval * proORcon;
      }
      sliderval = 0;
    }

    // GETS DIFFERENCE BETWEEN PROS AND CONS
    let diff = choiceYtotal - choiceNtotal;

    
    // DISPLAYS OVERALL CHOICE
    if (isNaN(diff)) {
      getEl("decision").innerHTML  = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
      getEl("decision").className = "dunno";
    } else if (getEl("choiceY").innerHTML > getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = `I <em>want</em> to by: ${sumSliders(forReasons.length)}%!`;
      // getEl("decision").innerHTML = `I <em>want</em> to by: ${diff}%!`;
      getEl("decision").className = "yes";
    } else if(getEl("choiceY").innerHTML < getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = `I <em>don't</em> want to: by ${sumSliders(notReasons.length)}%!`;
      // getEl("decision").innerHTML = `I <em>don't</em> want to: by ${-diff}%!`;
      getEl("decision").className = "not";
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").className = "dunno";
    }


  }
  
  
  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS

  choices.addEventListener("input", function(e) {
    if (e.target.id !== "for" || e.target.id !== "not"){
      populate(e);
    }
  }, false);


  // OLDER CODE ----------------------------------------:
 
  // REPLACE elems WITH LIST OF input:range ELEMENTS
  
  // let elems = ["choices","choice1","choice2","decision"];
  // getElemsById(elems);


})();
