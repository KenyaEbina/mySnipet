   barba.init({
      transitions: [
      {
        async leave({ current }) {
          const leave = await leaveAnimation(current);
          return leave;
        },
        afterLeave({ current, next, trigger }){
          $(next.container).find('#js-button').css('opacity', 0);
        },
        beforeEnter({ current, next, trigger }) {
          replaceHeadTags(next);
        },
        enter({ current, next, trigger }) {
          objectFitImages();
          enterAnimation(next);
        }
      }
      ]
    });

    function scrollTo(next) {
      const $target = $(`#${next.url.hash}`, next.container);
      const targetPosition = $target.offset().top;
      $(window).scrollTop(targetPosition);
    }


    /*
    * ページ離脱アニメーション
    * @param {Object} current 離脱するページ（前のページ）の情報
    * @return Promise
    */
    function leaveAnimation(current) {
      const animation = anime.timeline()
      .add({
        easing           : 'easeOutSine',
        targets          : current.container.querySelector('#js-button'),
        duration         : 300,
        opacity          : [1, 0]
      })
      .add({
        easing           : 'easeInOutExpo',
        targets          : current.container.querySelector('#js-bg'),
        duration         : 600,
        opacity          : [1, 0],
        scale            : [1, 1.1]
      }, '-=300')
      ;
      return animation.finished;
    }

    /*
    * ページ表示アニメーション
    * @param {Object} next 表示するページ（次のページ）の要素
    * @return Promise
    */
    function enterAnimation(next) {
      const animation = anime.timeline()
      .add({
        easing           : 'easeInSine',
        targets          : next.container.querySelector('#js-button'),
        duration         : 300,
        opacity          : [0, 1],
        translateY       : ['15px', 0]
      })
      .add({
        easing           : 'easeInOutExpo',
        targets          : next.container.querySelector('#js-bg'),
        duration         : 1000,
        opacity          : [0, 1],
        scale            : [1.1, 1]
      }, '-=300')
      ;
      return animation.finished;
    }

    /*
    * <head>内のタグを入れ替える
    * @param {Object} target 表示するページ（次のページ）の要素
    *
    */
    function replaceHeadTags(target) {
      const $newPageHead = $('<head />').html(
        $.parseHTML(
          target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
          document,
          true
          )
        );
      const headTags = [
      "meta[name='robots']",
      "meta[name='keywords']",
      "meta[name='description']",
      "meta[property^='og']",
      "meta[name^='twitter']",
      "meta[itemprop]",
      "link[rel='next']",
      "link[rel='prev']",
      "link[rel='alternate']",
      "link[rel='canonical']",
      "script[type='application/ld+json']"
      ].join(',');
      // タグを削除
      $('head').find(headTags).remove();
      // タグを追加
      $newPageHead.find(headTags).appendTo('head');
    }
document.addEventListener('DOMContentLoaded', function () {
	var pageId = document.body.id;
	var navLinks = document.querySelectorAll('nav li.' + pageId + ' > a');
	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].classList.add('is-current');
	}

	//var links = document.querySelectorAll('a:not(.noAnmBtn):not([href^="#"]):not(.movieBtn):not([target]):not([href^="tel"]):not([href^="mailto"]):not([href^="javascript:void(0)"])');
	//	for (var i = 0; i < links.length; i++) {
	//		links[i].addEventListener('click', function (e) {
	//			if ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) return;
	//			e.preventDefault();
	//			var url = this.getAttribute('href');
	//			if (url !== '') {
	//				var transfar = document.getElementById('transfar');
	//				transfar.classList.add('is-transfar');
	//				setTimeout(function () {
	//					window.location = url;
	//				}, 1350);
	//			}
	//			return false;
	//		});
	//	}
	//
	//	var fixLoad = function () {
	//		document.body.classList.remove('is-remove');
	//	};
	//
	//	history.replaceState(null, document.getElementsByTagName('title')[0].innerHTML, null);
	//	window.addEventListener('popstate', function () {
	//		fixLoad();
	//	}, false);
	//
	//	window.onpageshow = function (event) {
	//		if (event.persisted) {
	//			window.location.reload();
	//		}
	//	};

	var scrollToTarget = function (target) {
		var adjust = -200;
		var speed = 400;
		var position = target.offsetTop + adjust;

		var scrollAnimation = function () {
			var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
			var distance = position - currentPosition;
			var step = distance / speed;
			if (Math.abs(distance) > 10) {
				window.scrollBy(0, step);
				requestAnimationFrame(scrollAnimation);
			} else {
				window.scrollTo(0, position);
			}
		};

		scrollAnimation();
	};

	var hashLinks = document.querySelectorAll('a[href^="#"]');
	for (var i = 0; i < hashLinks.length; i++) {
		hashLinks[i].addEventListener('click', function () {
			var href = this.getAttribute('href');
			var target = href === '#' || href === '' ? document.documentElement : document.querySelector(href);
			if (target) {
				scrollToTarget(target);
			}
			return false;
		});
	}

	var btn = document.getElementById('pageTopBtn');
	btn.addEventListener('click', function () {
		scrollToTarget(document.documentElement);
	});

	if (!window.matchMedia('(max-width: 991px)').matches) {
		window.addEventListener('resize', function () {
			ScrollTrigger.refresh();
		});
	}


});

function parts(rootDir, File, current) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', rootDir + 'inc/' + File, false);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var html = xhr.responseText;
			html = html.replace(/\{\$root\}/g, rootDir);
			html = html.replace('nav_' + current, 'on nav_' + current);
			document.write(html);
		}
	};
	xhr.send();
}


document.addEventListener("DOMContentLoaded", function () {
	// loading
	setTimeout(function () {
		document.documentElement.classList.add("is-load");
	}, 500);
	setTimeout(function () {
		document.documentElement.classList.add("is-load02");
	}, 900);
	setTimeout(function () {
		document.documentElement.classList.add("is-load03");
	}, 2100);
	setTimeout(function () {
		document.documentElement.classList.add("is-load04");
	}, 2500);


	
});
