const users = [
    { name: "Bob", photo: "PF1.jpg" },
    { name: "Marcus", photo: "PF2.jpg" },
    { name: "Johnson", photo: "PF3.jpg" },
    { name: "Kenwin", photo: "fbprofile1.jpg" },
    { name: "Josh", photo: "fbprofile5.jpg" }
  ];

  const profilePhotosContainers = document.querySelectorAll(".profilePhotos");
  const usernameElements = document.querySelectorAll(".username");
  
  for (let i = 0; i < usernameElements.length; i++) {
    const username = usernameElements[i].querySelector("a").textContent;
    const user = users.find(user => user.name === username);
  
    if (user) {
      const img = document.createElement("img");
      img.src = user.photo;
      img.alt = "";
  
      profilePhotosContainers[i].appendChild(img);
    }
  }

/*var img1 = document.getElementById("profilePhotos");
img1.src = "PF2.jpg";
img1.appendChild(img1);*/