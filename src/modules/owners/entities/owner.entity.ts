import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('owners')
export class Owner {
    @PrimaryGeneratedColumn('uuid')
    owner_id: string

    @Column({ type: 'uuid', unique: true})
    user_id: string

    @OneToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'varchar', length: 50 })
    first_name: string

    @Column({ type: 'varchar', length: 50 })
    last_name: string

    @Column({ type: 'varchar', length: 20 })
    phone_number: string

    @Column({ type: 'text', nullable: true })
    address: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}
