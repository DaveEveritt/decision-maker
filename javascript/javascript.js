"use strict";

(function () {

  // Helper fucntions
  const getEl = (el) => { return document.getElementById(el) };
  let sliders = 0;

  // Listen for users to input text
  const reasons = document.querySelectorAll("#reasons input");
  reasons.forEach(el => {
    el.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        addReason();
      }
    });
  });

// Add reasons as they're input
  function addReason() {
    let text = event.target.value || "";
    let fornot = event.target.id;
    
    if (text) {
      let newSlider = `
      <label>${text}:<br><input type="range" id="range${sliders+1}" max="10" value="5"></label>
      <output for="range${sliders+1}" class="range${sliders+1}">5</output><br><hr>`
      // <output for="range${sliders+1}" id="output${sliders+1}"></output><br><hr>`

      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      sliders += 1;
    }
  }
  
  // Display the input range value for the number of sliders...
  function populate() {
    
    console.log(document.querySelector(`#${event.target.id}`));
    console.log("in populate");
    document.querySelector(`.${event.target.id}`).innerHTML = event.target.value;      
    
    // get number of forReasons and notReasons sliders
    const forReasons = document.querySelectorAll("#forReasons output");
    const notReasons = document.querySelectorAll("#notReasons output");
    console.log("For reasons: " + forReasons.length);
    console.log("Not reasons: " + notReasons.length);
    
    // get total number of sliders
    let totalReasons = forReasons.length + notReasons.length;
    console.log(`in populate, TOTAL sliders = ${totalReasons}`);
    
    // IF forReasons/notReasons sliders exist, loop over slider values and store
    let choiceYsum = 5;
    let choiceNsum = 5;
    if (forReasons.length > 0) {
      choiceYsum += parseInt(forReasons[forReasons.length-1].value) 
      console.log("For reasons value: " + forReasons[0].value);
    }
    if (notReasons.length > 0) {
      choiceNsum += parseInt(notReasons[forReasons.length-1].value) 
      console.log("NOT reasons value: " + notReasons[0].value);
    }
    console.log("choiceYsum: " + choiceYsum);
    console.log("choiceNsum: " + choiceNsum);
    
    // average percentage = divide slider values total by num of sliders
    // store the result from choiceY and choiceN in a variable:
    // NEW:
    let choiceYtotal = choiceYsum / forReasons.length;
    let choiceNtotal = choiceNsum / notReasons.length;
    choiceY.innerHTML = choiceYtotal;
    choiceN.innerHTML = choiceNtotal;
    // OLD:
    // choiceY.innerHTML = ((+range1.value) + (+range2.value))*10 / 2;
    // choiceN.innerHTML = ((+range3.value) + (+range4.value))*10 / 2;

    // Display the overall choice
    if (getEl("choiceY").innerHTML > getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Looks like you want to!";
      getEl("decision").style.color = '#009900';
    } else if(getEl("choiceY").innerHTML < getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Looks like you don't want to!";
      getEl("decision").style.color = '#ee6666';
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").style.color = '#333333';
    }
  }

  // Display the default input range value display
  // populate(sliders);

  // Update the input range value display
  choices.addEventListener("input", function() {
    console.log(event.target.id);
    if (event.target.id !== "for" || event.target.id !== "not"){
      console.log("calling populate in eventListener");
      populate();
    }
  }, false);

})();
