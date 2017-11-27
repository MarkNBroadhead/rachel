import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUser } from '../actions';
import UserEdit from '../components/user-edit';


const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(setUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEdit)
