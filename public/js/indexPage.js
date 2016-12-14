$(function(){
  $('.sign-up-container').hide();
  var errorType = window.location.hash.substr(1);
  if(errorType == "IncorrectCombination"){
    alert("Incorrect combination of username and password! Please try again.");
  }
});


$('.sign-up').click(function(){
  $('.sign-in-container').hide();
  $('.sign-up-container').show();
});

$('.login-text').click(function(){
  $('.sign-in-container').show();
  $('.sign-up-container').hide();
});

$('.loginButton').click(function(){
  $('#sign-in-form').attr('action', "http://localhost:3000/login/regular");
  $('#sign-in-form').submit();
  // $.post("http://localhost:3000/login/regular", {
  //   email : $('#inputEmail').val(),
  //   password: $('#passwordInput').val()
  // }, function(data){
  //   window.location.href = "http://localhost:3000";
  // });
});
$('.signupButton').click(function(){
  console.log("signinng up");
  $('#sign-in-form').attr('action', "http://localhost:3000/signup/regular");
  $('#sign-in-form').submit();
  // $.post("http://localhost:3000/signup/regular", {
  //   email : $('#inputEmail').val(),
  //   password: $('#passwordInput').val()
  // }, function(data){
  //   window.location.href = "http://localhost:3000";
  // });
});

