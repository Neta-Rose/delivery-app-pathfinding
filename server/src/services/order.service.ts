import { Repository } from "typeorm";
import { Destination } from "../emuns/destination.enum";
import { AlgorithmName } from "../entities/algorithms";
import { Grid, RestaurantApi, Tile } from "../entities/grid";
import { Node } from "../entities/node";
import { Item } from "../entities/typeORM/Item.entity";
import { astar } from "./algorithms/astar";
import { dijkstra } from "./algorithms/dijkstra";
import { Order } from "../entities/typeORM/Order.entity";
import { myDataSource } from "../connection/data-source";
import { Restaurant } from "../entities/typeORM/Restaurant.entity";
import logger from "../logger/logger";
import { getRestaurantById } from "./restaurant.service";
import { getDeliveryManById } from "./deliveryMan.service";

const orderRepository: Repository<Order> = myDataSource.getRepository(Order);

interface itemDetailsInterface {
    restaurant: Restaurant;
    orderItemId: number;
    amount: number;
    item: Item;
}

const placeOrder = async (
    grid: Grid, 
    restaurant: RestaurantApi, 
    algorithm: AlgorithmName,
    orderItems: itemDetailsInterface[], 
): Promise<[
        [number, number][], 
        [number, number][], 
        [number, number],
        [number, number][], 
        [number, number][], 
    ]> => {
    const [graph1, start1, goals1] = createGraph(grid, restaurant, Destination.DELIVERY_MAN);
    const [
        deliveryManPath, 
        deliveryManvisitedNodes, 
        selectedDeliveryManPoint
    ] = dijkstra(graph1, start1, goals1);

    const [graph2, start2, goals2] = createGraph(grid, restaurant, Destination.USER);
    let [userPath, userVisitedNodes] = [null, null];

    switch(algorithm) {
        case(AlgorithmName.ASTAR): {
            [userPath, userVisitedNodes] = astar(graph2, start2, goals2[0]);
            break;
        }
        case(AlgorithmName.DIJKSTRA): {
            [userPath, userVisitedNodes] = dijkstra(graph2, start2, goals2);
            break;
        }
    } 

    let sum = 0;
    orderItems.forEach((orderItems) => sum = sum + orderItems.amount * orderItems.item.price);
    console.log(userPath)
    const newOrder: Order = new Order();
    newOrder.date = (new Date()).toISOString();
    newOrder.price = sum;
    newOrder.status = userPath == null ? false : true;
    newOrder.items = orderItems.map((orderItem) => orderItem.item);
    newOrder.restaurant = await getRestaurantById(orderItems[0].restaurant.id);
    newOrder.deliveryMan = await getDeliveryManById(selectedDeliveryManPoint.deliveryMan.id);
    await orderRepository.save(newOrder);

    return [
        deliveryManPath, 
        deliveryManvisitedNodes, 
        selectedDeliveryManPoint.point, 
        userPath, 
        userVisitedNodes
    ];
}

const createGraph = (grid: Grid, restaurant: RestaurantApi, destination: Destination): [
    Node[][], Node, Node[]
] => {    
    let goalField: string = destination;

    const graph: Node[][] = [];
    let goals: Node[] = [];

    for (let i = 0; i < grid.length; i++) {
        graph[i] = [];
        for (let j = 0; j < grid[0].length; j++) {
            graph[i][j] = new Node([grid[i][j].row, grid[i][j].column], grid[i][j].isWall);

            if(grid[i][j][goalField]) {
                graph[i][j][goalField] = grid[i][j][goalField];
                goals.push(graph[i][j]);
            }

            if(grid[i][j].restaurant) {
                graph[i][j].restaurant = grid[i][j].restaurant;
            }
        }
    }

    graph[restaurant.location.x][restaurant.location.y].restaurant = 
        grid[restaurant.location.x][restaurant.location.y].restaurant;

    let start: Node = graph[restaurant.location.x][restaurant.location.y];

    return [graph, start, goals];
};

const getAllOrders = async (): Promise<Order[]> => {
    const orders = await orderRepository.find({
        relations: {
            restaurant: true,
            deliveryMan: {
                personDetails: true,
            },
            customer: true,
            items: true,
        },
    });

    if(!orders) {
        logger.error("No restaurants were found")
    }

    return orders;
}


export { 
    placeOrder,
    getAllOrders
};
