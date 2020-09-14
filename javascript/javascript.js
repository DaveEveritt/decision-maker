"use strict";

(function () {

  // Helper functions and setup:
  const getEl = (el) => { return document.getElementById(el) };
  // count number of sliders to assign unique IDs
  let sliders = 0;
  const choicesY = {};
  const choicesN = {};
  let choicesYsum = 0;
  let choicesNsum = 0;

  // Listen for users to input text and hit "return"
  const reasons = document.querySelectorAll("#reasons input");
  reasons.forEach(el => {
    el.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        addReason();
        event.target.value = "";
      }
    });
  });

// Add reasons as they're input
  function addReason() {
    let text = event.target.value || "";
    let fornot = event.target.id;
    console.log(`Adding ${fornot} slider`);
    
    
    if (text) {
      // Create new slider HTML and add to DOM
      let newSlider = `
      <label>${text}:<br><input type="range" id="range${sliders+1}" max="10" value="5"></label>
      <output for="range${sliders+1}" class="range${sliders+1}">5</output><br><hr>`
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // Add new slider to choices object with default value
      if (fornot === "for") choicesY[`range${sliders+1}`] = 5;
      if (fornot === "not") choicesN[`range${sliders+1}`] = 5;
            
      // show default percentage when first added on Y or N
      // check Y N sliders instead
      if (sliders <= 2) {
        console.log(choiceN, choiceY);
        if (fornot === "for") choiceY.innerHTML = 50;
        if (fornot === "not") choiceN.innerHTML = 50;
      }
    
      sliders += 1;
    }
    // console.log(choicesY,choicesN);
  }
  
  // Display the input range value for the number of sliders...
  function populate() {

    document.querySelector(`.${event.target.id}`).innerHTML = event.target.value;      
    let sliderID = event.target.id;
    
    // OKAY: get number of forReasons and notReasons sliders
    const forReasons = document.querySelectorAll("#forReasons output");
    const notReasons = document.querySelectorAll("#notReasons output");
    
    // check if slider is "yes" or "not"
    let forOrNot = event.target.parentElement.parentElement.id;
    
    // Add slider ID and value to "yes" or "not" sliders
    if (forReasons.length > 0 && forOrNot === "forReasons") {
      choicesY[sliderID] = parseInt(event.target.value);
      console.log(`Adjusting value of 'yes' slider ${sliderID}`);
    }
    if (notReasons.length > 0 && forOrNot === "notReasons") {
      choicesN[sliderID] = parseInt(event.target.value);
      console.log(`Adjusting value of 'not' slider ${sliderID}`);
    }
    console.log("YES:", choicesY, "NOT:", choicesN);
    
    function sumChoices(choices) {
      return Object.values(choices).reduce((a, b) => a + b, 0);
    }
    
    choicesYsum = sumChoices(choicesY);
    choicesNsum = sumChoices(choicesN);
    console.log(`Add choicesY: ${choicesYsum}`);
    console.log(`Add choicesN: ${choicesNsum}`);

    // console.log(`choicesYsum: ${choicesYsum}, choicesNsum: ${choicesNsum}`);
    
    // average percentage = divide total Y/N slider values by num of sliders
    let choiceYtotal = choicesYsum / Object.keys(choicesY).length * 10;
    let choiceNtotal = choicesNsum / Object.keys(choicesN).length * 10;
    
    if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toFixed(2);
    if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toFixed(2);
    
    isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;
    
    console.log(`choiceYtotal: ${choiceYtotal}, choiceNtotal: ${choiceNtotal}`);

    // Display the overall choice
    if (getEl("choiceY").innerHTML > getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Looks like you want to!";
      getEl("decision").className = "yes";
    } else if(getEl("choiceY").innerHTML < getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Looks like you don't want to!";
      getEl("decision").className = "not";
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").className = "dunno";
    }
  }

  // Listen for changes in sliders
  choices.addEventListener("input", function() {
    if (event.target.id !== "for" || event.target.id !== "not"){
      populate(event.target.id);
    }
  }, false);

})();
