import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('medicines')
export class Medicine {
    @PrimaryGeneratedColumn('uuid')
    medicine_id: string

    @Column({ type: 'varchar', length: 100, unique: true})
    name: string

    @Column({type: 'text', nullable: true})
    description: string

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    unit_price: number

    @Column({type: 'int', default: 0})
    stock_quantity: number
}
