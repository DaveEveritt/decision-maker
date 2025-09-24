"use strict";

(function () {

  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  const getEl = (el) => { return document.getElementById(el) };

  
  // ----------------------------------------------------------
  // INITIALIZES VARIABLES
  // let sliders = 0;
  let pros = getEl("choiceY");
  let cons = getEl("choiceN");
  let choicesYsum = 0;
  let choicesNsum = 0;
  let proSliders = 0;
  let conSliders = 0;


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
    const proORcon = fornot == "pro" ? `pro${proSliders+1}` : `con${conSliders+1}`;
    
    if (text) {
      // CREATES NEW SLIDER HTML AND ADDS TO DOM
      let newSlider = `
      <label for="${proORcon}">${text}<input type="range" id="${proORcon}" max="10" value="0">
      <output for="${proORcon}" class="${proORcon}">0</output></label>`
      
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // SETS AND SHOWS DEFAULT SLIDER PERCENTAGE WHEN FIRST ADDED
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "pro") choiceY.innerHTML = 0,proSliders += 1;
        if (fornot === "not") choiceN.innerHTML = 0,conSliders += 1;
      }
    }
  } // END addReason()
  

  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choices) {

    let sliderID;
    let allPros = choices.filter(ch => ch.id.startsWith("pro"));
    let allCons = choices.filter(ch => ch.id.startsWith("con"));
    let avPros = 0, avCons = 0;
    let sumPros = 0, sumCons = 0;

    // SUMS PRO AND CON VALUES; DISPLAYS THEM IN OUTPUT TAG
    // FLAWED - DON’T USE innerHTML to add!
    const allProCons = (proORcon => {
      proORcon.forEach(choice => {
        sliderID = choice.id;
        if (choice.val && choice.id.startsWith("pro")){
          sumPros += parseInt(document.querySelector(`.${sliderID}`).innerHTML = choice.val);
          document.querySelector(`.${sliderID}`).innerHTML = choice.val;
        } else if (choice.id.startsWith("con")){
          sumCons += parseInt(document.querySelector(`.${sliderID}`).innerHTML = choice.val);
          document.querySelector(`.${sliderID}`).innerHTML = choice.val;
        }
      });
    });
    allProCons(allPros);
    allProCons(allCons);
            

    // CALCULATES AVERAGE PERCENTAGE OF PRO AND CON VALUES
    avPros = (sumPros/proSliders * 10).toFixed(2);
    avCons = (sumCons/conSliders * 10).toFixed(2);
    console.log(`avPros: ${avPros}, avCons: ${avCons}`);

    
    // POPULATES INTERFACE WITH AVERAGE PRO AND CON VALUES
    isNaN(avPros) ? pros.innerHTML = 0 : pros.innerHTML = avPros;
    isNaN(avCons) ? cons.innerHTML = 0 : cons.innerHTML = avCons;


    // DISPLAYS OVERALL RESULT OF CHOICES
    if (isNaN(avPros) || isNaN(avCons)) {
      getEl("decision").innerHTML  = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
      getEl("decision").className = "dunno";
    } else if (avPros > avCons) {
      getEl("decision").innerHTML = "Seems you want to!";
      getEl("decision").className = "yes";
    } else if (avCons > avPros) {
      getEl("decision").innerHTML = "Seems you don't want to!";
      getEl("decision").className = "not";
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").className = "dunno";
    }
  } // END populate()


  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS AND STORES THEM
  choices.addEventListener("input", function() {
    const [...pro] = document.querySelectorAll('[id^="pro"]');
    const [...con] = document.querySelectorAll('[id^="con"]');
    const procon = con.concat(pro);
    const proconMap = procon.map(p => p.value);
    const allChoices = [];
    
    procon.forEach((pc,i) => {
      const tmp = {};
      tmp['id'] = pc.id;
      tmp['val'] = proconMap[i];
      allChoices.push(tmp);
    });

    populate(allChoices);
  }, false);

})();
