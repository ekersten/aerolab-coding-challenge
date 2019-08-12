import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/actions/products_actions';

import Product from './product';

class Catalog extends Component {

    state = {
        sortBy: 'name',
        sortDir: 'asc',
        filterCategory: '',
        perPage: 16,
        page: 1
    }

    componentDidMount() {
        this.props.dispatch(getProducts())
    }

    categoryChange = (event) => {
        this.setState({ filterCategory: event.target.value });
    }

    sortByChange = (event) => {
        const [sortBy, sortDir] = event.target.value.split(' ');
        this.setState({ sortBy, sortDir });
    }

    getFilteredProducts = (products) => {
        if(this.state.filterCategory) {
            products = products.filter(item => {
                return item.category === this.state.filterCategory
            })
        }

        return products.sort((a, b) => {
            const { sortBy, sortDir } = this.state;
            if(a[sortBy] < b[sortBy]) {
                return sortDir === 'asc' ? -1 : 1
            }
            if (a[sortBy] > b[sortBy]) {
                return sortDir === 'asc' ? 1 : -1
            }

            return 0
        });
    }

    getCatalog = () => {
        if(this.props.products.products) {
            return {
                totalProducts: this.props.products.products.length,
                products: this.getFilteredProducts(this.props.products.products),
                categories: this.props.products.products.reduce((unique, item) => {
                    return unique.includes(item.category) ? unique : [...unique, item.category]
                }, []).sort()
            }
        } else {
            return {
                totalProducts: 0,
                products: [],
                categories: []
            };
        }
    }

    render() {
        const { totalProducts, products, categories } = this.getCatalog();
        const categoryOptions = categories.map((item, i) => (
            <option value={item} key={i}>{item}</option>
        ))
        const displayProducts = products.map(item => (
            <Product product={item} key={item._id}/>
        ))
        return (
            <div className="catalog-container">
                <div className="catalog">
                    <div className="tools">
                        <div className="pager">{products.length} of {totalProducts} products</div>
                        <div className="filters">
                            <span className="filter">
                                <label>Category:</label> <select value={this.state.filterCategory} onChange={this.categoryChange}>
                                    <option value="">All</option>
                                    {categoryOptions}
                                </select>
                            </span>

                            <span className="filter">
                                <label>Sort By:</label> <select value={this.state.sortBy} onChange={this.sortByChange}>
                                    <option value="name asc">Name Ascending</option>
                                    <option value="name desc">Name Descending</option>
                                    <option value="cost asc">Price Ascending</option>
                                    <option value="cost desc">Price Descending</option>
                                </select>
                            </span>
                        </div>
                    </div>


                    <div className="product-grid">
                        {displayProducts}
                    </div>

                </div>
            </div>
            
        )
    }

}

const mapStateToProps = (state) => {
    return {
        products: state.productStore
    }
}

export default connect(mapStateToProps)(Catalog);