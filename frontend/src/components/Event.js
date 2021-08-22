import React, { Component } from 'react';
import { getEvent } from '../redux/actions/contentActions';
import DOMPurify from 'dompurify';



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

async function getEventObject(id){
    let eventObj = await getEvent(id);
    let eventHTML = buildEvent(eventObj.data);

    return eventHTML;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

function buildEvent(event){

    return (
        <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image event-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <div className="col s12 home-about">
                                <h1>{event.title}</h1>
                                <h3>{event.location}</h3>
                                <h3 className="event-date">{convertDate(event.eventDate)}</h3>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(event.body)} className="col s12 event-body home-about" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}></div>
                        </div>
                    </div>                    
                </div>
            </div>
    )
}

class Event extends Component{
    constructor(props){
        super(props)
        this.state = {
            event: <div></div>,
        }
    }

    async componentDidMount(){
        let id = this.props.match.params.id

        let event = await getEventObject(id)

        this.setState({
            event: event,
        })

    }

    render() {
        return(
            <div>{this.state.event}</div>
        )
    }

    
}

export default Event;
