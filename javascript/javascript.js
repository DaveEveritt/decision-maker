"use strict";

(function () {

  // Helper functions and setup:
  const getEl = (el) => { return document.getElementById(el) };
  // Hold number of sliders to assign unique IDs
  let sliders = 0;
  const choicesY = {};
  const choicesN = {};
  let choicesYsum = 0;
  let choicesNsum = 0;

  // Listen for users to input text and hit "return"
  const reasons = document.querySelectorAll("#reasons input");
  reasons.forEach(el => {
    el.addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        addReason(e);
        e.target.value = "";
      }
    });
  });

  // Add reasons as they're input
  function addReason(e) {
    let text = e.target.value || "";
    let fornot = e.target.id;
    
    if (text) {
      // Create new slider HTML and add to DOM
      let newSlider = `
      <label>${text}<input type="range" id="range${sliders+1}" max="10" value="0"></label>
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
  }
  
  // Displays input range value for the number of sliders...
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
    
    // Calculates average percentage from both Y/N slider values:
    let choiceYtotal = sumChoices(choicesY)*10 / forReasons.length;
    let choiceNtotal = sumChoices(choicesN)*10 / notReasons.length;
    // let choiceYtotal = choicesYsum / Object.keys(choicesY).length / 2 * 40;
    // let choiceNtotal = choicesNsum / Object.keys(choicesN).length / 2 * 40;
    
    //  numbers < 100 .toPrecision(2) = decimals to 9.99 then integers to 99.99…
    if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toPrecision(2);
    if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toPrecision(2);
    
    // abstract into a function to set choiceY and N, also use in final percent diff
    isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;
    
    // ALSO Calculates average percentage from both Y/N slider values:
    let sliderval = [];
    function sumSliders(proORcon) {
      for(var i = proORcon; i > 0; i-=1) {
        sliderval += getEl(`range${i}`).value;
        return sliderval * proORcon;
      }
      sliderval = 0;
    }
    console.log(sumSliders(forReasons.length));
    console.log(sumSliders(notReasons.length));
    let diff = sumSliders(forReasons.length) - sumSliders(notReasons.length);
    // initialises and sets variable for overall choice percentage
    // let diff = choiceYtotal - choiceNtotal;
    
    
    // Displays overall choice
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

  // Listens for changes in sliders
  choices.addEventListener("input", function(e) {
    if (e.target.id !== "for" || e.target.id !== "not"){
      populate(e);
    }
  }, false);

})();
