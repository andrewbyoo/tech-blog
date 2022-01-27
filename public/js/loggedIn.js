// Logout function on click
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);

// Edit post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').value;
  const editedContent = document.querySelector('#post-edit').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ post_content: editedContent }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard/post/${id}`);
  } else {
    alert('Could not update post.');
  }

};

document
  .querySelector('.edit-form')
  .addEventListener('submit', updateFormHandler);
