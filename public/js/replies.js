//Post
function showPost(){
    var postArea = document.getElementById("post-area");
    postArea.style.display = "block";
    var cancelButton = document.getElementById("cancel-btn");
    cancelButton.style.display = "block";
    var postButton = document.getElementById("post-btn");
    postButton.style.display = "none";
}

function removePost(){
    let postArea = document.getElementById("post-area");
    postArea.style.display = "none";
    var postButton = document.getElementById("post-btn");
    postButton.style.display = "block";
    var cancelButton = document.getElementById("cancel-btn");
    cancelButton.style.display = "none";
}

//Edit Post
function showEdit(){
    var editArea = document.getElementById("edit-area");
    editArea.style.display = "block";
    var cancelButton = document.getElementById("canceledit-btn");
    cancelButton.style.display = "block";
    var editButton = document.getElementById("edit-btn");
    editButton.style.display = "none";
}

function removeEdit(){
    let postArea = document.getElementById("edit-area");
    postArea.style.display = "none";
    var postButton = document.getElementById("edit-btn");
    postButton.style.display = "block";
    var cancelButton = document.getElementById("canceledit-btn");
    cancelButton.style.display = "none";
}

//Edit User Comment
function showEditComment(){
    var editArea = document.getElementById("editcomment-area");
    editArea.style.display = "block";
    var cancelButton = document.getElementById("canceleditcomment-btn");
    cancelButton.style.display = "block";
    var editButton = document.getElementById("editcomment-btn");
    editButton.style.display = "none";
}

function removeEditComment(){
    let postArea = document.getElementById("editcomment-area");
    postArea.style.display = "none";
    var postButton = document.getElementById("editcomment-btn");
    postButton.style.display = "block";
    var cancelButton = document.getElementById("canceleditcomment-btn");
    cancelButton.style.display = "none";
}
