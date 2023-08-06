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
