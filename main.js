//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
}

//Reply
function showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
}

//Post
function showPost(){
    var postArea = document.getElementById("post-area");
    postArea.style.display = "block"
}

function removePost(){
    let postArea = document.getElementById("post-area");
    postArea.style.display = "none"
}
