var allData;
window.onload = function(){
  console.log("Happening");
  var logInButton = document.getElementById('log-in-button');
  var signUpButton = document.getElementById('sign-up-button');
  var email = document.getElementById('username-box');
  var password = document.getElementById('password-box');
  var loadQueue = function(responseText){
    console.log(responseText);
    if(responseText !== 'Error'){
      //allData = JSON.parse(responseText);
      var htmlString =  "<div id='complete-task-div'><h1>Complete a Task!</h1><h3>Select the resources and time you have available</h3>"; 
      allData = {"resources" : ["hello", "goodbye", "hola", "como estas", "I Speak English"], "tasks" : [{"resources" : ["1", "2"], "name" : "test"}]};
      var secondString = '';
      htmlString += "<ul id='complete-task-resource-list' style='list-style-type:none'>";
      for(var x = 0; x < allData.resources.length; x++){
        htmlString += "<li><input type='checkbox' name='option"+x+"' value='"+allData.resources[x]+"'/>"+allData.resources[x]+"<br></li>";
        secondString +=  "<li><input type='checkbox' name='option"+x+"' value='"+allData.resources[x]+"'/>"+allData.resources[x]+"<br></li>";
      }      
      htmlString += "<li><button id='all-resources-check' type='button'>All Resources</button></li></ul>";
      htmlString += "<input type='number' id='hour-box-2' placeholder='00'/>Hours <br> <input type='number' id='minute-box-2' placeholder='00'/>Minutes<br>";
      htmlString += "<button id='get-new-task' type='button'>Get New Task</button></div>";
      htmlString += '<div id="create-task-div"><h1>Create a New Task</h1><h3>Select the Resources you will need</h3>';
      htmlString += "<ul id='add-task-list' style='list-style-type:none'>";
      htmlString += secondString;
      htmlString += "</ul>";
      htmlString += "<input type='text' placeholder='Add a New Resource' id='resource-box'/>";
      htmlString += "<button type='button' id='resource-addition-button'>Add Resource</button>";
      htmlString += "<input type='number' id='hour-box' placeholder='00'/> Hours<br> <input type='number' id='minute-box' placeholder='00'/> Minutes<br>";
      htmlString += "<label>Due Date</label><input type='date' placeholder='MM/DD/YYYY' id='due-date'/>";
      htmlString += "<label>Due Date</label><input type='date' id='due-date'/>";
      htmlString += "<h3>Prerequisite Tasks</h3>";
      htmlString+="<ul id='preq-task-list' style='list-style-option:none'>";
      for(var b = 0; b < allData.tasks.length; b++){
        htmlString += "<li><input type='checkbox' value='"+allData.tasks[b]+ "'/>" + allData.tasks[b]+"<br>" + "</li>";
      } 
      htmlString += "</ul>";
      htmlString += "<button id='create-new-task' type='button'>Create New Task</button></div>";  
      document.body.innerHTML = htmlString; var check_all = document.getElementById('all-resources-check');
      check_all.onclick = function(e){
        var resourceList = document.getElementById('complete-task-resource-list');
        for(var a = 0; a < resourceList.childNodes.length; a++){
          console.log(resourceList.childNodes[a].firstChild.checked);
          resourceList.childNodes[a].firstChild.checked = true;
        }
      }; 
      var addResource = document.getElementById('resource-addition-button');
      addResource.onclick = function(e){
        var resBox = document.getElementById('resource-box');
        var list = document.getElementById('add-task-list');
        if(resBox.value.trim() !== '' && !((new Set(allData.resources)).has(resBox.value.trim()))){
          list.innerHTML += "<li><input type='checkbox' value='"+resBox.value.trim()+"'/>"+resBox.value+"<br></li>";
          allData.resources.push(resBox.value.trim());
          //TODO Add code to POST value to server/database
          //var request = new XMLHttpRequest();
          //request.open("POST","/addresource?resource=resBox.value,false);
          //request.send(); 
        }else{
          resBox.value = '';
          resBox.placeholder = 'Please Enter a new Resource';
        }
      }
      var getTask = document.getElementById('get-new-task');
      var taskCompareFunction = function(task1, task2){
        //TODO Look Up Moment.js and set up a date parser. Then make it so this sorts somehow based on time 'til due date
        //TODO Weigh the % of the time taken vs importance/due date
        //Importance is a value from 1-10
        var date = moment();
        var timeTilTask1 = moment(task1.date).diff(date);
        var timeTilTask2 = moment(task2.date).diff(date);
        var timePercentTask1 = timeTilTask1 / task1.time;
        var timePercentTask2 = timeTilTask2 / task2.time;
        var task1Total = task1.importance * timePercentTask1;
        var task2Total = task2.importance * timePercentTask2;
        return task1Total - task2Total;
      };
      var getNewTask = function(e){
        var resourceCheckList = document.getElementById('complete-task-resource-list');
        var availableResources = [];
        for(var c = 0; c < resourceCheckList.childNodes.length; c++){
          availableResources.push(resourceCheckList.childNodes[c].firstChild);
        }
        allData.tasks.sort(taskCompareFunction);
        //Starting at end because sort should place items with greatest importance in back
        var bool = true;
        for(var x = allData.tasks.length - 1; x >= 0; x--){
           for(var a = 0; a < allData.tasks[x].resources.length; a++){
             bool = (new Set(availableResources)).has(allData.tasks[x].resources[a]); 
           } 
           if(bool){
             doTask(allData.tasks[x]);
             return;
           }
        }  
      };
      //Animation and set up of ui
      //Complete a task div will slowly fade (less opacity)
      //Complete a task div will be on z-index -1 so new div can slide over
      //These two animations will happen simultaneously
      var doTask = function(/*task*/){
        console.log("We are doing a task");
        var startTime = new Date().getTime(); 
        var newDiv = document.createElement('div');
        newDiv.style.left = "0%";
        newDiv.style.top = "0%";
        newDiv.style.backgroundColor = "blue";
        newDiv.style.width = "30%";
        newDiv.style.height = "25%";
        newDiv.style.opacity = "1.0";
        newDiv.style.zIndex = "2";
        newDiv.style.positioning = "relative";
        //TODO double check to make sure task attributes are accurate
        var heading = document.createElement('h2');
        heading.innerHTML = "test";//task.name;
        newDiv.appendChild(heading);
        var time = document.createElement('h2');
        time.innerHTML = "task";//task.length;
        newDiv.appendChild(time);
        var finishedTask = document.createElement('button');
        finishedTask.type = 'button';
        finishedTask.onclick = function(){
          //TODO XMLHttpRequest to send completion message to server
        };
        finishedTask.innerHTML = "Finished Task";
        newDiv.appendChild(finishedTask);
        var newTask = document.createElement('button');
        newTask.type = 'button';
        newTask.onclick = function(){
          //var index = allData.tasks.indexOf(task);
          //allData.tasks.splice(index, 1);
          getNewTask();
        };  
        newTask.innerHTML = "I GIVE UP! New Task";
        newDiv.appendChild(newTask);
        var changeParameters = document.createElement('button');
        changeParameters.type = 'button';
        changeParameters.onclick = function(){
          oldDiv.style.opacity = "1.0";
          document.body.insertBefore(oldDiv, document.body.childNodes[0]);
          newDiv.parentNode.removeChild(newDiv);
        };
        changeParameters.innerHTML = "Change Input";
        newDiv.appendChild(changeParameters);
        //document.body.insertBefore(newDiv, document.body.childNodes[0]);
        var oldDiv = document.getElementById('complete-task-div');
        oldDiv.style.opacity = "1.0";
        var newDivTravel = 35;
        var opacityChangeTotal = 1;
        var animationFunction = function(){
          var currentTime = new Date().getTime();
          //1000 is due to the time being in milleseconds
          console.log("current time " + currentTime);
          console.log("start time " + startTime);
          var secondsPassed = ((currentTime - startTime) / 1000); 
          var animationTime = 3;
          console.log("seconds passed " + secondsPassed);
          //var distanceChange = secondsPassed/animationTime * newDivTravel;
          //console.log("Distance change " + distanceChange);
          //newDiv.style.left = (parseFloat(newDiv.style.left) + distanceChange) + "%";
          var opacityChange = secondsPassed/animationTime * opacityChangeTotal;
          oldDiv.style.opacity = (parseFloat(oldDiv.style.opacity) - opacityChange) + "";
          console.log("Position " + newDiv.style.left);
          if(/*parseInt(newDiv.style.left) <newDivTravel && */parseFloat(oldDiv.style.opacity) > 0){
            window.requestAnimationFrame(animationFunction);
          }else{
            document.body.insertBefore(newDiv, document.body.childNodes[0]);
            oldDiv.parentNode.removeChild(oldDiv);
          } 
        };
        animationFunction(); 
      };
      getTask.onclick = doTask;//getNewTask; 
      var createTask = document.getElementById('create-new-task');
      createTask.onclick = function(){
        var resourceList = [];
        var checkBoxes = document.getElementById('add-task-list');
        var time = parseInt(document.getElementById('hour-box').value) * 60 + parseInt(document.getElementById('minute-box').value); 
        var dueDate = moment(document.getElementById('due-date').value).format('MM-DD-YYYY'); 
        var prereqs = document.getElementById('preq-task-list');
        var prereqList = [];
        for(var counter = 0; counter < prereqs.childNodes.length; counter++){
          var isPrereq = prereqs.childNodes[counter].firstChild.checked;
          if(checked){
            prereqList.push(prereqs.childNodes[counter].firstChild.value);
          }
        }
        for(var index = 0; index < checkBoxes.childNodes.length; index++){
          var checked = checkBoxes.childNodes[index].firstChild.checked;
          if(checked){
            resourceList.push(checkBoxes.childNodes[index].firstChild.value);
          }
        } 
        var theTask = {resources : resourceList, time : time, date : dueDate, prereq : prereqList};
        var msg = JSON.stringify(theTask);
        //TODO code to send the new JSON message to the server
        allData.tasks.push(theTask);
        console.log(theTask);
        console.log(theTask.date);
      }
    }else{
      console.log("Incorrect password");
    }
  };
  logInButton.onclick = function(){
    /*var request = new XMLHttpRequest();
    request.open("GET", "/login?id=" + email.value + "&password=" + password.value, false);
    console.log(email.value + " " + password.value);
    request.send();*/
    //loadQueue(request.responseText);
    loadQueue('there was no error');
  };
  signUpButton.onclick = function(){
    /*var request = new XMLHttpRequest();
    request.open("GET", "/signup?id=" + email.value + "&password=" + password.value, false);
    request.send();*/
    //loadQueue(request.responseTexte);
    loadQueue('there was no error');
  };
};
