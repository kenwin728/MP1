var users = [
    { username: 'Josh', password: 'password1'},
    { username: 'Kenwin', password: 'password2'},
    { username: 'Johnson', password: 'password3'},
    { username: 'Bob', password: 'password4'},
    { username: 'Marcus', password: 'password5'}
  ];

  

  // Register form submission handler
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the username is already taken
    if (users.some(user => user.username === username)) {
      document.getElementById('registerMessage').textContent = 'Username already taken';
    } else {
      // Add the new user to the database
      users.push({ username: username, password: password });
      document.getElementById('registerMessage').textContent = 'Registration successful';
    }
  });

  // Login form submission handler
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    // Check if the username and password match
    if (users.some(user => user.username === username && user.password === password)) {
      document.getElementById('loginMessage').textContent = 'Login successful';
      location.href="posts.html";
    } else {
      document.getElementById('loginMessage').textContent = 'Invalid username or password';
    }
  });

