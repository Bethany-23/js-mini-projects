const adminToken = localStorage.getItem("token");
if(!adminToken) window.location.href = "login.html";

const postsListAdmin = document.getElementById("posts-list");

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// fetch all posts
async function loadAllPosts() {
  const res = await fetch("http://localhost:5000/api/posts", {
    headers: { "Authorization": `Bearer ${adminToken}` }
  });
  const posts = await res.json();
  postsListAdmin.innerHTML = "";

  posts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = post.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Post";
    deleteBtn.addEventListener("click", async () => {
      const delRes = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${adminToken}` }
      });
      if(delRes.ok) loadAllPosts();
    });

    li.appendChild(deleteBtn);
    postsListAdmin.appendChild(li);
  });
}

loadAllPosts();
