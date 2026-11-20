import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "../../pets/entities/pet.entity";
import { Veterinarian } from "../../veterinarians/entities/veterinarian.entity";
import { AppointmentStatus } from "../../appointment_statuses/entities/appointment_status.entity";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    appointment_id: string

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

    @Column({ type: 'uuid' })
    appointment_status_id: string

    @ManyToOne(() => AppointmentStatus, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'appointment_status_id' })
    appointmentStatus: AppointmentStatus

    @Column({ type: 'timestamp' })
    appointment_date: Date

    @Column({ type: 'text', nullable: true })
    reason: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}
