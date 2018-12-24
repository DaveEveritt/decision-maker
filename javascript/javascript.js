"use strict";

(function () {

  const getEl = (el) => { return document.getElementById(el) };

  let sliders = 4; // TODO: make dynamic when users enter reasons

  // Displays the input range value for the number of sliders...
  function populate() {
    for(var i = sliders; i > 0; i-=1) {
      window["output" + i].value = window["range" + i].value;
    }
    choice1.innerHTML = ((+range1.value) + (+range2.value))*10 / 2;
    getEl("choice2").innerHTML = ((+range3.value) + (+range4.value))*10 / 2;

    if (getEl("choice1").innerHTML > getEl("choice2").innerHTML) {
      getEl("decision").innerHTML = "Looks like you want to!";
      getEl("decision").style.color = '#00dd00';
    } else if(getEl("choice1").innerHTML < getEl("choice2").innerHTML) {
      getEl("decision").innerHTML = "Looks like you don't want to!";
      getEl("decision").style.color = '#dd6666';
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").style.color = '#333333';
    }
  }

  // Displays the default input range value display
  populate();

  // Updates the input range value display
  choices.addEventListener("input", function() {
    populate();
  }, false);

})();
