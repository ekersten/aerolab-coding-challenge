import axios from 'axios';
import { GET_PRODUCTS } from '../types';
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