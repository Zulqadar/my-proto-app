import axios, { AxiosResponse } from 'axios';
import { CreateRequestEntity, RequestEntityResponse } from '../../../models/view-models';

export interface IRequestService {
    create: (request: CreateRequestEntity) => Promise<boolean>;
    get: () => Promise<RequestEntityResponse[]>;
    approve: (requestId: string) => Promise<boolean>;
    delete: (requestId: string) => Promise<boolean>;
}

class RequestService implements IRequestService {
    private readonly baseURL: string;

    constructor(baseEndpoint: string) {
        this.baseURL = baseEndpoint + '/posts';
    }

    async create(request: CreateRequestEntity): Promise<boolean> {
        const response: AxiosResponse = await axios.post(this.baseURL, request);
        return response.status === 200;
    }

    async get(): Promise<RequestEntityResponse[]> {
        const response: AxiosResponse<RequestEntityResponse[]> = await axios.get(this.baseURL);
        return response.data;
    }

    async approve(requestId: string): Promise<boolean> {
        const response: AxiosResponse = await axios.put(`${this.baseURL}/${requestId}`);
        return response.status === 200;
    }

    async delete(requestId: string): Promise<boolean> {
        const response: AxiosResponse = await axios.delete(`${this.baseURL}/${requestId}`);
        return response.status === 200;
    }
}

export default RequestService;