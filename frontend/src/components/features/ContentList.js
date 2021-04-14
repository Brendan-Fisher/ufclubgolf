import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import {
    getPostList,
    getEventList,
    deletePost,
    deleteEvent,
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

    render() {
        let posts = store.getState().content.posts;
        let events = store.getState().content.events;

        let postRows = [];
        let eventRows = [];

        
        posts.forEach((post) => {
            let row = {
                delete: <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this post?')) this.onDeletePost(post) } }><i className="material-icons">delete_forever</i></a>,
                title: <a href={"/posts/" + post._id}>{post.title}</a>,
                category: post.category,
                date: post.date,
            }

            postRows.push(row);
        })


        let postData = {
            columns: [
                {
                    label: "",
                    field: "delete",
                    width: 50,
                },
                {
                    label: "Title",
                    field: "title",
                },
                {
                    label: "Category",
                    field: "category",
                    width: 100,
                },
                {
                    label: "Date Created",
                    field: "date",
                    width: 100,
                }
            ],
            rows: postRows,
        }

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

        events.forEach((event) => {
            let row = {
                delete: <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this post?')) this.onDeleteEvent(event) } }><i className="material-icons">delete_forever</i></a>,
                title: <a href={"/events/" + event._id}>{event.title}</a>,
                eventDate: convertDate(event.eventDate),
                dateCreated: event.createdDate,
            }

            eventRows.push(row);
        })


        let eventData = {
            columns: [
                {
                    label: "",
                    field: "delete",
                    width: 50,
                },
                {
                    label: "Title",
                    field: "title",
                },
                {
                    label: "Event Date",
                    field: "eventDate",
                    width: 100,
                },
                {
                    label: "Date Created",
                    field: "dateCreated",
                    width: 100,
                }
            ],
            rows: eventRows,
        }

        return(
            <div>
                <h4>Delete Posts</h4>
                <MDBDataTable entries={5} theadColor={"orange lighten-4"} hover={true} autoWidth={true} striped={true} data={postData} searching={false} noBottomColumns={true} />
                <h4>Delete Events</h4>
                <MDBDataTable entries={5} theadColor={"orange lighten-4"} hover={true} autoWidth={true} striped={true} data={eventData} searching={false} noBottomColumns={true} />
            </div>
        )
    }
}

ContentList.propTypes = {
    deletePost: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    content: state.content
});

export default connect(mapStateToProps, {
    getPostList,
    getEventList,
    deletePost,
    deleteEvent,
})(ContentList);