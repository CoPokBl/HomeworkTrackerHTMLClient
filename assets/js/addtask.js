
var edit = false;
const params = new URLSearchParams(window.location.search);
if (params.has('edit')) {
  if (params.get('edit') == 'true') {
    edit = true;
    document.getElementById("title").innerHTML = "Edit Task";
    console.log("Edit mode on");
  }
}
