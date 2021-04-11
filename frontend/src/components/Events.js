import React, { Component } from "react";
import { post } from "request";
import M from 'materialize-css/dist/js/materialize.min.js';
import {PostsList} from "./features/PostsList.js"


class Events extends Component {

    componentDidMount()
    {
        let tabs = document.querySelector('.tabs');
        var instance = M.Tabs.init(tabs, {duration:200, responsiveThreshold: window.innerWidth});
    }

    render() {
        {/* temporary variable : The following variable should be switch to the data from database*/}
        const posts = [];

        for(var i = 0; i < 12; i++)
        {
            let post = {
                title:"This is a event post_id: " + i,
                hyperlink:"about",
                catagory:"event",
                edited_date: "1970-1-1"
            };
            posts.push(post);
        }
        for(var i = 0; i < 12; i++)
        {
            let post = {
                title:"This is a general post_id: " + i,
                hyperlink:"about",
                catagory:"general",
                edited_date: "1970-1-1"
            };
            posts.push(post);
        }
        for(var i = 0; i < 12; i++)
        {
            let post = {
                title:"This is a agendar post_id: " + i,
                hyperlink:"about",
                catagory:"agendar",
                edited_date: "1970-1-1"
            };
            posts.push(post);
        }

        const tab_general = [];
        const tab_event = [];
        const tab_agendar = [];

        posts.map((post, index)=>{
            if(post.catagory === "event")
            {
                tab_event.push(post);
            }
            if(post.catagory === "general")
            {
                tab_general.push(post);
            }
            if(post.catagory === "agendar")
            {
                tab_agendar.push(post);
            }
        });


        
        return (
            <div>
                <div id="container" className="container">
                    <div id="content" className="row" style={{minWidth:'100%', marginTop:'2px'}}>
                        <div>
                            <ul className="tabs tabs-fixed-width z-depth-1 green lighten-1 top">
                                <li className="tab col s3"><a href="#tab_general" className="white-text">General</a></li>
                                <li className="tab col s3"><a href="#tab_event" className="white-text">Event</a></li>
                                <li className="tab col s3"><a href="#tab_agendar" className="white-text">Agendar</a></li>
                            </ul>
                            <div id="tab_general">
                                {!tab_general && <p className="center"> No post existing in this catagory.</p> || <PostsList posts={tab_general} />}
                            </div>
                            <div id="tab_event">
                                {tab_event.length === 0 && <p className="center"> No post existing in this catagory.</p>}
                                {tab_event.length !== 0 && <PostsList posts={tab_event} />}
                            </div>
                            <div id="tab_agendar">
                                {!tab_agendar && <p className="center"> No post existing in this catagory.</p> || <PostsList posts={tab_agendar} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;