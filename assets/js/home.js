
httpSendAsync(serverUrl + "/api/tasks", "GET", ["Authorization:Bearer " + getCookie("token")], function callback(responseText, status) {
  if (String(status)[0] != 2) {
    // Failed
    document.getElementById('tasks').innerHTML = "Loading tasks failed!";
    return;
  }
  // Success
  console.log(responseText);
  document.getElementById('tasks').innerHTML = "Tasks: <br>" + responseText;

  // display tasks in blocks
  var totalText = "<br>";  // Starting wrappers
  var tasks = JSON.parse(responseText);
  console.log(tasks.length);
  for (var i = 0; i < tasks.length; i++) {
    var cTask = tasks[i];
    var blockText = '<div class="col-sm-6 col-lg-10 mb-4"><div class="card"><div class="card-body">';
    var classColour = "black";
    var typeColour = "black";

    if (cTask.classColour != "-1.-1.-1") {
      var rgb = cTask.classColour.split('.');
      classColour = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")"
    }
    if (cTask.typeColour != "-1.-1.-1") {
      var rgb = cTask.typeColour.split('.');
      typeColour = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")"
    }

    // Info
    blockText += "<p class='card-text' style='color: " + classColour + "'>Class: " + cTask.class + "</p>";
    blockText += "<p class='card-text' style='color: " + typeColour + "'>Type: " + cTask.type + "</p>"
    blockText += "<p class='card-text'>Task: " + cTask.task + "</p>";

    // Button
    blockText += '<button type="button" class="btn btn-danger" onclick="deleteTask(\'' + cTask.id + '\');">Delete Task</button>';
    console.log('<button type="button" class="btn btn-danger" onclick="deleteTask(\'' + cTask.id + '\');">Delete Task</button>');

    totalText += blockText + "</div></div></div>";
  }

  totalText += "";  // Ending wrappers

  document.getElementById('tasks').innerHTML = "<h1>Tasks:</h1> <br>" + totalText;
});

function logout() {
  setCookie("token", "");
  window.location.replace("../");
}

function deleteTask(id) {
  httpSendAsync(serverUrl + "/api/tasks/" + id, "DELETE", ["Authorization:Bearer " + getCookie("token")], function callback(responseText, status) {
    if (String(status)[0] != 2) {
      // Failed
      console.log("Failed to delete task with id " + id + " (Error: " + status + " " + responseText + ")");
      return;
    }
    // Success
    window.location.reload();
  });
}
