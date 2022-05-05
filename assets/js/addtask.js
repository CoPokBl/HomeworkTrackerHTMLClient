
let edit = false;
const params = new URLSearchParams(window.location.search);
if (params.has('edit')) {
  if (params.get('edit') === 'true') {
    if (!params.has("edit_id")) {
      console.log("No id provided");
    }
    edit = true;
    document.getElementById('pageHeading').innerHTML = "Edit Task";
    console.log("Edit mode on");

    // Load fields
    httpSendAsync(serverUrl + "/api/tasks/" + params.get("edit_id"),
        "GET",
        ["Authorization:Bearer " + getCookie("token")],
        null,
        function callback(responseText, status) {
          // Set the fields
          if (String(status)[0] != 2) {
            console.error("Failed to get data");
            return;
          }
          const task = JSON.parse(responseText);
          document.getElementById('inputClass').value = task.class;
          document.getElementById('inputType').value = task.type;
          document.getElementById('inputTask').value = task.task;

          // Colours
          if (task.classColour !== "-1.-1.-1") {
              let cSplits = task.classColour.split(".");
              document.getElementById('classColour').value = rgbToHex(cSplits[0], cSplits[1], cSplits[2]);
          } else {
              document.getElementById('typeColour').value = rgbToHex(0,0,0);
          }

          if (task.typeColour !== "-1.-1.-1") {
              let tSplits = task.typeColour.split(".");
              document.getElementById('typeColour').value = rgbToHex(tSplits[0], tSplits[1], tSplits[2]);
          } else {
              document.getElementById('typeColour').value = rgbToHex(0,0,0);
          }

    });

  }
}

function saveButtonClick() {
    let obj = '{"class": "' + document.getElementById('inputClass').value + '"';

    const classColourObj = hexToRgb(document.getElementById('classColour').value);
    let classColourString = classColourObj.r + '.' + classColourObj.g + '.' + classColourObj.b;
    if (classColourString === '0.0.0') {
        classColourString = "-1.-1.-1";
    }
    obj += ', "classColour": "' + classColourString + '"';

    const typeColourObj = hexToRgb(document.getElementById('typeColour').value);
    let typeColourString = typeColourObj.r + '.' + typeColourObj.g + '.' + typeColourObj.b;
    if (typeColourString === '0.0.0') {
      typeColourString = "-1.-1.-1";
    }
    obj += ', "typeColour": "' + typeColourString + '"';
    obj += ',"type": "' + document.getElementById('inputType').value + '"';
    obj += ',"task": "' + document.getElementById('inputTask').value + '"';
    if (edit) {
      obj += ',"id": "' + params.get("edit_id") + '"';
    }
    obj += '}';
    console.log(obj);
    httpSendAsync(serverUrl + "/api/tasks",
        "PUT",
        ["Authorization:Bearer " + getCookie("token"), "Content-Type: application/json"],
        obj,
        function callback(responseText, status) {
            if (String(status)[0] != 2) {
                console.error("Failed to add task");
                return;
            }

            // when it finishes, redirect to the task page
            console.log("Successfully added task, sending to main page.");
            window.location.replace("../");
    });
}
