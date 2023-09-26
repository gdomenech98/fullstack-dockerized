import ApiCaller from '@lib/ApiCaller';
import User from '@models/User';

class UserApi {

    constructor() {}

    static async login(credentials: any): Promise<User>{
        const data = await ApiCaller.instance().call('/api/v1/users/login','POST', credentials);
        return new User(data.email, data.token, data.type, data.status);
    }

    static async register(credentials: any): Promise<string>{
        return await ApiCaller.instance().call("/api/v1/users/register", "POST", credentials);
    }

    static async forgotPassword(email:string): Promise<any>{
        return await ApiCaller.instance().call('/api/v1/users/forgotPassword', 'POST', {email: email});
    }
    static async changePassword(token:string, password:string): Promise<any>{
        return await ApiCaller.instance().call(`/api/v1/users/changepassword?token=${token}`, 'POST', {password:password});

    }
    
}

export default UserApi;