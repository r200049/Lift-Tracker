/* Verify HTML content is loaded */
document.addEventListener("DOMContentLoaded", function(event) {
  subscribeToSubmit();
});

function subscribeToSubmit() {
  /* Subscribe to submit-button click event */
  document.getElementById("submit-button").addEventListener("click", () => {
    const nameInput = document.getElementById('name-input');
    const Name = nameInput.value;
    nameInput.value = '';

    const liftInput = document.getElementById('lift-type-input');
    const lift = liftInput.value;
    liftInput.value = '';

    const weightInput = document.getElementById('weight-input');  
    const weight = weightInput.value;
    weightInput.value = '';

    const repsInput = document.getElementById('reps-input');
    const reps = repsInput.value;
    repsInput.value = '';

    const body = {
      weight: weight,
      lift: lift,
      reps: reps,
      Name: Name
    };
    
    console.log(body);
    
    fetch('http://127.0.0.1:8082', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  });
}
