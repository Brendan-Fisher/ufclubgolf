import React, { useEffect, useState } from "react";
import { getPosts } from "../../redux/actions/contentActions";
import '../styles/Landing.css';

export default function PostList() {
    const [fullPostList, setPostList] = useState(null);
    let posts = <div></div>

    const PostFunction = async () => {
        try {
            let all = await getPosts();
    
            posts = all.data.map((post) => {
                return (
                    <tr>
                        <td><a style={{color: "#21438d"}} href={"/posts/" + post._id}>{post.title}</a></td>
                        <td>{post.category}</td>
                        <td>{post.date}</td>
                    </tr>
                )
            })

            setPostList(posts);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        PostFunction();
    }, []);

    return ( 
        <div className="posts-list">
            <table className="posts-table">
                <tr className="posts-table-header">
                    <th><h3>Title</h3></th>
                    <th><h3>Category</h3></th>
                    <th><h3>Date Posted</h3></th>
                </tr>
                {fullPostList}
            </table>
        </div>
    )
}