import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import {
    getPostList,
    getEventList,
} from "../../redux/actions/contentActions";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";


class PostsList extends Component
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

        /* specified tag for different catagory */
        let columns = [];
        if(this.props.catagory === "agenda" || this.props.catagory === "event" || this.props.catagory === "tournament_games")
        if(this.props.catagory === "tournament")
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
        if(this.props.catagory !== "agenda" && this.props.catagory !== "tournament_games")
            columns.push({
                label: "Last Edited Date",
                field:"edited_date",
                sort:"asc",
                width: 50,
            }
        );

        let data = {
            columns:columns,
            rows: rows,
        };

        return <div id="table" className="collection blue lighten-4" style={{marginTop:0}} > 
                    <MDBDataTable className="text-center" entries={5} theadColor={"orange lighten-4"}  hover={true} autoWidth={true} striped={true} data={data} searching={this.props.enable_search} />
                </div>
    }
}


PostsList.propTypes = {
    getPostList: PropTypes.func.isRequired,
    getEventList: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    content: state.content
});

export default connect(mapStateToProps, {
    getPostList,
    getEventList,
})(PostsList);