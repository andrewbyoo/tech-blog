// Edit post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').innerHTML;
  const post_content = document.querySelector('#post-edit').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ post_content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard/post/${id}`);
  } else {
    alert('Could not update post.');
  }
};

document
  .querySelector('#edit-form')
  .addEventListener('submit', updateFormHandler);
