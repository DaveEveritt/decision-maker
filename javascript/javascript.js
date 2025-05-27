"use strict";

(function () {

  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  const getEl = (el) => { return document.getElementById(el) };
  
  // ----------------------------------------------------------
  // INITIALIZES VARIABLES
  let sliders = 0;
  let pros = getEl("choiceY");
  let cons = getEl("choiceN");
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
    const proORcon = fornot == "for" ? `pro${sliders+1}` : `con${sliders+1}`;
    // console.log(`Adding ${fornot} slider`);
    
    
    if (text) {
      // Creates new slider HTML and adds to DOM
      // FIX: FOR AND NOT HAVE SAME ID
      let newSlider = `
      <label for="${proORcon}">${text}<input type="range" id="${proORcon}" max="10" value="0">
      <output for="${proORcon}" class="${proORcon}">0</output></label>`
      
      const reason = getEl(`${fornot}Reasons`).firstElementChild;
      reason.insertAdjacentHTML("afterend", newSlider);
      
      // Show default percentage when first added on Y or N
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0;
        if (fornot === "not") choiceN.innerHTML = 0;
      }
    
      sliders += 1;
    }
  } // END addReason()
  

  // ADDS UP THE VALUES OF PRO AND CON CHOICES
  function sumChoices(choices) {
    return Object.values(choices).reduce((a, b) => a + b, 0);
  }

  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choices) {

    let sliderID;
    let numPros = choices.filter(ch => ch.id.startsWith("pro")).length;
    let numCons = choices.filter(ch => ch.id.startsWith("con")).length;
    let allPros = choices.filter(ch => ch.id.startsWith("pro"));
    let allCons = choices.filter(ch => ch.id.startsWith("con"));
    let avPros = 0, avCons = 0;
    let sumPros = [], sumCons = [];


    // SETS INPUT OUTPUT VALUE FOR SLIDERS
    choices.forEach(ch => {
      sliderID = ch.id;
      document.querySelector(`.${sliderID}`).innerHTML = ch.val;
    });


    // GATHERS ALL PRO AND CON VALUES IN AN ARRAY
    const allProCons = (proORcon => {
      proORcon.forEach(pORc => {
        sliderID = pORc.id;
        if (pORc.id.startsWith("pro")){
          sumPros.push(parseInt(document.querySelector(`.${sliderID}`).innerHTML = pORc.val));
        } else if (pORc.id.startsWith("con")){
          sumCons.push(parseInt(document.querySelector(`.${sliderID}`).innerHTML = pORc.val));
        }
      });
    });
    allProCons(allPros);
    allProCons(allCons);

    
    //ADDS ALL PRO OR CON VALUES
    let totalPros = sumPros.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },0);
    let totalCons = sumCons.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },0);
    

    //CALCULATES AVERAGE PRO AND CON VALUES
    avPros = ((totalPros / numPros) * 10).toFixed(2);
    avCons = ((totalCons / numCons) * 10).toFixed(2);
    
    
    //POPULATE INTERFACE WITH AVERAGE PRO AND CON VALUES
    isNaN(avPros) ? pros.innerHTML = 0 : pros.innerHTML = avPros;
    isNaN(avCons) ? cons.innerHTML = 0 : cons.innerHTML = avCons;
    
    
    
    // OKAY TO HERE ================================================

    // TO DO ========================================================

    // fix opposite choice message if one total is 100%

    
    //  numbers < 100 .toPrecision(2) = decimals to 9.99 then integers to 99.99…
    // if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toFixed(2);
    // if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toFixed(2);
    
    // isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    // isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;
    

    // displays overall choice
    if (isNaN(avPros) || isNaN(avCons)) {
      getEl("decision").innerHTML  = `Add both pros <em>and</em> cons,<br>rank their importance with sliders`;
      getEl("decision").className = "dunno";
    } else if (getEl("choiceY").innerHTML > getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Seems you want to!";
      getEl("decision").className = "yes";
    } else if(getEl("choiceY").innerHTML < getEl("choiceN").innerHTML) {
      getEl("decision").innerHTML = "Seems you don't want to!";
      getEl("decision").className = "not";
    } else {
      getEl("decision").innerHTML = "Make up your mind!";
      getEl("decision").className = "dunno";
    }
  } // END populate()


  // ----------------------------------------------------------
  // LISTENS FOR CHANGES IN SLIDERS AND STORES THEM
  choices.addEventListener("input", function(e) {
    const [...pro] = document.querySelectorAll('[id^="pro"]');
    const [...con] = document.querySelectorAll('[id^="con"]');
    const procon = con.concat(pro);
    const proconMap = procon.map(p => p.value);
    const ourDict = [];
    
    // console.log(ourDict);

    procon.forEach((pc,i) => {
      // console.log(pc.id, i, proconMap[i]);
      const tmp = {};
      tmp['id'] = pc.id;
      tmp['val'] = proconMap[i];
      ourDict.push(tmp);
      // console.log(ourDict);
    });

    populate(ourDict);
  }, false);

})();
