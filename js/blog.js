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
let currentUserId = localStorage.getItem('currentUserId');;
console.log(currentUserId);

// Get post button
const btnPost = document.getElementById('btnPost');
let blogResults = document.getElementById('blogResults');

// Create function to collect data from input fields
function fetchBlogPostData(uid) {
    // Put current data in a string
    today = 'Posted at ' + mm + '-' + dd + '-' + yyyy + ' at ' + hh + ':' + mm + ' hr';
    
    // Collect the values from the form inputfields
    const blogTitle = document.getElementById('blogTitle').value;
    const blogContent = CKEDITOR.instances.blogBody.getData();
    const blogAuthor = localStorage.getItem('currentUser');
    const blogDate = today;

    // Put form data in a blogdata oject
    let blogData = {
        date: blogDate,
        content: blogContent,
        title: blogTitle,
        author: blogAuthor,
        uid: uid
    }

    // Push the object data to firebase database
    ref.push(blogData);
    console.log(ref);
    console.log(blogData);
}
    // add event listener to post button
    btnPost.addEventListener('click', fetchBlogPostData);

let blogContainer = document.getElementById('blogContainer');
// check for value changes in firebase database
ref.on('value', writeBlogPost);

function writeBlogPost(data, uid) {
    let posts = data.val();
    let keys = Object.keys(posts);
    // blogResults.innerHTML = "";
    // console.log(data);
    blogContainer.innerHTML = "";

    // loop through contents of each post
    for(let i = 0; i < keys.length; i++) {
        // create a main container
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'posts-layout');
        
        let k = keys[i];
        let titles = posts[k].title;
        let contents = posts[k].content;
        let dates = posts[k].date;
        let authors = posts[k].author;

        // create variables that hold the blogpost object data
        let displayBlogTitle = '<h5>' +  titles  + '</h5>';
        let displayBlogContent =  '<p>' + contents + '</p>';
        let displayBlogDate = '<h6>' + dates + '</h6>';
        let displayBlogAuthor = 'Author: <a>' + authors + '</a>';
        let edit = '<button class="editPostBtn" id="' + k + '">' + 'Delete post' + '</button>';

        // add content to maindiv
        mainDiv.innerHTML += displayBlogTitle;
        mainDiv.innerHTML += displayBlogContent;
        mainDiv.innerHTML += displayBlogDate;
        mainDiv.innerHTML += displayBlogAuthor;
        mainDiv.innerHTML += edit;
        blogContainer.appendChild(mainDiv);
        // blogPostSuccessful();
    }
    addEvtListeners();
}

function addEvtListeners() {
    let buttons = document.querySelectorAll('.editPostBtn');
    console.log(buttons);
    buttons.forEach(function(button) {
        button.addEventListener('click', removePost);
    });
}

function removePost(e) {
    let key = e.currentTarget.id;
    console.log(key);
    database.ref('blogposts/' + key).remove();
}