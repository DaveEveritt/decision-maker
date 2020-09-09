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
      console.log(`$sliders count in addReason: ${sliders}`);
    }
  }
  
  // Display the input range value for the number of sliders...
  function populate(evTarget) {
    console.log(`$sliders count in populate: ${sliders}`);
    console.log(evTarget);
    
    console.log(document.querySelector(`#${event.target.id}`));
    console.log("in populate");
    document.querySelector(`.${event.target.id}`).innerHTML = event.target.value;      
    
    // Get number of forReasons and notReasons sliders IS OKAY
    const forReasons = document.querySelectorAll("#forReasons output");
    const notReasons = document.querySelectorAll("#notReasons output");
    // console.log(`forReasons.length: ${forReasons.length}`);
    // console.log(`notReasons.length: ${notReasons.length}`);
    
    // Total number of sliders updates okay
    console.log(`TOTAL sliders ($sliders): ${sliders}`);
    
    // Once forReasons/notReasons sliders are created, append their values
    let choiceYsum = 0;
    let choiceNsum = 0;
    // THIS IS WRONG AFTER MORE THAN 2 SLIDERS:
    if (forReasons.length > 0) {
      console.log(`forReasons.length: ${forReasons.length}`)
      choiceYsum += parseInt(forReasons[forReasons.length-1].value);
    }
    if (notReasons.length > 0) {
      console.log(`notReasons.length: ${notReasons.length}`)
      choiceNsum += parseInt(notReasons[notReasons.length-1].value);
    }
    console.log("choiceYsum: " + choiceYsum);
    console.log("choiceNsum: " + choiceNsum);
    
    // average percentage = divide Y/N slider values total by num of sliders
    // THIS IS WRONG AFTER ADDING 'NOT' SLIDERS:
    let choiceYtotal = (choiceYsum * 10) / sliders;
    let choiceNtotal = (choiceNsum * 10) / sliders;
    choiceY.innerHTML = choiceYtotal;
    choiceN.innerHTML = choiceNtotal;

    // Display the overall choice
    // use choiceYtotal and choiceNtotal instead
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

  // Listen for changes in sliders
  choices.addEventListener("input", function() {
    if (event.target.id !== "for" || event.target.id !== "not"){
      populate(event.target.id);
    }
  }, false);

})();
