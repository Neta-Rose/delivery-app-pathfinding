import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  location: string;

  // @Column({ nullable: false })
  // picture?: string;
}