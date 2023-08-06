//Profile
function showProfile(){
    var editArea = document.getElementById("edit-area");
    editArea.style.display = "block";
    var cancelButton = document.getElementById("cancel-btn");
    cancelButton.style.display = "block";
    var editButton = document.getElementById("edit-btn");
    editButton.style.display = "none";
}

function removeProfile(){
    let editArea = document.getElementById("edit-area");
    editArea.style.display = "none";
    var editButton = document.getElementById("edit-btn");
    editButton.style.display = "block";
    var cancelButton = document.getElementById("cancel-btn");
    cancelButton.style.display = "none";
}