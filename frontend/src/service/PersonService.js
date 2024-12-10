import BaseService from "./BaseService";

class PersonService extends BaseService {
    constructor() {
        super('person');
    }

    async login(credentials) {
        const response = await this.api.post(`${this.endPoint}/login`, credentials);
        return response.data;
    }

    async register(user) {
        const response = await this.api.post(`${this.endPoint}`, user);
        return response.data;
    }

    async passwordResetRequest(email) {
        const response = await this.api.post(`${this.endPoint}/password-reset-request`, { email });
        return response.data;
    }

    async validatePasswordResetCode(data) {
        const response = await this.api.post(`${this.endPoint}/password-reset-validate`, data);
        return response.data;
    }

    async resetPassword(data) {
        const response = await this.api.post(`${this.endPoint}/password-reset`, data);
        return response.data;
    }
}

export default PersonService;