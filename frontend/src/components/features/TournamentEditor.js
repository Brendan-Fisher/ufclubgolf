import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'; 
import  DOMPurify  from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createTournament, getTournamentList } from "../../redux/actions/contentActions";
import store from '../../redux/store';

class TournamentEditor extends Component {
  constructor(){
    super();
    this.state = {
      eventTitle: "",
      date: "",
      editorState: EditorState.createEmpty(),
      convertedContent: "",
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
    var tournament = {
      type: "Tournament",
      title: this.state.eventTitle,
      startDate: this.state.date,
      body: this.state.convertedContent,
    }
    this.props.createTournament(tournament);
    this.props.getTournamentList();

    this.setState({
      eventTitle: "",
      date: "",
      editorState: EditorState.createEmpty(),
      convertedContent: "",
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
            <label>Tournament Name</label>
            <input 
              onChange={this.onChange} 
              value={this.state.eventTitle}
              type="text"
              id="eventTitle" />
          </div>
          <label>Tournament Start Date</label>
          <div className="input-field" style={{maxWidth: "200px"}}>
            <input onChange={this.onChange} type="date" id="date" value={this.state.date} name="query-start"></input>
          </div>
        </form>
        
        <h5>Tournament Post Body</h5>
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
            width: "auto",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            margin: "11.250px"
        }} className="btn btn-medium waves-effect waves-green hoverable blue accent-3" 
        onClick={this.onPost}>
          Post Tournament Info
        </button>
      </div>
    )
  }
}

TournamentEditor.propTypes = {
  createTournament: PropTypes.func.isRequired,
  getTournamentList: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  createTournament,
  getTournamentList,
})(TournamentEditor)