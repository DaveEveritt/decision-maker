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
  let sliderMarkup;


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
  const getSliderMarkup = (procon, txt) => {
    sliderMarkup = `
    <label for="${procon}">${txt}
      <input type="range" id="${procon}" max="10" value="0">
      <output for="${procon}" class="${procon}">0</output>
      <button aria-label="delete reason" type="button" id="del-${procon}" data-parentId="${procon}" class="delete">
        <span aria-hidden="true" title="delete reason">x</span>
      </button>
    </label>`;
    return sliderMarkup;
  };
  

  // ----------------------------------------------------------
  // ADDS REASONS TO DOM WHEN INPUT
  function addReason(e) {
    let text = e.target.value || "";
    let fornot = e.target.id;
    const proORcon = fornot == "for" ? `pro${proSliders+1}` : `con${conSliders+1}`;
    // CREATES NEW SLIDER AND ADDS TO DOM
    if (text) {
      sliderMarkup = getSliderMarkup(proORcon, text);
      
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", sliderMarkup);
      
      // COUNTS SLIDERS WHEN ADDED, SHOWS DEFAULT ZERO VALUE
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0, proSliders += 1;
        if (fornot === "not") choiceN.innerHTML = 0, conSliders += 1;
      }

      const deleteButton = getEl(`del-${proORcon}`);
      // console.log(deleteButton);
      
      deleteButton.addEventListener("click", (ev) => {
        const currentReason = getEl(proORcon).parentElement;
        if (confirm("Delete reason?")) {
          currentReason.remove();
        }
        // currentReason.remove();
        allChoices = getCurrentProsCons();
        if (choicesYsum === 0 || choicesNsum === 0) {
          if (fornot === "for") choiceY.innerHTML = 0, proSliders -= 1;
          if (fornot === "not") choiceN.innerHTML = 0, conSliders -= 1;
        }
        populate(allChoices);
      });
      
      allChoices = getCurrentProsCons();
      // console.log(allChoices);
      populate(allChoices);

    }
  } // END addReason()
  
    

  // ----------------------------------------------------------
  // MULTIPLY SLIDER VALUE BY 10
  const sliderValue = (choiceValue) => {
    return choiceValue * 10;
  };
  
  // ----------------------------------------------------------
  // ADD TEXT SHOWING SLIDER VALUE TO DOM
  const showSliderValue = (slider, value) => {
    document.querySelector(`.${slider}`).innerHTML = value;
  };



  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choices) {
    let avPros = 0, avCons = 0;
    let sumPros = 0, sumCons = 0;

    // SUMS PRO AND CON VALUES; DISPLAYS THEM IN OUTPUT TAG
    // EDIT - DON’T USE innerHTML for calculations?
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
    avPros = parseFloat((sumPros/proSliders * 10).toFixed(2));
    avCons = parseFloat((sumCons/conSliders * 10).toFixed(2));

    // DISPLAYS AVERAGE PRO AND CON VALUES BELOW SLIDERS
    isNaN(avPros) ? pros.innerHTML = 0 : pros.innerHTML = avPros;
    isNaN(avCons) ? cons.innerHTML = 0 : cons.innerHTML = avCons;

    // DISPLAYS OVERALL RESULT OF CHOICES
    switch(true) {
      case (isNaN(avPros) || isNaN(avCons)):
        getEl("decision").innerHTML = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
        getEl("decision").className = "dunno";
        break;
      case (avPros > avCons):
        getEl("decision").innerHTML = "Seems you want to!";
        getEl("decision").className = "yes";
        break;
      case (avPros < avCons):
        getEl("decision").innerHTML = "Seems you don't want to!";
        getEl("decision").className = "not";
        break;
      case (avPros === avCons):
        getEl("decision").innerHTML = "Make up your mind!";
        getEl("decision").className = "dunno";
        break;
      default:
        getEl("decision").innerHTML = "Something went wrong!";
        getEl("decision").className = "dunno";
    }
  } // END populate()


  function getCurrentProsCons() {
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
    return allChoices;
  } // END getCurrentProsCons()


  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS AND STORES THEM
  choices.addEventListener("input", function() {
    const allChoices = getCurrentProsCons();
    populate(allChoices);
  }, false);

})();
