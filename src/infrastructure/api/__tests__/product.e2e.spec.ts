import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    sequelize.addModels([ProductModel])
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "John",
        price: 123,
        type: 'a'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.price).toBe(123);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "john",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "John",
        price: 123,
        type: 'a'
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Jane",
        price: 134,
        type: 'a'
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("John");
    expect(product.price).toBe(123);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Jane");
    expect(product2.price).toBe(134);
    
  });
});
