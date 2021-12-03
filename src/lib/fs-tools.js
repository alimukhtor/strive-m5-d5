import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
const { readJSON, writeJSON} = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data') 
console.log("Current folder:", dataFolderPath);

const productJSONPath = join(dataFolderPath, "products.json")

export const getProducts = () => readJSON(productJSONPath)

export const writeProducts = (content) => writeJSON(productJSONPath, content)