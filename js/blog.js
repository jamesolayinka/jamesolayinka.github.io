import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadPosts() {
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;

    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            postsList.innerHTML = '<p>No blog posts found.</p>';
            return;
        }

        postsList.innerHTML = ''; // Clear "No posts found" message

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';

            // Format date
            const dateStr = post.date || new Date().toLocaleDateString();

            postElement.innerHTML = `
                <div class="post-meta">${dateStr}</div>
                <h2 class="post-title"><a href="article.html?id=${doc.id}" style="text-decoration: none; color: inherit;">${post.title}</a></h2>
                <p>${post.description}</p>
                <a href="article.html?id=${doc.id}" class="read-more">Read more →</a>
            `;

            postsList.appendChild(postElement);
        });

    } catch (error) {
        console.error("Error loading posts:", error);
        postsList.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);
