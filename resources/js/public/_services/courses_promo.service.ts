import axios from 'axios';
import { config, paramsObjectToString, authorizationHeader, csrf, paramsObjectToFormData } from '../_helpers';

const path = `${config.apiUrl}/courses_promo/`;

const getOneById = async (params?: object) => await axios.get(`${path}getOneById`, { params })

export const coursesPromoService = {
    getOneById,
};
