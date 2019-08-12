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
        this.setState({ sortBy: event.target.value });
    }

    sortDirChange = (event) => {
        this.setState({ sortDir: event.target.value });
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
                products: this.getFilteredProducts(this.props.products.products),
                categories: this.props.products.products.reduce((unique, item) => {
                    return unique.includes(item.category) ? unique : [...unique, item.category]
                }, []).sort()
            }
        } else {
            return {
                products: [],
                categories: []
            };
        }
    }

    render() {
        const { products, categories } = this.getCatalog();
        const categoryOptions = categories.map((item, i) => (
            <option value={item} key={i}>{item}</option>
        ))
        const displayProducts = products.map(item => (
            <Product product={item} key={item._id}/>
        ))
        return (
            <div className="catalog">
                <div className="filters">
                    Categoria: <select value={this.state.filterCategory} onChange={this.categoryChange}>
                        <option value="">Todas</option>
                        {categoryOptions}
                    </select>

                    Ordernar por: <select value={this.state.sortBy} onChange={this.sortByChange}>
                        <option value="name">Nombre</option>
                        <option value="category">Categoría</option>
                        <option value="cost">Precio</option>
                    </select>
                    <select value={this.state.sortDir} onChange={this.sortDirChange}>
                        <option value="asc">Menor a Mayor</option>
                        <option value="desc">Mayor a Menor</option>
                        
                    </select>
                </div>

                <div className="product-grid">
                    {displayProducts}
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