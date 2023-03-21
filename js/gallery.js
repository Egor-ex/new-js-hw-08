import gallery from './gallery-items.js';
// // Разбей задание на несколько подзадач:

// // Создание и рендер разметки по массиву данных galleryItems
// // из app.js и предоставленному шаблону.

// // Реализация делегирования на галерее ul.js-gallery и
// // получение url большого изображения.

// // Открытие модального окна по клику на элементе галереи.

// // Подмена значения атрибута src элемента img.lightbox__image.

// // Закрытие модального окна по клику на кнопку
// // button[data - action= "close-lightbox"].

// // Очистка значения атрибута src элемента img.lightbox__image.
// // Это необходимо для того, чтобы при следующем открытии модального окна,
// // пока грузится изображение, мы не видели предыдущее.

const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('.lightbox__button');
const overlayModal = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGalleryMurkup(gallery);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMurkup(e) {
	return e
		.map(({ preview, original, description }) => {
			return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>
        `;
		})
		.join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(e) {
	// console.log(e.target);
	const isGallerySwatchEl = e.target.classList.contains('gallery__image');

	if (!isGallerySwatchEl) {
		return;
	}
}

// /Открытие модального окна

galleryContainer.addEventListener('click', onOpenModal);

function onOpenModal(e) {
	e.preventDefault();

	// console.log(e.target.nodeName);
	if (e.target.nodeName !== 'IMG') {
		return;
	}

	lightbox.classList.add('is-open');
	lightboxRef.src = e.target.dataset.source;
	lightboxRef.alt = e.target.alt;
	imgSlide(e);
}

// Закрытие модального окна

closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal(e) {
	lightbox.classList.remove('is-open');
	lightboxRef.src = '';
}

// Закрытие модального окна по бекдроп

overlayModal.addEventListener('click', closeModalOnOverlay);

function closeModalOnOverlay(e) {
	if (e.currentTarget === e.target) {
		onCloseModal();
	}
}

// Закрытие модального окна по Escape

galleryContainer.addEventListener('keydown', CloseModalOnEsc);

function CloseModalOnEsc(event) {
	if (event.code === 'Escape') {
		onCloseModal();
	}
}

//Сеняем карнтинку на следующую
