const users = [
    { name: "Bob", photo: "PF1.jpg" },
    { name: "Marcus", photo: "PF2.jpg" },
    { name: "User 3", photo: "PF3.jpg" }
  ];

const profilePhotosContainer = document.getElementById("profilePhotos");
  const usernameElement = document.querySelector(".username");
  const username = usernameElement.textContent;
  const user = users.find(user => user.name === username);

  if (user) {
    const img = document.createElement("img");
    img.src = user.photo;
    img.alt = `${user.name}'s Profile Photo`;

    profilePhotosContainer.appendChild(img);
  }

var img1 = document.getElementById("profilePhotos");
img1.src = "PF2.jpg";
img1.appendChild(img1);