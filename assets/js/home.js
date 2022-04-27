httpSendAsync(serverUrl + "/api/tasks", "GET", ["Authorization:Bearer " + getCookie("token")], function callback(responseText, status) {
  if (status != 200) {
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
    // var blockText = "<div class='container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>"; // Section start wrap
    var blockText = '<div class="col-sm-6 col-lg-10 mb-4"><div class="card"><div class="card-body">';
    blockText += "<p class='card-text'>Class: " + cTask.class + "</p><br>";
    blockText += "<p class='card-text'>Type: " + cTask.type + "</p><br>"
    blockText += "<p class='card-text'>Task: " + cTask.task + "</p><br>";

    // totalText += blockText + "</div><div class='b-example-divider'></div>";
    totalText += blockText + "</div></div></div>";
  }

  totalText += "";  // Ending wrappers

  document.getElementById('tasks').innerHTML = "<h1>Tasks</h1>: <br>" + totalText;
});

function logout() {
  setCookie("token", "");
  window.location.replace("../");
}
