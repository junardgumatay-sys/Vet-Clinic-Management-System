import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('species')
export class Species {
    @PrimaryGeneratedColumn('uuid')
    species_id: string;

    @Column({ type: 'varchar', length: 50, unique: true})
    name: string;
}