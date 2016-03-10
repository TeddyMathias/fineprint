// This code exec on the client and on the serber

var Fineprint = new Mongo.Collection("fineprint");

// This code executes only on the client

if (Meteor.isClient) {
  Template.body.helpers({
    
    //Things hellper retunrs a list of things.
    fineprint: function() {
      // Find all things in db and return them
      return Fineprint.find().fetch().reverse();
    }
  });

  Template.signup.events({
    'submit form': function(event) {
      event.preventDefault();
      var usernameVar = event.target.signupUsername.value;
      var passwordVar = event.target.signupPassword.value;
      var myArray = ['#FCDFFF', '#e3e4FA', '#fdeef4','#c6deff','#e9cfec', '#ECD672','#C8D560','#FFE87C','#ECE5B6','#FFF8C6','#FAF8CC','#57E964', '#5EFb6E', '#64E986', '#6AFB92'];  
      var rand = myArray[Math.floor(Math.random() * myArray.length)];
      Accounts.createUser({
        username: usernameVar,
        password: passwordVar,
         profile: {
            usercolor: rand
        }
      });
    }
  });
  
  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();
      var usernameVar = event.target.loginUsername.value;
      var passwordVar = event.target.loginPassword.value;
      Meteor.loginWithPassword(usernameVar, passwordVar);
    }
  });

  Template.settings.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
    }
  });


  Template.item.events({
    //Delete thing on click event
    "click .delete": function(event) {
      event.preventDefault();
      Fineprint.remove(this._id);

    }
  });


  Template.new.events({
    "submit": function(event) {
      //Tell the browser not to do it's default behavior. 
      //
      event.preventDefault();
      //Get form element which is the target of the submit event
      var form = event.target;
      //Inserts contents into database collection
      Fineprint.insert({
          words: form.words.value,
          origin: form.origin.value,
          createdAt: new Date(), // current time
          owner: Meteor.userId(), // _id of logged in user
          usercolor: Meteor.user().profile.usercolor // username of logged in user
        })
        //Clear text values
      form.words.value = "";
      form.origin.value = "";

      //Focus the name field.
      form.words.focus();

    }

  });

  // Accounts.ui.config({
  //   passwordSignupFields: "USERNAME_ONLY"
  // });


}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}