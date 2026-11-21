import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_statuses')
export class PaymentStatus {
    @PrimaryGeneratedColumn('uuid')
    payment_status_id: string

    @Column({ type: 'varchar', length: 20, unique: true})
    name: string
}
