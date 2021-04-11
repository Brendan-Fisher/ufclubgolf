import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { connect } from "react-redux";
import { post } from "request";
import M from 'materialize-css/dist/js/materialize.min.js';
import "../styles/PostsList.css"

export class PostsList extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            posts: this.props.posts,
            max_entries: (this.props.max_entries ? this.props.max_entries : 10)
        }
    }
    
    render()
    {
        let rows = [];
        const posts = this.props.posts; 
        posts.map((post, index)=>{
            let row={
                title: (<a href={post.hyperlink} className="collection-item waves_effect transparent"> {post.title} </a>),
                edited_date : post.edited_date
            }
            rows.push(row);
        });
        let data = {
            columns:[
                {
                    label: "Title",
                    field:"title",
                    sort:"asc",
                    width: 400,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Name',
                      },
                },
                {
                    label: "Last Edited Date",
                    field:"edited_date",
                    sort:"asc",
                    width: 100,
                }
            ],
            rows: rows,
        };

        return <div id="table" className="collection white" style={{padding:0}}> 
                    <MDBDataTable entries={this.max_entries} theadColor={"green lighten-1 white-text"} hover={true} autoWidth={true} striped={true} data={data} searching={true} />
                </div>
    }
}