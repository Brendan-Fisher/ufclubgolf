import { Component } from "react";

import M from 'materialize-css/dist/js/materialize.min.js';
import bg1 from '../../img/impressionImage.jpg';
import bg2 from '../../img/bg.jpg';

const quotes = [
    {
        quote: "Success in this game depends less on strength of body than strength of mind and character", 
        author: "Arnold Palmer"
    },
    {
        quote: "I get to play golf for a living. What more can you ask for, getting paid for doing what you love",
        author: "Tiger Woods"
    },
    {
        quote: "Stay true to yourself and listen to your inner voice. It will lead you to your dream.",
        author: "James Ross"
    },
    {
        quote: "A good golfer has the determination to win and the patience to wait for the breaks",
        author: "Gary Player"
    },

    {
        quote: "Golf is about how well you accept, respond to, and score with your misses much more so than it is a game of your perfect shots.",
        author: "Dr. Bob Rotella"
    },
    {
        quote: "I have to believe in myself. I know what I can do, what I can achieve.",
        author: "Sergio Garcia"
    },
    {
        quote: "Golf is a compromise between what your ego wants you to do, what experience tells you to do, and what your nerves let you do",
        author: "Bruce Crampton"
    },
    {
        quote: "As you walk down the fairway of life you must smell the roses, for you only get to play one round.",
        author: "Ben Hogan"
    },
    {
        quote: "Golf is a science, the study of a lifetime, in which you can exhaust yourself but never your subject",
        author: "David Forgan"
    },
    {
        quote: "A routine is not a routine if you have to think about it",
        author: "Davis Love Jr."
    },
    {
        quote: "I think it’s more than whether or not you win or lose. It’s having that opportunity on that final round, final nine, to come down the stretch with a chance to win",
        author: "Phil Mickelson"
    },
    {
        quote: "Always make a total effort, even when the odds are against you.",
        author: "Arnold Palmer"
    },
    {
        quote: "It’s about hitting the ball in the center of the club face and hitting it hard",
        author: "Bubba Watson"
    }
]

class ImageSlider extends Component
{   
    componentDidMount()
    {
        let slider = document.querySelector('.slider');
        M.Slider.init(slider, {indicators: false, duration: 1500, interval: 5000, height: window.outerHeight * 0.65});
    }

    render()
    {
        /*--here is the container the images should store in --*/
        const srcImages = [bg1, bg2]
        const items = []
        
        for(const [index, value] of srcImages.entries())
        {
            var quote = quotes[Math.floor(Math.random() * quotes.length)]
            
            items.push(
                <li key={index}>
                    <img alt={"image number " + index + " has not found."} src={value} className="SliderImg"/>  
                    <div className="caption right-align">
                        <h3>Welcome to Florida Club Golf!</h3>
                        <h5 className="light grey-text text-lighten-3">{quote.quote}<br/>- {quote.author}</h5>
                    </div>
                </li>
            )
        }

        return(
            <div className='slider'>
                <ul className='slides'>
                    {items}
                </ul>
            </div>
        )
    }
}
export default ImageSlider;