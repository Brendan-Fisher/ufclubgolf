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

export default function EventList() {
    const [eventList, setEventList] = useState(null);

    const EventFunction = async () => {
        try {
            const events = await getEvents()
            console.log(events.data);
            console.log(events.data.length)

            if(events.data.length > 1){
                setEventList(
                    <div className="events-list">
                        <div className="event">
                            <h3>{events.data[0].title}</h3>
                            <p className="event-date">{splitDateTime(events.data[0].eventDate)}</p>
                            <p className="event-summary">{events.data[0].plaintext}</p>
                            <p className="event-link"><a href={"/events/" + events.data[0]._id}><u>Learn More</u></a></p>
                        </div>
                        <div className="event">
                            <h3>{events.data[1].title}</h3>
                            <p className="event-date">{splitDateTime(events.data[1].eventDate)}</p>
                            <p className="event-summary">{events.data[1].plaintext}</p>
                            <p className="event-link"><a href={"/events/" + events.data[1]._id}><u>Learn More</u></a></p>
                        </div>
                        <p>
                            <a className="btn indigo darken-4" href="/posts">More Events</a>
                            <a className="btn indigo darken-4" href="/calendar">Calendar</a>
                        </p>
                    </div>
                )
            }
            else if (events.data.length === 0){
                setEventList(
                    <div>
                        <h3>No Upcoming Events</h3>
                    </div>
                )
            }
            else setEventList(
                <div className="events-list">
                    <div className="event">
                        <h3>{events.data[0].title}</h3>
                        <p className="event-date">{splitDateTime(events.data[0].eventDate)}</p>
                        <p className="event-summary">{events.data[0].plaintext}</p>
                        <p className="event-link"><a href={"/events/" + events.data[0]._id}><u>Learn More</u></a></p>
                    </div>
                    <p>
                        <a className="btn indigo darken-4" href="/posts">More Events</a>
                        <a className="btn indigo darken-4" href="/calendar">Calendar</a>
                    </p>
                </div>
            )
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        EventFunction();
    }, []);

    return ( 
        eventList
    )
}