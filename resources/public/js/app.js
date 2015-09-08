window.onload = function(){
  console.log("Happening");
  var logInButton = document.getElementById('log-in-link');
  var signUpButton = document.getElementById('sign-up-link');
  var email = document.getElementById('username-box');
  var password = document.getElementById('password-box');
  logInButton.onclick = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "/login/:" + email.value + ":" + password.value, false);
    console.log(email.value + " " + password.value);
    request.send();
    if(request.responseText === 'password-is-good'){
      return true;
    }else{
      console.log("Incorrect password");
      return false;
    }
  };
  signUpButton.onclick = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "/signup?param=" + email.value + " " + password.value, false);
    request.send();
    console.log(request.responseText);
    if(request.responseText === 'password-is-good'){
      return true;
    }else{
      console.log("Incorrect password");
      return false;
    }
  };
};

