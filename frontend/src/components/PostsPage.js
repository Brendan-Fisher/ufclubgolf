import "./styles/PostsPage.css";
import React, { Component } from "react";
import store from '../redux/store';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getPostList,
    getEventList,
    getTournamentList
  } from "../redux/actions/contentActions";
import M from 'materialize-css/dist/js/materialize.min.js';
import { MDBDataTable } from "mdbreact";

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

class PostsPage extends Component {

    componentDidMount()
    {
        let tabs = document.querySelector('.tabs');
        var instance = M.Tabs.init(tabs, {duration:200, responsiveThreshold: window.innerWidth});

        this.props.getPostList();
        this.props.getEventList();
        this.props.getTournamentList();
    }

    render() {
        let posts = store.getState().content.posts;
        let events = store.getState().content.events;
        let tournaments = store.getState().content.tournaments;

        let general = [];
        let eventList = [];

        posts.forEach((post) => {
            let row = {
                category: post.category,
                title: (<a href={"/posts/" + post._id}><u>{post.title}</u></a>),
                date: post.date,
            }

            general.push(row);
        })

        events.forEach((event) => {
            let row = {
                title: <a href={"/events/" + event._id}><u>{event.title}</u></a>,
                location: event.location,
                date: convertDate(event.eventDate),
            }

            eventList.push(row);
        })

        tournaments.forEach((tournament) => {
            let row = {
                category: "Tournament",
                title: <a href={"/tournaments"}><u>{tournament.title}</u></a>,
                date: tournament.createdDate,
            }

            general.push(row);
        })

        let generalData = {
            columns: [
                {
                    label: "Title",
                    field: "title",
                    width: 200,
                },
                {
                    label: "Category",
                    field: "category",
                    width: 100
                },
                {
                    label: "Date Posted",
                    field: "date",
                    width: 100,
                }
            ],
            rows: general,
        }

        let eventData = {
            columns: [
                {
                    label: "Title",
                    field: "title",
                    width: 100
                },
                {
                    label: "Location",
                    field: "location",
                    width: 200,
                },
                {
                    label: "Event Date",
                    field: "date",
                    width: 100,
                }
            ],
            rows: eventList,
        }
        
        return (
            <div>
                <div id="container" className="container blue lighten-4">
                    <div id="content" className="row" style={{minWidth:'90%', marginTop:'0px', marginBottom:"0px"}}>
                            <ul className="tabs tabs-fixed-width z-depth-1 green lighten-1 top">
                                <li className="tab col s3"><a href="#tab_general" className="white-text">All Club Posts</a></li>
                                <li className="tab col s3"><a href="#tab_event" className="white-text">Events</a></li>
                            </ul>
                            <div id="tab_general">
                                <MDBDataTable entries={5} theadColor={"orange lighten-4"} hover={true} autoWidth={true} striped={true} data={generalData} searching={false} noBottomColumns={true} />
                            </div>
                            <div id="tab_event">
                                <MDBDataTable entries={5} theadColor={"orange lighten-4"} hover={true} autoWidth={true} striped={true} data={eventData} searching={false} noBottomColumns={true} />
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}


PostsPage.propTypes = {
    getPostList: PropTypes.func.isRequired,
    getEventList: PropTypes.func.isRequired,
    getTournamentList: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    content: state.content
  });
  
  export default connect(mapStateToProps, {
    getPostList,
    getEventList,
    getTournamentList
  })(PostsPage);
  