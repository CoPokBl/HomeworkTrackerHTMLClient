// Constants
const serverUrl = "homeworktrack.serble.net:9898";

// Functions
function httpSendAsync(theUrl, verb, headers, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState != 4) {
      return;
    }
    callback(xmlHttp.responseText, xmlHttp.status);
  }
  xmlHttp.open(verb, "http://" + theUrl, true);
  headers.forEach((item, i) => {
    xmlHttp.setRequestHeader(item.split(":")[0],item.split(":")[1]);
  });
  xmlHttp.send(null);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
