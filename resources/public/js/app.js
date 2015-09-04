window.onload = function(){
  console.log("Happening");
  var logInButton = document.getElementById('log-in-button');
  var email = document.getElementById('username-box');
  var password = document.getElementById('password-box');
  logInButton.onclick = function(){
    var request = new XMLHttpRequest();
    request.open("POST", "/login:" + email.text + ":" + password.text, false);
    request.send();
    var div = document.createElement('div');
    div.innerHTML = request.responseText;
    document.body.appendChild(div);
  };
};

