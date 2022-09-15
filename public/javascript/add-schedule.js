async function newFormHandler(event) {
    event.preventDefault();
  
    const date = document.querySelector('input[name="schedule-date"]').value;
    const time = document.querySelector('input[name="schedule-time"]').value;
  
    const response = await fetch(`/api/schedules`, {
      method: 'POST',
      body: JSON.stringify({
        date,
        time
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
  
  document.querySelector('.new-schedule-form').addEventListener('submit', newFormHandler);
  