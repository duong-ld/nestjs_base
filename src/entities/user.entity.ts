import { ERole, ETableName } from 'src/constants/entity.constant';
import { BaseEntity } from 'src/core/base-entity';
import { Column, Entity } from 'typeorm';

import { IUserAttributes } from './attributes/user.interface';

@Entity(ETableName.USER)
export class User extends BaseEntity implements IUserAttributes {
    @Column({ type: 'varchar', length: '255' })
    name: string;

    @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: '255', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: '255', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: '255', nullable: false, default: ERole.USER })
    role: ERole;
}
