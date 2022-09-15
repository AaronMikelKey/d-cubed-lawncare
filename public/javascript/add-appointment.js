async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="appointment-title"]').value;
    const service = document.querySelector('input[name="service"]').value;
  
    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        service
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-appointment-form').addEventListener('submit', newFormHandler);
  