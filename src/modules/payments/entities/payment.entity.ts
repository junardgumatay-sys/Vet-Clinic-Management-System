import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../../appointments/entities/appointment.entity";
import { PaymentStatus } from "../../payment_statuses/entities/payment_status.entity";
import { PaymentMethod } from "../../payment_methods/entities/payment_method.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @Column({ type: 'uuid', unique: true })
    appointment_id: string;

    @OneToOne(() => Appointment, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;

    @Column({ type: 'uuid' })
    payment_status_id: string;

    @ManyToOne(() => PaymentStatus, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'payment_status_id' })
    paymentStatus: PaymentStatus;

    @Column({ type: 'uuid' })
    payment_method_id: string;

    @ManyToOne(() => PaymentMethod, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'payment_method_id' })
    paymentMethod: PaymentMethod;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'timestamp', nullable: true })
    paid_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
