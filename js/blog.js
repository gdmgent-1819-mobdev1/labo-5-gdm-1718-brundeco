// Get current data
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();
let hh = today.getHours();
let min = today.getMinutes();
today = 'Posted at ' + mm + '-' + dd + '-' + yyyy + ' at ' + hh + ':' + mm + ' hr';

// Get post button
let btnPost = document.getElementById('btnPost');

// Get database object
let database = firebase.database();

function writeNewPost(uid) {
    let title = document.getElementById('blogTitle').value;
    let body = document.getElementById('blogBody').value;
    let date = today;
    let author = 'Brunno De Koene';
    // A post entry.
    let postData = {
        author: author,
        title: title,
        body: body,
        date: date,
        uid: uid
    };

    // Get a key for a new Post.
    let newPostKey = firebase.database().ref().child('blogPosts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

btnPost.addEventListener('click', writeNewPost);



