// Commenting on a post
async function commentFormHandler(event) {
  event.preventDefault();

  const comment = document
    .querySelector('input[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(comment, post_id);

  if (comment) {
    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector("#comment-form").style.display = "block";
    }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);

//   ---------------------------------------------------------------------
