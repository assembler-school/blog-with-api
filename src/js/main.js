import { fetchPosts, fetchUser, fetchComments, modifyPost} from "./api.js";
import { createPost, addPaginators, updatePostsDisplay, updateDisplay, startNumberPagination, endNumberPagination } from "./utils.js";

const postList = document.getElementById("postList");
const btnComments = document.getElementById("btnComents");
const commentsUl = document.getElementById("modal__comments");
const saveBtn = document.getElementById("saveBtn");
const modifyTitle = document.getElementById("modifyTitle");
const modifyBody = document.getElementById("modifyBody");

const getPosts = (startNumber, endNumber) => {
  fetchPosts().then((data) => {
    // console.log(data);
    data.forEach((post, index) => {
      if (index >= startNumber && index < endNumber) {
        const liElement = createPost(
          post.userId,
          post.id,
          post.title,
          post.body,
          index
        );
        postList.append(liElement);
      }
    });
    addMultiEvents();
  });
};



function addMultiEvents() {
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modal__post_body");
  const userName = document.getElementById("user_name");
  const userEmail = document.getElementById("user_email");



  Array.from(postList.children).map((post) => {
    const title = post.querySelector("h3");
    const modifyBtn = post.querySelector("[data-modify]");
    const body = title.nextElementSibling;
    modifyBtn.addEventListener("click", (e)=>{
      let id = e.target.getAttribute("data-id");
      modifyTitle.value = title.textContent;
      modifyBody.value = body.textContent;
      modifyTitle.setAttribute("data-id", id);
    });



    title.addEventListener("click", (e) => {
      
      if (btnComments.classList.value.includes("hide")){
        btnComments.classList.remove("hide");
        commentsUl.classList.add("hide");
        }
      
      let user = fetchUser(e.target.getAttribute("data-userId"));
      user.then((data) => {
        userName.textContent = data[0].username;
        userEmail.textContent = data[0].email.toLowerCase();
      });
      btnComments.setAttribute("data-postId",`${e.target.getAttribute("data-id")}`);
      modalTitle.textContent = e.target.textContent;
      modalBody.textContent = e.target.nextSibling.textContent;
    });

  });

}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("modifyTitle");
  const body = document.getElementById("modifyBody");
  const id = title.getAttribute("data-id")

  modifyPost(id, title.value, body.value);
  updatePostsDisplay();
  getPosts(startNumberPagination, endNumberPagination)
})

btnComments.addEventListener("click", (e) => {
  commentsUl.classList.toggle("hide");
  btnComments.classList.toggle("hide");
  let postId = e.target.getAttribute("data-postId");
  fetchComments(postId).then((data) => {
    console.log(data);
    updateDisplay();
    data.forEach(dataComment=> {
      const commentsLi = document.createElement("li");
      const commentsTitle = document.createElement("p");
      const commentsBody = document.createElement("p");
      const commentsUser = document.createElement("p");
      commentsTitle.textContent=`Title: ${dataComment.name}`;
      commentsBody.textContent=`Comment: ${dataComment.body}`;
      commentsUser.textContent=`e.mail: ${dataComment.email}`;
      commentsLi.append(commentsTitle, commentsBody, commentsUser);
      commentsUl.appendChild(commentsLi);
      commentsUl.classList.add("comments__ul")
      commentsUl.setAttribute("data-bs-spy","scroll")
      commentsUl.setAttribute("data-target",".navbar")
      commentsUl.setAttribute("data-offset","'50'")
      commentsLi.classList.add("comments__li");
      commentsTitle.classList.add("comments__title");
      commentsUser.classList.add("comments_user")
      // commentsTitle,
    })

  });
})

getPosts(0, 10);
addPaginators();

export { getPosts, postList, commentsUl};
