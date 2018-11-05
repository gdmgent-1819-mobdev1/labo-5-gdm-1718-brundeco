(function() {
  const config = {
    apiKey: "AIzaSyBWMEIJDFgh1SA5TFEZ3ntO7HX-L49Ptpc",
    authDomain: "labo-5-bd772.firebaseapp.com",
    databaseURL: "https://labo-5-bd772.firebaseio.com",
    projectId: "labo-5-bd772",
    storageBucket: "labo-5-bd772.appspot.com",
    messagingSenderId: "903598537431"
  };
  firebase.initializeApp(config);

  // check if user exists in local storage
  if(localStorage.getItem('currentUser') === null) {
    firebase.auth().signOut();
  }

  // Put currentuser in localstorage
  let currentLoggedInUser = [];
  let currentLoggedInUserId = [];

  // Get button elements and pass/email values
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  
  // Get div elements to toggle hide and visible
  const loginForm = document.getElementById('loginForm');
  const succesForm = document.getElementById('succesForm');
  const blogForm = document.getElementById('blogForm');
  const blogResults = document.getElementById('blogResults');

  // get message divs 
  const message = document.getElementById('message');
  const message2 = document.getElementById('message2');

  // firebase login at buttonclick
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    // call loginSuccessful to display notification
    promise.then(e => {
      // call loginSuccessful to display notification
      loginSuccessful();
      // put current user in local storage to display user in message form
      currentLoggedInUser.push(email);
      localStorage.setItem('currentUser', currentLoggedInUser[0]);
    })
    promise.catch(e => message.innerHTML = e.message);
  });

//Forgot password
document.getElementById('passwordForgotten').addEventListener('click', function(e){
  // e.preventDefault();
  let auth = firebase.auth();
  const email = txtEmail.value;

  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent
      message.innerHTML = 'An email with a link to reset your password has been sent.';
  }).catch(function(error) {
    // Something went wrong
    console.log('Something went wrong');
  });
});

  // send email to registered address to complete sign up
  function sendMeAnEmailPlease(email) {
    email.sendEmailVerification()
        .then(function() {
            console.log('Email verification link sent');
        })
        .catch(function(error) {
            console.log(error);
        });
    }  

  // firebase signup at buttonclick
  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    let user = email;
    console.log(user)

    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.then(e => {
      // send email verification link
      sendMeAnEmailPlease(e.user);
      // call registerSuccessful to display notification
      registerSuccessful();
      currentLoggedInUser.push(email);
      localStorage.setItem('currentUser', currentLoggedInUser[0]);
    })
    promise.catch(e => {
      message.innerHTML = e.message;
    });
  });

  // firebase logout at buttonclick
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
      location.reload();
      console.log(firebaseUser);
    });
  });


  // check for statechanges, toggle on and off other divs accordingly
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {

      userId = firebaseUser.uid;
      currentLoggedInUserId.push(userId);
      localStorage.setItem('currentUserId', currentLoggedInUserId[0]);

      (function(){
        loginForm.style.display = 'none';
        btnLogout.style.visibility = 'visible';
        succesForm.style.display = 'block';
        blogForm.style.display = 'block';
        blogResults.style.display = 'block';
        message2.innerHTML += 'Welcome ' + localStorage.getItem('currentUser');
      })();

    } else {
      console.log('Not logged in');
    }
  })
}());


