(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');
		$twStat = $('#twStat'),
		$twStat_articles = $twStat.children('article');

	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

		var	delay = 325,
			locked = false;


			//********************************************************** */
	
		$main._show = function(id, initial) {

			var $article = $main_articles.filter('#' + id);

				if ($article.length == 0)
					return;

					if (locked || (typeof initial != 'undefined' && initial === true)) {

							$body.addClass('is-switching');

							$body.addClass('is-article-visible');

							$main_articles.removeClass('active');

							$header.hide();
							$footer.hide();

							$main.show();
							$article.show();

							$article.addClass('active');

							locked = false;

							setTimeout(function() {
								$body.removeClass('is-switching');
							}, (initial ? 1000 : 0));

						return;

					}
						locked = true;

					if ($body.hasClass('is-article-visible')) {

							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

							setTimeout(function() {

									$currentArticle.hide();

									$article.show();

									setTimeout(function() {

										$article.addClass('active');

											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

					else {
					$body
					.addClass('is-article-visible');

					setTimeout(function() {

						$header.hide();
						$footer.hide();
						$main.show();
						$article.show();

						setTimeout(function() {

							$article.addClass('active');

								$window
								.scrollTop(0)
								.triggerHandler('resize.flexbox-fix');

								setTimeout(function() {
									locked = false;
								}, delay);

							}, 25);

					}, delay);		

					}

			};




			//********************************************************** */

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

					if (!$body.hasClass('is-article-visible'))
						return;

					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

						if (locked) {

							$body.addClass('is-switching');

							$article.removeClass('active');

							$article.hide();
							$main.hide();
					
							$footer.show();
							$header.show();
					
							$body.removeClass('is-article-visible');

							locked = false;

							$body.removeClass('is-switching');

							$window
								.scrollTop(0)
								.triggerHandler('resize.flexbox-fix');	

							return;		

						}

						locked = true;

					$article.removeClass('active');

					setTimeout(function() {

						$article.hide();
						$main.hide();

						$footer.show();
						$header.show();

						setTimeout(function() {

							$body.removeClass('is-article-visible');

							$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

								setTimeout(function() {
									locked = false;
								}, delay);	

						}, 25);		

					}, delay);
			};


			//********************************************************** */

			$main_articles.each(function() {

				var $this = $(this);

				$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				
					$this.on('click', function(event) {
						event.stopPropagation();
					});
			});

			//********************************************************** */

			$body.on('click', function(event) {

				
				if ($body.hasClass('is-article-visible'))
				$main._hide(true);	

			});

			//********************************************************** */

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						
						if ($body.hasClass('is-article-visible'))
						$main._hide(true);		

						break;

					default:
						break;

				}

			});

			//********************************************************** */

			$window.on('hashchange', function(event) {

				if (location.hash == ''
				||	location.hash == '#') {

					event.preventDefault();
					event.stopPropagation();

					$main._hide();

				}
				else if ($main_articles.filter(location.hash).length > 0) {

					event.preventDefault();
					event.stopPropagation();

					$main._show(location.hash.substr(1));

				}		

			});

			//********************************************************** */

			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}


				$main.hide();
				$main_articles.hide();

				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

			//********************************************************** */
			//********************************************************** */	

			$twStat._show = function(id, initial) {

				var $article = $twStat_articles.filter('#' + id);
	
					if ($article.length == 0)
						return;
	
						if (locked || (typeof initial != 'undefined' && initial === true)) {
	
								$body.addClass('is-switching');
	
								$body.addClass('is-article-visible');
	
								$twStat_articles.removeClass('active');
	
								$header.hide();
								$footer.hide();
	
								$twStat.show();
								$article.show();
	
								$article.addClass('active');
	
								locked = false;
	
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));
	
							return;
	
						}
							locked = true;
	
						if ($body.hasClass('is-article-visible')) {
	
								var $currentArticle = $twStat_articles.filter('.active');
	
								$currentArticle.removeClass('active');
	
								setTimeout(function() {
	
										$currentArticle.hide();
	
										$article.show();
	
										setTimeout(function() {
	
											$article.addClass('active');
	
												$window
													.scrollTop(0)
													.triggerHandler('resize.flexbox-fix');
	
												setTimeout(function() {
													locked = false;
												}, delay);
	
										}, 25);
	
								}, delay);
	
						}
	
						else {
						$body
						.addClass('is-article-visible');
	
						setTimeout(function() {
	
							$header.hide();
							$footer.hide();
							$twStat.show();
							$article.show();
	
							setTimeout(function() {
	
								$article.addClass('active');
	
									$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');
	
									setTimeout(function() {
										locked = false;
									}, delay);
	
								}, 25);
	
						}, delay);		
	
						}
	
				};
	
	
	
	
				//********************************************************** */
	
				$twStat._hide = function(addState) {
	
					var $article = $twStat_articles.filter('.active');
	
						if (!$body.hasClass('is-article-visible'))
							return;
	
						if (typeof addState != 'undefined'
						&&	addState === true)
							history.pushState(null, null, '#');
	
							if (locked) {
	
								$body.addClass('is-switching');
	
								$article.removeClass('active');
	
								$article.hide();
								$twStat.hide();
						
								$footer.show();
								$header.show();
						
								$body.removeClass('is-article-visible');
	
								locked = false;
	
								$body.removeClass('is-switching');
	
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');	
	
								return;		
	
							}
	
							locked = true;
	
						$article.removeClass('active');
	
						setTimeout(function() {
	
							$article.hide();
							$twStat.hide();
	
							$footer.show();
							$header.show();
	
							setTimeout(function() {
	
								$body.removeClass('is-article-visible');
	
								$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');
	
									setTimeout(function() {
										locked = false;
									}, delay);	
	
							}, 25);		
	
						}, delay);
				};
	
	
				//********************************************************** */
	
				$twStat_articles.each(function() {
	
					var $this = $(this);
	
					$('<div class="close">Close</div>')
							.appendTo($this)
							.on('click', function() {
								location.hash = '';
							});
	
					
						$this.on('click', function(event) {
							event.stopPropagation();
						});
					
				});
	
				//********************************************************** */
	
				$body.on('click', function(event) {
	
					
					if ($body.hasClass('is-article-visible'))
					$twStat._hide(true);	
	
				});
	
				//********************************************************** */
	
				$window.on('keyup', function(event) {
	
					switch (event.keyCode) {
	
						case 27:
	
							
							if ($body.hasClass('is-article-visible'))
							$twStat._hide(true);		
	
							break;
	
						default:
							break;
	
					}
	
				});
	
				//********************************************************** */
	
				$window.on('hashchange', function(event) {
	
					if (location.hash == ''
					||	location.hash == '#') {
	
						event.preventDefault();
						event.stopPropagation();
	
						$twStat._hide();
	
					}
					else if ($twStat_articles.filter(location.hash).length > 0) {
	
						event.preventDefault();
						event.stopPropagation();
	
						$twStat._show(location.hash.substr(1));
	
					}		
	
				});
	
				//********************************************************** */
	
				if ('scrollRestoration' in history)
					history.scrollRestoration = 'manual';
				else {
	
					var	oldScrollPos = 0,
						scrollPos = 0,
						$htmlbody = $('html,body');
	
					$window
						.on('scroll', function() {
	
							oldScrollPos = scrollPos;
							scrollPos = $htmlbody.scrollTop();
	
						})
						.on('hashchange', function() {
							$window.scrollTop(oldScrollPos);
						});
	
				}
	
	
					$twStat.hide();
					$twStat_articles.hide();
	
					if (location.hash != ''
					&&	location.hash != '#')
						$window.on('load', function() {
							$twStat._show(location.hash.substr(1), true);
						});

})(jQuery);


function showGames()
	{
		document.getElementById("GameCon").style.display="block";
		document.getElementById("ChannelCon").style.display="none";
		document.getElementById("ClipsCon").style.display="none";
		(function($){
			var $twStat = $('#twStat'),
			$art = $twStat.children('article')[0];
			var $article = $twStat_articles.filter("#twitchStatistics");
			$article.show();
		})(jQuery);

	}

	function showStreamer()
	{
		document.getElementById("GameCon").style.display="none";
		document.getElementById("ClipsCon").style.display="none";
		document.getElementById("ChannelCon").style.display="block";
		(function($){
			var $twStat = $('#twStat'),
			$art = $twStat.children('article')[0];
			var $article = $twStat_articles.filter("#twitchStatistics");
			$article.show();
		})(jQuery);
	}

	function showClips()
	{
		document.getElementById("GameCon").style.display="none";
		document.getElementById("ChannelCon").style.display="none";
		document.getElementById("ClipsCon").style.display="block";
		(function($){
			var $twStat = $('#twStat'),
			$art = $twStat.children('article')[0];
			var $article = $twStat_articles.filter("#twitchStatistics");
			$article.show();
		})(jQuery);
	}