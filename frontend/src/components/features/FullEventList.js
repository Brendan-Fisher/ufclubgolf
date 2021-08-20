import React, { useEffect, useState } from "react";
import { getEvents } from "../../redux/actions/contentActions";
import '../styles/Landing.css';


function splitDateTime(dateTime){
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

export default function FullEventList() {
    const [fullEventList, setEventList] = useState(null);
    let events = <div></div>

    const EventFunction = async () => {
        try {
            let all = await getEvents();
    
            events = all.data.map((event) => {
                return (
                    <div className="event">
                        <h2>{event.title}</h2>
                        <h3 className="event-date">{splitDateTime(event.eventDate)}</h3>
                        <p className="event-summary">{event.plaintext}</p>
                        {event.body !== "" && 
                            <p className="event-link"><a href={"/events/" + event._id}><u>Learn More</u></a></p>
                        }
                    </div>
                )
            })

            setEventList(events);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        EventFunction();
    }, []);

    return ( 
        <div className="events-list">
            {fullEventList}
        </div>
    )
}