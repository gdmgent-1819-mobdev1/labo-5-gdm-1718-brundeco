(function() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBWMEIJDFgh1SA5TFEZ3ntO7HX-L49Ptpc",
    authDomain: "labo-5-bd772.firebaseapp.com",
    databaseURL: "https://labo-5-bd772.firebaseio.com",
    projectId: "labo-5-bd772",
    storageBucket: "labo-5-bd772.appspot.com",
    messagingSenderId: "903598537431"
  };
  firebase.initializeApp(config);

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    let message = document.getElementById('message');
    console.log(message);
    message.innerHTML('Welcome to your page');
  });

  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });



  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');

    } else {
      console.log('Not logged in');
      btnLogout.classList.add('hide');
    }
  })


}());