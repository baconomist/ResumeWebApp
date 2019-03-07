class SlideShow
{
    constructor(slide_element)
    {
        this.slideshow_element = slide_element;
        this.slides = $(this.slideshow_element).children();
        this.current_slide = 0;
        this.animation = slide_element.css("animation");

        this.listeners = []
    }

    nextSlide()
    {
        if (this.slideshow_element.hasClass("fadein"))
        {
            this.slideshow_element.removeClass("fadein");
            this.slideshow_element.addClass("fadeout");
            this.registerAnimationEvent();
            return;
        }

        // Fade in on next slide
        this.slideshow_element.removeClass("fadeout");
        this.slideshow_element.addClass("fadein");

        this._setNextSlide();

        this.restartAnimation();

        // Re-register our event for the next animation
        this.registerAnimationEvent();

        this.onSlideChange();
    }

    _setNextSlide()
    {
        $(this.slides[this.current_slide]).removeClass("active");

        this.current_slide++;
        if (this.current_slide > this.slides.length - 1)
            this.current_slide = 0;

        $(this.slides[this.current_slide]).addClass("active");
    }

    restartAnimation()
    {
        this.slideshow_element.removeClass("slideshow");
        let instance = this;
        setTimeout(function ()
        {
            instance.slideshow_element.addClass("slideshow");
        }, 20);
    }

    start()
    {
        this.slideshow_element.addClass("fadein");
        this.registerAnimationEvent();
    }

    stop()
    {
        this.slideshow_element.removeClass("fadein");
        this.slideshow_element.removeClass("fadeout");
    }

    addOnSlideChangeListener(listener)
    {
        this.listeners.push(listener);
    }

    onSlideChange()
    {
        for (let i = 0; i < this.listeners.length; i++)
        {
            this.listeners[i]();
        }
    }

    registerAnimationEvent()
    {
        // Called when all animations in queue are finished, move to next slide
        // .promise(), from the looks of it, gets the element animations
        // then using .done() the listener is added
        let instance = this;
        this.slideshow_element.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function ()
        {
            instance.nextSlide();
        });
    }
}

// Make SlideShow importable
export {SlideShow};
