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

// Add post
const addFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const title = document.getElementById('title').value.trim();
  const post_content = document.getElementById('post_content').value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#add-form')
  .addEventListener('submit', addFormHandler);

// Edit post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').value;
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
