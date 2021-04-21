import React, { Component } from 'react';
import { getPost } from "../redux/actions/contentActions";
import DOMPurify from 'dompurify';



async function getPostObject(id){
    let postObj = await getPost(id);
    let postHtml = buildPost(postObj.data);

    return postHtml;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

function buildPost(post){
    return (
        <div id="container" className="container" >
            <div id="row" className="row">
                <div className="flexbox">
                    <div id="box" className="col s12 center-align">
                        <h2>{post.title}</h2>
                        <h6>Posted on: {post.date}</h6>
                    </div>
                    <div dangerouslySetInnerHTML={createMarkup(post.body)} className="col s12" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}></div>
                </div>
            </div>
        </div>
    )
}

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            post: <div></div>,
        }
    }

    async componentDidMount(){
        let id = this.props.match.params.id

        let post = await getPostObject(id)

        this.setState({
            post: post,
        })

    }

    render() {
        return(
            <div>{this.state.post}</div>
        )
    }

    
}

export default Post;
