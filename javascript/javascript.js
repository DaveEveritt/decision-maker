"use strict";

(function () {

  // ----------------------------------------------------------
  // HELPER FUNCTION: GETS SINGLE ELEMENT BY ID
  const getEl = (el) => { return document.getElementById(el) };
  
  // ----------------------------------------------------------
  // INITIALIZES VARIABLES
  let sliders = 0;
  const choicesY = {};
  const choicesN = {};
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
      
      // Add new slider to choices object with default value
      // if (fornot === "for") choicesY[`pro${sliders+1}`] = 0;
      // if (fornot === "not") choicesN[`con${sliders+1}`] = 0;
            
      // console.log(choicesYsum, choicesNsum)

      // Show default percentage when first added on Y or N
      if (choicesYsum === 0 || choicesNsum === 0) {
        if (fornot === "for") choiceY.innerHTML = 0;
        if (fornot === "not") choiceN.innerHTML = 0;
      }
    
      sliders += 1;
    }
  } // END addReason()
  
  // ORIGINALLY SUMMED CHOICES from choicesY and N
  // ----------------------------------------------------------
  // ADDS UP THE VALUES OF PRO AND CON CHOICES
  function sumChoices(choices) {
    return Object.values(choices).reduce((a, b) => a + b, 0);
  }
      // let allPros;
      // console.log(ch.val);
      // allPros += ch.val;
      // return allPros;

    // let proSum = [], conSum = [];

    // const sumPros = (chs) => {
    //   let allPros;
    //   chs.forEach(ch => {
    //     allPros += chs.val;
    //   });
    //   return allPros;
    // };
    // console.log(allProVals);


    // console.log(choices.filter(choice => choice.id.startsWith("pro")).val, choices.filter(choice => choice.id.startsWith("con")).val); // NaN??


  // ----------------------------------------------------------
  // DISPLAYS INPUT RANGE VALUE FOR THE NUMBER OF SLIDERS
  function populate(choices) {

    let sliderID;
    let numPros = choices.filter(ch => ch.id.startsWith("pro")).length;
    let numCons = choices.filter(ch => ch.id.startsWith("con")).length;
    let sumAll = [], sumPros, sumCons;

    // console.log(numPros, numCons);

    choices.forEach(ch => {
      sliderID = ch.id;
      document.querySelector(`.${sliderID}`).innerHTML = ch.val;
      sumAll.push(parseInt(document.querySelector(`.${sliderID}`).innerHTML = ch.val));
    });
    console.log(sumAll);
    // DAVE GOT HERE

    // TO DO ================================================

    // sum values of PRO and CON to calculate average of each

    // make into percentage and populate choiceY and choiceN

    // compare averages PROs and CONs to see which is greater

    // populate overall choice message


    choicesYsum = sumChoices(choicesY);
    choicesNsum = sumChoices(choicesN);
    
    // calculates average percentage from both y/n slider values:
    let choiceYtotal = choicesYsum / Object.keys(choicesY).length * 10;
    let choiceNtotal = choicesNsum / Object.keys(choicesN).length * 10;
    
    //  numbers < 100 .toPrecision(2) = decimals to 9.99 then integers to 99.99…
    if (parseFloat(choiceYtotal - Math.floor(choiceYtotal)) > 0) choiceYtotal = choiceYtotal.toFixed(2);
    if (parseFloat(choiceNtotal - Math.floor(choiceNtotal)) > 0) choiceNtotal = choiceNtotal.toFixed(2);
    
    isNaN(choiceYtotal) ? choiceY.innerHTML = 0 : choiceY.innerHTML = choiceYtotal;
    isNaN(choiceNtotal) ? choiceN.innerHTML = 0 : choiceN.innerHTML = choiceNtotal;
    

    // displays overall choice
    if (isNaN(choiceYtotal) || isNaN(choiceNtotal)) {
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
