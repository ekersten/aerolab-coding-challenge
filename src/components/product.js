import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {

    render() {
        
        
        if (this.props.user.user) {
            const { user } = this.props.user
            const { name, cost, category, img } = this.props.product;
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