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
    const weightLbs = weightInput.value;
    weightInput.value = '';
   
    const weightKg = (weightLbs /2.20462262).toFixed(0);


    const repsInput = document.getElementById('reps-input');
    const reps = repsInput.value;
    repsInput.value = '';


    const combined = (weightLbs / (1.0278 - (0.0278 * reps))).toFixed(2);
    

    const body = {
      name: name,
      lift: lift,
      weightLbs: weightLbs,
      weightKg: weightKg,
      reps: reps,
      combined: combined
    };
   
    console.log(body);
   
    fetch('http://127.0.0.1:8083', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  });
}
