import axios from 'axios';
import { GET_USER } from '../types';
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