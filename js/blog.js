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

// Create function to collect data from input fields
function fetchBlogPostData() {
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
        author: blogAuthor
    }
    // Push the object data to firebase database
    ref.push(blogData);
    console.log(ref);
}
    // add event listener to post button
    btnPost.addEventListener('click', fetchBlogPostData);


// check for value changes in firebase database
ref.on('value', writeBlogPost, errData);

function writeBlogPost(data, uid) {
    let posts = data.val();
    let keys = Object.keys(posts);
    
    // loop through contents of each post
    for(let i = 0; i < keys.length; i++) {

        let k = keys[i];
        let titles = posts[k].title;
        let contents = posts[k].content;
        let dates = posts[k].date;
        let authors = posts[k].author;

        // create a main container
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'lined');
        blogResults.removeChild
        blogResults.appendChild(mainDiv);

        // create variables that hold the blogpost object data
        let displayBlogTitle = '<h5>' +  titles  + '</h5>';
        let displayBlogContent =  '<p>' + contents + '</p>';
        let displayBlogDate = '<h6>' + dates + '</h6>';
        let displayBlogAuthor = 'Author: <a>' + authors + '</a>';
        let edit = '<button class="editPostBtn">' + 'Edit post' + '</button>';

        // add content to maindiv
        mainDiv.innerHTML += displayBlogTitle;
        mainDiv.innerHTML += displayBlogContent;
        mainDiv.innerHTML += displayBlogDate;
        mainDiv.innerHTML += displayBlogAuthor;
        mainDiv.innerHTML += edit;

        // blogPostSuccessful();
    }
}

function errData(err) {
    console.log('error!');
    console.log(err);
}



