document.addEventListener("DOMContentLoaded", async function (event){
    var likebtn = document.getElementById("likebtn2");
    var dislikebtn = document.getElementById("dislikebtn2");
    var currentuser = document.getElementsByClassName("currentuser");
    var replyid = document.getElementsByClassName("replyid");
    try{
        const response = await fetch('/getCheckReplyLikeBtn?replyID=' + replyid.value + '&currentuser=' + currentuser.value, {
            method: 'GET'
        });
        if (response.status == 400) {
            // do something
            likebtn.style.color='#004eff';
        } else if (response.status == 200){
            console.log('ok');
            likebtn.style.color='#fff';
        }
        const response2 = await fetch('/getCheckReplyDislikeBtn?replyID=' + replyid.value + '&currentuser=' + currentuser.value, {
            method: 'GET'
        });
        if (response2.status == 400) {
            // do something
            dislikebtn.style.color='#ff0000';
        } else if (response2.status == 200){
            console.log('ok');
            dislikebtn.style.color='#fff';
        }
    } catch (err){
        console.error(err);
    }
});