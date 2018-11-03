(function () {
  btnSignup.addEventListener('click', signup, false);
  btnLogin.addEventListener('click', login, false);

  requestNotificationPermission();
})();

function signup(e) {
  e.preventDefault();

  let email = document.getElementById("signup_email").value;
  let password = document.getElementById("signup_password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
    sendNotification('Thanks for signing up to our website! Check your e-mail for account verification!');
    sendVerificationEmail(response.user)
  })
    .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
    document.getElementById('signup_error').innerHTML = errorCode + " - " + errorMessage;
  });
}

function login(e) {
  e.preventDefault();

  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
    sendNotification('You are now logged in successfully!');
    showUserInfo(response.user);
  })
    .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
    document.getElementById('login_error').innerHTML = errorCode + " - " + errorMessage;
  });
}

function sendVerificationEmail(user) {
  user.sendEmailVerification()
    .then(function () {
    // Email sent.
  }).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
  });
}

function sendNotification(msg) {
  let notif = new Notification(msg);
}

function requestNotificationPermission() {
  if (Notification && Notification.permission === 'default') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
    });
  }
}

function showUserInfo(user) {
  document.getElementById('user_info').innerHTML = "<h1> Welcome " + user.email + " ! </h1>";
}