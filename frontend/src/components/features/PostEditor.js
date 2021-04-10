import React, { Component } from 'react';
import { EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'; 
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createPost } from "../../redux/actions/contentActions";

class  PostEditor extends Component {
  constructor(){
    super();
    this.state = {
      postTitle: "",
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
      body: this.state.convertedContent,
    }
    console.log(post);
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
        <h5>Post Title</h5>
        <form>
          <div className="input-field">
            <input 
              style={{color:"black"}}
              onChange={this.onChange} 
              value={this.state.postTitle}
              id="postTitle" />
          </div>
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

export default PostEditor;



