// Function to handle form submission and POST to the server
document
  .getElementById("email-form")
  .addEventListener("submit", function (event) {
    console.log("Form submitted");
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Convert form object to JSON
    const jsonData = JSON.stringify(formObject);
    console.log({jsonData});

    // Send the JSON data to the server using fetch
    fetch("/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Assuming the response contains a key 'html' with the new HTML
        if (data.html) {
          // Update the parent div with the new HTML
          document.getElementById("registration-form-container").innerHTML =
            data.html;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
