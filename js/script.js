const images = document.querySelectorAll('.product__slider-slide');
const sliderLine = document.querySelector('.product__slider-line');
let count = 0;
let width;
let totalSlides = images.length;
let nextBtn = document.querySelectorAll('.product__slider-button-next');
let prevBtn = document.querySelectorAll('.product__slider-button-prev');

const imagesPreview = document.querySelectorAll('.product__preview-slide');
const sliderLinePreview = document.querySelector('.product__preview-slider-line');
let countPreview = 0;
let widthPreview;
let totalSlidesPreview = imagesPreview.length;

function init() {
	console.log('resize');
	width = document.querySelector('.product__slider-window').offsetWidth;
	sliderLine.style.width = width * images.length + 'px';
	images.forEach(item => {
		item.style.width = width + 'px';
		item.style.height = 'auto';
	});
	rollSlider();
}

function initPreview() {
	console.log('resize');
	widthPreview = document.querySelector('.product__preview-container').offsetWidth;
	sliderLinePreview.style.width = widthPreview * imagesPreview.length + 'px';
	imagesPreview.forEach(item => {
		item.style.width = widthPreview + 'px';
		item.style.height = 'auto';
	});
	rollSliderPreview();
}

function rollSlider() {
	sliderLine.style.transition = 'transform 1s ease';
	sliderLine.style.transform = 'translate(-' + count * width + 'px)';
	updatePagination();
}

function rollSliderPreview() {
	sliderLinePreview.style.transition = 'transform 1s ease';
	sliderLinePreview.style.transform = 'translate(-' + countPreview * widthPreview + 'px)';
	updatePagination();
}

function updatePagination() {
	document.querySelector('.product__current-slide').textContent = countPreview + 1;
	document.querySelector('.product__total-slides').textContent = totalSlides;
}

init();
initPreview();
window.addEventListener('resize', function () {
	init();
	initPreview();
});

nextBtn.forEach(button => {
	button.addEventListener('click', function () {
		count++;
		countPreview++;
		if (count >= images.length) {
			count = 0;
		}
		if (countPreview >= imagesPreview.length - 5) {
			countPreview = 0;
		}
		rollSlider();
		rollSliderPreview();
	});
});

prevBtn.forEach(button => {
	button.addEventListener('click', function () {
		count--;
		countPreview--;
		if (count < 0) {
			count = images.length - 1;
		}
		if (countPreview < 0) {
			countPreview = imagesPreview.length - 6;
		}
		rollSlider();
		rollSliderPreview();
	});
});

imagesPreview.forEach((item, index) => {
	item.addEventListener('click', function () {
		count = index;
		if (count === images.length) {
			count = 0;
		}
		if (count > images.length) {
			count = (index + 1) % 5 - 1;
		}
		if (nextBtn = true) {
			countPreview = count;
		}
		if (prevBtn = true) {
			countPreview = count;
		}
		rollSlider();
	});
});

let startX, currentX, isDragging = false;

sliderLine.addEventListener('touchstart', touchStart);
sliderLine.addEventListener('touchmove', touchMove);
sliderLine.addEventListener('touchend', touchEnd);

sliderLinePreview.addEventListener('touchstart', touchStart);
sliderLinePreview.addEventListener('touchmove', touchMove);
sliderLinePreview.addEventListener('touchend', touchEnd);

function touchStart(event) {
	startX = event.touches[0].clientX;
	isDragging = true;
}

function touchMove(event) {
	if (!isDragging) return;
	currentX = event.touches[0].clientX;
	const diff = startX - currentX;
	
	const widthValue = widthPreview; // Используем ширину превью слайдера
	
	if (Math.abs(diff) > 20) {
		 event.preventDefault();
		 
		 const translate = -countPreview * widthValue + diff; // Используем countPreview для слайдера превью
		 sliderLinePreview.style.transition = 'none'; // Отключаем анимацию для превью слайдера
		 sliderLinePreview.style.transform = `translate(${translate}px)`;

		 const translateMain = -count * width + diff; // Используем count для основного слайдера
		 sliderLine.style.transition = 'none'; // Отключаем анимацию для основного слайдера
		 sliderLine.style.transform = `translate(${translateMain}px)`;
	}
}


function touchEnd() {
	if (!isDragging) return;
	isDragging = false;
	const diff = startX - currentX;
	const slider = event.target === sliderLine ? sliderLine : sliderLinePreview;
	const widthValue = slider === sliderLine ? width : widthPreview;

	if (Math.abs(diff) > widthValue / 3) {
		if (diff > 0) {
			count--;
			countPreview--;
		} else {
			count++;
			countPreview++;
		}
		if (count < 0) {
			count = 4;
			countPreview = 4;
		} else if (count > 4) {
			count = 0;
			countPreview = 0;
		}
	}

	rollSlider();
	rollSliderPreview();
}




