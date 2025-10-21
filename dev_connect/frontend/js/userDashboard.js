const token = localStorage.getItem("token");
if(!token) window.location.href = "login.html";

const postsList = document.getElementById("posts-list");
const commentForm = document.getElementById("comment-form");
const postSelect = document.getElementById("post-select");

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// fetch posts
async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const posts = await res.json();
  postsList.innerHTML = "";
  postSelect.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = post.title;
    postsList.appendChild(li);

    const option = document.createElement("option");
    option.value = post._id;
    option.textContent = post.title;
    postSelect.appendChild(option);
  });
}

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("comment-text").value;
  const postId = postSelect.value;

  const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  if(res.ok) {
    alert("Comment added!");
    commentForm.reset();
  } else {
    alert("Failed to add comment");
  }
});

loadPosts();
