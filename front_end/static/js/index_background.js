class SlideShow
{
    constructor(slide_element)
    {
        this.slide_element = slide_element;
        this.slides = $(this.slide_element).children();
        this.current_slide = 0;
        this.animation = slide_element.css("animation");
    }

    nextSlide()
    {
        $(this.slides[this.current_slide]).removeClass("active");

        this.current_slide++;
        if (this.current_slide > this.slides.length - 1)
            this.current_slide = 0;

        $(this.slides[this.current_slide]).addClass("active");

       // this.slide_element.toggle().toggle();
        this.slide_element.removeClass("slideshow");


        //this.slide_element.css("animation", "");
        let instance = this;
        setTimeout(function ()
        {
            instance.enableAnimation();
        }, 20);

        registerAnimationEvent();
    }

    enableAnimation()
    {
        this.slide_element.addClass("slideshow");
        //this.slide_element.css("animation", this.animation);
    }
}

let index_background = $(".slideshow");

let slideshow = new SlideShow(index_background);

function registerAnimationEvent()
{
    // Called when all animations in queue are finished, move to next slide
    // .promise(), from the looks of it, gets the element animations
    // then using .done() the listener is added
    index_background.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function ()
    {
        slideshow.nextSlide();
        console.log("aaa");
    });
}

registerAnimationEvent();

//setInterval(function(){slideshow.nextSlide();}, 250);
