import React, {Component} from "react";
import M from 'materialize-css/dist/js/materialize.min.js';



{/* legacy */}
var post=
{
    title:"no name",
    links:"#!",
    catagory:"general"
}

class PostsLister extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state={
            lines:[],
            index:0,
            max_show_number: (this.props.max_show_number ? this.props.max_show_number : 10),
            count: 0
        }
    }
    render()
    {
        var max_show_number = this.max_show_number;
        var count = this.count;
        var index = this.index;
        var count = this.count;

        const posts = [];

        {/*= import access link into the container =*/}
        for(var i = 0; i < (count > max_show_number & max_show_number !== -1 ? max_show_number : count); i++)
        {
            var index = max_show_number * page_index + i;
            posts.push(
                <a href="#!" className="collection-item waves-effect waves-teal"> {/* title */} </a>
            )
        }

        const pagination = [];
        if(count > max_show_number)
        {
            {/* left arrow */}
            var left_arrow_tag = "waves_effect";
            if(index <= this.max_show_number)
            {
                left_arrow_tag = "disabled";
            }
            pagination.push(
                <li className={left_arrow_tag}>
                    <a href="#!"><i className="material-icons">chevron_left</i></a>
                </li>
            );
            for(var page_index = 0; page_index < Math.ceil(count / (max_show_number)); page_index++)
            {
                var active_tag = "waves_effect";
                if(page_index === Math.ceil(index / max_show_number))
                {
                    active_tag = "active";
                }

                var page_index_name = "page_" + page_index;
                pagination.push(
                    <li className={active_tag}>
                        <a href={page_index_name} onClick={() => {index = page_index}}>{page_index}</a>
                    </li>
                );
            }
        }

        return <div>
            <div className="collection"> {posts} </div>
            {count > max_show_number && <ul className="pagination"> {pagination} </ul>}
        </div>;
    }

}

export default PostsLister;