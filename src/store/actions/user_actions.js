import axios from 'axios';
import { GET_USER, ADD_POINTS } from '../types';
import { API_URL } from '../../utils/misc';


export function getUser() {
    const request = axios({
        method: 'get',
        url: `${API_URL}/user/me`
    }).then( response => {
        return response.data
    }).catch( e => {
        return false
    });

    return {
        type: GET_USER,
        payload: request
    }
}

export function addPoints(amount=1000) {
    const request = axios({
        method: 'post',
        url: `${API_URL}/user/points`,
        data: {
            amount
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: ADD_POINTS,
        payload: request
    }
}