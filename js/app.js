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
    promise.then(loginSuccessful);
    promise.catch(e => message.innerHTML = e.message);
  });

  // firebase signup at buttonclick
  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    // call registerSuccessful to display notification
    promise.then(registerSuccessful);
    promise.catch(e => message.innerHTML = e.message);
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
      let email = txtEmail.value;
      loginForm.style.display = 'none';
      btnLogout.style.visibility = 'visible';
      succesForm.style.display = 'block';
      blogForm.style.display = 'block';
      message2.innerHTML += 'Welcome ' + email;
    } else {
      console.log('Not logged in');
    }
  })
}());


