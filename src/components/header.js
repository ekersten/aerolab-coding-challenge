import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../store/actions/user_actions';

import logo from '../assets/images/aerolab-logo.svg';

class Header extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {
        if (this.props.user.user) {
            const { user } = this.props.user
            return (
                <header>
                    <div className="top-bar">
                        <div className="logo">
                            <img src={logo} alt="Aerolab's Coding Challenge"/>
                        </div>
                        <div className="user-info">{user.name} <span className="points">{user.points}</span></div>
                    </div>
                    <div className="hero">
                        <h1 className="title">Electronics</h1>
                    </div>
                </header>
            )
        } else {
            return null;
        }
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.userStore
    }
}

export default connect(mapStateToProps)(Header);