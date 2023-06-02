interface User {
    first_name: string;
    last_name: string;
    date_birth: string;
    address: string;
    token?: string;
    password: string;
    mobile_phone: string;
    email: string;
    session_active: boolean;
}

export default User;