let message = document.getElementById('message');
let message2 = document.getElementById('message2');
message.setAttribute('class', 'container margin-top');

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


  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const btnLogout2 = document.getElementById('btnLogout2');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
  
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then();
    promise.catch(e => message.innerHTML = 'Fail');

  });

  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(registerSuccesfull, message.innerHTML = 'Welcome, you registered succesfully with ' + email + '!');
    promise.catch(e => message.innerHTML = 'Fail');
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    message.innerHTML = 'Logout succesful';
  });




  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      // console.log(firebaseUser);
      btnLogout.classList.remove('hide');

    } else {

      console.log('Not logged in');
      btnLogout.classList.add('hide');
    }
  })

}());


