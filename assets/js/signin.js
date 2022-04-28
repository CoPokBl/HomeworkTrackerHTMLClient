
// Check server status
httpSendAsync(serverUrl, "GET", [], null, function callback(responseText, status) {
  if (String(status)[0] != 2) {
    // Failed
    console.log("Server offline");
    window.location.replace("./serveroff/");
  }
  // Success
  console.log("Server online");
  // Check for login
  var token = getCookie("token");
  httpSendAsync(serverUrl + "/api/tasks", "GET", ["Authorization:Bearer " + token], null, function callback(responseText, status) {
    if (String(status)[0] != 2) {
      // Failed
      console.log("Request Failed");
      return;
    }
    // Success login
    console.log("Request Success");
    window.location.replace("./home/");
  });
});

function loginButtonPress() {
  var username = document.getElementById("inputUser").value;
  var password = document.getElementById("inputPassword").value;
  var header = "Authorization:Basic " + window.btoa(username + ":" + password);

  // Login
  httpSendAsync(serverUrl + "/auth", "GET", [header], null, function callback(responseText, status) {
    if (String(status)[0] != 2) {
      // Failed
      console.log("Login Failed");
      return;
    }
    // Success
    console.log("Login Success: " + responseText);
    setCookie("token", responseText, 365*10);
    window.location.replace("./home/");
  });
}
