import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant.entity";
import { Customer } from "./Customer.entity";
import { DeliveryMan } from "./DeliveryMan.entity";
import { Item } from "./Item.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  status: boolean;

  @Column({ nullable: false, name: 'total_price' })
  price: number;

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.orders)
  restaurant: Restaurant

  @ManyToOne(() => DeliveryMan, (deliveryMan: DeliveryMan) => deliveryMan.orders)
  deliveryMan: DeliveryMan

  @ManyToOne(() => Customer, (Customer: Customer) => Customer.orders)
  customer: Customer

  @ManyToMany(() => Item, (item: Item) => item.orders, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "order_items",
    joinColumn: {
        name: "order_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name: "item_id",
        referencedColumnName: "id",
    }
  })
  items: Item[]
}