import fs from "fs-extra";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const {readJSON, writeJSON, writeFile} = fs;

const productImagePath = join(
	dirname(fileURLToPath(import.meta.url)),
	"../../public/img/product/"
);

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const ProductPath = join(dataFolderPath, "product.json");
const ReviewPath = join(dataFolderPath, "review.json");

export const getProduct = async () => await readJSON(ProductPath);
export const getReview = async () => await readJSON(ReviewPath);


export const writeProduct = async (contents) =>
    await writeJSON(ProductPath, contents);
    
export const writeReview = async (contents) =>
    await writeJSON(ReviewPath, contents);
    
export const writeProductImage = async (fileName, contents) => {
    await writeFile(join(productImagePath, fileName), contents)
} 