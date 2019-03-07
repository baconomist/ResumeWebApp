function onNavClick(event)
{
    resetNav($(this).parent());
    $(this).addClass("active");

    for(let i = 0; i < listeners.length; i++)
    {
        listeners[i](event);
    }
}

function resetNav(navElem)
{
    navElem.children().each(function ()
    {
        $(this).removeClass("active");
    })
}

$(".navbar").children().each(function ()
{
    $(this).click(onNavClick);
});


let listeners = [];
function addNavClickListener(listener)
{
    listeners.push(listener);
}

export {addNavClickListener};
