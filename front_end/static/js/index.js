import {changeColor, Color} from "./name.js"
import {SlideShow} from "./slideshow.js";
import {addNavClickListener} from "./navbar.js"

function scrollToElement(element)
{
    $("html, body").on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function ()
    {
        // Stop animation if user is trying to scroll
        $("html, body").stop();
    });

    $("html, body").animate({
        scrollTop: element.offset().top - $(element.parent()).offset().top + $(element.parent()).scrollTop()
    }, 1250, function ()
    {
        $("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    });
}

let slideshow_element = $(".slideshow");
let slideshow = new SlideShow(slideshow_element);
slideshow.start();

// Name Color Changer
let names = $.find("name");
setInterval(function ()
{
    changeColor(names);
}, 10);

let last_page_id = "";

function goToPage(event)
{
    let link_clicked = $(event.target);
    let link_id = $(link_clicked).attr("id");

    let corresponding_page = $($.find("page#" + link_id));

    // Check if distance in vh
    if (Math.abs(corresponding_page.offset().top - $("body").offset().top) / $(window).height() * 100 < 10)
        return;

    scrollToElement(corresponding_page);

    last_page_id = link_id;
}

addNavClickListener(goToPage);

// Up button visibility handler
function upButtonCheck()
{
    if ($("body").scrollTop() > 0)
    {
        $(".upbutton").addClass("show");
        $(".upbutton").removeClass("hide");
    } else
    {
        $(".upbutton").removeClass("show");
        $(".upbutton").addClass("hide");
    }
}

setInterval(upButtonCheck, 10);

// Up button click handler
$(".upbutton").click(function (event)
{
    scrollToElement($("body"))
});


let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
let img = new Image();
img.src = $(slideshow.slides[slideshow.current_slide]).css("background-image").replace('url(','').replace(')','').replace(/\"/gi, "");
canvas.width = img.width;
canvas.height = img.height;
context.drawImage(img, 0, 0);

let myData = context.getImageData(0, 0, img.width, img.height);
myData.data.


/*
* slideshow.addOnSlideChangeListener(function ()
{
    changeColor(names);
});
* */