import { Component } from "react";

import M from 'materialize-css/dist/js/materialize.min.js';
import bg1 from '../../img/headers/bg.jpg';
import bg2 from '../../img/headers/golfbag.jpg';
import bg4 from '../../img/headers/Nationals.jpg';
import bg5 from '../../img/headers/PresidentsCup2019.jpg';
import bg6 from '../../img/headers/SkylerandNick.jpg';

class ImageSlider extends Component
{   
    componentDidMount()
    {
        let slider = document.querySelector('.slider');
        M.Slider.init(slider, {indicators: false, duration: 1500, interval: 5000, height: 'auto' });
    }

    render()
    {
        const srcImages = [bg1, bg2, bg4, bg5, bg6]
        const items = []
        
        for(const [index, value] of srcImages.entries())
        {
            
            items.push(
                <li key={index}>
                    <img alt={'Header Image #' + index} src={value} className="SliderImg"/>  
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