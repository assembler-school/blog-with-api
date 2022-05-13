"use strict";

// DOM elements
const mainContainer = document.getElementById("mainContainer");
const postMain = document.getElementById("postMain");

const postModal = document.getElementById("postModal");

// -----------------
// Global Arrays from fecth
// let usersArray = [];
// let usersArray = fetchUsers();

// fetchUsers();

let postsArray = [];

// usersArray.forEach((user) => {
//   console.log(user);
// });

const fetchPosts = fetch("http://localhost:3000/posts");
fetchPosts
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // console.log(data);
    data.map((post) => {
      //   console.log(post);
      // postsArray.push(post);
      const title = post.title;
      const body = post.body;
      const postId = post.userId;
      // console.log(postId);

      const postTitle = document.createElement("h2");
      postTitle.setAttribute("id", `${postId}`);
      // console.log(postTitle);
      const postBody = document.createElement("p");

      postTitle.textContent = title;
      postBody.textContent = body;

      postMain.append(postTitle);
      postMain.append(postBody);
      mainContainer.append(postMain);
    });
  });

// ---------------------
// ---------------------
//   MODAL POSTS

const modalPosts = document.getElementById("modalPosts");

postMain.addEventListener("click", function (e) {
  console.log(e.target.id);
  modalPosts.show();

  // let user = fetchUsers(e.target.id);
  fetchUsers(e.target.id);
  // console.log(user);
  // user.then((data) => console.log(data));

  //
});

// ------------------------------
// ------------------------------
// Functions

async function fetchUsers(userId) {
  const userPromise = await fetch(`http://localhost:3000/users/${userId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // return data;
      createPost(data);
    });
}

function createPost(obj) {
  console.log(obj.email);
}
