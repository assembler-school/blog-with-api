import { getButtonsPagination } from './pagination.js'
import { loadPage } from '../index.js'

export let data;

export const getAllPosts = async (page = 1, limit = 9) => {

  let allPostHTML = ''
  let buttons = ''

  data = await fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`,{
    method: 'GET'
  })
  .then(res => {
    buttons = getButtonsPagination(res, page)
    return res.json()
  })
  .then(data => data)
  .catch(err => err)

  
  if (data.length > 0) {

    data.forEach(post => {
      allPostHTML += `
        <div class="post col-md-4" data-id="${post.id}">
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex justify-content-between flex-column">
              <div>
                <span class="h5">${post.title}</span>
                <p class="card-text">${post.body}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-id="${post.id}" data-action="view">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-id="${post.id}" data-action="edit">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      `
    })

    // Print the posts
    document.getElementById('blog').insertAdjacentHTML('afterbegin', allPostHTML)
    // Print pagination
    document.getElementById('pagination').insertAdjacentHTML('beforeend', buttons)
    // Listener
    document.querySelectorAll('#next, #prev').forEach(elm => elm.addEventListener('click', event => {
      loadPage(parseInt(event.target.getAttribute('data-page')))
    }))

    document.getElementById('blog').addEventListener('click', event => {
      let postId = event.target.getAttribute('data-id'); 
      if ( postId && event.target.type === 'button' ) {

        // View post
        if (event.target.getAttribute('data-action') === 'view') {
          location.hash = `post-${postId}`
        }
        // Edit post
        if (event.target.getAttribute('data-action') === 'edit') {
          location.hash = `entry-edit-${postId}`
        } 

      } 
    })
    
  }
}

