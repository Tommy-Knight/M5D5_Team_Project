import { body } from "express-validator";

export const productsValidation = [
    body("name").exists().withMessage("Name of the product is mandatory!"),
    body("description").exists().withMessage("Description of the product is mandatory!"),
    body("brand").exists().withMessage("Brand of the product is mandatory!"),
    body("price").exists().withMessage("Price of the product is mandatory!").isFloat().withMessage("Price needs to be a float number!"),
    body("category").exists().withMessage("Category of the product is mandatory!")

]

