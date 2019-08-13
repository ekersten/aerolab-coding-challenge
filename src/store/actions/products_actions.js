import axios from 'axios';
import { GET_PRODUCTS, REDEEM_PRODUCT } from '../types';
import { API_URL } from '../../utils/misc';


export function getProducts() {

    const request = axios({
        method: 'get',
        url: `${API_URL}/products`
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: GET_PRODUCTS,
        payload: request
    }
}

export function redeemProduct(id) {
    const request = axios({
        method: 'post',
        url: `${API_URL}/redeem`,
        data: {
            productId: id
        }
    }).then( response => {
        return response.data;
    }).catch(e => {
        return false;
    });

    return {
        type: REDEEM_PRODUCT,
        payload: request
    }
}