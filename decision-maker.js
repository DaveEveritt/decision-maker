if (Meteor.isClient) {

  // Gives template access to the input tag values
  Template.registerHelper('session', function(input) {
      return Session.get(input);
  });

//   Template.body.helpers({
//     tasks: [
//       { text: "This is task 1" },
//       { text: "This is task 2" },
//       { text: "This is task 3" }
//     ]
//   });
//       {{#each tasks}}
//         {{> task}}
//       {{/each}}
//
// <template name="task">
//   <li>{{text}}</li>
// </template>


  // Everything runs once the template is rendered
  Template.decisions.rendered = function() {

    // Gets multiple 'elems' by ID
    var getElemsById = function(ids) {
    	if(ids === undefined || (typeof ids !== 'object') || (ids.length === 0)) {
    		alert('Expecting an array based parameter, or no ids given, exiting');
    		return null;
    	}
    	for(var i = 0; i < ids.length; i++) {
    		elems[i] = document.getElementById(ids[i]);
    	}
    	return ids; // returns elems[n] shortcuts
    };

    // Sets and gets the required document elements
    var elems = ["choices","choice1","choice2","decision"];
    getElemsById(elems);

    // Displays the input range value for the number of sliders...
    function populate() {
      // Number of reasons (make dynamic when users can add reasons)
      var sliders = 4;

      // Updates the output tags with slider values
      for(var i = sliders; i > 0; i-=1) {
        window["output" + i].value = window["range" + i].value;
      }

      // Calcultes the values for the 'decision' message
      elems[1].innerHTML = ((+range1.value) + (+range2.value))*10 / 2;
      elems[2].innerHTML = ((+range3.value) + (+range4.value))*10 / 2;

      // Conditionally sets the 'decision' message
      if (elems[1].innerHTML > elems[2].innerHTML) {
        elems[3].innerHTML = "Looks like you want to!";
      } else if(elems[1].innerHTML < elems[2].innerHTML) {
        elems[3].innerHTML = "Looks like you don't want to!";
      } else {
        elems[3].innerHTML = "Make up your mind!";
      }
    }

    // Displays the initial  default slider values
    populate();

    // Updates the DOM as slider values change
    if ("oninput" in elems[0]) {
      choices.addEventListener("input", function() {
        populate();
      }, false);
    }

  };

}
