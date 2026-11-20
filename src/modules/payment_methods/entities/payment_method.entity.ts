import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    payment_method_id: string

    @Column({ type: 'varchar', length: 30, unique: true})
    name: string
}
