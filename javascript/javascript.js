"use strict";

(function () {

  // Helper fucntions
  const getEl = (el) => { return document.getElementById(el) };
  let sliders = 1;

  function keepCount(num) {
    return num + 1;
  }

  function addReason() {
    let text = event.target.value || "";
    
    let fornot = event.target.id;
    console.log(fornot);
    
    if (text) {
      let newSlider = `
      <label>${text}:<br><input type="range" id="range${keepCount(0)}" max="10" value="5"></label>
      <output for="range${keepCount(0)}" id="output${keepCount(0)}"></output><br><hr>`

      console.log(newSlider);
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      
      reason.insertAdjacentHTML("afterend", newSlider);
      sliders += 1;
    }
  }

  // listen for users to input text
  const reasons = document.querySelectorAll("#reasons input");
  reasons.forEach(el => {
    el.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        console.log("event listening");
        addReason();
      }
    });
  });
  
  // Display the input range value for the number of sliders...
  // function populate() {
  //   for(var i = sliders; i > 1; i-=1) {
  //     window["output" + i].value = window["range" + i].value;
  //   }
  //   let whichchoice = `choice${i}`;
  //   let whichrange = `range${i}`;
  //   whichchoice.innerHTML = ((+whichrange.value) + (+`range${i+1}`.value))*10 / 2;
  //   getEl("choice2").innerHTML = ((+range3.value) + (+range4.value))*10 / 2;

  //   if (getEl("choice1").innerHTML > getEl("choice2").innerHTML) {
  //     getEl("decision").innerHTML = "Looks like you want to!";
  //     getEl("decision").style.color = '#00dd00';
  //   } else if(getEl("choice1").innerHTML < getEl("choice2").innerHTML) {
  //     getEl("decision").innerHTML = "Looks like you don't want to!";
  //     getEl("decision").style.color = '#dd6666';
  //   } else {
  //     getEl("decision").innerHTML = "Make up your mind!";
  //     getEl("decision").style.color = '#333333';
  //   }
  // }

  // Display the default input range value display
  // populate();

  // Update the input range value display
  // choices.addEventListener("input", function() {
  //   populate();
  // }, false);

})();
