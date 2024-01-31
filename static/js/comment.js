document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("comment-form");
    const postURL = window.location.href
    const post_id = postURL.substring(postURL.lastIndexOf('/') + 1);

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // setup comment payload
        const commentData = new FormData(commentForm);

        fetch("/new_comment/" + post_id, {
            method: "POST",
            body: commentData,
            headers: {
                "X-CSRFToken": csrf
            },
            mode: 'same-origin'
        }).then(response => response.json())
          .then((data) => {
            if (data.success) {
                window.location.reload();
            }
            else {
                alert(data.text());
            }
          })
        .catch((error) => {
            console.error(error);
        });
    });
});