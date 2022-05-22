import { ERole } from 'src/constants/entity.constant';

export interface IAuthPayload {
    id: string;
    role: ERole;
}
