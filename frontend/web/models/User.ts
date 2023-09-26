
export interface UserInterface {
    email: string;
    token: string;
    type: string;
    status: string;
}

class User {
    email: string;
    token: string;
    type: string;
    status: string;

    constructor(email: string, token: string, type: string, status: string) {
        this.email = email;
        this.token = token;
        this.type = type;
        this.status = status;
    }

    static getGuestUser(): User {
        return new this('', '', 'guest', "confirmed")
    }

    static load(data: any): User {
        return new User(data.email, data.token, data.type, data.status);
    }
    // Creates an object given the data
    toObject(): any {
        return { email: this.email, type: this.type, status: this.status };
    }

    isLogged(): boolean {
        return !!(this.token && this.type != 'guest' && this.email)
    }

}

export default User