import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item.entity";
import { Restaurant } from "./Restaurant.entity";

@Entity("menus")
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => Restaurant)
    @JoinColumn({ name: 'id' })
  restaurant: Restaurant

  @ManyToMany(() => Item, (item: Item) => item.menus, {
    onDelete: "CASCADE"
  })
  @JoinTable({
    name: "menu_items",
    joinColumn: {
      name: "menu_id",
      referencedColumnName: "id", 
    },
    inverseJoinColumn: {
      name: "item_id",
      referencedColumnName: "id",
    }
  })
  items: Item[]
}