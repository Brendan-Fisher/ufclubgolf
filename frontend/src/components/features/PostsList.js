import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { connect } from "react-redux";
import { post } from "request";
import M from 'materialize-css/dist/js/materialize.min.js';

export class PostsList extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            posts: this.props.posts,
            max_entries: (this.props.max_entries >= 0 ? this.props.max_entries : 10),
            catagory: this.props.catagory,
            enable_search: (this.props.enable_search? this.props.enable_search:false),
        }
    }
    
    render()
    {
        let rows = [];
        const posts = this.props.posts; 
        posts.map((post, index)=>{
            let row={
                title: (<a href={post.hyperlink} className="collection-item waves_effect transparent"> {post.title} </a>),
                edited_date : post.edited_date,
                catagory: post.catagory,
                status: ( (post.catagory === "agenda" || post.catagory === "event"  ? post.status :"none")),
                winner: post.winner,
                start_time: post.start_time,
                end_time: post.end_time,
            }
            rows.push(row);
        });

        {/* specified tag for different catagory */}
        let columns = [];
        if(this.props.catagory === "agenda" || this.props.catagory === "event" || this.props.catagory === "tournament_games")
        {
            columns.push({
                label: "Status",
                field: "status",
                sort: "asc",
                width:50,
            });

        }
        if(this.props.catagory === "tournament_games")
        {
            columns.push({
                label: "Winner",
                field: "winner",
                sort: "disabled",
                width:100
            });
        }
        columns.push({
            label: "Title",
            field:"title",
            sort:"asc",
            width: 500,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        });
        if(this.props.catagory === "agenda")
        {
            columns.push({
                label: "Start Time",
                field:"start_time",
                width: 100,
            });
            columns.push({
                label: "End Time",
                field:"end_time",
                width: 100,
            });
        }
        if(this.props.catagory !== "agenda" && this.props.catagory !== "tournament_games")
            columns.push({
                label: "Last Edited Date",
                field:"edited_date",
                sort:"asc",
                width: 50,
            }
        );
        if(this.props.catagory === "tournament_games")
        {
            columns.push({
                label: "Start Date",
                field:"start_time",
                sort:"asc",
                width: 50,
            });
        }


        let data = {
            columns:columns,
            rows: rows,
        };

        return <div id="table" className="collection white" style={{marginTop:0}} > 
                    <MDBDataTable className="text-center" entries={5} theadColor={(this.props.active_color === true? "orange lighten-2 white-text": "green lighten-2 white-text")} hover={true} autoWidth={true} striped={true} data={data} searching={this.props.enable_search} />
                </div>
    }
}