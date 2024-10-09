import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";
import { Order } from "./Order.entity";

@Entity("delivery_mans")
export class DeliveryMan {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person)
    @JoinColumn({ name: "person_id" })
  personDetails: Person

  @OneToMany(() => Order, (order: Order) => order.deliveryMan)
  orders: Order[]
}