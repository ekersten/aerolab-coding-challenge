import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import coinIcon from '../assets/icons/coin.svg';

class Product extends Component {

    onRedeem = (id) => {
        this.props.onRedeem(id);
    }

    render() {
        
        
        if (this.props.user.user) {
            const { user } = this.props.user
            const { name, cost, category, img, _id } = this.props.product;
            const canRedeem = user.points >= cost;
            return (
                <div className="product">
                    <div className="info">
                        <div className="image">
                            <img src={img.url} alt={name} />
                        </div>
                        <div className="text">
                            <div className="category">{category}</div>
                            <div className="name">{name}</div>
                        </div>
                        {canRedeem ?
                            <React.Fragment>
                                <div className="redeem icon"></div>
                                <div className="redeem action">
                                    <div className="cost">{numeral(cost).format('0,0')} <img src={coinIcon} alt="coins"/></div>
                                    <button onClick={() => this.onRedeem(_id)}>Redeem Now</button>
                                </div>
                            </React.Fragment>
                        :
                            <div className="redeem missing">
                                You need {numeral(cost - user.points).format('0,0')}
                            </div>
                        }
                    </div>
                    
                    {/* <h3>{name} {cost} points</h3>
                    <h4>{category}</h4>
                    {user.points >= cost ? 
                        <button>Redeem</button>
                    : <div>You need {cost - user.points} more points</div>
                    } */}
                </div>
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

export default connect(mapStateToProps)(Product);