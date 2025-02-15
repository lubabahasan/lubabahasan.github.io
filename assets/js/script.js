/*jslint browser:true */

$(document).ready(function () {
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 10;
	var $menuButton = $('button.navbar-toggle');
	var $menuIcon = $('.navbar-toggle .glyphicon');
	var $collapsedMenuItem = $('.navbar-collapse.collapse li');
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var $scrollButton = $('.scroll');
	var $socialIcon = $('.social');

	// Fixed Nav after scroll
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgb(27, 38, 50, 0.9)');
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;

	// Mobile Menu functions
	function openMenu() {
		$menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
		$modalBackdropDiv.css('z-index', 900);
		$body.append($modalBackdropDiv);

		// Close menu after clicking modal-backdrop
		$modalBackdropDiv.on('click', function () {
			$('.navbar-toggle').click();
			closeMenu();
		});
	}
	function closeMenu() {
		$menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
		$modalBackdropDiv.css('z-index', 1025).remove();
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'transparent');
		}
	}
	// Mobile Menu Icon Toggle
	$menuButton.on('click', function () {
		if ($menuIcon.hasClass('glyphicon-menu-hamburger')) {
			openMenu();
			// Close menu after clicking a link
			$collapsedMenuItem.on('click', function () {
				$('.navbar-toggle').click(); // Trigger collapse animation
				closeMenu();
			});
		} else {
			closeMenu();
		}
	});
	// Collapse menu on resize
	$(window).resize(closeMenu());

	// Smooth scroll to content
	$scrollButton.on('click', function (e) {
		e.preventDefault();
		var $link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $($link).offset().top - 55
		}, 900);
	});

	// Social icons hover effect
	$socialIcon.on({
		'focus mouseenter': function () {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -18) + 'color.png?raw=true'; // Remove 'black.svg' from end and add 'color.svg'
			$iconImg.attr('src', $href);
		},
		'blur mouseleave': function () {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -18) + 'black.png?raw=true';
			$iconImg.attr('src', $href);
		}
	});

	// Center modals vertically
	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find('.modal-dialog');
		var $offset = ($(window).height() - $dialog.height()) / 2;
		var $bottomMargin = parseInt($dialog.css('margin-bottom'), 10);

		// If modal is taller than screen height, top margin = bottom margin
		if ($offset < $bottomMargin) {
			$offset = $bottomMargin;
		}
		$dialog.css('margin-top', $offset);
	}

	$(document).on('show.bs.modal', '.modal', centerModal);
	$(window).on('resize', function () {
		$('.modal:visible').each(centerModal);
	});
});

// Typewriter effect

var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 4);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 300;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #9cc9c9}";
	document.body.appendChild(css);
};

// Typewriter effect ends


// SVG animation
window.addEventListener('load', () => {
	const svgContents = document.getElementById('svg-contents');
	setTimeout(() => {
		svgContents.classList.add('translated');
	}, 1000); // Delay of 1 second
});

// Blink animation
const dom = {
	eye: document.querySelectorAll(".eye"),
	eyeRight: document.querySelector(".eye-right"),
	eyeLeft: document.querySelector(".eye-left"),
	eyeRight2: document.querySelector(".eye-right-2"),
	eyeLeft2: document.querySelector(".eye-left-2"),
};


function blinkAnimation() {
	setInterval(() => {
		dom.eyeRight.style.opacity = "0";
		dom.eyeLeft.style.opacity = "0";
		dom.eyeRight2.style.opacity = "1";
		dom.eyeLeft2.style.opacity = "1";

		setTimeout(() => {
			dom.eyeRight.style.opacity = "1";
			dom.eyeLeft.style.opacity = "1";
			dom.eyeRight2.style.opacity = "0";
			dom.eyeLeft2.style.opacity = "0";
		}, 150);
	}, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
	blinkAnimation();
});

// Show more/less text

function toggleText(button) {
	let paragraph = button.previousElementSibling;

	if (paragraph.style.maxHeight === "3em" || paragraph.style.maxHeight === "") {
		paragraph.style.maxHeight = "none";  // Expand text
		button.textContent = "Show Less";    // Change button text
	} else {
		paragraph.style.maxHeight = "3em";   // Collapse text
		button.textContent = "Show More";    // Reset button text
	}
}

$(document).on('show.bs.modal', '.modal', centerModal);
$(window).on('resize', function () {
	$('.modal:visible').each(centerModal);
});


// Carousel
$(document).ready(function () {
    // Initialize the carousel with default settings
    var carousel = $('#project-contents').carousel({
        interval: 1000  // Auto sliding every 1 second
    });

    document.addEventListener("DOMContentLoaded", function () {
        var projectSection = document.getElementById('project-contents');
        
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start the carousel when the project section is in view
                    carousel.carousel('cycle'); // Start auto-slide when in view
                } else {
                    // Stop the carousel when the project section is out of view
                    carousel.carousel('pause');
                }
            });
        }, {
            threshold: 1.0  // Trigger when the section is fully in view
        });

        observer.observe(projectSection);
    });
});
