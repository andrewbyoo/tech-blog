const delButtonHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').innerHTML;
  console.log(id)

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete project');
  }

};

document
  .querySelector('#deleteBtn')
  .addEventListener('click', delButtonHandler);
