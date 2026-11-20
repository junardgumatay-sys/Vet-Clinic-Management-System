import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "../../owners/entities/owner.entity";
import { Breed } from "../../breeds/entities/breed.entity";

@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    pet_id: string

    @Column({ type: 'uuid' })
    owner_id: string

    @ManyToOne(() => Owner, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'owner_id' })
    owner: Owner

    @Column({ type: 'uuid' })
    breed_id: string

    @ManyToOne(() => Breed, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'breed_id' })
    breed: Breed

    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 10 })
    gender: string

    @Column({ type: 'date', nullable: true })
    date_of_birth: Date

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    weight_kg: number

    @Column({ type: 'boolean', default: true })
    is_active: boolean

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}
