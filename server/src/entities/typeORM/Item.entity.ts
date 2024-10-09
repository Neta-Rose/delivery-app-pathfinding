import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./Menu.entity";
import { Order } from "./Order.entity";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  // @Column({ nullable: false })
  // picture?: string;

  @ManyToMany(() => Menu, (menu: Menu) => menu.items)
  menus: Menu[]

  @ManyToMany(() => Order, (order: Order) => order.items)
  orders: Order[];
}