import React, { Component } from "react";
import { getPosts } from "../../redux/actions/contentActions";

async function getPostList(){
    var postArray = await getPosts();

    var postTable = buildTable(postArray);

    return postTable;
}

function buildTable(input){
    let rows = [];

    // eslint-disable-next-line
    for(var i = 0; i < input.data.length; i++){
        let row = (
            <tr key={input.data[i].title}>
                <td>{input.data[i].title}</td>
                <td>{input.data[i].category}</td>
                <td>{input.data[i].date}</td>
            </tr>
        )

        rows.unshift(row);
    }

    return (
        <div>
            <h5>Recent Club Posts</h5>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

class PostsTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: <div></div>,
            mounted: false,
        }
    }

    async componentDidMount(){
        let posts = await getPostList();

        this.setState({
            posts: posts,
            mounted: true,
        })
    }

    render() {
        return (
            <div>
                {this.state.posts}
            </div>
        )
    }
}

export default PostsTable;