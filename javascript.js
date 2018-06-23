(function () {

  // Gets multiple 'elems' by ID
  const getElemsById = function(ids) {
  	if(ids === undefined || (typeof ids !== 'object') || (ids.length === 0)) {
  		alert('Expecting an array based parameter, or no ids given, exiting');
  		return null;
  	}
  	for(var i = 0; i < ids.length; i++) {
  		elems[i] = document.getElementById(ids[i]);
  	}
  	return ids;
  };

  // Sets and gets the required document elements
  const elems = ["choices","choice1","choice2","decision"];
  getElemsById(elems);

// fails because the var is set to the value:
  // var choice01 = elems[1].innerHTML;
  // var choice02 = elems[2].innerHTML;
  // var decision = elems[3].innerHTML;

  let sliders = 4; // TODO: make dynamic when users enter reasons

  // Displays the input range value for the number of sliders...
  function populate() {
    for(var i = sliders; i > 0; i-=1) {
      window["output" + i].value = window["range" + i].value;
    }
    elems[1].innerHTML = ((+range1.value) + (+range2.value))*10 / 2;
    elems[2].innerHTML = ((+range3.value) + (+range4.value))*10 / 2;

    if (elems[1].innerHTML > elems[2].innerHTML) {
      elems[3].innerHTML = "Looks like you want to!";
      elems[3].style.color = '#00dd00';
    } else if(elems[1].innerHTML < elems[2].innerHTML) {
      elems[3].innerHTML = "Looks like you don't want to!";
      elems[3].style.color = '#dd6666';
    } else {
      elems[3].innerHTML = "Make up your mind!";
      elems[3].style.color = '#333333';
    }
  }

  // Displays the default input range value display
  populate();

  // Updates the input range value display
  if ("oninput" in elems[0]) {
    choices.addEventListener("input", function() {
      populate();
    }, false);
  }

})();
