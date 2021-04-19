import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'; 
import  DOMPurify  from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createEvent, getEventList, massEmail } from "../../redux/actions/contentActions";
import store from '../../redux/store';
import { throws } from 'should';

class EventEditor extends Component {
  constructor(){
    super();
    this.state = {
      eventTitle: "",
      date: "",
      editorState: EditorState.createEmpty(),
      convertedContent: "",
      location: "",
    }
  }

  handleEditorChange = (state) => {
    this.setState({ editorState: state })
    this.convertContentToHTML();
  }

  

  convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(this.state.editorState.getCurrentContent());
    this.setState({ convertedContent: currentContentAsHTML });
  }

  onPost = e => {
    var event = {
      type: "Event",
      title: this.state.eventTitle,
      date: this.state.date,
      location: this.state.location,
      body: this.state.convertedContent,
    }
    this.props.massEmail(event, store.getState().users.memberList);
    this.props.createEvent(event);
    this.props.getEventList();

    this.setState({
      eventTitle: "",
      date: "",
      editorState: EditorState.createEmpty(),
      convertedContent: "",
      location: "",
    })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="input-field">
            <label>Event Name</label>
            <input 
              onChange={this.onChange} 
              value={this.state.eventTitle}
              type="text"
              id="eventTitle" />
          </div>
          <label>Event Date and Time</label>
          <div className="input-field" style={{maxWidth: "250px"}}>
            <input onChange={this.onChange} type="datetime-local" id="date" value={this.state.date} min="2021-01-01"></input>
          </div>
          <div className="input-field">
            <label>Event Location</label>
            <input 
              onChange={this.onChange}
              value={this.state.location}
              type="text"
              id="location" />
          </div>
        </form>
        
        <h5>Event Body</h5>
        <Editor
            editorState={this.state.editorState}
            wrapperClassName="post-editor"
            editorClassName="demo-editor"
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
            }}
            onEditorStateChange={this.handleEditorChange}
        />
        <div className="preview" dangerouslySetInnerHTML={this.createMarkup(this.state.convertedContent)}></div>
        <button style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            margin: "11.250px"
        }} className="btn btn-medium waves-effect waves-green hoverable blue accent-3" 
        onClick={this.onPost}>
          Create Event
        </button>
      </div>
    )
  }
}

EventEditor.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getEventList: PropTypes.func.isRequired,
  massEmail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  createEvent,
  getEventList,
  massEmail,
})(EventEditor)