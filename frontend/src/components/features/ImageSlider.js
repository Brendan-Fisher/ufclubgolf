import { Component } from "react";

import M from 'materialize-css/dist/js/materialize.min.js';
import bg1 from '../../img/impressionImage.jpg';
import bg2 from '../../img/bg.jpg';

class ImageSlider extends Component
{   
    componentDidMount()
    {
        let slider = document.querySelector('.slider');
        M.Slider.init(slider, {indicators: false, duration: 1500, interval: 5000, height: window.outerHeight * 0.65});
    }

    render()
    {
        {/*--here is the container the images should store in --*/}
        const srcImages = [bg1, bg2]
        const items = []
        
        for(const [index, value] of srcImages.entries())
        {
            items.push(
                <li key={index}>
                    <img alt={"image number " + index + " has not found."} src={value} className="SliderImg"/>  
                    <div className="caption right-align">
                        <h3>Welcome to UF Golf Club!</h3>
                        <h5 className="light grey-text text-lighten-3">There are no shortcuts on the quest for perfection <br/>- Ben Hogan</h5>
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