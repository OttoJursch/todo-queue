var allData;
window.onload = function(){
  console.log("Happening");
  var logInButton = document.getElementById('log-in-button');
  var signUpButton = document.getElementById('sign-up-button');
  var email = document.getElementById('username-box');
  var password = document.getElementById('password-box');
  var loadQueue = function(responseText){
    if(responseText !== 'Error: Account Already Taken'){
      allData = JSON.parse(responseText);
      var htmlString = '<div><h1>Create a New Task</h1><h3>Select the Resources you will need</h3>';
      var secondString = '';
     "<input type='checkbox' name='option'"+x+" value='"+allData.resources[x]+"/>"+allData.resources+"<br>";
      for(var x = 0; x < allData.resources; x++){
        htmlString += "<input type='checkbox' name='option'"+x+" value='"+allData.resources[x]+"/>"+allData.resources+"<br>";
        secondString +=  "<input type='checkbox' name='option'"+x+" value='"+allData.resources[x]+"/>"+allData.resources+"<br>";
      }      
      htmlString += "<input type='text' placeholder='Add a New Resource' id='resource-box'/>"
      htmlString += "<button type='button' id='resource-addition-button'>Add Resource</button>"
      htmlString += "<input type='number' id='number-box' placeholder='00'/>";
      htmlString += "<input type='text' id='time-unit-combobox' list='units'><datalist id='units'><option>hours</option><options>Minutes</option></datalist></input>";
      htmlString += "<button id='create-new-task' type='button'>Create New Task</button></div>";  
      htmlString+=  "<div> <h1>Complete a Task!</h1><h3>Select the resources and time you have available</h3>" 
      htmlString += secondString + "<input id='all-resources=check' type='checkbox' value='all-resources' />All Resources<br>";
      htmlString += "<input type='number' id='number-box-2' placeholder='00'/>";
      htmlString += "<input type='text' id='time-unit-combobox-2' list='units'><datalist id='units'><option>hours</option><options>Minutes</option></datalist></input>";
      htmlString += "<button id='get-new-task' type='button'>Get New Task</button>";
      document.body.innerHTML = htmlString;
    }else{
      console.log("Incorrect password");
    }
  };
  logInButton.onclick = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "/login/:" + email.value + ":" + password.value, false);
    console.log(email.value + " " + password.value);
    request.send();
    loadQueue(request.responseText);
  };
  signUpButton.onclick = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "/signup?param=" + email.value + " " + password.value, false);
    request.send();
    loadQueue(request.responseText);
  };
};

