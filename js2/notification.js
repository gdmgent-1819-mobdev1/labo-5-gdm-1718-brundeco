Notification.requestPermission().then(function(result) {
  console.log(result);
});

function registerSuccesfull() {
  const email = document.getElementById('txtEmail').value;
  const text = 'You are now registered with ' + email;
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  else if (Notification.permission === "granted") {
    let notification = new Notification("Succes", {body: text});
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        let notification = new Notification("Succes", {body: text});
      }
    });
  }
}

// registerSuccesfull();

function loginSuccesfull() {
  const email = document.getElementById('txtEmail').value;
  const text = 'You are now logged in with ' + email;
  // const currentUser = document.getElementById('currentUser');
  // currentUser.innerHTML = 'LOGGED IN AS ' + '<br>' + email;
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  else if (Notification.permission === "granted") {
    let notification = new Notification("Welcome", {body: text});
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        let notification = new Notification("Welcome", {body: text});
      }
    });
  }

  loginSuccesfull();



}