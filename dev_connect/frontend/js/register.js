// document.getElementById("signup-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch("http://localhost:5000/api/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await res.json();

//   if (res.ok) {
//     alert("Signup successful! Please log in.");
//     window.location.href = "login.html";
//   } else {
//     alert(data.error);
//   }
// });
