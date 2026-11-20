import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "../../pets/entities/pet.entity";

@Entity('vacinations')
export class Vacination {
    @PrimaryGeneratedColumn('uuid')
    vacination_id: string

    @Column({ type: 'uuid' })
    pet_id: string

    @ManyToOne(() => Pet, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'pet_id' })
    pet: Pet

    @Column({ type: 'varchar', length: 100 })
    vacine_name: string

    @Column({ type: 'date' })
    administered_date: Date

    @Column({ type: 'date', nullable: true })
    next_due_date: Date

    @CreateDateColumn ({ type: 'timestamp' })
    created_at: Date;
}
