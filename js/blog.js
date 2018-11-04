// Get current data
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let hh = today.getHours();
let min = today.getMinutes();

// Get firebase reference and create a child object called blogposts
const database = firebase.database();
const ref = database.ref('blogposts');

// Get post button
const btnPost = document.getElementById('btnPost');

// Create function to add data to database
function writeBlogPost() {
    // Put current data in a string
    today = 'Posted at ' + mm + '-' + dd + '-' + yyyy + ' at ' + hh + ':' + mm + ' hr';
    
    // Collect the values from the form inputfields
    const blogTitle = document.getElementById('blogTitle').value;
    const blogBody = document.getElementById('blogBody').value;
    const blogWriter = 'My name';
    console.log(blogBody);

     // Put form data in a blogdata oject
    let blogData = {
        date: today,
        body: blogBody,
        title: blogTitle,
        writer: blogWriter
    }
    // Push the object data to firebase database
    ref.push(blogData);
}

btnPost.addEventListener('click', writeBlogPost);

