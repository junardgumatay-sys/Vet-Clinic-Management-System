import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalRecord } from "../../medical_records/entities/medical_record.entity";

@Entity('prescriptions')
export class Prescription {
    @PrimaryGeneratedColumn('uuid')
    prescription_id: number;

    @Column({ type: 'uuid', unique: true })
    record_id: string;

    @OneToOne(() => MedicalRecord, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'record_id' })
    medicalRecord: MedicalRecord;

    @Column({ type: 'timestamp' })
    issued_date: Date;
}
