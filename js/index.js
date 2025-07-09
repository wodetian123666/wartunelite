$(function(){
    var myVideo = document.getElementById("videoId");
    var myLoginVideo = document.getElementById("loginVideoId");
   
	// 新闻轮播
    var newsSwiper = new Swiper ('.newsSwiper', {
        loop: true,
        autoplay:{
            disableOnInteraction: false,
            delay: 3000,
        },
        // autoplay:false,
        
        lazyLoading: true,
        pagination: {
            el: '.pagination_new',
            clickable :true,
        },
    })
	// classslid
	var professionSwiper = new Swiper ('.professionSwiper', {
		loop: true,
		observer:true,
		autoplay:false,
		// autoplay:{
        //     delay: 30000,
        // },
		grabCursor: true,
		observeParents:true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 30,
			depth: 200,
			modifier: 3,
			slideShadows : false
		},
		slidesPerView: 1.3,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next-profession',
			prevEl: '.swiper-button-prev-profession',
		},
		autoplayDisableOnInteraction: false,
		paginationClickable: true,
		spaceBetween : -300,//使用这个可以 调整slidesPerView 大些  解决滑动的时候 下张图片不显示
		// pagination: '.pagination_features',
		on:{
			init: function(professionSwiper){
			  
			}, 
			slideChangeTransitionEnd: function(){
				// alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
				
				$(".class-intro img").attr("src","images/classtxt" + (this.realIndex + 1) + ".png")
			},
		}
	})
	//下载按钮
	$('.goollestorlink, .appstorlink').addClass(`${bgClassName(currentLanguage)}`)
	// sylphslide
	
	var sylphSwiper = new Swiper ('.sylphSwiper', {
		loop: true,
		observer:true,
		observeParents:true,
		autoplay:false,
		// autoplay:{
        //     disableOnInteraction: false,
		// 	stopOnLastSlide: false,
        //     delay: 30000,
        // },
		grabCursor: true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 30,
			depth: 200,
			modifier: 3,
			slideShadows : false
		},
		slidesPerView: 1.3,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-prev-sylph',
			prevEl: '.swiper-button-next-sylph',
		},
		autoplayDisableOnInteraction: false,
		paginationClickable: true,
		spaceBetween : -300,//使用这个可以 调整slidesPerView 大些  解决滑动的时候 下张图片不显示
		// pagination: '.pagination_features',

		on:{
			init: function(sylphSwiper){
			  
			}, 
			slideChangeTransitionEnd: function(){
				// alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
				
				$(".sylph-intro img").attr("src", "images/sylphintro" + (this.realIndex + 1) + ".png")
			},
		}
	})
	// class sylph exchange
	$(".sylphSlid").addClass("hide")
	$(".roleSlidTabWrap span").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active")
	})
	$(".roleSlidTabWrap .classtab").on("click",function(){
		$(".classSlid").removeClass("hide")
		$(".sylphSlid").addClass("hide")
		$(".sylph-intro").addClass("hide")
		$(".class-intro").removeClass("hide")
		$(".sexexchange").removeClass("hide")
	})
	$(".roleSlidTabWrap .sylphtab").on("click",function(){
		$(".sylphSlid").removeClass("hide")
		$(".classSlid").addClass("hide")
		$(".sylph-intro").removeClass("hide")
		$(".class-intro").addClass("hide")
		$(".sexexchange").addClass("hide")

	})
	// classexchange
	$(".sexexchange .sexitem").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active")
		console.log(professionSwiper.realIndex)

	})
	$(".sexexchange .woman").on("click",function(){
		// $(".diffclass"+professionSwiper.realIndex).children("div.class2").removeClass("hide")
		// $(".diffclass"+professionSwiper.realIndex).children("div.class1").addClass("hide")
		$(".professionSwiper .swiper-slide").children("div.class2").removeClass("hide")
		$(".professionSwiper .swiper-slide").children("div.class1").addClass("hide")
		// console.log($(".professionSwiper .swiper-slide"))
	})
	$(".sexexchange .man").on("click",function(){
		// $(".diffclass"+professionSwiper.realIndex).children("div.class1").removeClass("hide")
		// $(".diffclass"+professionSwiper.realIndex).children("div.class2").addClass("hide")
		$(".professionSwiper .swiper-slide").children("div.class1").removeClass("hide")
		$(".professionSwiper .swiper-slide").children("div.class2").addClass("hide")
	})
	// 特色轮播
	var featuresSwiper = new Swiper ('.featuresSwiper', {
		loop: true,
		autoplay:{
            disableOnInteraction: false,
			stopOnLastSlide: false,
            delay: 300000,
        },
		grabCursor: true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: -5,
			stretch: 100,
			depth: 100,
			modifier: 3,
			slideShadows : true
		},
		slidesPerView: 1.5,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next-features',
			prevEl: '.swiper-button-prev-features',
		},
		autoplayDisableOnInteraction: false,
		paginationClickable: true,
		spaceBetween : 50,//使用这个可以 调整slidesPerView 大些  解决滑动的时候 下张图片不显示
		// pagination: '.pagination_features',
	})

    // 新闻tab切换
	$(".new-title").on("click","li",function(){
		var _index = $(this).index();
		// newType = _index
		// console.log(newType)
		// getNews(pageIndex['pageIndex'+_index])
		$(this).addClass("active").siblings("li").removeClass("active")
		var data = $(this).attr('data')
        article(articleData[data])
	})
	//console.log($(".section1").position().top)
	// 导航nav 滑动
	$(".nav-item").on("click",".item",function(){
			console.log(1)
		$(this).addClass("cue").siblings().removeClass("cue")
		if($(this).hasClass("nav-home")){
			scrollSmoothTo(0)
		}
		if($(this).hasClass("nav-news")){
			scrollSmoothTo($(".section1").position().top)
		}
		if($(this).hasClass("nav-feature")){
			scrollSmoothTo($(".section3").position().top)
		}
		
	})
	// video
    // $('.videobtnstart').click(function() {
	// 	myVideo.play();
	// 	$(this).addClass("hide")
	// 	$(".videobtnpause").removeClass("hide")
	// })
	// $('.videobtnpause').click(function() {
	// 	myVideo.pause();
	// 	$(this).addClass("hide")
	// 	$(".videobtnstart").removeClass("hide")
	// })
	
	 // video
	//  $('.login-videobtnstart').click(function() {
	// 	myLoginVideo.play();
	// 	$(this).addClass("hide")
	// 	$(".login-videobtnpause").removeClass("hide")
	// })
	// $('.login-videobtnpause').click(function() {
	// 	myLoginVideo.pause();
	// 	$(this).addClass("hide")
	// 	$(".login-videobtnstart").removeClass("hide")
	// })
	// 播放视频
	$(".videoBtn").on("click",function(){
		// var videoiframe = document.createElement('iframe');
		// videoiframe.src="//player.bilibili.com/player.html?aid=35415978&bvid=BV1kb411F7yU&cid=62084572&page=1";
		// videoiframe.setAttribute("allowFullScreen","true");
		// videoiframe.setAttribute("frameborder","0")
		// videoiframe.setAttribute("scrolling","no")
		// videoiframe.setAttribute("border","0")
		// videoiframe.setAttribute("frameborder","0")
		// videoiframe.setAttribute("framespacing","0")
		// videoiframe.style.backgroundColor = "#000";
		// videoiframe.style.width = "800px";
		// videoiframe.style.height = "500px";
		// document.getElementsByClassName("layContent")[0].appendChild(videoiframe);
		$('.video').append('<video id="videoId" controls="controls" width="100%" autoplay="autoplay" preload="auto" poster=""><source src="video.mp4" type="video/mp4"></video>');
		$(".videoLay").removeClass("hide")
		
	})
	// 关闭视频弹窗
	$(".videoLay .video").on("click",function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	})
	$('.videoLay').click(function() {
	    $(".videoLay").addClass("hide")
	    $('.video').empty();
	})
    // 首页新闻部分 
	$.ajax({
	  url: 'json/homeData.json',
	  dataType: 'json',
	  success: function(res) {
	    if (res.code == 0) {
	        articleData = res.data.list_news
	        $('.new-title').empty()
	    	if(currentLanguage == 'en') {
	    		$('.new-title').addClass('new-title2')
	    	} else {
	    		$('.new-title').removeClass('new-title2')
	    	}
	    	var list_news_type = res.data.list_news_type;
	    	var is_active = true;
	    	var first_type = '';
	        for (var xx in list_news_type ) {
	        	if ( first_type == '' ) first_type = list_news_type[xx].typeid;
	    		if(translate(list_news_type[xx].typename.toUpperCase())) {
	    			$('.new-title').append('<li class="item ' + (is_active ? 'active' : '') + '" data="'+ list_news_type[xx].typeid +'">'+ translate(list_news_type[xx].typename.toUpperCase()) +'</li>')
	    		} else {
	        		$('.new-title').append('<li class="item ' + (is_active ? 'active' : '') + '" data="'+ list_news_type[xx].typeid +'">'+ list_news_type[xx].typename +'</li>')
	    		}
	    
	    		is_active = false;
	        }
	    	article(articleData[ first_type ])
	    	
	    	newSwiper(res.data.list_swiper)
	    }
	  }
	});
	/* ajaxFunc('/api.website.index/apiHome', {}, function(res) {
        if (res.code == 0) {
            articleData = res.data.list_news
            $('.new-title').empty()
			if(currentLanguage == 'en') {
				$('.new-title').addClass('new-title2')
			} else {
				$('.new-title').removeClass('new-title2')
			}
			var list_news_type = res.data.list_news_type;
			var is_active = true;
			var first_type = '';
            for (var xx in list_news_type ) {
            	if ( first_type == '' ) first_type = list_news_type[xx].typeid;
				if(translate(list_news_type[xx].typename.toUpperCase())) {
					$('.new-title').append('<li class="item ' + (is_active ? 'active' : '') + '" data="'+ list_news_type[xx].typeid +'">'+ translate(list_news_type[xx].typename.toUpperCase()) +'</li>')
				} else {
            		$('.new-title').append('<li class="item ' + (is_active ? 'active' : '') + '" data="'+ list_news_type[xx].typeid +'">'+ list_news_type[xx].typename +'</li>')
				}

				is_active = false;
            }
			article(articleData[ first_type ])
			
			newSwiper(res.data.list_swiper)
        }
    }) */
	function newSwiper(data){
		$('.newsSwiper .swiper-wrapper').empty()
        var len = data.length
        for (var i = 0; i < len; i++) {
            $('.newsSwiper .swiper-wrapper').append('<div class="swiper-slide"><img src="'+data[i].image_big+'" class="swiper-lazy"><span class="newDescrip">'+data[i].description+'</span></div>')
        }

		// 新闻轮播
		var newsSwiper = new Swiper ('.newsSwiper', {
			loop: true,
			autoplay:{
				disableOnInteraction: false,
				delay: 3000,
			},
			// autoplay:false,
			
			lazyLoading: true,
			pagination: {
				el: '.pagination_new',
				clickable :true,
			},
			on:{
				init: function(professionSwiper){
				  $(".newLink").attr("href",data[0].url)
				}, 
				slideChangeTransitionEnd: function(){
					// alert(this.realIndex);//切换结束时，告诉我现在是第几个slide
					$(".newLink").attr("href",data[this.realIndex].url)
					
				},
			}
		})
	}
	function article(data) {
        $('.cnt-wrap .itemwrap').empty()
        var len = data.length > 5 ? 5 : data.length
        for (var i = 0; i < len; i++) {
			if(translate(data[i].typename.toUpperCase())) {
				$('.cnt-wrap .itemwrap').append('<li class="row-between-center"><div class="type">'+translate(data[i].typename.toUpperCase())+'</div><a class="cmt" href="news_detail.html?aid='+ data[i].aid +'"><div class="new-d row-between-center"><span class="dt">'+ data[i].title +'</span><span class="tm">'+ data[i].updatetime +'</span></div></a></li>')
			} else {
				$('.cnt-wrap .itemwrap').append('<li class="row-between-center"><div class="type">'+data[i].typename+'</div><a class="cmt" href="news_detail.html?aid='+ data[i].aid +'"><div class="new-d row-between-center"><span class="dt">'+ data[i].title +'</span><span class="tm">'+ data[i].updatetime +'</span></div></a></li>')
			}
        }
    }
    
})