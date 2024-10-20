// import needed libs
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// import own main styles
import "./css/styles.css";

import { searchPhotos, nextPage } from "./js/pixabay-api.js";
import { createGallery, renderPaginator } from "./js/render-functions.js";

const sLightBox = new SimpleLightbox(
    '.gallery a',
    {
      overlayOpacity: 0.8,
      className: 'gallery-wrapper',
      captionsData: 'alt',
      captionDelay: 250
    }
);
iziToast.settings({
    class: "toast",
    position: "topRight",
    drag: false,
});

const theLoader = document.querySelector('.load_more span');
const theGallery = document.querySelector('.gallery');

var curPage = 1;

const loadMore = document.querySelector(".load_more button");
const nothingMoreMsg = "We're sorry, but you've reached the end of search results.";

document.getElementById("search-form").addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    const queryStr = form.elements.queryStr.value.trim();

    if (queryStr === "") {
        form.reset();
        return; // do nothing for empty query string
    }

    theLoader.classList.remove('visually-hidden');
    theGallery.classList.add('visually-hidden');   
    theGallery.innerHTML = '';
    loadMore.classList.add('visually-hidden'); 
    searchPhotos(queryStr)
        .then(data => {
            if (data.total == 0 || data.hits.length == 0) {
                iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
            } else { 
                curPage = 1;

                theGallery.innerHTML = createGallery(data.hits);
                theGallery.classList.remove("visually-hidden");
                sLightBox.refresh();

                renderPaginator({
                    loadButton: loadMore,
                    curPage: curPage, totalPages: data.totalPages,
                    iziToast: iziToast, msg: nothingMoreMsg
                });
            }
        })
        .catch(err => {
            iziToast.error({message: err.message});
         })
        .finally(() => {
            theLoader.classList.add('visually-hidden');
            form.reset()
        });
});

loadMore.addEventListener("click", e => { 
    e.preventDefault();

    theLoader.classList.remove('visually-hidden');
    loadMore.classList.add('visually-hidden'); 
    nextPage()
        .then(data => {
            curPage += 1;

            theGallery.insertAdjacentHTML("beforeend", createGallery(data.hits));
            sLightBox.refresh();

            const liRect = theGallery.querySelector("li:last-child").getBoundingClientRect();
            window.scrollBy(0, liRect.height*2);

            renderPaginator({
                loadButton: loadMore,
                curPage: curPage, totalPages: data.totalPages,
                iziToast: iziToast, msg: nothingMoreMsg
            });
        })
        .catch(err => { 
            iziToast.error({message: err.message});
        })
        .finally(() => {
            theLoader.classList.add('visually-hidden');
        });
});