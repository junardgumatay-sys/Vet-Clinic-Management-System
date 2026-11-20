import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_statuses')
export class PaymentStatus {
    @PrimaryGeneratedColumn('uuid')
    payment_statuses_id: string

    @Column({ type: 'varchar', length: 20, unique: true})
    name: string
}
