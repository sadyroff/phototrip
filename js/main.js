// WEBP -----------------------------------------------------

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


// IBG -----------------------------------------------------

function isIE() {
	return (ua = navigator.userAgent).indexOf("MSIE ") > -1
		|| ua.indexOf("Trident/") > -1;
}
function ibg() {
	if (isIE()) {
		let t = document.querySelectorAll(".ibg");
		for (var e = 0; e < t.length; e++) t[e].querySelector("img") && null != t[e].querySelector("img").getAttribute("src") && (t[e].style.backgroundImage = "url(" + t[e].querySelector("img").getAttribute("src") + ")");
	}
}

isIE() && document.querySelector("body").classList.add("ie"),
	ibg();

// HEADER FIXED -----------------------------------------------------

const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
	if (entries[0].isIntersecting) {
		headerElement.classList.remove('fixed');
	} else {
		headerElement.classList.add('fixed');
	}
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);


// BURGER -----------------------------------------------------

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
if (hamburger) {
	hamburger.addEventListener('click', function () {
		document.body.classList.toggle('lock');
		hamburger.classList.toggle('active');
		menu.classList.toggle('active');
	});
}

// SMOOTH SCROLL -----------------------------------------------------

const menuLinks = document.querySelectorAll('.menu__link[data-scroll]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
			const scrollTo = document.querySelector(menuLink.dataset.scroll);
			const scrollToValue = scrollTo.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (hamburger.classList.contains('active')) {
				document.body.classList.remove('lock');
				hamburger.classList.remove('active');
				menu.classList.remove('active');
			}

			window.scrollTo({
				top: scrollToValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

window.onload = function () {
	const anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const blockID = anchor.getAttribute('href').substr(1)

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
};