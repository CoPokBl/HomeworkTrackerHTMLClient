// Constants
const serverUrl = "homeworktrack.serble.net:9898";

// Functions
function httpSendAsync(theUrl, verb, headers, body, callback) {
  const xmlHttp = new XMLHttpRequest();
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
  xmlHttp.send(body);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// rgb to hex
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  // convert r g and b to numbers
  r = parseInt(r);
  g = parseInt(g);
  b = parseInt(b);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
