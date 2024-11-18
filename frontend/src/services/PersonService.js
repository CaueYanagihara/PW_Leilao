import BaseService from "./BaseService";

class PersonService extends BaseService{
    constructor(){
        super('person');
    }

    async login(credentials){
        const response = this.api.post(`${this.endPoint}/login`, credentials);
        return response.data
    }
}
export default PersonService;