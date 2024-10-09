import { DeliveryMan } from "./typeORM/DeliveryMan.entity";

export class Node {
    public cost: number | undefined;
    public g: number | undefined;
    public h: number | undefined;
  
    constructor(
      public point: [number, number],
      public isWall: boolean = false,
      public restaurant?: Restaurant,
      public user?: User,
      public deliveryMan?: DeliveryMan
    ) {}
  }
  
  export interface User {
    name: string;
  }
  
  export interface Restaurant {
    name: string;
  }
  