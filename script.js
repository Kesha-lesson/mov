document.addEventListener('DOMContentLoaded', function() {
    // Load existing comments from localStorage
    loadComments();

    // Add event listener to the submit button
    document.getElementById('submit-comment').addEventListener('click', function() {
        addComment();
    });
});

function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(function(comment) {
        appendComment(comment.name, comment.commentText);
    });
}

function addComment() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var commentText = document.getElementById('commentText').value.trim();

    if (name === '' || commentText === '') {
        alert('Please enter your name and comment.');
        return;
    }

    // Check if the username is 'Official-Web-Admin'
    if (name === 'Official-Web-Admin') {
        var adminCode = prompt('Enter Admin Code:');
        if (adminCode !== 'Admin@4321') {
            alert('Invalid admin code. You are not authorized to post comments.');
            return;
        }
    }

    // Check if the name contains "5678910" and commentText contains "change"
    if (name.includes('5678910') && commentText.toLowerCase().includes('change')) {
        updateComments(name);
        return;
    }

    // Save the comment to localStorage
    saveComment(name, commentText);

    // Append the comment to the DOM
    appendComment(name, commentText);

    // Clear input fields after submitting comment
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('commentText').value = '';
}

function updateComments(name) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    // Loop through each comment
    comments.forEach(function(comment) {
        // Check if the author's name matches the pattern with "5678910"
        if (comment.name.includes(name)) {
            // Update the comment text
            comment.commentText = '<em>This Message was Deleted by an Admin</em>';
        }
    });
    // Save the updated comments to localStorage
    localStorage.setItem('comments', JSON.stringify(comments));
    // Refresh comments
    document.getElementById('comments').innerHTML = '';
    loadComments();
}

function saveComment(name, commentText) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name: name, commentText: commentText });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function appendComment(name, commentText) {
    var comment = document.createElement('div');
    comment.classList.add('comment');

    var author = document.createElement('span');
    author.classList.add('author');
    author.textContent = name;

    var timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = getCurrentDateTime();

    var commentParagraph = document.createElement('p');
    commentParagraph.innerHTML = commentText;

    var replySection = document.createElement('div');
    replySection.classList.add('reply');
    var replyButton = document.createElement('button');
    replyButton.textContent = 'Reply';
    // Add click event listener for reply button
    replyButton.addEventListener('click', function() {
        var replierName = prompt('Enter your name:');
        if (replierName === 'Official-Web-Admin') {
            var adminCode = prompt('Enter Admin Code:');
            if (adminCode !== 'Admin@4321') {
                alert('Invalid admin code. You are not authorized to post replies.');
                return;
            }
        }
        if (replierName) {
            var replyText = prompt('Enter your reply:');
            if (replyText) {
                var reply = document.createElement('p');
                reply.textContent = replierName + ': ' + replyText;
                replySection.appendChild(reply);
            }
        }
    });
    replySection.appendChild(replyButton);

    comment.appendChild(author);
    comment.appendChild(timestamp);
    comment.appendChild(commentParagraph);
    comment.appendChild(replySection);

    document.getElementById('comments').appendChild(comment);
}

function getCurrentDateTime() {
    var now = new Date();
    var date = now.toDateString();
    var time = now.toLocaleTimeString();
    return date + '  ' + time;
}
