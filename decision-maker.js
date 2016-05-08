Reasons = new Mongo.Collection("reasons");

if (Meteor.isClient) {

  // Gives template access to the input tag values
  Template.registerHelper('session', function(input) {
      return Session.get(input);
  });

// from to-do
  Template.decisions.helpers({
    reasons: function() {
      return Reasons.find({}, {sort: {createdAt: -1}});
    },
    reasonsCount: function() {
      return Reasons.find().count();
    }
  });


// Taken from to-do
  Template.decisions.events({
    "submit #choices": function (event) {
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a reason into the collection
      Meteor.call("addReason", text);

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.reason.events({
    "click .delete": function () {
      Meteor.call("deleteReason", this._id);
    }
  });

  // Runs everything once the template is rendered
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

    // Number of reasons (make dynamic when users can add reasons)
    var sliders = 4;

    // Displays the input range value for the number of sliders...
    function populate() {

      // Updates the output tags with slider values
      for(var i = sliders; i > 0; i-=1) {
        window["output" + i].value = window["range" + i].value;
        // put in an array
      }

      // Calculates the values for the 'decision' message
      // read from above array instead
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

} //end Meteor isClient

Meteor.methods({
  addReason: function (text) {
    Reasons.insert({
      text: text
    });
  },
  deleteReason: function (reasonId) {
    var reason = Reasons.findOne(reasonId);
    Reasons.remove(reasonId);
  }
});
