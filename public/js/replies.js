document.addEventListener("DOMContentLoaded", function (event) {
    const likebtn = document.getElementById("likebtn");
    const dislikebtn = document.getElementById("dislikebtn");
    const currentuser = document.getElementsByClassName("currentuser");
    const postid = document.getElementsByClassName("postid");
    console.log("Hello");
    const response = fetch('/getCheckPostLikeBtn?postID=' + postid.value + '&currentuser=' + currentuser.value, {
        method: 'GET'
    });
    if (response.status == 400) {
        // do something
        likebtn.style.color='#004eff';
    } else if (response.status == 200){
        console.log('ok');
        likebtn.style.color='#fff';
    }
    const response2 = fetch('/getCheckPostDislikeBtn?replyID=' + postid.value + '&currentuser=' + currentuser.value, {
        method: 'GET'
    });
    if (response2.status == 400) {
        // do something
        dislikebtn.style.color='#ff0000';
    } else if (response2.status == 200){
        console.log('ok');
        dislikebtn.style.color='#fff';
    }
});
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
