import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";
import { Order } from "./Order.entity";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person)
    @JoinColumn({ name: "person_id" })
  personDetails: Person

  @OneToMany(() => Order, (order: Order) => order.customer)
  orders: Order[]
}