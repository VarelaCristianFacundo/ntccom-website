document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const apiUrl =
    "https://v1.nocodeapi.com/bootcoop/google_sheets/gRLcUpIymIlVoBrX?tabId=contacto";
  const statusMessage = document.createElement("div");
  form.appendChild(statusMessage); // Agregar un div para mostrar mensajes

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitamos el envío por defecto

    const formData = new FormData(form);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    statusMessage.innerText = "Sending..."; // Mostrar mensaje de envío

    console.log(formData);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        [
          firstName,
          lastName,
          email,
          phone,
          message,
          new Date().toLocaleString(),
        ],
      ]),
    });

    if (response.ok) {
      statusMessage.innerText = "Form submitted successfully!";
      form.reset(); // Reseteamos el formulario después de enviar
    } else {
      statusMessage.innerText = "There was an error submitting the form.";
    }
  });
});
