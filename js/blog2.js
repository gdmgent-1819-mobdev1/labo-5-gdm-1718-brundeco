// Get current data
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let hh = today.getHours();
let min = today.getMinutes();
let blogpostId;
let dbRefObject = firebase.database().ref().child('blogpostId');
let blogContainer = document.getElementById('blogContainer');

dbRefObject.on('value', snap => {
    blogpostId = snap.val() + 1;
    amountBlog = snap.val();
    amountBlog2 = amountBlog;
    console.log(amountBlog2);
});

console.log(blogpostId);
// Get firebase reference and create a child object called blogposts
const database = firebase.database();
let currentUserId = localStorage.getItem('currentUserId');;
console.log(currentUserId);

// Get post button
const btnPost = document.getElementById('btnPost');

// Create function to collect data from input fields
function fetchBlogPostData() {
    // Put current data in a string
    console.log(blogpostId);
    firebase.database().ref('blogpostId').set(blogpostId);
    let ref = database.ref('blogposts/blogIndex' + blogpostId);
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
dbRefObject.on('value', writeBlogPost, errData);
function writeBlogPost(data) {
    let posts = data.val();
    let keys = Object.keys(posts);
    blogResults.innerHTML = "";
    // loop through contents of each post
    for(let i = 0; i < blogpostId; i++) {
        blogContainer.innerHTML = "<div>";
        firebase.database().ref.child('blogpostId/blogIndex' + i + '/authors').on('value', snap =>{
           blogContainer.innerHTML += snap.val();
        })
        firebase.database().ref.child('blogpostId/blogIndex' + i + '/contents').on('value', snap =>{
            blogContainer.innerHTML += snap.val();
        })
        firebase.database().ref.child('blogpostId/blogIndex' + i + '/dates').on('value', snap =>{
            blogContainer.innerHTML += snap.val();
        })
        firebase.database().ref.child('blogpostId/blogIndex' + i + '/titles').on('value', snap =>{
            blogContainer.innerHTML += snap.val();
        })
        blogContainer.innerHTML += "</div>";
        let k = keys[i];
        let titles = posts[k].title;
        let contents = posts[k].content;
        let dates = posts[k].date;
        let authors = posts[k].author;

        // create a main container
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'lined');
        

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
        blogResults.appendChild(mainDiv);
        // blogPostSuccessful();
    }
}

function pushBlogPost() {

}

function errData(err) {
    console.log('error!');
    console.log(err);
}



