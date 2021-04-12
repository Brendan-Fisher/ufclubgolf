import { isSupported } from "dompurify";
import React, {Component} from "react";

import M from 'materialize-css/dist/js/materialize.min.js';

import '../styles/CarouselPanel.css';
import testImage from '../../img/bg_2.jpg';


export class CarouselPanel extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        let carousel = document.querySelector('.carousel');
        let instance = M.Carousel.init(carousel, { fullWidth: true, indicators: true, duration: 500});

        let timer = setInterval(()=>{
            instance.next();
        }, 5500);
    }

    render(){
        var panels = [];

        {/* temporary inputs for testing the panel */}
        for(var i = 0; i < 4; i++)
        {
            var imageSrc = testImage;
            var bg_style = {
                backgroundImage: "url(" + imageSrc + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }

            if(i % 2 !== 0) // for testing; this can be deleted safely.
            {
                bg_style = {};
            }

            panels.push(
                <div className="carousel-item green lighten-3 black-text"   href="#one!" style={bg_style}>
                    <h2> The Carousel Panel {i + 1} </h2>
                    <h5>Carousel can contain upcoming events and the information about them as well as a direct link to more inforamtion about the event on the events page</h5>
                </div>
            );
        }



        return(
            <div id="box" className="col s12 m4 l4 center-align" style={{padding:0}}>
                <div>
                    <div className="carousel carousel-slider" >
                        {panels}
                    </div>     
                </div>
            </div>
        );
    }
}

export default CarouselPanel;