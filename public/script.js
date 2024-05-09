// public/script.js
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
  
    // Send an HTTP POST request to the server to add a new user
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, age: age })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User added successfully:', data);
      alert('User added successfully!');
      displayUsers(); // Refresh the user list after adding a new user
    })
    .catch(error => {
      console.error('Error adding user:', error);
      alert('Error adding user. Please try again.');
    });
  });
  
  // Function to display all users
  function displayUsers() {
    fetch('/api/users')
    .then(response => response.json())
    .then(users => {
      var userList = document.getElementById("userList");
      userList.innerHTML = ''; // Clear previous content
      users.forEach(user => {
        var userItem = document.createElement("div");
        userItem.textContent = `Name: ${user.name}, Email: ${user.email}, Age: ${user.age}`;
        
        // Create update button
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function() {
          updateUser(user._id, user.name, user.email, user.age);
        };
  
        // Create delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
          deleteUser(user._id);
        };
  
        userItem.appendChild(updateButton);
        userItem.appendChild(deleteButton);
  
        userList.appendChild(userItem);
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      alert('Error fetching users. Please try again.');
    });
  }
  
  // Function to update a user
  function updateUser(userId, name, email, age) {
    var newName = prompt("Enter new name:", name);
    var newEmail = prompt("Enter new email:", email);
    var newAge = prompt("Enter new age:", age);
  
    if (newName && newEmail && newAge) {
      fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName, email: newEmail, age: newAge })
      })
      .then(response => response.json())
      .then(data => {
        console.log('User updated successfully:', data);
        alert('User updated successfully!');
        displayUsers(); // Refresh the user list after updating the user
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
      });
    }
  }
  
  // Function to delete a user
  function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log('User deleted successfully:', data);
        alert('User deleted successfully!');
        displayUsers(); // Refresh the user list after deleting the user
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
      });
    }
  }
  
  // Initial call to display all users when the page loads
  displayUsers();
  
