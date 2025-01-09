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
			$navbar.addClass('menu-fixed').css('background-color', 'rgb(27, 38, 50, 0.87)');
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
			scrollTop: $($link).offset().top - 60
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

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

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

	setTimeout(function() {
	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
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


// SVG

gsap.registerPlugin(CustomEase, CustomWiggle);

const meTl = gsap.timeline({
  onComplete: addMouseEvent,
  delay: 1
});

gsap.set(".bg", { transformOrigin: "50% 50%" });
gsap.set(".ear-right", { transformOrigin: "0% 50%" });
gsap.set(".ear-left", { transformOrigin: "100% 50%" });
gsap.set(".me", { opacity: 1 });

meTl
  .from(
    ".me",
    {
      duration: 1,
      yPercent: 100,
      ease: "elastic.out(0.2, 0.4)"
    },
    0.5
  )
  .from(
    ".head , .hijab , .shadow, .hijab",
    {
      duration: 0.9,
      yPercent: 20,
      ease: "elastic.out(0.58, 0.25)"
    },
    0.6
  )
  .to(
    ".glasses",
    {
      duration: 1,
      keyframes: [{ yPercent: -10 }, { yPercent: -0 }],
      ease: "elastic.out(0.5, 0.2)"
    },
    0.75
  )
  .from(
    ".eyebrow-right , .eyebrow-left",
    {
      duration: 1,
      yPercent: 300,
      ease: "elastic.out(0.5, 0.2)"
    },
    0.7
  )
  .to(
    ".eye-right , .eye-left",
    {
      duration: 0.01,
      opacity: 1
    },
    0.85
  )
  .to(
    ".eye-right-2 , .eye-left-2",
    {
      duration: 0.01,
      opacity: 0
    },
    0.85
  );

const blink = gsap.timeline({
  repeat: -1,
  repeatDelay: 5,
  paused: true
});

blink
  .to(
    ".eye-right, .eye-left",
    {
      duration: 0.01,
      opacity: 0
    },
    0
  )
  .to(
    ".eye-right-2, .eye-left-2",
    {
      duration: 0.01,
      opacity: 1
    },
    0
  )
  .to(
    ".eye-right, .eye-left",
    {
      duration: 0.01,
      opacity: 1
    },
    0.15
  )
  .to(
    ".eye-right-2 , .eye-left-2",
    {
      duration: 0.01,
      opacity: 0
    },
    0.15
  );

CustomWiggle.create("myWiggle", {
  wiggles: 6,
  type: "ease-out"
});
CustomWiggle.create("lessWiggle", {
  wiggles: 4,
  type: "ease-in-out"
});

const dizzy = gsap.timeline({
  paused: true,
  onComplete: () => {
    dizzyIsPlaying = false;
  }
});

dizzy
  .to(
    ".eyes",
    {
      duration: 0.01,
      opacity: 0
    },
    0
  )
  .to(
    ".dizzy",
    {
      duration: 0.01,
      opacity: 0.3
    },
    0
  )
  .to(
    ".mouth",
    {
      duration: 0.01,
      opacity: 0
    },
    0
  )
  .to(
    ".head, .hijab-back, .shadow",
    {
      duration: 6,
      rotate: 2,
      transformOrigin: "50% 50%",
      ease: "myWiggle"
    },
    0
  )
  .to(
    ".me",
    {
      duration: 6,
      rotate: -2,
      transformOrigin: "50% 100%",
      ease: "myWiggle"
    },
    0
  )
  .to(
    ".me",
    {
      duration: 4,
      scale: 0.99,
      transformOrigin: "50% 100%",
      ease: "lessWiggle"
    },
    0
  )
  .to(
    ".eyes",
    {
      duration: 0.01,
      opacity: 1
    },
    4
  )
  .to(
    ".mouth",
    {
      duration: 0.01,
      opacity: 1
    },
    4
  );

// end animation

// mouse coords

let xPosition;
let yPosition;

let height;
let width;

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

let dizzyIsPlaying;
function updateScreenCoords(event) {
  if (!dizzyIsPlaying) {
    xPosition = event.clientX;
    yPosition = event.clientY;
  }
  if (!dizzyIsPlaying && Math.abs(event.movementX) > 500) {
    dizzyIsPlaying = true;
    dizzy.restart();
  }
}

let storedXPosition = 0;
let storedYPosition = 0;

// gsap can use queryselector in the quick setter but this is better for performance as it touches the DOM less
const dom = {
  face: document.querySelector(".face"),
  hijab: document.querySelector(".hijab"),
  eye: document.querySelectorAll(".eye"),
  innerFace: document.querySelector(".inner-face"),
  hijabFront: document.querySelector(".hijab-front"),
  hijabBack: document.querySelector(".hijab-back"),
  shadow: document.querySelectorAll(".shadow"),
  eyebrowLeft: document.querySelector(".eyebrow-left"),
  eyebrowRight: document.querySelector(".eyebrow-right")
};

function animateFace() {
  if (!xPosition) return;
  // important, only recalculating if the value changes
  if (storedXPosition === xPosition && storedYPosition === yPosition) return;

  // range from -50 to 50
  x = percentage(xPosition, width) - 50;
  y = percentage(yPosition, height) - 50;

  // range from -20 to 80
  yHigh = percentage(yPosition, height) - 20;
  // range from -80 to 20
  yLow = percentage(yPosition, height) - 80;

  gsap.to(dom.face, {
    yPercent: yLow / 30,
    xPercent: x / 30
  });
  gsap.to(dom.hijab, {
    yPercent: yLow / 30,
    xPercent: x / 30
  });
  gsap.to(dom.eye, {
    yPercent: yHigh / 3,
    xPercent: x / 2
  });
  gsap.to(dom.innerFace, {
    yPercent: y / 6,
    xPercent: x / 8
  });
  gsap.to(dom.hijabFront, {
    yPercent: yHigh / 15,
    xPercent: x / 22
  });
  gsap.to([dom.hijabBack, dom.shadow], {
    yPercent: (yLow / 20) * -1,
    xPercent: (x / 20) * -1
  });
  gsap.to([dom.eyebrowLeft, dom.eyebrowRight], {
    yPercent: y * 2.5
  });

  storedXPosition = xPosition;
  storedYPosition = yPosition;
}

// function being called at the end of main timeline
function addMouseEvent() {
  const safeToAnimate = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  ).matches;

  if (safeToAnimate) {
    window.addEventListener("mousemove", updateScreenCoords);

    // gsap's RAF, falls back to set timeout
    gsap.ticker.add(animateFace);

    blink.play();
  }
}

// update if browser resizes
function updateWindowSize() {
  height = window.innerHeight;
  width = window.innerWidth;
}
updateWindowSize();
window.addEventListener("resize", updateWindowSize);