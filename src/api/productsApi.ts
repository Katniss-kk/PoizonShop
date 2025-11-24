import type { IProduct } from "../component/types";
import { Data } from "../../public/DataProduct";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
  async getAllProducts(): Promise<IProduct[]> {
    await delay(500);
    return [...Data];
  },
};