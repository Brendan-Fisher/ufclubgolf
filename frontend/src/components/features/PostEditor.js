import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'; 
import  DOMPurify  from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createPost, getPostList, massEmail } from "../../redux/actions/contentActions";
import store from '../../redux/store';

class  PostEditor extends Component {
  constructor(){
    super();
    this.state = {
      postTitle: "",
      category: "",
      editorState: EditorState.createEmpty(),
      convertedContent: "",
      email: false,
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
      type: "Post",
      title: this.state.postTitle,
      category: this.state.category,
      body: this.state.convertedContent,
    }
    if(this.state.email){
      this.props.massEmail(post, store.getState().users.memberList);
    }
    this.props.createPost(post);
    this.props.getPostList();

    this.setState({
      postTitle: "",
      category: "",
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
          <label>Title</label>
            <input 
              style={{color:"black"}}
              onChange={this.onChange} 
              value={this.state.postTitle}
              type="text"
              id="postTitle" />
          </div>
          <div className="input-field">
          <label>Category</label>
            <input 
              style={{color:"black"}}
              onChange={this.onChange} 
              value={this.state.category}
              type="text"
              id="category" />
          </div>
            <label>
              <input type="checkbox" onChange={() => this.setState({ email: !this.state.email })} id="email" />
              <span>Email all members?</span>
            </label>
            <p></p>
          <label>
            <input type="checkbox" onChange={() => this.setState({ email: !this.state.email })} id="email" />
            <span>Email club officers?</span>
          </label>
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
  getPostList: PropTypes.func.isRequired,
  massEmail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  content: state.content,
})

export default connect(mapStateToProps, {
  createPost,
  getPostList,
  massEmail,
})(PostEditor)