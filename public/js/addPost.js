// Add post
const addFormHandler = async (event) => {
  event.preventDefault();

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
