$(function () {
  $('.sign-up-container').hide();
});

$('.sign-up').click(function () {
  $('.sign-in-container').hide();
  $('.sign-up-container').show();
});

$('.login-text').click(function () {
  $('.sign-in-container').show();
  $('.sign-up-container').hide();
});

$('.loginButton').click(function () {
  $('#sign-in-form').attr('action', 'http://localhost:3000/login/regular');
  $('#sign-in-form').submit();
});
$('.signupButton').click(function () {
  console.log('signinng up');
  $('#sign-in-form').attr('action', 'http://localhost:3000/signup/regular');
  $('#sign-in-form').submit();
});