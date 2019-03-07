import {changeColor, Color} from "./name.js"
import {SlideShow} from "./slideshow.js";
import {addNavClickListener} from "./navbar.js"


let slideshow_element = $(".slideshow");
let slideshow = new SlideShow(slideshow_element);
slideshow.start();


let names = $.find("name");
setInterval(function ()
{
    changeColor(names);
}, 10);


let pages = $("div>page").children();
let last_page_id = "";
function goToPage(event)
{
    let link_clicked = $(event.target);
    let link_id = $(link_clicked).attr("id");

    let corresponding_page = $($.find("page#" + link_id));

    // Check if distance in vh
    if(Math.abs(corresponding_page.offset().top - $("body").offset().top)/$(window).height()*100 < 10)
        return;

   /* $("html, body").on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
        // Stop animation if user is trying to scroll
        $("html, body").stop();
        console.log("aaaa");
    });*/

    $("html, body").animate({
       scrollTop: corresponding_page.offset().top - $(corresponding_page.parent()).offset().top + $(corresponding_page.parent()).scrollTop()
    }, 1250, function ()
    {
        $("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    });

    last_page_id = link_id;
}

addNavClickListener(goToPage);

/*
* slideshow.addOnSlideChangeListener(function ()
{
    changeColor(names);
});
* */