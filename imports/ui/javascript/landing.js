import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../html/landing.html';
import '../css/landing.css';

Meteor.subscribe('events');

Template.landing.events({
  'click #loginBut': function(e) {
    e.preventDefault();
    
    $('#loginModal').modal('show');
  },

  'click #signUpBut': function(e) {
    e.preventDefault();
    
    $('#registerModal').modal('show');
  },

  'click #memberNo': function(e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#registerModal').modal('show');
  },

  'click #memberYes': function(e) {
    e.preventDefault();
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
  }
});

Template.landing.helpers({
  events: function() {
    return Events.find();
  }
});

//Validation for Login / Register
$.validator.setDefaults({
  rules: {
      emailAdd: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 3
      },
      userName: {
        required: true,
      },
      emailAddr: {
        required: true,
        email: true
      },
      password1: {
        required: true,
        minlength: 3
      },
      password2: {
        required: true,
        minlength: 3,
        equalTo: "#password1"
      }
    },
    messages: {
      emailAdd: {
        required: "Please enter an email address.",
        email: "You've entered an invalid email address."
      },
      password: {
        required: "Please enter a password.",
        minlength: "Your password must be at least {0} characters."
      },
      userName: {
        required: "Please enter an username."
      },
      emailAddr: {
        required: "Please enter an email address.",
        email: "You've entered an invalid email address."
      },
      password1: {
        required: "Please enter a password.",
        minlength: "Your password must be at least {0} characters."
      },
      password2: {
        required: "Please enter a password.",
        minlength: "Your password must be at least {0} characters.",
        equalTo: "Password do not matched! Please enter again."
      }
    }
});

//End of Validation for Login / Register