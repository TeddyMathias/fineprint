// This code exec on the client and on the serber

var Fineprint = new Mongo.Collection("fineprint");

// This code executes only on the client

if (Meteor.isClient) {
  
  // var since = moment("03/10/2016 15:19:00", "DD/MM/YYYY HH:mm:ss");
  
  // Session.setDefault("now", moment());
  
  // Meteor.setInterval(function() {
  //   Session.set("now", moment());
  // }, 1000);
  
  Template.body.helpers({
    
    //Things hellper retunrs a list of things.
    fineprint: function() {
      // Find all things in db and return them
      return Fineprint.find().fetch().reverse();
    }
  });
  
  Template.item.helpers({
    
    // font_size: function() {
      
      // : Return Session.get("now").diff(moment(this.created_at)), converted into a font size
    //   return 48;
      
    // }
    
  });

  Template.signup.events({
    'submit form': function(event) {
      event.preventDefault();
      var usernameVar = event.target.signupUsername.value;
      var passwordVar = event.target.signupPassword.value;
      var myArray = ['#e9cfec', '#fcdfff', '#e3e4fa', '#fdeef4', '#c6deff', '#addfff', '#bdedff', '#eoffff', '#c2dfff', '#c8b5t0', '#ecd672', '#ecd872', '#ffe87c', '#ece5b6', '#fff8c6', '#faf8cc','#f9b7ff', '#e6a9ec', '#c38ec7', '#d2b9d3', '#c6aec7', '#ebdde2', '#c8bbbe','#3ea99f', '#82cafa', '#a0cfec', '#87afc7', '#82caff', '#57e964', '#5efb6e', '#63e986','#6afb92' ];  
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

    },
    
    "click .words": function(event) {
      event.preventDefault();
      (".words").removeClass( ".words" );

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
          username: Meteor.user().username,
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