import React, { Component } from 'react';
import { getPost } from '../redux/actions/contentActions';
import DOMPurify from 'dompurify';


async function getPostObject(id){
    let postObj = await getPost(id);
    let postHTML = buildPost(postObj.data);

    return postHTML;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

function buildPost(post){

    return (
        <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image event-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <div className="col s12 home-about">
                                <h1>{post.title}</h1>
                                <h3>Category: {post.category}</h3>
                                <h3 className="event-date">Posted: {post.date}</h3>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(post.body)} className="col s12 event-body home-about" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}></div>
                        </div>
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
