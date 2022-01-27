// Comment on post
const commentFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').innerHTML;
  const comment_content = document.querySelector('#post-edit').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify({ comment_content }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/posts/${id}`);
  } else {
    alert('Could not update post.');
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);
