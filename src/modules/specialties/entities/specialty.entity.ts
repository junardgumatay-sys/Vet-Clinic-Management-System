import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('specialties')
export class Specialty {
    @PrimaryGeneratedColumn('uuid')
    specialty_id: string;

    @Column({ type: 'varchar', length: 100, unique: true})
    name: string
}
