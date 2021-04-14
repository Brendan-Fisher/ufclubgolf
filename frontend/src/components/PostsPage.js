import "./styles/PostsPage.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getPostList,
    getEventList
  } from "../redux/actions/contentActions";
import M from 'materialize-css/dist/js/materialize.min.js';
import PostsList from "./features/PostsList";

class PostsPage extends Component {

    componentDidMount()
    {
        let tabs = document.querySelector('.tabs');
        var instance = M.Tabs.init(tabs, {duration:200, responsiveThreshold: window.innerWidth});

        this.props.getPostList();
        this.props.getEventList();
    }

    render() {
        const posts = [];

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
                title:"This is a event post_id: " + i,
                hyperlink:"about",
                catagory:"event",
                edited_date: "1970-1-1",
                status: "Ended",
            };
            posts.push(post);
        }
        for(var i = 0; i < 12; i++)
        {
            let post = {
                title:"This is a agenda post_id: " + i,
                hyperlink:"about",
                catagory:"agenda",
                edited_date: "1970-1-1",
                status: (i < 3 ?"Coming":"Finished"),
                start_time: "2021/12/31 8:00AM",
                end_time: "2021/12/31 1:00PM",
            };
            posts.push(post);
        }

        
        const tab_general = [];
        const tab_event = [];
        const tab_agenda = [];

        posts.map((post, index)=>{
            if(post.catagory === "event")
            {
                tab_event.push(post);
            }
            if(post.catagory === "general")
            {
                tab_general.push(post);
            }
            if(post.catagory === "agenda")
            {
                tab_agenda.push(post);
            }
        });


        
        return (
            <div>
                <div id="container" className="container">
                    <div id="content" className="row" style={{minWidth:'90%', marginTop:'0px', marginBottom:"0px"}}>
                        <div>
                            <ul className="tabs tabs-fixed-width z-depth-1 green lighten-1 top">
                                <li className="tab col s3"><a href="#tab_general" className="white-text">All Club Posts</a></li>
                                <li className="tab col s3"><a href="#tab_event" className="white-text">Events</a></li>
                            </ul>
                            <div id="tab_general">
                                {!tab_general && <p className="center"> No post existing in this catagory.</p> || <PostsList posts={tab_general} catagory={"general"} enable_search={true}/>}
                            </div>
                            <div id="tab_event">
                                {tab_event.length === 0 && <p className="center"> No post existing in this catagory.</p>}
                                {tab_event.length !== 0 && <PostsList posts={tab_event} catagory={"event"} />}
                            </div>
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
  };
  
  const mapStateToProps = (state) => ({
    content: state.content
  });
  
  export default connect(mapStateToProps, {
    getPostList,
    getEventList,
  })(PostsPage);
  