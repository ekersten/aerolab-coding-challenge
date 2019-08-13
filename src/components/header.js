import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import { toast } from 'react-toastify';


import { getUser, addPoints } from '../store/actions/user_actions';

import logo from '../assets/images/aerolab-logo.svg';

class Header extends Component {

    componentDidMount() {
        this.props.dispatch(getUser());
    }
    
    onAddPoints = (amount) => {
        this.props.dispatch(addPoints(amount)).then(() => {
            toast.success(`${amount} points added!`);
        })
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
                        <div className="user-info">
                            {user.name} <span className="points">{numeral(user.points).format('0,0')}</span>
                            <div className="options">
                                <div className="option">
                                    <div className="title">Recently redeemed products</div>
                                    <div className="content">
                                        {
                                            user.redeemHistory.length > 0 ?
                                                <div className="history">
                                                    {user.redeemHistory.reverse().slice(0,3).map((item,i) => (
                                                        <div className="history-item" key={i}>
                                                            <div className="image" style={{backgroundImage: `url(${item.img.url})`}}>
                                                                
                                                            </div>
                                                            <div className="text">
                                                                <div className="name">{item.name}</div>
                                                                <div className="date">{moment(item.createDate).fromNow()}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            :
                                                <p>You have no redeemed products</p>
                                        }
                                    </div>
                                </div>
                                <div className="option">
                                    <div className="title">Add Points</div>
                                    <div className="content">
                                        <button className="add-points" onClick={() => this.onAddPoints(1000)}>1000</button>
                                        <button className="add-points" onClick={() => this.onAddPoints(5000)}>5000</button>
                                        <button className="add-points" onClick={() => this.onAddPoints(7500)}>7500</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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