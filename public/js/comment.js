// Comment on post
const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('#post-id').innerHTML;
  const comment_content = document.querySelector('#comment_content').value.trim();

  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      comment_content,
      post_id
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Could not add comment.');
    console.log(err);
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);
