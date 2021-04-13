import React, { Component } from "react";
import { post } from "request";
import M from 'materialize-css/dist/js/materialize.min.js';


class Posts extends Component {

    componentDidMount()
    {
        let tabs = document.querySelector('.tabs');
        var instance = M.Tabs.init(tabs, {duration:200, responsiveThreshold: window.innerWidth});
    }

    render() {
        {/* temporary variable : The following variable should be switch to the data from database*/}
        var capacity = 3;
        var title = "hello world";
        var type = "";
        var accessLink = "about";
        var lastEditDate = "";

        var page_index = 0;
        var page_show_max = 10;
        var page_isNeed = (page_show_max < capacity);

        var tab_selection = "Events";
        const posts = [];

        {/*= import access link into the container =*/}
        for(var i = 0; i < (page_isNeed ? page_show_max : capacity); i++)
        {
            var post_index = page_show_max * page_index + i;
            posts.push(
                <a href={accessLink} className="collection-item waves-effect waves-teal"> {title} </a>
            )
        }
        
        const tab_general = [];
        const tab_event = [];
        const tab_agendar = [];


        return (
            <div>
                <div id="container" className="container valign-wrapper ">
                    <div id="content" className="row" style={{minWidth:'100%', marginTop:'0px'}}>
                        <div>
                            <ul className="tabs tabs-fixed-width z-depth-1 green lighten-1 top">
                                <li className="tab col s3"><a href="#tab_general" className="white-text">General</a></li>
                                <li className="tab col s3"><a href="#tab_event" className="white-text">Event</a></li>
                                <li className="tab col s3"><a href="#tab_agendar" className="white-text">Agendar</a></li>
                            </ul>
                            <div id="tab_general">
                                {capacity === 0 && <p className="center"> No post existing in this catagory.</p>}
                                {capacity !== 0 && <div className="collection"> {posts} </div>}
                            </div>
                            <div id="tab_event">
                                {capacity = 0}
                                {capacity === 0 && <p className="center"> No post existing in this catagory.</p>}
                                {capacity !== 0 && <div className="collection"> {posts} </div>}
                            </div>
                            <div id="tab_agendar">
                                {capacity = 0}
                                {capacity === 0 && <p className="center"> No post existing in this catagory.</p>}
                                {capacity !== 0 && <div className="collection"> {posts} </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;