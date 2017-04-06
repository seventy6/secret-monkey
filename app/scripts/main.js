console.log('\'Allo \'Allo!');

var currentSecret = '';
var phoneNumbers = ['+447544997033', '+447966053320', '+447472666653'];

function chaos() {
	
	var numberTo = phoneNumbers[Math.floor(Math.random()*phoneNumbers.length)];

	$.ajax({
	  type: "POST",
	  // username: "ACdff84b1f2d4f18a44287bb6f65a1ed82",
	  // password: "0b38ee8ca34d89c755b218243c34c931",
	  url: "https://api.twilio.com/2010-04-01/Accounts/ACdff84b1f2d4f18a44287bb6f65a1ed82/Messages.json",
	  data: {
	    "To" : numberTo,
	    "From" : "+441745472065",
	    "Body" : currentSecret
	  },
	  beforeSend: function (xhr) {
	       xhr.setRequestHeader ("Authorization", "Basic " + btoa('ACdff84b1f2d4f18a44287bb6f65a1ed82' + ':' + '0b38ee8ca34d89c755b218243c34c931'));
	  },
	  success: function(data) {
	    console.log(data);
	    responsiveVoice.speak( 'Monkey, bad monkey' );
		addNewMessage( '... woops bad monkey!', 'them');

	  },
	  error: function(data) {
	    console.log(data);
	  }
	});
}


function randomChoice() {
	return Math.random() >= 0.5;
}

function addNewMessage(message, _class) {
	$("#speach").append('<p class="' + _class + '">' + message + '</p>' );	
}

function playScript(step) {
	
	console.log('playScript', step);

	switch (step) {
		case 0:
			var message =  'Hey!,   Of course I will keep that a secret Nick...'
			addNewMessage( message, 'them');
			responsiveVoice.speak( message );
			if(randomChoice()) {
				setTimeout(function(){ 
					chaos();
				 }, 10000);				
			} else {
				addNewMessage( '... Tell me something else buddy!', 'them');
			}
		break;
		//
	}

}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'monkey *text': function(data) {
      console.log('this is a secret');
    }
  };
  
  annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
  	currentSecret = userSaid;
  	addNewMessage(currentSecret, 'me');
  	playScript(0);
    console.log(userSaid); // sample output: 'hello'
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
  });
  annyang.debug(true);
  // Add our commands to annyang
  annyang.addCommands(commands);
  annyang.start();
  // Start listening. You can call this here, or attach this call to an event, button, etc.
  
}

addNewMessage( 'Hey tell me something I don\'t know', 'them');