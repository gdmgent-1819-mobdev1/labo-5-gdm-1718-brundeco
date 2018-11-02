
// let today = new Date();
// let dd = today.getDate();
// let mm = today.getMonth()+1; //January is 0!
// let yyyy = today.getFullYear();
// let hh = today.getHours();
// let min = today.getMinutes();

// today = 'Posted at ' + mm + '-' + dd + '-' + yyyy + ' at ' + hh + ':' + mm + ' hr';
// document.write(today);


// (function() {
//   const preObject = document.getElementById('object');
//   const dbRefObject = firebase.database().ref().child('object');

//   dbRefObject.on('value', snap => console.log(snap.val()));
//   preObject.innerHTML = 'Hallo daar';
// }());



let database = firebase.database();

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

