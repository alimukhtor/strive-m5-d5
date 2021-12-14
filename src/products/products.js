import express from "express";
import uniqid from "uniqid";
import multer from "multer";
import { extname } from "path";
import { validationResult } from "express-validator";
import { productValidation } from "./validation.js";

import { saveProductImage } from "../lib/fs-tools.js";

import pool from "../data/connect.js";

const productsRouter = express.Router();

const uploader = multer({
  fileFilter: (request, file, next) => {
    if (file.mimetype !== "image/png") {
      next(createHttpError(400, "only pngs are allowed"));
    } else {
      next(null, true);
    }
  },
}).single("image");

productsRouter.post("/", productValidation, async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty()) {
      next("All the fields are required to fullfilled", { error });
    }
    const { name, description, brand, image_url, category, price } =
      request.body;
    const newProduct = await pool.query(
      "INSERT INTO product(name, description, brand, image_url, category, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        request.body.name,
        request.body.description,
        request.body.brand,
        request.body.image_url,
        request.body.category,
        request.body.price,
      ]
    );
    response.status(201).send(newProduct.rows[0]);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", async (request, response, next) => {
  try {
    console.log("Product_id is :", request.body);
    const newProduct = await pool.query("SELECT * FROM review JOIN product USING(product_id);");
    response.send(newProduct.rows);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (request, response, next) => {
  try {
    console.log("id", request.params.id);
    const newProduct = await pool.query(
      "SELECT * FROM review JOIN product USING(product_id) WHERE product_id = $1;",
      [request.params.productId]
    );
    if (newProduct.rows[0]) {
      response.send(newProduct.rows[0]);
    } else {
      response
        .status(404)
        .send(`Product with an Id ${request.params.productId} not found`);
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:productId", async (request, response, next) => {
  try {
    const updateStatement = Object.entries(request.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE product SET ${updateStatement} WHERE product_id = ${request.params.productId} RETURNING *;`;
    const result = await pool.query(query);
    response.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:productId", async (request, response, next) => {
  try {
    const query = `DELETE FROM product WHERE product_id = ${request.params.productId};`;
    await pool.query(query);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/:productId/review", async(request, response, next)=> {
    try {
        const error = validationResult(request);
        if (!error.isEmpty()) {
          next("All the fields are required to fullfilled", { error });
        }
        const newReview = await pool.query(
          "INSERT INTO review(comment, rate, product_id) VALUES ($1, $2, $3) RETURNING *",
          [...Object.values(request.body), request.params.productId]);
        response.status(201).send(newReview.rows[0]);
      } catch (error) {
        next(error);
      }
})

productsRouter.delete("/:productId/review/:reviewId", async(request, response, next)=> {
    try {
        const query = `DELETE FROM review WHERE review_id = ${request.params.reviewId};`;
        await pool.query(query);
        response.status(204).send();
      } catch (error) {
        next(error);
      }
})
export default productsRouter;
