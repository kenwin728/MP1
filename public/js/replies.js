//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.style.display = "block"
}

function removeComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.style.display = "none"
}
//Reply
function showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.style.display = "block"
}
    
function removeReply(){
    var commentArea = document.getElementById("reply-area");
    commentArea.style.display = "none"
}

//Post
function showPost(){
    var postArea = document.getElementById("post-area");
    postArea.style.display = "block";
}

function removePost(){
    let postArea = document.getElementById("post-area");
    postArea.style.display = "none";
}