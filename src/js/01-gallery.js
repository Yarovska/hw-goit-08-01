// Add imports below this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";


// Extra styles import
import 'simplelightbox/dist/simple-lightbox.min.css';


// Change code below this line
const refs = {
  gallery: document.querySelector('.gallery'),
};
refs.gallery.style.listStyle = "none";

const items = galleryItems.map(({preview, original, description}) => {
    return `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}"
      /></a></li>`;
  }).join('');

refs.gallery.insertAdjacentHTML("beforeend", items) ;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
