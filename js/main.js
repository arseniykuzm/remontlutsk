$(document).ready(function(){
	$('img').addClass('lazyload')
	lazyload();
	/* Helper function */
	function download_file(fileURL, fileName) {
	    // for non-IE
	    if (!window.ActiveXObject) {
	        var save = document.createElement('a');
	        save.href = fileURL;
	        save.target = '_blank';
	        var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
	        save.download = fileName || filename;
		       if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
					document.location = save.href; 
	// window event not working here
				}else{
			        var evt = new MouseEvent('click', {
			            'view': window,
			            'bubbles': true,
			            'cancelable': false
			        });
			        save.dispatchEvent(evt);
			        (window.URL || window.webkitURL).revokeObjectURL(save.href);
				}	
	    }

	    // for IE < 11
	    else if ( !! window.ActiveXObject && document.execCommand)     {
	        var _window = window.open(fileURL, '_blank');
	        _window.document.close();
	        _window.document.execCommand('SaveAs', true, fileName || fileURL)
	        _window.close();
	    }
	}

	$('img').on('dragstart', function(event) { event.preventDefault(); });
	$('#modal_open, .steps_plus').click(function(){
		$('#modal').toggleClass('overlay_hidden');
		$('body').toggleClass('overflow');
	});
	$('#download_open').click(function(){
		$('#download').toggleClass('overlay_hidden');
		$('body').toggleClass('overflow');
	});
	$('#download_close').click(function(){
		$('#download').toggleClass('overlay_hidden');
	$('body').toggleClass('overflow');
	})

	$('#modal_close').click(function(){
		$('#modal').toggleClass('overlay_hidden');
	$('body').toggleClass('overflow');
	})
	$('.overlay_leave_close').click(function(){
		$('#leave').toggleClass('overlay_hidden');
		$('body').toggleClass('overflow');
	})
	var $slides = $('#quiz_wrap').children('div');
	$('.quiz_btn__back').click(function(){
		$index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index-1).addClass('quiz_slide__active');
	});

	let newutm = window.location.search.substr(1);
	let regexp = /^((\+38)\s\(\d{3}\)\s(\d{3})\-(\d{4}))$/igm;

	$('#download_call').click(function(){
		event.preventDefault();
		let numberD = $('#download_tel').val();
		let nameD = $('#download_name').val();
		let checkD = $('#download-check').val();
		let $buttonD = $(this);
		if(regexp.test(numberD)&&checkD==''&&nameD.length>1){
			$('#download_form').submit(function(event){
			event.preventDefault();
			$('#overlay_download').addClass('blured');
			$('#overlay_download_image').show();
			$buttonD.attr("disabled", true);
			let $form_data = $(this).serialize();
			let $newdata = $form_data + '&' + newutm;
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $newdata,
				success: function() {
					$("form").trigger("reset");
					download_file('metoda.pdf', 'metoda.pdf');
					$(location).attr('href', 'thanks.php');
					$('#overlay_download').removeClass('blured');
					$('#overlay_download_image').hide();
					$('body').toggleClass('overflow');
					$('#download').addClass('overlay_hidden');
					setTimeout(function(){
						
					},1000);
				},
				error:  function(data){
					alert('Попробуйте еще раз, возникла ошибка');
					$buttonD.attr("disabled", false);
					$('#overlay_download').removeClass('blured');
					$('#overlay_download_image').hide();
				}
			});
		});
			$('#download_form').trigger('submit');
		}
		else if (nameD.length<1){
		$('#download_name').trigger('focus');
		}
		else {
			$('#download_tel').trigger('focus');
		}
	});

	$('#footer_call').click(function(){
		event.preventDefault();
		let numberF = $('#footer_tel').val();
		let nameF = $('#footer_name').val();
		let checkF = $('#footer-check').val();
		let $buttonF = $(this);
		if(regexp.test(numberF)&&checkF==''&&nameF.length>1){
			$('.footer_form').submit(function(event){
			event.preventDefault();
			$('.footer').addClass('blured');
			$('#footer_form__image').show();
			$buttonF.attr("disabled", true);
			let $form_data = $(this).serialize();
			let $newdata = $form_data + '&' + newutm;
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $newdata,
				success: function() {
					$("form").trigger("reset");
					download_file('odessa.pdf', 'odessa.pdf');
					$(location).attr('href', 'thanks.php');
					$('.footer').removeClass('blured');
					$('#footer_form__image').hide();
					setTimeout(function(){
						$(location).attr('href', 'thanks.php');
					},5000);
				},
				error:  function(data){
					alert('Попробуйте еще раз, возникла ошибка');
					$buttonF.attr("disabled", false);
					$('.footer').removeClass('blured');
					$('#footer_form__image').hide();
				}
			});
		});
			$('.footer_form').trigger('submit');
		}
		else if (nameF.length<1){
			$('#footer_name').trigger('focus');
		}
		else {
			$('#footer_tel').trigger('focus');
		}
		});

		$('#works_call').click(function(){
			event.preventDefault();
			let numberW = $('#works_tel').val();
			let nameW = $('#works_name').val();
			let checkW = $('#works-check').val();
			let $buttonW = $(this);
			if(regexp.test(numberW)&&checkW==''&&nameW.length>1){
				$('.works_form').submit(function(event){
				event.preventDefault();
				$('.works_aside').addClass('blured');
				$('#works_form_image').show();
				$buttonW.attr("disabled", true);
				let $form_data = $(this).serialize();
				let $newdata = $form_data + '&' + newutm;
				$.ajax({
					type: 'POST',
					url: 'mailer/smart.php',
					data: $newdata,
					success: function() {
						$("form").trigger("reset");
						$(location).attr('href', 'thanks.php');
						$('.works_aside').removeClass('blured');
						$('#works_form_image').hide();
						setTimeout(function(){
							$(location).attr('href', 'thanks.php');
						},1000);
					},
					error:  function(data){
						alert('Попробуйте еще раз, возникла ошибка');
						$buttonW.attr("disabled", false);
						$('.works_aside').removeClass('blured');
						$('#works_form_image').hide();
					}
				});
			});
				$('.works_form').trigger('submit');
			}
			else if (nameW.length<1){
			$('#works_name').trigger('focus');
			}
			else {
				$('#works_tel').trigger('focus');
			}
		});
	$('#leave_call').click(function(){
		event.preventDefault();
		let numberL = $('#leave_tel').val();
		let nameL = $('#leave_name').val();
		let checkL = $('#leave-check').val();
		let $buttonL = $(this);
		if(regexp.test(numberL)&&checkL==''&&nameL.length>1){
			$('.overlay_leave__wrap_form').submit(function(event){
			event.preventDefault();
			$('#overlay_leave').addClass('blured');
			$('#leave_image').show();
			$buttonL.attr("disabled", true);
			let $form_data = $(this).serialize();
			let $newdata = $form_data + '&' + newutm;
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $newdata,
				success: function() {
					$("form").trigger("reset");
					download_file('metoda.pdf', 'metoda.pdf');
					$(location).attr('href', 'thanks.php');
					$('#overlay_leave').removeClass('blured');
					$('#leave_image').hide();
					$('body').toggleClass('overflow');
					$('#leave').addClass('overlay_hidden');
					setTimeout(function(){
						$(location).attr('href', 'thanks.php');
					},1000);
				},
				error:  function(data){
					alert('Попробуйте еще раз, возникла ошибка');
					$buttonL.attr("disabled", false);
					$('#overlay_leave').removeClass('blured');
					$('#leave_image').hide();
				}
			});
		});
			$('.overlay_leave__wrap_form').trigger('submit');
		}
		else if (nameL.length<1){
		$('#leave_name').trigger('focus');
		}
		else {
			$('#leave_tel').trigger('focus');
		}
	});

	$('#modal_call').click(function(){
		event.preventDefault();
		let numberM = $('#modal_tel').val();
		let nameM = $('#modal_name').val();
		let checkM = $('#modal-check').val();
		let $buttonM = $(this);
		if(regexp.test(numberM)&&checkM==''&&nameM.length>1){
			$('#modal_form').submit(function(event){
			event.preventDefault();
			$('#overlay_modal').addClass('blured');
			$('#overlay_modal_image').show();
			$buttonM.attr("disabled", true);
			let $form_data = $(this).serialize();
			let $newdata = $form_data + '&' + newutm;
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $newdata,
				success: function() {
					$("form").trigger("reset");
					$(location).attr('href', 'thanks.php');
					$('#overlay_modal').removeClass('blured');
					$('#overlay_modal_image').hide();
					$('body').toggleClass('overflow');
					$('#modal').addClass('overlay_hidden');
					setTimeout(function(){
						$(location).attr('href', 'thanks.php');
					},1000);
				},
				error:  function(data){
					alert('Попробуйте еще раз, возникла ошибка');
					$buttonM.attr("disabled", false);
					$('#overlay_modal').removeClass('blured');
					$('#overlay_modal_image').hide();
				}
			});
		});
			$('#modal_form').trigger('submit');
		}
		else if (nameM.length<1){
		$('#modal_name').trigger('focus');
		}
		else {
			$('#modal_tel').trigger('focus');
		}
	});
	$('#quiz_finish').click(function(event){
		event.preventDefault();
		let numberQ = $('#quiz_tel').val();
		/*let nameQ = $('#quiz_name').val();*/
		let checkQ = $('#quiz-check').val();
		let $buttonQ = $(this);
		if(regexp.test(numberQ)&&checkQ==''){
			$('.quiz_question__form').submit(function(event){
			event.preventDefault();
			$('.quiz').addClass('blured');
			$('#quiz_form_image').show();
			$buttonQ.attr("disabled", true);
			let $form_data = $(this).serialize();
			let $data = $( ":input[type=radio]" ).serialize();
			let $newdata = $form_data + '&' + $data + '&' + newutm;
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $newdata,
				success: function() {
					$(location).attr('href', 'thanks.php');
					$("form").trigger("reset");
					
					$('.quiz').removeClass('blured');
					$('#quiz_form_image').hide();
					setTimeout(function(){
						$(location).attr('href', 'thanks.php');
					},1000);
				},
				error:  function(data){
					alert('Попробуйте еще раз, возникла ошибка');
					$buttonQ.attr("disabled", false);
					$('.quiz').removeClass('blured');
					$('#quiz_form_image').hide();
				}
			});
			});
			$('.quiz_question__form').trigger('submit');
		}
		/*else if (nameQ.length<1){
		$('#quiz_name').trigger('focus');
		}*/
		else {
			$('#quiz_tel').trigger('focus');
		}
	});


	$(":input[type=tel]").inputmask("+38 (999) 999-9999",{ showMaskOnFocus: true });
	
	$('.features_button').click(function(){
		var $page = $('html, body');
		$page.animate({
			scrollTop: $('#quiz').offset().top
		}, 500);
		return false;
	});

	var once1 = false;
	var once2 = false;
	var once3 = false;
	var once4 = false;
	var once5 = false;
	var once6 = false;
	var once7 = false;

	$('.quiz_first').click(function(){
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once1 == false){
			$('.quiz_headline>h2').text('Отлично, осталось ответить на 4 вопроса');
			once1 = true;
		}
	});
	$('.quiz_second').click(function(){
		
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once2 == false){
			$('.quiz_headline>h2').text('Отлично, осталось ответить на 3 вопроса');
			once2 = true;
		}
	});
	$('.quiz_third').click(function(){
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once3 == false){
			$('.quiz_headline>h2').text('Отлично, осталось ответить на 2 вопроса');
			once3 = true;
		}
	});
	$('.quiz_fourth').click(function(){
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once4 == false){
			$('.quiz_headline>h2').text('Отлично, осталось ответить на 1 вопрос');
			once4 = true;
		}
	});
	$('.quiz_fifth').click(function(){
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once5 == false){
			$('.quiz_headline>h2').text('Отлично, осталось ответить на последний вопрос');
			once5 = true;
		}
	});
	$('.quiz_sixth').click(function(){
		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once6 == false){
			$('.quiz_headline>h2').text('Пожалуйста, укажите номер, на который нужно отправить просчет.');
			once6 = true;
		}
	});
	$('.quiz_seventh').click(function(){

		var $index = $('.quiz_slide__active').index();
		$slides.eq($index).removeClass('quiz_slide__active');
		$slides.eq($index+1).addClass('quiz_slide__active');
		if (once7 == false){
			$('.quiz_headline>h2').text('Пожалуйста, укажите номер, на который нужно отправить просчет.');
			once7 = true;
			/*ym(Номер счётчика(цифры), 'reachGoal', 'НАЗВАНИЕ ЦЕЛИ');*/
		}
		$('html, body').animate({scrollTop: $('.quiz').offset().top}, 500);
	});
	$('.review_wrap').owlCarousel({
    stagePadding: 5,
    items: 1,
    loop: true,
    margin: 10,
    singleItem: true,
    nav: true,
    smartSpeed: 800,
    LazyLoad: true,
    checkVisible: false,
    animateOut: 'fadeOut',
    animateIn: 'bounceIn',
    navText: [
        "<div class='arrow arrow-left'></div>",
        "<div class='arrow arrow-right'></div>"
    ],
    dots: false
		});
	$('#seo_button').click(function(event){
		event.preventDefault();
		$(this).find('span').toggle();
		$(this).find('img').toggleClass('invert');
		$('.seo_text').toggleClass('seo_text__visiable');
	});
	$('#works_more').click(function(event){
		event.preventDefault();
		$val = $('.works_block').data('options');
		switch ( $val ) {
		    case 'hidden' :
		    		$('.works_block').addClass('works_block_half');
		    		$('.works_block').data('options','half');
		      break;
		    case 'half' :
		    		$('.works_block').removeClass('works_block_half').addClass('works_block_full');
		    		$('.works_block').data('options','full');
		    		$(this).find('span').toggle();
		    		$(this).find('img').toggleClass('invert');
		      break;
		    case 'full' :
		    		$('.works_block').removeClass('works_block_full');
		    		$('.works_block').data('options','hidden');
		    		$(this).find('span').toggle();
		    		$(this).find('img').toggleClass('invert');
		      break;
		    default :
		      break;
		  }
	});
	$('.review_wrap__item_right__video').click(function(event){
		$(this).addClass('no-overlay');
		$(this).find('iframe').removeClass('video_hidden');
		$(this).find('img').hide();
		$(this).find('.review_wrap__item_right__video_play').hide();
	});

	$.fancybox.defaults.i18n.ru = {
	    CLOSE       : 'Закрыть',
	    NEXT        : 'Следующая',
	    PREV        : 'Предыдущая',
	    ERROR       : 'Ошибка, попробуйте перезагрузить страницу',
	    PLAY_START  : 'Начать слайдшоу',
	    PLAY_STOP   : 'Пауза',
	    FULL_SCREEN : 'Полный экран',
	    THUMBS      : 'Миниатюры',
	    DOWNLOAD    : 'Скачать',
	    SHARE       : 'Поделиться',
	    ZOOM        : 'Увеличить'
	};

	$.fancybox.defaults.lang = 'ru';

	/*var leave = false;
	$(document).mouseleave(function(e){
	        if (e.clientY < 0 && !leave && window.matchMedia('(min-width: 100px)').matches) {
	            $('#leave').toggleClass('overlay_hidden');
	            $('body').toggleClass('overflow');
	            leave = true;
	        };    
	    });*/

	var timerId = 0;
	$(".main-btn").fancybox({
		buttons : [
		'close'
		],
		iframe : {
			css : {
				width : '100%',
				maxWidth: '1170px'
			}
		},
		afterLoad: function () {
			$('iframe').on('load', function(event) {
				event.preventDefault();
				frameHeight();
			});

			setTimeout(function() {
				frameHeightRec();
			}, 300);

			$(window).on('resize', function() {
				frameHeight();
			});
		},
		afterClose: function () {
			clearTimeout(timerId);
			// console.log('clear');
		}
	});

	function frameHeight () {
		var height = $('iframe').contents().find('html').height();
		$('iframe').height(height);
	}

	function frameHeightRec () {
		var height = $('iframe').contents().find('html').height();
		$('iframe').height(height);
		timerId = setTimeout(function() {
			frameHeightRec();
		}, 100);
		// console.log('call');
	}
});				