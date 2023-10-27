import React, {Component} from "react";
import MainPageLayout from "../components/MainPageLayout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Home extends Component {

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <MainPageLayout />
      </div>
    )
};

};

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);