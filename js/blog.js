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
    const blogContent = document.getElementById('blogBody').value;
    const blogAuthor = localStorage.getItem('currentUser');
    const blogDate = today;
    console.log(blogBody);

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
btnPost.addEventListener('click', writeBlogPost);

// get the elements to append blogdata to
const displayBlogTitle = document.getElementById('displayBlogTitle');
const displayBlogContent = document.getElementById('displayBlogContent');
const displayBlogDate = document.getElementById('displayBlogDate');
const displayBlogAuthor = document.getElementById('displayBlogAuthor');
const blogResults = document.getElementById('blogResults');

// listen to the value event of ref element
ref.on('value', gotData, errData);

function gotData(data) {
    // console.log(data.val());
    let posts = data.val();
    let keys = Object.keys(posts);

    for(let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let titles = posts[k].title;
        let contents = posts[k].content;
        let dates = posts[k].date;
        let authors = posts[k].author;

        console.log(titles);
        console.log(authors);
        console.log(dates);
        console.log(contents);

        let mainDiv = document.createElement('div');
        blogResults.appendChild(mainDiv);

        let displayBlogTitle = document.createElement('h5').innerHTML = titles;
        let displayBlogContent = document.createElement('h5').innerHTML = contents[0];
        let displayBlogDate = document.createElement('h5').innerHTML = dates;
        let displayBlogAuthor = document.createElement('h5').innerHTML = authors;
        
        console.log(displayBlogTitle);
        console.log(displayBlogContent);
        console.log(displayBlogDate);
        console.log(displayBlogAuthor);

        mainDiv.appendChild(displayBlogTitle);
        mainDiv.appendChild(displayBlogContent);
        mainDiv.appendChild(displayBlogDate);
        mainDiv.appendChild(displayBlogAuthor);
    }
}

function errData(err) {
    console.log('error!');
    console.log(err);
}