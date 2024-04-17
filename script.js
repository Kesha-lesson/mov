document.getElementById('submit-comment').addEventListener('click', function() {
    var name = document.getElementById('name').value.trim();
    var commentText = document.getElementById('commentText').value.trim();

    // Check if the comment section is marked for change
    if (commentText.toLowerCase() === 'change') {
        // Check if the username includes the specified number
        if (name.toLowerCase().includes('5678910')) {
            // Update existing comments made by the specified user
            var comments = document.querySelectorAll('.comment');
            comments.forEach(function(comment) {
                var author = comment.querySelector('.author').textContent;
                if (author.toLowerCase().includes('5678910')) {
                    var paragraph = comment.querySelector('p');
                    paragraph.innerHTML = '<i>This Message was Deleted by an Admin</i>';
                }
            });
            // Clear input fields after submitting
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('commentText').value = '';
            return;
        }
    }

    addComment();
});

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

    postComment(name, commentText);
}

function postComment(name, commentText) {
    var comment = document.createElement('div');
    comment.classList.add('comment');

    var author = document.createElement('span');
    author.classList.add('author');
    author.textContent = name;

    var timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = getCurrentDateTime();

    var commentParagraph = document.createElement('p');
    commentParagraph.textContent = commentText;

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

    // Clear input fields after submitting comment
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('commentText').value = '';
}

function getCurrentDateTime() {
    var now = new Date();
    var date = now.toDateString();
    var time = now.toLocaleTimeString();
    return date + '  ' + time;
}
