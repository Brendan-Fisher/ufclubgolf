import { Component } from "react";
import PropTypes from "prop-types";
import { createAnnouncement } from "../../redux/actions/contentActions";
import { connect } from "react-redux";

export class CreateAnnouncement extends Component {
    constructor(){
        super();
        this.state = {
            content: "",
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const content = this.state;
        this.props.createAnnouncement(content);
    }

    render() {
        return (
            <div>
                <h3>Update Announcement</h3>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <input
                            onChange={this.onChange}
                            value={this.state.content}
                            id="content"
                        />
                        <label>Content</label>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button className="btn btn-medium waves-effect waves-green hoverable blue accent-3" >Post</button>
                    </div>
                </form>
            </div>
        )
    }
}

CreateAnnouncement.propTypes = {
    createAnnouncement: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
})

export default connect(mapStateToProps, {
    createAnnouncement
})(CreateAnnouncement);