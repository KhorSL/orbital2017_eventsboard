import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../html/components/registerPage.html';
import '../css/loginReg.css';

Template.registerPage.onCreated(function() {
  let template = Template.instance();
  template.disableBtn = new ReactiveVar(false);
});

Template.registerPage.onRendered(function() {
  var tmp = Template.instance();

  var validator = $('.register-form').validate({
    submitHandler: function(event) {   //Activates when form is submitted

      var un = $('[name=userName]').val();
      var em = $('[name=emailAddr]').val();
      var pw1 = $('[name=password1]').val();
      var pw2 = $('[name=password2]').val();
      var gender = $('[name=gender]').val();
      var age = $('[name=age]').val();

      if($.trim(un) == '') {
        validator.showErrors({
          userName: "Please enter an username."
        });
      }
      var pwStr = pw1.replace(/\s/g, "");
      if(pw1.length > pwStr.length) {
        validator.showErrors({
          password1: "Please remove all spacing in your password.",
          password2: "Please remove all spacing in your password."
        });
      }

      var newUserData = {
        username: $.trim(un),
        email: $.trim(em),
        password: $.trim(pw1),
      };

      var additionalData = {
        gender: $.trim(gender),
        age: $.trim(age)
      };

      Meteor.call('insertUser', newUserData, function(error, result) {
        if(error) {
          //Three possible Error (Email already exists) (Need to set a username or email) (password may not be empty)
          if(error.reason == "Username already exists."){
            validator.showErrors({
              userName: "That Username have already been taken."
            });
          }
          if(error.reason == "Email already exists."){
            validator.showErrors({
              emailAddr: "That email already belongs to a registered user."
            });
          }
        } else {
          var token = "";
          tmp.disableBtn.set(true);
          Meteor.call("sendVerificationToken", newUserData.email, function(error, result) {
              token = result;
          });
          Meteor.loginWithPassword(newUserData.email, newUserData.password, function(error) {
            if(error) {
              console.log(error.reason);
            } else {
              //Result is the _id of the account
              Meteor.call('insertUserData',result,newUserData.username, newUserData.email, additionalData.gender,additionalData.age, token, function(error) {
                if(error) {
                  console.log(error.reason);
                } else {
                  $('#registerModal').modal('hide');
                  Router.go('verify_AccPage');
                }
              });
            }
          });
        }
      }); //end of Method.call(insertUser)
    } //end of submitHandler
  }); //end of validate
}); //end of onRendered

Template.registerPage.helpers({
  disableBtn: function() {
    if(Template.instance().disableBtn.get()) {
      return "disabled";
    } else {
      return "";
    }
  }
});

Template.registerPage.events({
  'submit .register-form' :function(e) {
    e.preventDefault();
    /*
    var email = $('[name=emailAdd]').val();
    var un = $('[name=userName]').val();
    var pw1 = $('[name=password1]').val();
    var pw2 = $('[name=password2]').val();

    if(pw1 == pw2) {
      var newUserData = {
        username: un,
        email: email,
        password: pw1
      };

      Meteor.call('checkUser', newUserData, function(error,result) {
          if(result <= 0) {
            Meteor.call('insertUser', newUserData);
            Meteor.loginWithPassword(newUserData.email, newUserData.password);
             $('#registerModal').modal('hide');
             Router.go('/home');

          } else if (result == 1) {
            alert("Username have been taken, please enter another Username.");
          } else if (result == 2) {
            alert("There is already a user registered with this email.");
          }
      });

    } else {
      alert("Password do not match!");
    }
    */
  }
});
