import { ERole } from 'src/constants/entity.constant';

export class IUserAttributes {
    name: string;
    email: string;
    password: string;
    address: string;
    role: ERole;
}
