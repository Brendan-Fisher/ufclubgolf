import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'; 
import  DOMPurify  from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createPost } from "../../redux/actions/contentActions";

class  PostEditor extends Component {
  constructor(){
    super();
    this.state = {
      postTitle: "",
      category: "",
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
    var post = {
      title: this.state.postTitle,
      category: this.state.category,
      body: this.state.convertedContent,
    }
    this.props.createPost(post);
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
            <input 
              style={{color:"black"}}
              onChange={this.onChange} 
              value={this.state.postTitle}
              id="postTitle" />
          </div>
          <label>Title</label>
          <div className="input-field">
            <input 
              style={{color:"black"}}
              onChange={this.onChange} 
              value={this.state.category}
              id="category" />
          </div>
          <label>Category</label>
        </form>
        
        <h5>Post Body</h5>
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
          Post
        </button>
      </div>
    )
  }
  
}

PostEditor.propTypes = {
  createPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  createPost
})(PostEditor)