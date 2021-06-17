// Signup form handler
async function signupFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(name, password);
  if (name && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("success");

      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);

// --------------------------------------------------------------------
