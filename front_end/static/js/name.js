class Color
{
    constructor(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    isBright(bright_val)
    {
        return this.r >= bright_val && this.g >= bright_val && this.b >= bright_val;
    }

    isDark(dark_val)
    {
        return this.r <= dark_val && this.g <= dark_val && this.b <= dark_val;
    }

    increaseColor(current_color, total_val = 0, r = 0, g = 0, b = 0)
    {
        this.r += r + total_val;
        this.g += g + total_val;
        this.b += b + total_val;
        return this; // return self for chaining
    }

    toStr()
    {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
}

function rgbStrToColor(rgb_str)
{
    rgb_str = rgb_str.replace("rgb(", "").replace(")", "");
    let r = parseInt(rgb_str.split(",")[0]);
    let g = parseInt(rgb_str.split(",")[1]);
    let b = parseInt(rgb_str.split(",")[2]);

    return new Color(r, g, b);
}

let factor = 1;
let r_factor = 1;
let g_factor = 1;
let b_factor = 1;
let r;
let g;
let b;
function changeColor(names)
{
    function inner(name)
    {
        let color = rgbStrToColor(name.css("color"));

        if (color.isBright(230))
        {
            factor = -1;
            r = r * (Math.random() > 0 ? 1 : 2);
            g = g * (Math.random() > 0 ? 1 : 2);
            b = b * (Math.random() > 0 ? 1 : 2);

        }
        if (color.isDark(110))
        {
            factor = 1;
            r = r * (Math.random() > 0 ? 1 : 2);
            g = g * (Math.random() > 0 ? 1 : 2);
            b = b * (Math.random() > 0 ? 1 : 2);
        }

        r = Math.random() * 10 * factor;
        g = Math.random() * Math.random() * 10 * factor;
        b = Math.random() * Math.random() * 10 * factor;

        r = r / 10;
        g = g / 10;
        b = b / 10;

        name.css("color", color.increaseColor(0, r, g, b).toStr());

    }
    for(let i = 0; i < names.length; i++)
    {
        inner($(names[i]));
    }
}

export {changeColor, Color};