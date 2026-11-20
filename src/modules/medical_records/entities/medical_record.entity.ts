import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "../../pets/entities/pet.entity";
import { Veterinarian } from "../../veterinarians/entities/veterinarian.entity";
import { Appointment } from "../../appointments/entities/appointment.entity";

@Entity('medical_records')
export class MedicalRecord {
    @PrimaryGeneratedColumn('uuid')
    record_id: string

    @Column({ type: 'uuid' })
    pet_id: string

    @ManyToOne(() => Pet, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'pet_id' })
    pet: Pet

    @Column({ type: 'uuid' })
    vet_id: string

    @ManyToOne(() => Veterinarian, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'vet_id' })
    vet: Veterinarian

    @Column({ type: 'uuid', unique: true })
    appointment_id: string

    @OneToOne(() => Appointment, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment

    @Column({ type: 'timestamp' })
    visit_date: Date

    @Column({ type: 'text', nullable: true })
    diagnosis: string

    @Column({ type: 'text', nullable: true })
    treatment_plan: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}
