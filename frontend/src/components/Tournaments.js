import React, { Component } from "react";
import DOMPurify from 'dompurify';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTournamentList } from "../redux/actions/contentActions";
import store from "../redux/store";

import M from 'materialize-css/dist/js/materialize.min.js';

function formatDate(date){
    var parts = date.split('-')
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

class Tournaments extends Component {
    componentDidMount()
    {
        let collapsible = document.querySelector('.collapsible');
        M.Collapsible.init(collapsible, {accordion: false});

        this.props.getTournamentList();
    }  

    render() {
        let tournaments = store.getState().content.tournaments;
        console.log(tournaments)
        var today = new Date();

        const past = [];
        const upcoming = [];

        for(var i = 0; i < tournaments.length; i++)
        {
            // Temporary variables for testing. TODO::These variables should be instead with data from database.
            let header = `${formatDate(tournaments[i].startDate)} // ${tournaments[i].title}`;

            if(today > new Date(tournaments[i].startDate)){
                past.push(
                    <li>
                        <div className="collapsible-header green lighten-2 "><i class="material-icons">games</i><b>{header}</b></div>
                        <div dangerouslySetInnerHTML={createMarkup(tournaments[i].body)} className="collapsible-body" style={{paddingBlock:0}}></div>
                    </li>
                );
            }
            else{
                upcoming.push(
                    <li>
                        <div className="collapsible-header orange lighten-2 "><i class="material-icons">donut_large</i><b>{header}</b></div>
                        <div dangerouslySetInnerHTML={createMarkup(tournaments[i].body)} className="collapsible-body" style={{padding:0}}></div>
                    </li>
                );
            }
        }

        return (
            <div id="container" className="container"  >
                <div id="content" className="row" >
                    <div className="flexbox">
                        <div id="box" className="col s12 center-align" >
                            <h4>
                                Welcome to the <span style={{ fontFamily: "monospace" }}>Tournament History Page</span>
                            </h4>
                            <h5><span style={{fontFamily: "monospace" }}>Here you can view past and upcoming club and intercollegiate tournaments</span></h5>
                        </div>
                    </div>
                </div>
                <ul className="collapsible expandable" style={{backgroundColor: "rgba(255, 255, 255, 1)", width: "100%"}}>
                    {upcoming}
                    {past}
                </ul>
            </div>
        );
    }
}

Tournaments.propTypes = {
    getTournamentList: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    content: state.content
  });
  
  export default connect(mapStateToProps, {
    getTournamentList
  })(Tournaments);
  