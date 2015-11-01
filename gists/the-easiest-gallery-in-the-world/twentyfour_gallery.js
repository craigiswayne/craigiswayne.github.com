/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

//extend jquery
(function($) {
          // duck-punching to make attr() return a map
          var _old = $.fn.attr;
          $.fn.attr = function() {
            var a, aLength, attributes, map;
            if (this[0] && arguments.length === 0) {
                    map = {};
                    attributes = this[0].attributes;
                    aLength = attributes.length;
                    for (a = 0; a < aLength; a++) {
                            map[attributes[a].name.toLowerCase()] = attributes[a].value;
                    }
                    return map;
            } else {
                    return _old.apply(this, arguments);
            }
    }
  }(jQuery));
//end extend jquery

var nexus = {
  parse_template: function(template,data){
    template = template || '';
    data = data || {};

    var re = /\(#(.*?)#\)/g;
    var str = template;

    var m;

    while ((m = re.exec(str)) !== null) {

        if (m.index === re.lastIndex) { re.lastIndex++; }

        var variable_name = m[0].replace("(#","").replace("#)","");
        if(data[variable_name]){
          template = template.replace(m[0],data[variable_name].toString());
        }
        else{
          template = template.replace(m[0],'');
        }
    }
    return template;

  }
};

function twentyfour_gallery (selector, settings){
  this.container = null;
  this.html      = null;
  this.interval  = null;
  this.tray      = null;
  this.tray_slider = null;
  this.tray_nav_right = null;
  this.tray_nav_left = null;
  this.stage     = null;
  this.slide_index = 0;
  this.slides = [];
  this.buttons = {};
  this.unveil_script = '!function(t){t.fn.unveil=function(i,e){function n(){var i=a.filter(function(){var i=t(this);if(!i.is(":hidden")){var e=o.scrollTop(),n=e+o.height(),r=i.offset().top,s=r+i.height();return s>=e-u&&n+u>=r}});r=i.trigger("unveil"),a=a.not(r)}var r,o=t(window),u=i||0,s=window.devicePixelRatio>1,l=s?"data-src-retina":"data-src",a=this;return this.one("unveil",function(){var t=this.getAttribute(l);t=t||this.getAttribute("data-src"),t&&(this.setAttribute("src",t),"function"==typeof e&&e.call(this))}),o.on("scroll.unveil resize.unveil lookup.unveil",n),n(),this}}(window.jQuery||window.Zepto);';
  this.settings = {
    prefix:"twentyfour_gallery_",
    css:'*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html,body{min-height:100%;min-height:100vh}img{border:none;max-height:100%;max-width:100%}button:not([disabled]),input[type=button] input:not([disabled]),a[href]:not([disabled]),.button:not([disabled]),select:not([disabled]){cursor:pointer}button[disabled],input[type=button] input[disabled],a[href][disabled],.button[disabled],select[disabled]{cursor:not-allowed}.twentyfour.gallery{background-color:#141414;min-height:100px;min-width:100px;display:block;margin:10px auto;color:white;font-family:Tahoma, Arial;position:relative;overflow:hidden;padding:0 0 30px 0;width:50%;height:300px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.twentyfour.gallery:not(.ready){background-image:url(data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiB2aWV3Qm94PSIwIDAgNDQgNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSIxIj4KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIKICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIxLjhzIgogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAyMCIKICAgICAgICAgICAgICAgIGNhbGNNb2RlPSJzcGxpbmUiCiAgICAgICAgICAgICAgICBrZXlUaW1lcz0iMDsgMSIKICAgICAgICAgICAgICAgIGtleVNwbGluZXM9IjAuMTY1LCAwLjg0LCAwLjQ0LCAxIgogICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1vcGFjaXR5IgogICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjEuOHMiCiAgICAgICAgICAgICAgICB2YWx1ZXM9IjE7IDAiCiAgICAgICAgICAgICAgICBjYWxjTW9kZT0ic3BsaW5lIgogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiCiAgICAgICAgICAgICAgICBrZXlTcGxpbmVzPSIwLjMsIDAuNjEsIDAuMzU1LCAxIgogICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgICAgPC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iMjIiIGN5PSIyMiIgcj0iMSI+CiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiCiAgICAgICAgICAgICAgICBiZWdpbj0iLTAuOXMiIGR1cj0iMS44cyIKICAgICAgICAgICAgICAgIHZhbHVlcz0iMTsgMjAiCiAgICAgICAgICAgICAgICBjYWxjTW9kZT0ic3BsaW5lIgogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiCiAgICAgICAgICAgICAgICBrZXlTcGxpbmVzPSIwLjE2NSwgMC44NCwgMC40NCwgMSIKICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utb3BhY2l0eSIKICAgICAgICAgICAgICAgIGJlZ2luPSItMC45cyIgZHVyPSIxLjhzIgogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAwIgogICAgICAgICAgICAgICAgY2FsY01vZGU9InNwbGluZSIKICAgICAgICAgICAgICAgIGtleVRpbWVzPSIwOyAxIgogICAgICAgICAgICAgICAga2V5U3BsaW5lcz0iMC4zLCAwLjYxLCAwLjM1NSwgMSIKICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgIDwvY2lyY2xlPgogICAgPC9nPgo8L3N2Zz4=);background-repeat:no-repeat;background-size:50% 50%;background-position:50% 50%}.twentyfour.gallery:not(.ready) *{display:none}.twentyfour.gallery .slider{display:block;height:100%;width:100%;white-space:nowrap;-webkit-transition:margin-left 0.3s ease;-moz-transition:margin-left 0.3s ease;-o-transition:margin-left 0.3s ease;transition:margin-left 0.3s ease}.twentyfour.gallery .slider .slide{display:inline-block;vertical-align:top;text-align:center;height:100%}.twentyfour.gallery .action_area{position:absolute;top:0;height:100%;text-align:center;cursor:pointer;z-index:10}.twentyfour.gallery .action_area.left{left:0}.twentyfour.gallery .action_area.right{right:0}.twentyfour.gallery .action_area .icon{position:absolute;top:50%;width:100%;text-align:center}.twentyfour.gallery .stage{position:relative;height:100%;padding:0;z-index:1}.twentyfour.gallery .stage .slide{padding:10px;width:100%;position:relative}.twentyfour.gallery .stage .slide .caption{display:block;background-color:white;background-color:rgba(255,255,255,0.9);color:#777;position:absolute;text-align:left;bottom:0;left:0;width:100%;padding:5px 10px;overflow:hidden;font-size:12px;border:none}.twentyfour.gallery .stage .action_area{width:100px;max-width:15%;-webkit-transition:background-color 0.1s ease-in-out;-moz-transition:background-color 0.1s ease-in-out;-o-transition:background-color 0.1s ease-in-out;transition:background-color 0.1s ease-in-out}.twentyfour.gallery .stage .action_area:hover{background-color:rgba(0,0,0,0.5)}.twentyfour.gallery .stage .action_area:hover .icon.left{left:0}.twentyfour.gallery .stage .action_area:hover .icon.right{right:0}.twentyfour.gallery .stage .action_area .icon{font-size:30px;margin-top:-15px}.twentyfour.gallery .stage .action_area .icon.left{left:-100%}.twentyfour.gallery .stage .action_area .icon.right{right:-100%}.twentyfour.gallery .stage .fullscreen.toggler{position:absolute;top:-30px;right:-30px;font-size:20px;z-index:11;cursor:pointer;background-color:black;background-color:rgba(0,0,0,0.8);text-align:center;width:30px;height:30px;line-height:30px;-webkit-transition:all 0.1s ease-in-out;-moz-transition:all 0.1s ease-in-out;-o-transition:all 0.1s ease-in-out;transition:all 0.1s ease-in-out}.twentyfour.gallery .media_bar{width:100%;height:30px;line-height:30px;position:absolute;bottom:0;left:0;z-index:2;background:#45484d;background:-moz-linear-gradient(top, #45484d 0%, #000 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #45484d), color-stop(100%, #000));background:-webkit-linear-gradient(top, #45484d 0%, #000 100%);background:-o-linear-gradient(top, #45484d 0%, #000 100%);background:-ms-linear-gradient(top, #45484d 0%, #000 100%);background:linear-gradient(to bottom, #45484d 0%, #000 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#45484d", endColorstr="#000000",GradientType=0 )}.twentyfour.gallery .media_bar .toggler{padding:5px 20px;position:absolute;height:100%;top:0;border-color:black;border-width:1px;font-size:16px}.twentyfour.gallery .media_bar .toggler:hover{background-color:#141414}.twentyfour.gallery .media_bar .toggler.play_pause_toggle{left:0;border-right-style:solid}.twentyfour.gallery .media_bar .toggler.tray_toggle{right:0;border-left-style:solid}.twentyfour.gallery .media_bar .icon.pause{display:none}.twentyfour.gallery .media_bar .status{display:block;height:100%;width:100%;text-align:center}.twentyfour.gallery .tray{position:absolute;z-index:1;bottom:-50px;left:0;width:100%;background-color:black;height:70px;padding:10px 20px;-webkit-transition:bottom 0.3s ease;-moz-transition:bottom 0.3s ease;-o-transition:bottom 0.3s ease;transition:bottom 0.3s ease}.twentyfour.gallery .tray .slider .slide.thumbnail{width:80px;margin-left:5px;cursor:pointer}.twentyfour.gallery .tray .slider .slide.thumbnail:first-child{margin-left:0}.twentyfour.gallery .tray .slider .slide.thumbnail.active{border:2px solid #00afea}.twentyfour.gallery .tray .action_area{width:20px;background-color:black}.twentyfour.gallery .tray .action_area .icon{font-size:20px;margin-top:-10px}.twentyfour.gallery:hover .fullscreen.toggler{top:10px;right:10px}.twentyfour.gallery.playing .media_bar .icon.play{display:none}.twentyfour.gallery.playing .media_bar .icon.pause{display:block}.twentyfour.gallery.show_tray .tray{bottom:30px}.twentyfour.gallery.fullscreen{height:100%;width:100%;position:fixed;top:0;left:0;margin:0}[data-embed24="Images"]{min-height:100px;display:block;background-color:#141414;font-size:13px;color:white;text-align:center}[data-embed24="Images"] .slide{display:block;padding:0 5px}[data-embed24="Images"] .slide img{margin:5px auto}[data-embed24="Images"] .slide .caption{text-align:left;border-top:1px solid #ef3f3f;padding:5px 10px}[data-embed24="Images"][data-pos="middle"]{width:100%;max-height:100%;clear:both;margin:10px auto}[data-embed24="Images"][data-pos="left"]{float:left;margin:0 10px 10px 0}',
    id:null,
    tray_default_state:'show_tray',
    container_class:"twentyfour gallery",
    fullscreen_icon_class:"icon-expand",
    play_icon_class: "icon-playback-play",
    pause_icon_class:"icon-playback-pause",
    nav_left_icon_class:"icon-angle-left",
    nav_right_icon_class:"icon-angle-right",
    thumbnail_selector:">img",
    toggle_tray_icon_class:"icon-th",
    show_speed:3000,
    autolink_css:true,
    minimum_slides:2,
    fullsize_image_attribute:'data-imageurl',
    unveil_delay:2000,
    templates:{
      gallery:'<div id="(#id#)" (#attributes#)>(#stage#)(#tray#)(#media_bar#)</div>',
      stage:'<div class="stage"><div class="fullscreen toggler icon (#fullscreen_icon_class#)"></div><div class="action_area nav left"> <div class="icon left (#nav_left_icon_class#)"></div></div><div class="slider">(#slides#)</div><div class="action_area nav right"><div class="icon right (#nav_right_icon_class#)"></div></div></div>',
      slide:'<div class="slide"><div class="aligner">(#slide_content#)</div></div>',
      tray:'<div class="tray"><div class="action_area nav left"> <div class="icon (#nav_left_icon_class#)"></div></div><div class="slider">(#thumbnails#)</div><div class="action_area nav right"><div class="icon (#nav_right_icon_class#)"></div></div></div>',
      media_bar:'<div class="media_bar"><div class="play_pause_toggle toggler button"><span class="icon play (#play_icon_class#)"></span><span class="icon pause (#pause_icon_class#)"></span></div><div class="status"><span class=current>1</span>/<span class="total">(#total_slides#)</span></div><div class="tray_toggle toggler button icon (#toggle_tray_icon_class#)"></div></div>'
    }
  };

  this.go_fullscreen = function(){
    var container = this.container[0];
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
    this.container.addClass("fullscreen");
    $("html").addClass(this.settings.prefix+"fullscreen");
  };

  this.exit_fullscreen = function(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    this.container.removeClass('fullscreen');
    $("html").removeClass(this.settings.prefix+"fullscreen");
  };

  this.toggle_fullscreen = function(force){
    var container, request;
    container = this.container;
    if(this.container.hasClass("fullscreen")){
      this.exit_fullscreen();
    }
    else{
      this.go_fullscreen();
    }
  };

  this.go_to_slide = function(index){

    if(index < 0){
      index = this.slides.length-1;
      $(this.container).addClass("last");
    }
    else{
      $(this.container).removeClass("last");
    }

    if(index > this.slides.length-1){
      index = 0;
      $(this.container).addClass("first");
    }
    else{
      $(this.container).removeClass("first");
    }

    this.slide_index = index;

    $(this.stage).find(">.slider").css("margin-left",(-(index*100))+"%");
    $(this.tray_slider).find(".slide").each(function(i){
      $(this).removeClass("active");
    });

    $(this.media_bar).find(".current").text(this.slide_index+1);

    var current_thumbnail = $(this.tray_slider).find(".slide")[this.slide_index];
    $(current_thumbnail).addClass("active");


    //shift if necessary
    var tray_width = parseInt($(this.tray).width());
    var tray_x1 = $(this.tray).offset().left;
    var tray_x2 = tray_x1 + tray_width;

    var ctx1 = $(current_thumbnail).offset().left;
    var ctx2 = ctx1 + $(current_thumbnail).outerWidth();

    var difference = 0;
    if(ctx2 > tray_x2){
      var tray_nav_right_width = parseInt($(this.tray_nav_right).width());
      difference = ctx2 - tray_x2 - tray_nav_right_width;
    }
    else if(ctx1 < tray_x1){
      var tray_nav_left_width  = parseInt($(this.tray_nav_left).width());
      difference = ctx1 - tray_x1 - tray_nav_left_width;
    }
    else{
      //thumbnail is in visible area
    }

    var slider_margin_left = parseInt($(this.tray_slider).css("margin-left"));
    $(this.tray_slider).css("margin-left", slider_margin_left - difference);

    return this.slide_index;
  };

  this.toggle_show = function(){
    $(this.container).toggleClass('playing');
    if($(this.container).hasClass('playing')){
      this.play();
    }
    else{
      this.pause();
    }
  };

  this.toggle_tray = function(){
    $(this.container).toggleClass("show_tray");
  };

  this.play = function(){
    var gallery = this;
      this.interval = setInterval(function(){
        gallery.go_to_slide(gallery.slide_index+1);
      },this.settings.show_speed);
  };

  this.pause = function(){
      clearInterval(this.interval);
  };

  this.add_event_listeners = function(){
    var gallery = this;

    $(this.tray).find(".slide").each(function(i){
      $(this).click(function(j){
        gallery.go_to_slide(i);
      });
    });

    $(this.media_bar).find(".play_pause_toggle").click(function(){
        gallery.toggle_show();
    });

    $(this.media_bar).find(".tray_toggle").click(function(){
      gallery.toggle_tray();
    });

    $(this.container).find('.action_area.nav.left').click(function(){
      gallery.go_to_slide(gallery.slide_index-1);
    });

    $(this.container).find('.action_area.nav.right').click(function(){
      gallery.go_to_slide(gallery.slide_index+1);
    });

    this.buttons.fullscreen.click(function(){
      gallery.toggle_fullscreen();
    });

    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
        var state = document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled || document.fullScreen;
        var event = state ? 'FullscreenOn' : 'FullscreenOff';
        if (document.msFullscreenEnabled && document.msFullscreenElement == null) {
            event = 'FullscreenOff';
        }
        if (event == 'FullscreenOff') {
            gallery.exit_fullscreen();
        }
    });
  };

  this.generate_slides = function(){
    var gallery = this;
    var html = '';
    for(var i=0; i<this.slides.length; i++){
      var slide = $(this.slides[i]).clone();
      var original_image_holders = $(slide).find("img["+this.settings.fullsize_image_attribute+"]");
      $(original_image_holders).each(function(){
        var new_image = $(this).clone();
        new_image.attr("src",$(this).attr(gallery.settings.fullsize_image_attribute));
        $(this).replaceWith(new_image);
      });

      slide = $(slide)[0].outerHTML;
      html += slide;
    }
    return html;
  };

  this.generate_thumbnails = function(){
    html = '';
    for(var i=0; i<this.slides.length; i++){
      var thumbnail = $(this.slides[i]).find(this.settings.thumbnail_selector).clone();
      $(thumbnail).addClass("slide thumbnail");
      thumbnail = $(thumbnail)[0].outerHTML;
      html += thumbnail;
    }
    return html;
  };

  this.generate_attributes = function(){
    var html = "";
    this.attributes["class"] = this.attributes["class"] || "";
    this.attributes["class"] += " " + this.settings.container_class;
    this.attributes["class"] += " " +  this.settings.tray_default_state;

    for(var i in this.attributes){
      html += i + "='" + this.attributes[i]+ "'";
    }

    return html;
  };

  this.update_settings = function(settings){
    $.extend(this.settings, settings);
  };

  this.generate_gallery = function(){
    data              = this.settings;
    data.slides       = this.generate_slides();
    data.thumbnails   = this.generate_thumbnails();
    data.total_slides = this.slides.length;
    data.attributes   = this.generate_attributes();

    data.stage        = nexus.parse_template(this.settings.templates.stage, data);
    data.tray         = nexus.parse_template(this.settings.templates.tray, data);
    data.media_bar    = nexus.parse_template(this.settings.templates.media_bar, data);
    return nexus.parse_template(this.settings.templates.gallery, data);
  };

  this.inject_js = function(js){
    return $('head').prepend('<script type="text/javascript" class="'+this.settings.prefix+' injected">'+js+'</script>');
  };

  this.inject_css = function(){
    return null;
    if($("style[class*='"+this.settings.prefix+"']").length == 0 && $("link[class*='"+this.settings.prefix+"']").length == 0){
      $('head').prepend('<style class="'+this.settings.prefix+'">'+this.settings.css+'</style>');
    }
    return this.settings.css;
  };

  this.use_unveil = function(jElement){
    var gallery = this;
    this.inject_js(this.unveil_script);
    jElement.addClass("unveil mobile");
    jElement.find("img").each(function(){
      $(this).attr('data-src',$(this).attr(gallery.settings.fullsize_image_attribute));
      $(this).unveil(gallery.settings.unveil_delay);
    });
  };

  this.init = function(jElement,settings){
      if($.browser.mobile){
        this.use_unveil(jElement);
        this.inject_css();
        return;
      }
      gallery = this;
      this.container = jElement;

      var slides = $(this.container).find(".slide");
      if(slides.length < this.settings.minimum_slides){
        // console.group("TwentyFour Gallery");
        // console.warn("too few slides");
        // console.info(this.container);
        // console.groupEnd();
        return null;
      }
      else{
        this.inject_css();
      }
      $(slides).each(function(index){
        gallery.slides[index] = $(this);
      });

      this.attributes = this.container.attr();
      this.update_settings(settings);
      this.update_settings(this.container.data());
      this.settings.id = this.container.attr("id") || this.settings.prefix + Math.round(Math.random()*100);

      this.container.replaceWith(this.generate_gallery());
      this.container  = $("#" + this.settings.id);
      //todo you gotta check that there are no duplicated id's

      this.stage = $(this.container).find(">.stage");
      this.tray = $(this.container).find(">.tray");
      this.tray_nav_right = $(this.tray).find(">.nav.right");
      this.tray_nav_left = $(this.tray).find(">.nav.left");
      this.tray_slider = $(this.tray).find(">.slider");
      this.media_bar  = $(this.container).find(">.media_bar");
      this.buttons.fullscreen = this.container.find(".icon.fullscreen");
      this.add_event_listeners();
      this.go_to_slide(0);
      this.container.addClass("ready");


      return this;
  };

  return this.init(selector,settings);
}

$(document).ready(function(){
  $("[data-embed24=Images]").each(function(){
      new twentyfour_gallery($(this));
  });
});
