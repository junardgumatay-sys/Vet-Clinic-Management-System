import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Specialty } from "../../specialties/entities/specialty.entity";

@Entity('veterinarians')
export class Veterinarian {
    @PrimaryGeneratedColumn('uuid')
    vet_id: string

    @Column({ type: 'uuid', unique: true })
    user_id: string

    @OneToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'varchar', length: 50 })
    first_name: string

    @Column({ type: 'varchar', length: 50 })
    last_name: string

    @Column({ type: 'varchar', length: 50, unique: true })
    license_number: string

    @Column({ type: 'uuid' })
    specialty_id: string

    @ManyToOne(() => Specialty, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'specialty_id' })
    specialty: Specialty

    @Column({ type: 'varchar', length: 20 })
    phone_number: string

    @CreateDateColumn({ type: 'timestamp', })
    created_at: Date
}
