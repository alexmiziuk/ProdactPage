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

sliderLine.addEventListener('touchstart', touchStart, { passive: true });
sliderLine.addEventListener('touchmove', touchMove, { passive: true });
sliderLine.addEventListener('touchend', touchEnd, { passive: true });

sliderLinePreview.addEventListener('touchstart', touchStart, { passive: true });
sliderLinePreview.addEventListener('touchmove', touchMove, { passive: true });
sliderLinePreview.addEventListener('touchend', touchEnd, { passive: true });

function touchStart(event) {
	startX = event.touches[0].clientX;
	isDragging = true;
}

function touchMove(event) {
	if (!isDragging) return;
	currentX = event.touches[0].clientX;
	const diff = startX - currentX;

	const widthValue = widthPreview; // Use the slider preview width
	if (Math.abs(diff) > 20) {
		event.preventDefault();

		const translate = -countPreview * widthValue + diff; // Use countPreview for the preview slider
		sliderLinePreview.style.transition = 'none'; // Disable animation for slider previews
		sliderLinePreview.style.transform = `translate(${translate}px)`;

		const translateMain = -count * width + diff; // Use count for the main slider
		sliderLine.style.transition = 'none'; // Disable animation for the main slider
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

// pallets-slider

function setupPalletsSlider() {
	const imagesPallets = document.querySelectorAll('.product__info-pallets-slide');
	const sliderLinePallets = document.querySelector('.product__info-pallets-slider-line');
	let countPallets = 0;
	let widthPallets;

	function initPallets() {
		 console.log('resize');
		 widthPallets = document.querySelector('.product__info-pallets-slider').offsetWidth;
		 sliderLinePallets.style.width = widthPallets * imagesPallets.length + 'px';
		 imagesPallets.forEach(item => {
			  item.style.width = widthPallets + 'px';
			  item.style.height = '44px';
		 });
		 rollSliderPallets();
	}

	function rollSliderPallets() {
		 sliderLinePallets.style.transform = 'translate(-' + countPallets * widthPallets + 'px)';
	}

	initPallets();
	window.addEventListener('resize', initPallets);

	document.querySelector('.product__info-pallets-next').addEventListener('click', function () {
		 countPallets++;
		 if (countPallets >= imagesPallets.length) {
			  countPallets = 0;
		 }
		 rollSliderPallets();
	});

	document.querySelector('.product__info-pallets-prev').addEventListener('click', function () {
		 countPallets--;
		 if (countPallets < 0) {
			  countPallets = imagesPallets.length - 1;
		 }
		 rollSliderPallets();
	});
}

// Call the function to set the slider
setupPalletsSlider();


//button product__info-custom-btn

function setupInfoCustomButton() {
	const infoCustomBtn = document.querySelector('.product__info-custom-btn');
	const palletsWrapper = document.querySelector('.product__info-pallets-wrapper');
	
	// Check if the block is hidden. If not, hide it
	if (!palletsWrapper.classList.contains('product__info-pallets-wrapper--hidden')) {
		 palletsWrapper.classList.add('product__info-pallets-wrapper--hidden');
	}
	
	// Add event handler for the button click event
	infoCustomBtn.addEventListener('click', function () {
		 // Toggle visibility class based on button click
		 if (palletsWrapper.classList.contains('product__info-pallets-wrapper--hidden')) {
			  palletsWrapper.classList.remove('product__info-pallets-wrapper--hidden');
			  palletsWrapper.classList.add('product__info-pallets-wrapper--visible');
			  infoCustomBtn.classList.add('product__info-belt-width--active');
		 } else {
			  palletsWrapper.classList.remove('product__info-pallets-wrapper--visible');
			  palletsWrapper.classList.add('product__info-pallets-wrapper--hidden');
			  infoCustomBtn.classList.remove('product__info-belt-width--active');
		 }
	});
}

// Call the function to customize the button
setupInfoCustomButton();

// slider bedSectionLength
function setupBedSlider() {
	const imagesBedSectionLength = document.querySelectorAll('.product__info-bed-slide');
	const sliderLineBed = document.querySelector('.product__info-bed-slider-line');
	const beltButtons = document.querySelectorAll('.product__info-belt-width');
	let countBed = 0;
	let widthBed;

	function initBed() {
		 console.log('resize');
		 widthBed = document.querySelector('.product__info-bed-slider').offsetWidth;
		 sliderLineBed.style.width = widthBed * imagesBedSectionLength.length + 'px';
		 imagesBedSectionLength.forEach(item => {
			  item.style.width = widthBed + 'px';
			  item.style.height = '44px';
		 });
		 rollSliderBed();
	}

	function setActiveButton(index) {
		 beltButtons.forEach(button => {
			  button.classList.remove('product__info-belt-width--active');
		 });
		 beltButtons[index].classList.add('product__info-belt-width--active');
	}

	function rollSliderBed() {
		 sliderLineBed.style.transform = 'translate(-' + countBed * widthBed + 'px)';
	}

	initBed();
	window.addEventListener('resize', initBed);

	document.querySelector('.product__info-bed-next').addEventListener('click', function () {
		 countBed++;
		 if (countBed >= imagesBedSectionLength.length) {
			  countBed = 0;
		 }
		 rollSliderBed();
		 setActiveButton(countBed);
	});

	document.querySelector('.product__info-bed-prev').addEventListener('click', function () {
		 countBed--;
		 if (countBed < 0) {
			  countBed = imagesBedSectionLength.length - 1;
		 }
		 rollSliderBed();
		 setActiveButton(countBed);
	});

	beltButtons.forEach((button, index) => {
		 button.addEventListener('click', function () {
			  countBed = index;
			  rollSliderBed();
			  setActiveButton(countBed);
		 });
	});
}
setupBedSlider();






