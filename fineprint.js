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
  
  Template.item.events({
    //Delete thing on click event
    "click .delete": function(event){
      event.preventDefault();
    Fineprint.remove(this._id);
      
    }
 
    
  });
  
  
  Template.new.events({
    "submit":function(event) {
      //Tell the browser not to do it's default behavior. 
      //
      event.preventDefault();
      //Get form element which is the target of the submit event
      var form = event.target;
      //Inserts contents into database collection
      Fineprint.insert({
        words:form.words.value,
        origin:form.origin.value
      })
      //Clear text values
      form.words.value ="";
      form.origin.value ="";
      
      //Focus the name field.
      form.words.focus();
      
    }
    
  });
  
  
}