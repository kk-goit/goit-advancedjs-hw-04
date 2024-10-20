
function createGallery(photos) { 
  var galHtml = '';
  for (const imgData of photos) { 
    galHtml += `<li class="gallery-item">
      <a class="gallery-link" href="${imgData.largeImageURL}">
        <img class="gallery-image" src="${imgData.webformatURL}" alt="${imgData.tags}">
      </a>
      <div class="gallery-descr">
        <div><span>Likes</span>${imgData.likes}</div>
        <div><span>Views</span>${imgData.views}</div>
        <div><span>Comments</span>${imgData.comments}</div>
        <div><span>Downloads</span>${imgData.downloads}</div>
      </div>
    </li>`;
  }
  return galHtml;
}

function renderPaginator(params) { 
  const { loadButton, curPage, totalPages, iziToast, msg } = params;
  if (curPage < totalPages) { 
    // have more data
    loadButton.classList.remove("visually-hidden");
  } else {
    // last page
    loadButton.classList.add("visually-hidden");
    iziToast.info({message: msg})
  }
}

export { createGallery, renderPaginator }

