import { Column, Entity, ForeignKey, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Species } from "../../species/entities/species.entity";

@Entity('breeds')
export class Breed {
    @PrimaryGeneratedColumn('uuid')
    breed_id: string

    @Column({ type: 'uuid'})
    species_id: string

    @ManyToOne(() => Species, { onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'species_id'})
    species: Species;

    @Column({ type: 'varchar', length: 50 })
    name: string
}
