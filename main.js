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

let likebtn = document.querySelector('#likebtn');
let dislikebtn = document.querySelector('#dislikebtn');
let likebtn2 = document.querySelector('#likebtn2');
let dislikebtn2 = document.querySelector('#dislikebtn2');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let input1_com = document.querySelector('#input1_com');
let input2_com = document.querySelector('#input2_com');

likebtn.addEventListener('click', ()=>{
    input1.value = parseInt(input1.value) + 1;
})

dislikebtn.addEventListener('click', ()=>{
    input2.value = parseInt(input2.value) + 1;
})

likebtn2.addEventListener('click', ()=>{
    input1_com.value = parseInt(input1_com.value) + 1;
})

dislikebtn2.addEventListener('click', ()=>{
    input2_com.value = parseInt(input2_com.value) + 1;
})
