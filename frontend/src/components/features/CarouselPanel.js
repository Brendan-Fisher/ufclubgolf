import DOMPurify from "dompurify";
import React, {Component} from "react";
import { getEvents } from "../../redux/actions/contentActions";
import Link from "react-materialize";

import M from 'materialize-css/dist/js/materialize.min.js';

import testImage from '../../img/bg_2.jpg';

async function getEventList(){
    var eventArray = await getEvents();

    var eventSlides = buildSlides(eventArray);

    return eventSlides;
}

function convertDate(dateTime) {
    var parts = dateTime.split('-')
    var extraParts = parts[2].split('T');
    var timeParts = extraParts[1].split(':');
    var hour = parseInt(timeParts[0]);
    var dayPart = ''
    
    if(hour >= 12){
        dayPart = "PM"
    }
    else dayPart = "AM"

    timeParts[0] = hour % 12;

    return `${parts[1]}/${extraParts[0]}/${parts[0]} at ${timeParts[0]}:${timeParts[1]} ${dayPart}`;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

function buildSlides(input){
    let slides = [];

    if(input.data.length == 0){
        let slide = (
            <div className="carousel-item green lighten-3 black-text">
                <h2>There appears to be no upcoming club events</h2>
            </div>
        )

        slides.push(slide);
    }
    else {
        for(var i = 0; i < input.data.length; i++){
            let slide = (
                <div className="carousel-item green lighten-3 black-text">
                    <h1>{input.data[i].title}</h1>
                    <h6>Date: {convertDate(input.data[i].eventDate)}</h6>
                    <h6>Location: {input.data[i].location}</h6>
                    <hr />
                    <button className="btn btn-info"><a style={{ color: "black", padding: "16px" }} href={"/events/" + input.data[i]._id}>More Info</a></button>
                </div>
            )
            slides.push(slide);
        }
    }

    return slides;
}

class CarouselPanel extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            events: <div></div>,
            mounted: true
        }
    }

    async componentDidMount() {
        let events = await getEventList();

        this.setState({
            events: events,
            mounted: true,
        })

        let carousel = document.querySelector('.carousel');
        let instance = M.Carousel.init(carousel, { fullWidth: true, indicators: true, duration: 500});

        let timer = setInterval(()=>{
            instance.next();
        }, 5500);


    }

    render(){
        return(
            <div id="box" className="col s12 m5 l5 center-align" style={{padding:0}}>
                <div>
                    <div className="carousel carousel-slider" >
                        {this.state.events}
                    </div>     
                </div>
            </div>
        );
    }
}

export default CarouselPanel;