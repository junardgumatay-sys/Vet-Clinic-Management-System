import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "../../prescriptions/entities/prescription.entity";
import { Medicine } from "../../medicines/entities/medicine.entity";

@Entity('prescription_details')
export class PrescriptionDetail {
    @PrimaryGeneratedColumn('uuid')
    detail_id: string

    @Column({ type: 'uuid' })
    prescription_id: string

    @ManyToOne(() => Prescription, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'prescription_id' })
    prescription: Prescription;

    @Column({ type: 'uuid' })
    medicine_id: string

    @ManyToOne(() => Medicine, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'medicine_id' })
    medicine: Medicine;

    @Column({ type: 'varchar', length: 50 })
    dosage: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_price: number;
}
