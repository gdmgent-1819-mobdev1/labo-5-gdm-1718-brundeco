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

  // creating our variables
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  const loginForm = document.getElementById('loginForm');
  const succesForm = document.getElementById('succesForm');
  const blogForm = document.getElementById('blogForm');

  const message = document.getElementById('message');
  const message2 = document.getElementById('message2');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
      location.reload();
      console.log(firebaseUser);
    });
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      let email = txtEmail.value;
      // console.log(firebaseUser);
      console.log(email);
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


