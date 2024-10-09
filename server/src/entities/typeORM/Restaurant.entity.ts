import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./Menu.entity";
import { Order } from "./Order.entity";

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false})
  phone: string;

  @Column({ nullable: false })
  location: string;

  @OneToMany(() => Order, (order: Order) => order.restaurant)
  orders?: Order[]
}