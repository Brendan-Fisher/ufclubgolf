import { isSupported } from "dompurify";
import React, {Component} from "react";

import M from 'materialize-css/dist/js/materialize.min.js';



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
        }, 4700);
    }

    render(){

        return(
            <div id="box" className="col s12 m4 l4 center-align">
                <div>
                    <div className="carousel carousel-slider">
                        <div className="carousel-item green lighten-3 black-text" href="#one!">
                            <h2>Pretend this is the Events slider</h2>
                            <h5>Carousel can contain upcoming events and the information about them as well as a direct link to more inforamtion about the event on the events page</h5>
                        </div>
                        <div className="carousel-item green lighten-3 black-text" href="#two!">
                            <h2>Second Panel</h2>
                            <p className="black-text">This is your second panel</p>
                        </div>
                        <div className="carousel-item green lighten-3 black-text" href="#three!">
                            <h2>Third Panel</h2>
                            <p className="black-text">This is your third panel</p>
                        </div>
                        <div className="carousel-item green lighten-3 black-text" href="#four!">
                            <h2>Fourth Panel</h2>
                            <p className="black-text">This is your fourth panel</p>
                        </div>
                    </div>     
                </div>
            </div>
        );
    }
}

export default CarouselPanel;