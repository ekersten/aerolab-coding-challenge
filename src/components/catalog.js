import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { getProducts, redeemProduct } from '../store/actions/products_actions';
import { getUser } from '../store/actions/user_actions';

import Product from './product';

import prevIcon from '../assets/icons/arrow-left.svg';
import nextIcon from '../assets/icons/arrow-right.svg';

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
        this.setState({ filterCategory: event.target.value, page: 1 });
    }

    sortByChange = (event) => {
        const [sortBy, sortDir] = event.target.value.split(' ');
        console.log(event.target.value);
        this.setState({ sortBy, sortDir });
    }

    prevPage = () => {
        this.setState((prevState) => {
            return {
                page: prevState.page - 1
            }
        })
    }
    nextPage = () => {
        this.setState((prevState) => {
            return {
                page: prevState.page + 1
            }
        })
    }

    getFilteredProducts = (products) => {
        const start = this.state.perPage * (this.state.page - 1);
        // console.group();
        // console.log(products);
        // console.log(this.state.page, start, this.state.perPage * this.state.page);
        // console.log(products.slice(start, this.state.perPage * this.state.page));
        // console.groupEnd()
        products = products.slice(start, this.state.perPage * this.state.page);
        if(this.state.filterCategory) {
            products = products.filter(item => {
                return item.category === this.state.filterCategory
            })
        }

        return products.sort((a, b) => {
            const { sortBy, sortDir } = this.state;
            const aProp = (sortBy === 'name') ? a[sortBy].toLowerCase() : a[sortBy];
            const bProp = (sortBy === 'name') ? b[sortBy].toLowerCase() : b[sortBy];
            if(aProp < bProp) {
                return sortDir === 'asc' ? -1 : 1
            }
            if (aProp > bProp) {
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

    onRedeem = (id) => {
        this.props.dispatch(redeemProduct(id)).then(() => {
            const product = this.props.products.products.find((item) => {
                return item._id === id
            })
            toast.success(`Success! ${product.name} is on it's way!`)
            this.props.dispatch(getUser())
        });
    }

    render() {
        const { totalProducts, products, categories } = this.getCatalog();
        const categoryOptions = categories.map((item, i) => (
            <option value={item} key={i}>{item}</option>
        ))
        const displayProducts = products.map(item => (
            <Product product={item} key={item._id} onRedeem={this.onRedeem}/>
        ))
        const showPrev = this.state.page > 1;
        const showNext = this.state.page < Math.ceil(totalProducts / this.state.perPage);


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
                                <label>Sort By:</label> <select value={`${this.state.sortBy} ${this.state.sortDir}`} onChange={this.sortByChange}>
                                    <option value="name asc">Name ascending</option>
                                    <option value="name desc">Name descending</option>
                                    <option value="cost asc">Price low to high</option>
                                    <option value="cost desc">Price high to low</option>
                                    <option value="_id asc">Date: Most recent first</option>
                                    <option value="_id desc">Date: Oldest first</option>
                                </select>
                            </span>
                        </div>
                    </div>


                    <div className="product-grid">
                        {displayProducts}
                    </div>

                </div>

                <div className="catalog-pager">
                    {showPrev && <button onClick={() => this.prevPage()}><img src={prevIcon} alt="Previous page"/></button>}
                    {showNext && <button onClick={() => this.nextPage()}><img src={nextIcon} alt="Next page" /></button>}
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