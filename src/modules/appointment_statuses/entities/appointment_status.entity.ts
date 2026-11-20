import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment_statuses')
export class AppointmentStatus {
    @PrimaryGeneratedColumn('uuid')
    appointment_statuses_id: string

    @Column({ type: 'varchar', length: 20, unique: true})
    name: string
}
