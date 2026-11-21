import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../../common/enums/role.enum";
import { Exclude } from "class-transformer";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    password_hash: string

    @Column({ type: 'varchar', length: 20, enum: UserRole, })
    role: string

    @Column({ type: 'boolean', default: true })
    is_active: boolean

    @Column({ type: 'varchar', length: 255, nullable: true })
    refresh_token_hash: string | null

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}
