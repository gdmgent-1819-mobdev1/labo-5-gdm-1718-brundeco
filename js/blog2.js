const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');

dbRefObject.on('value', snap => console.log(snap.val()));