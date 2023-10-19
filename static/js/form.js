document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("comment-form");
    const postURL = window.location.href
    const post_id = postURL.substring(postURL.lastIndexOf('/') + 1);

    postForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const postData = new FormData(postForm);

        fetch("/new_comment/" + post_id, {
            method: "POST",
            body: postData,
            headers: {
                "X-CSRFToken": csrf
            },
            mode: 'same-origin'
        })
            .then(function (response) {
                if (response.statues === 200) {
                    
                }
                else if (response.status === 401) {
                    alert(response.text());
                }
            }).catch(function (error) {
                console.error("Error:", error);
            })
    });
});