const token = localStorage.getItem("token");
const apiBase = "http://localhost:5000/api";

if (!token) {
  alert("Please log in first!");
  window.location.href = "login.html";
}

// 🧭 Decode JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

const user = parseJwt(token);

// 🔹 Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// 🔹 Create Post
document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch(`${apiBase}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Post created!");
    document.getElementById("post-form").reset();
    loadPosts();
  } else {
    console.error("Post creation error:", data);
    alert(data.error || "Failed to create post");
  }
});

// 🔹 Load All Posts
async function loadPosts() {
  try {
    const res = await fetch(`${apiBase}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Backend error:", err);
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    console.log("Fetched posts:", posts);

    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = "<p>No posts yet.</p>";
      return;
    }

    posts.forEach((post) => {
      const div = document.createElement("div");
      div.classList.add("post-card");

      div.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.content}</p>
        <small>by ${post.createdBy === user.id ? "You" : post.createdBy}</small>
        ${
          post.createdBy === user.id
            ? `<button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">Edit</button>
               <button onclick="deletePost('${post._id}')">Delete</button>`
            : ""
        }
        <div class="comments-section">
          <h5>Comments:</h5>
          <ul id="comments-${post._id}">
            ${
              post.comments?.length
                ? post.comments
                    .map(
                      (c) => `
                    <li>${c.text} - ${
                        c.createdBy === user.id ? "You" : c.createdBy
                      }
                      ${
                        c.createdBy === user.id
                          ? `<button onclick="deleteComment('${post._id}', '${c._id}')">Delete</button>`
                          : ""
                      }
                    </li>`
                    )
                    .join("")
                : "<li>No comments yet.</li>"
            }
          </ul>
          <form onsubmit="addComment(event, '${post._id}')">
            <input type="text" placeholder="Write a comment..." id="comment-${post._id}" required />
            <button type="submit">Add</button>
          </form>
        </div>
        <hr/>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Frontend error:", err);
  }
}

loadPosts();

// 🔹 Edit Post
async function editPost(id, oldTitle, oldContent) {
  const title = prompt("Edit title:", oldTitle);
  const content = prompt("Edit content:", oldContent);
  if (!title || !content) return;

  const res = await fetch(`${apiBase}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (res.ok) loadPosts();
  else alert("Failed to update post");
}

// 🔹 Delete Post
async function deletePost(id) {
  if (!confirm("Delete this post?")) return;

  const res = await fetch(`${apiBase}/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) loadPosts();
  else alert("Failed to delete post");
}

// 🔹 Add Comment
async function addComment(e, postId) {
  e.preventDefault();
  const commentInput = document.getElementById(`comment-${postId}`);
  const text = commentInput.value;

  const res = await fetch(`${apiBase}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (res.ok) {
    commentInput.value = "";
    loadPosts();
  } else {
    alert("Failed to add comment");
  }
}

// 🔹 Delete Comment
async function deleteComment(postId, commentId) {
  if (!confirm("Delete this comment?")) return;

  const res = await fetch(`${apiBase}/comments/${postId}/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) loadPosts();
  else alert("Failed to delete comment");
}
