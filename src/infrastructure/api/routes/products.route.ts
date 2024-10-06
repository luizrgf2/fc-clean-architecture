import express, { Request, Response } from "express";
import {ListProductUseCase} from '../../../usecase/product/list/list.products.usecase'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductrUseCase from "../../../usecase/product/create/create.product.usecase";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductrUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())
  const output = await usecase.execute();

  res.format({
    json: async () => res.send(output),
  });
});
