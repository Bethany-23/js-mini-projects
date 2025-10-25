document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!role) {
    alert("Please select a role before signing up.");
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Signup successful! Please log in.");
    window.location.href = "index.html"; // redirect to login page
  } else {
    alert(data.error || "Signup failed!");
  }
});
