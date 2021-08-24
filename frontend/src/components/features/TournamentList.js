import React, { useEffect, useState } from "react";
import { getTournaments } from "../../redux/actions/contentActions";
import '../styles/Landing.css';



function splitDate(dateTime){
    var parts = dateTime.split('-')
  
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}


export default function TournamentList() {
    const [fullTourneyList, setTourneyList] = useState(null);
    let tourneys = <div></div>

    const TourneyFunction = async () => {
        try {
            let all = await getTournaments();

            tourneys = all.data.map((tourney) => {
                return (
                    <tr>
                        <td><a style={{color: "#21438d"}} href={"/tournaments/" + tourney._id}>{tourney.title}</a></td>
                        <td>{splitDate(tourney.startDate)}</td>
                    </tr>
                )
            })

            setTourneyList(tourneys);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        TourneyFunction();
    }, []);

    return ( 
        <div className="events-list">
            <table className="posts-table">
                <tr className="posts-table-header">
                    <th><h3>Tournament Name</h3></th>
                    <th><h3>Tournament Date</h3></th>
                </tr>
                {fullTourneyList}
            </table>
        </div>
    )
}