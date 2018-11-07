// Get current data
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let hh = today.getHours();
let min = today.getMinutes();
today = 'Posted at ' + mm + '-' + dd + '-' + yyyy + ' at ' + hh + ':' + mm + ' hr';


// Get firebase reference and create a child object called blogposts
let ref = firebase.database().ref('blogposts');
ref.on('value', printData);

let currentUserId = localStorage.getItem('currentUserId');;
// console.log(currentUserId);

// Get post button
const btnPost = document.getElementById('btnPost');

// Create function to collect data from input fields
function getBlogPostData() {
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
btnPost.addEventListener('click', getBlogPostData);

function printData(data) {
    let blogposts = data.val();
    let keys = Object.keys(blogposts);
    let blogParent = document.getElementById('blogResults');
    let blogContainer = document.getElementById('blogContainer');

    for(let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let titles = blogposts[k].title;
        let contents = blogposts[k].content;
        let dates = blogposts[k].date;
        let authors = blogposts[k].author;

        console.log(titles);
        console.log(contents);
        console.log(dates);
        console.log(authors);
        blogParent.innerHTML += "";
        blogContainer.innerHTML += titles + '<br>' + contents + '<br>' + dates + '<br>' + authors + '<br>' + '<hr>';
        blogParent.innerHTML += '<div class="lined">' +
                                '<h5>' + titles + '</h5>' +
                                '<p>' + contents + '</p>' +
                                '<h6>' + authors + '</h6>' +
                                '<h6>' + dates + '</h6>' +
                                '<button class="editPostBtn">Edit post</button>' +
                                '</div>';
    }
}



