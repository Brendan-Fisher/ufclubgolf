import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import {
    getPostList,
    getEventList,
    getTournamentList,
    deletePost,
    deleteEvent,
    deleteTournament,
} from "../../redux/actions/contentActions";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";

class ContentList extends Component {
    onDeletePost = (post) => {
        this.props.deletePost(post);
        this.props.getPostList();
    }

    onDeleteEvent = (event) => {
        this.props.deleteEvent(event)
        this.props.getEventList();
    }

    onDeleteTournament = (tournament) => {
        this.props.deleteTournament(tournament)
        this.props.getTournamentList();
    }

    render() {
        let posts = store.getState().content.posts;
        let events = store.getState().content.events;
        let tournaments = store.getState().content.tournaments;

        let rows = [];
        let eventRows = [];

        
        posts.forEach((post) => {
            let row = {
                delete: <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this post?')) this.onDeletePost(post) } }><i className="material-icons">delete_forever</i></a>,
                category: "Post",
                title: (<a href={"/posts/" + post._id}><u>{post.title}</u></a>),
                date: post.date,
            }

            rows.push(row);
        })

        events.forEach((event) => {
            let row = {
                delete: <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this post?')) this.onDeleteEvent(event) } }><i className="material-icons">delete_forever</i></a>,
                category: "Event",
                title: <a href={"/events/" + event._id}><u>{event.title}</u></a>,
                date: event.createdDate,
            }

            rows.push(row);
        })

        tournaments.forEach((tournament) => {
            let row = {
                delete: <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this post?')) this.onDeleteTournament(tournament) } }><i className="material-icons">delete_forever</i></a>,
                category: "Tournament",
                title: <a href={"/tournaments"}><u>{tournament.title}</u></a>,
                date: tournament.createdDate,
            }

            rows.push(row);
        })


        let data = {
            columns: [
                {
                    label: "",
                    field: "delete",
                    width: 50,
                },
                {
                    label: "Content Type",
                    field: "category",
                    width: 50,
                },
                {
                    label: "Title",
                    field: "title",
                },
                {
                    label: "Date Created",
                    field: "date",
                    width: 100,
                }
            ],
            rows: rows,
        }

        return(
            <div>
                <MDBDataTable entries={5} theadColor={"orange lighten-4"} hover={true} autoWidth={true} striped={true} data={data} searching={false} noBottomColumns={true} />
            </div>
        )
    }
}

ContentList.propTypes = {
    deletePost: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    deleteTournament: PropTypes.func.isRequired,
    getPostList: PropTypes.func.isRequired,
    getEventList: PropTypes.func.isRequired,
    getTournamentList: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    content: state.content
});

export default connect(mapStateToProps, {
    getPostList,
    getEventList,
    getTournamentList,
    deletePost,
    deleteEvent,
    deleteTournament
})(ContentList);