import React, { Component } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import {PostsList} from "./features/PostsList.js";


class Tournaments extends Component {
    componentDidMount()
    {
        let collapsible = document.querySelector('.collapsible');
        var instance = M.Collapsible.init(collapsible, {accordion: true});
    }  

    render() {
        var num_current_tournament = 1;
        var num_past_tournament = 1;

        {/* supposed to be 2d array, outter is each tournament, inner is each game of a tournament */}
        const past_tournaments = [];
        const current_tournaments = [];

        {/* input data */}
        for(var i_t = 0; i_t < 5; i_t++)
        {
            // Temporary variables for testing. TODO::These variables should be instead with data from database.
            var tournament_title = "UF Winter Cup";
            let games=[];
            var tournament_status="In Progress";
            tournament_status = (i_t === 0? "In Progress" : "Finished") 

            for(var i = 0; i < 18; i++)
            {
                var game_status="Ended";
                var game_winner="God Player A";
                if(tournament_status === "In Progress" && i === 0)
                {
                    game_status="Coming";
                    game_winner="no one";
                }

                games.push({
                    title: tournament_title + " game " + i,
                    status: game_status,
                    winner: game_winner,
                    start_time: "2021/12/31"
                });
            }

            if(tournament_status === "Finished"){
                past_tournaments.push(
                    <li>
                        <div className="collapsible-header green lighten-2 "><i class="material-icons">games</i>{ tournament_title}</div>
                        <div className="collapsible-body white" style={{paddingBlock:0}}>
                            <PostsList posts={games} catagory={"tournament_games"} />
                        </div>
                    </li>
                );
            }
            else{
                current_tournaments.push(
                    <li>
                        <div className="collapsible-header orange lighten-2 "><i class="material-icons">donut_large</i>{ tournament_title}</div>
                        <div className="collapsible-body white" style={{paddingBlock:0}}>
                            <PostsList posts={games} catagory={"tournament_games"} active_color={true}/>
                        </div>
                    </li>
                );
            }
        }






        return (
            <div id="container" className="container">
                <div id="content" className="row">
                    <div className="flexbox">
                        <div id="box" className="col s12 center-align">
                            <h4>
                                Welcome to the <span style={{ fontFamily: "monospace" }}><b>UF Club Golf</b> Tournament History Page</span>
                            </h4>
                        </div>
                    </div>
                </div>
                <ul className="collection with-header">
                    <li className="collection-header"><h3>Tournament</h3></li>
                    <li className="collection" style={{marginTop:0}}>
                        { num_current_tournament <= 0 ?
                            <p className="center"> There has no tournament in progress.</p>:
                            <div>
                                <ul className="collapsible popout" style={{marginTop:0}}>
                                    {current_tournaments}
                                    {past_tournaments}
                                </ul>
                            </div>
                        }
                    </li>
                </ul>
            </div>
        );
    }
}

export default Tournaments;