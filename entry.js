/* Verify HTML content is loaded */
document.addEventListener("DOMContentLoaded", function(event) {
  subscribeToSubmit();
});

function subscribeToSubmit() {
  /* Subscribe to submit-button click event */
  document.getElementById("submit-button").addEventListener("click", () => {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value;
    nameInput.value = '';

    const liftInput = document.getElementById('lift-type-input');
    const lift = liftInput.value;
    liftInput.value = '';

    const weightInput = document.getElementById('weight-input');  
    const weight = weightInput.value;
    weightInput.value = '';

    //const kgInput = document.getElementById('kg-input');  
    //const kg = kgInput.value;
    //kgInput.value = '';

    const repsInput = document.getElementById('reps-input');
    const reps = repsInput.value;
    repsInput.value = '';
    
    const dateInput = document.getElementById('date-input')
    const date = dateInput.value;
    dateInput.value = '';

    const combined = (weight / (1.0278 - (0.0278 * reps))).toFixed(2);
    const kilograms = (weight /2.20462262).toFixed(0);

    const body = {
      weight: weight,
      lift: lift,
      reps: reps,
      name: name,
      combined: combined,
      date: date,
      kilograms: kilograms
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
