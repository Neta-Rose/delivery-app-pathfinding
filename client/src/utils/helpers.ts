import api from "../api/api";
import { GridInterface, Point } from "../types/grid";
import { CustomerApi, DeliveryManApi, RestaurantApi } from "../types/api";
import { itemDetailsInterface } from "../types/order";
import { pathResponse } from "../types/response";
import { AlgorithmName, VisualizationSpeeds } from "../types/algorithms";

export const placeOrderHelper = async (
    grid: GridInterface,
    changeGrid: (grid: GridInterface) => void,
    selectedRestaurant: RestaurantApi,
    orderItems: itemDetailsInterface[],
    selectedAlgorithm: AlgorithmName,
    setSelectedDeliveryMan: (value: React.SetStateAction<Point | null>) => void,
    visualizationSpeed: string,
) => {
    const response: pathResponse = await api.order().placeOrder(
        grid, 
        selectedRestaurant, 
        selectedAlgorithm,
        orderItems
    );

    if(response.userPath == null || response.deliveryPath == null) {
        alert(`path to user or delivery man was not found`);
        return;
    }

    const speedConst = VisualizationSpeeds[visualizationSpeed as keyof typeof VisualizationSpeeds]
    console.log(speedConst)

    for(let index = 0; index < response.deliveryVisited.length; index++) {
        await sleep(speedConst.visitedSpeed);
        const newGrid: GridInterface = structuredClone(grid!);
        grid![response.deliveryVisited[index][0]][response.deliveryVisited[index][1]].isVisited = true;
        changeGrid(newGrid);
    }

    await sleep(100);

    for(let index = 0; index < response.deliveryPath.length; index++) {
        await sleep(speedConst.pathSpeed);
        const newGrid: GridInterface = structuredClone(grid!);
        grid![response.deliveryPath[index][0]][response.deliveryPath[index][1]].isPath = true;
        changeGrid(newGrid);
    }

    setSelectedDeliveryMan(grid[response.deliveryMan[0]][response.deliveryMan[1]])
    await sleep(100);

    const newGrid: GridInterface = structuredClone(grid!);
    for(let index = 0; index < response.deliveryVisited.length; index++) {
        grid![response.deliveryVisited[index][0]][response.deliveryVisited[index][1]].isVisited = false;
    }
    changeGrid(newGrid);

    for(let index = 0; index < response.userVisited.length; index++) {
        await sleep(speedConst.visitedSpeed);
        const newGrid2: GridInterface = structuredClone(grid!);
        grid![response.userVisited[index][0]][response.userVisited[index][1]].isVisited = true;
        changeGrid(newGrid2);
    }

    await sleep(100);

    for(let index = 0; index < response.userPath.length; index++) {
        await sleep(speedConst.pathSpeed);
        const newGrid: GridInterface = structuredClone(grid!);
        grid![response.userPath[index][0]][response.userPath[index][1]].isPath = true;
        changeGrid(newGrid);
    }

    await sleep(500);

    response.deliveryPath.reverse();

    for(let index = 0; index < response.deliveryPath.length - 1; index++) {
        await sleep(speedConst.deliveryManSpeed);
        const newGrid: GridInterface = structuredClone(grid!);
        grid![response.deliveryPath[index + 1][0]][response.deliveryPath[index + 1][1]].deliveryMan = 
            grid![response.deliveryPath[index][0]][response.deliveryPath[index][1]].deliveryMan;
        grid![response.deliveryPath[index][0]][response.deliveryPath[index][1]].deliveryMan = undefined;
        changeGrid(newGrid);
    }

    for(let index = 0; index < response.userPath.length - 1; index++) {
        await sleep(speedConst.deliveryManSpeed);
        const newGrid: GridInterface = structuredClone(grid!);
        grid![response.userPath[index + 1][0]][response.userPath[index + 1][1]].deliveryMan = 
            grid![response.userPath[index][0]][response.userPath[index][1]].deliveryMan;
        grid![response.userPath[index][0]][response.userPath[index][1]].deliveryMan = undefined;
        changeGrid(newGrid);
    }
    await sleep(500);
    changeGrid(createGrid());
}

const restaurantsFromApi: RestaurantApi[] = await api.restaurants().getAll();
const delivertMansFromApi: DeliveryManApi[] = await api.deliveryMans().getAll();
const customerFromApi: CustomerApi = await api.customers().getCustomerById(1);

const createRow = (
    row: number, 
    customer: CustomerApi, 
    restaurants: RestaurantApi[], 
    deliveryMans: DeliveryManApi[]
): Point[] => {
    const currentRow = [];
    for (let col = 0; col < 30; col++) {
        const point: Point = {
            row: row,
            column: col,
            isPath: false,
            isVisited: false,
            isWall: false
        }

        if(customer.personDetails.location.y == col && customer.personDetails.location.x == row) {
            point.user = customer.personDetails;
        }

        restaurants.forEach((restaurant) => {
            if(restaurant.location.y == col && restaurant.location.x == row) {
                point.restaurant = restaurant;
            }
        });

        deliveryMans.forEach((deliveryMan) => {
            if(deliveryMan.personDetails.location.y == col && deliveryMan.personDetails.location.x == row) {
                point.deliveryMan = deliveryMan;
            }
        });

        currentRow.push(point);
    }
    return currentRow;
};

export const createGrid = () => {
    const grid: GridInterface = [];

    for (let row = 0; row < 20; row++) {
        grid.push(createRow(row, customerFromApi, restaurantsFromApi, delivertMansFromApi));
    }
    return grid;
};

export const sleep = (miliseconds: number) => new Promise((res) => setTimeout(res, miliseconds));