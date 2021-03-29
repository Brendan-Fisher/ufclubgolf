import React, { Component } from "react";
import store from "../../redux/store";
import PropTypes from "prop-types";
import {
  promoteUser,
  demoteUser,
  getUsers,
  deleteUser,
} from "../../redux/actions/userActions";
import { MDBDataTable } from "mdbreact";
import { connect } from "react-redux";

export class MemberList extends Component {
  onPromoteClick = (user) => {
    this.props.promoteUser(user);
  };

  onDemoteClick = (user) => {
    this.props.demoteUser(user);
  };

  onDeleteClick = (user) => {
    this.props.deleteUser(user);
  }

  render() {
    let rows = [];
    store.getState().users.memberList.forEach((user) => {
      let row = {
        delete: (
          <a href="#!" onClick={() => { if (window.confirm('Are you sure you would like to delete this user?')) this.onDeleteClick(user) } }><i className="material-icons">delete_forever</i></a>
        ),
        name: user.name,
        memberType: user.memberType,
        promote: (
          <button onClick={() => this.onPromoteClick(user)}>Promote</button>
        ),
        demote: (
          <button onClick={() => this.onDemoteClick(user)}>Demote</button>
        ),
      };
      rows.push(row);
    });

    let data = {
      columns: [
        {
          label: "Delete",
          field: "delete",
          width: 50,
        },
        {
          label: "Name",
          field: "name",
          width: 150,
        },
        {
          label: "Role",
          field: "memberType",
          width: 100,
        },
        {
          label: "Promote",
          field: "promote",
          width: 100,
        },
        {
          label: "Demote",
          field: "demote",
          width: 100,
        },
      ],
      rows: rows,
    };

    return <MDBDataTable entries={6} theadColor={"white"} hover={true} autoWidth={true} striped={true} data={data} searching={true} />;
  }
}

MemberList.propTypes = {
  promoteUser: PropTypes.func.isRequired,
  demoteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, {
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser
})(MemberList);
