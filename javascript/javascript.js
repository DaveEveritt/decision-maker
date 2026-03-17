"use strict";

(function () {

  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  const getEl = (el) => { return document.getElementById(el) };

  
  // ----------------------------------------------------------
  // INITIALIZES VARIABLES
  let pros = getEl("choiceY");
  let cons = getEl("choiceN");
  let choicesYsum = 0;
  let choicesNsum = 0;
  let proSliders = 0;
  let conSliders = 0;
  let allChoices;
  let sliderID;
  let newSlider;


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
  // ADDS REASON HTML TO DOM
  const addSlider = (procon, txt) => {
    newSlider = `
    <label for="${procon}">${txt}
      <input type="range" id="${procon}" max="10" value="0">
      <output for="${procon}" class="${procon}">0</output>
      <!-- <button aria-label="delete reason" type="button" data-parent-id="${procon}" class="delete">
        <span aria-hidden="true" title="delete reason">x</span>
      </button> -->
    </label>`;
    return newSlider;
  };


  // ----------------------------------------------------------
  // ADDS REASONS TO DOM WHEN INPUT
  function addReason(e) {
    let text = e.target.value || "";
    let fornot = e.target.id;
    console.log(fornot);
    const proORcon = fornot == "for" ? `pro${proSliders+1}` : `con${conSliders+1}`;
    
    // CREATES NEW SLIDER AND ADDS TO DOM
    if (text) {
      newSlider = addSlider(proORcon, text);

      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // COUNTS SLIDERS WHEN ADDED, SHOWS DEFAULT ZERO VALUE
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0, proSliders += 1;
        if (fornot === "not") choiceN.innerHTML = 0, conSliders += 1;
      }
    }
    
    // DELETES REASON AFTER USER CONFIRMATION
    // let deleteWhat = document.querySelector(`[data-parent-id=${proORcon}]`);
    // deleteWhat.addEventListener("click", function() {
    //   if (confirm("Delete reason?")) {
    //     deleteWhat.parentElement.remove();
    //   }
    //   console.log(choices);
    //   populate(allChoices);
    // });
    
  } // END addReason()



  // ----------------------------------------------------------
  // CALCULATE

  const sliderValue = (choiceValue) => {
    return choiceValue * 10;
  };

  const showSliderValue = (slider, value) => {
    document.querySelector(`.${slider}`).innerHTML = value;
  };



  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choices) {

    console.log(`Populate with`, choices);

    let avPros = 0, avCons = 0;
    let sumPros = 0, sumCons = 0;

    // SUMS PRO AND CON VALUES; DISPLAYS THEM IN OUTPUT TAG
    // EDIT - DON’T USE innerHTML for calculations!
    const allProCons = (proORcon => {
      proORcon.forEach(choice => {
        sliderID = choice.id;
        if (choice.val && choice.id.startsWith("pro")){
          sumPros += parseInt(document.querySelector(`.${sliderID}`).innerHTML = choice.val);
          showSliderValue(sliderID, sliderValue(choice.val));
        } else if (choice.id.startsWith("con")){
          sumCons += parseInt(document.querySelector(`.${sliderID}`).innerHTML = choice.val);
          showSliderValue(sliderID, sliderValue(choice.val));
        }
      });
    });

    allProCons(choices);
            
    // CALCULATES AVERAGE PERCENTAGE OF PRO AND CON VALUES
    avPros = (sumPros/proSliders * 10).toFixed(2);
    avCons = (sumCons/conSliders * 10).toFixed(2);
    console.log(avPros,avCons);

    // POPULATES INTERFACE WITH AVERAGE PRO AND CON VALUES
    isNaN(avPros) ? pros.innerHTML = 0 : pros.innerHTML = avPros;
    isNaN(avCons) ? cons.innerHTML = 0 : cons.innerHTML = avCons;

    // DISPLAYS OVERALL RESULT OF CHOICES
    switch(true) {
      case (isNaN(avPros) || isNaN(avCons)):
        console.log(`missing either pros or cons ${avPros},${avCons}`);
        getEl("decision").innerHTML  = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
        getEl("decision").className = "dunno";
        break;
      case (avPros > avCons):
        console.log(`pros bigger than cons ${avPros},${avCons}`);
        getEl("decision").innerHTML = "Seems you want to!";
        getEl("decision").className = "yes";
        break;
      case (avPros < avCons):
        console.log(`pros smaller than cons ${avPros},${avCons}`);
        getEl("decision").innerHTML = "Seems you don't want to!";
        getEl("decision").className = "not";
        break;
      case (avPros === avCons):
        console.log(`pros same as cons ${avPros},${avCons}`);
        getEl("decision").innerHTML = "Make up your mind!";
        getEl("decision").className = "dunno";
        break;
      default:
        console.log(`Default pros and cons: ${avPros},${avCons}`);
    }
  } // END populate()

  
  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS AND STORES THEM
  choices.addEventListener("input", function() {
    const [...pro] = document.querySelectorAll('[id^="pro"]');
    const [...con] = document.querySelectorAll('[id^="con"]');
    const procon = con.concat(pro);
    const proconMap = procon.map(p => p.value);
    allChoices = [];
    
    procon.forEach((pc,i) => {
      const tmp = {};
      tmp['id'] = pc.id;
      tmp['val'] = proconMap[i];
      allChoices.push(tmp);
    });
    // console.log(allChoices);
    populate(allChoices);
  }, false);

})();
