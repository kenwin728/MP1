const upvoteButton = document.getElementById("upvoteButton");
const voteCount = document.getElementById("voteCount");

let count = 0;

upvoteButton.addEventListener("click", () => {
  count++;
  voteCount.textContent = count;
});
