"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProducts = exports.createProduct = void 0;
const create_product_service_1 = require("../../services/product/create-product.service");
const find_products_service_1 = require("../../services/product/find-products.service");
const fs_1 = __importDefault(require("fs"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, price } = JSON.parse(req.body.product);
        if (!req.files)
            throw { message: 'Image is required', status: 400 };
        const files = Array.isArray(req.files) ? req.files : (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.products;
        yield (0, create_product_service_1.createProductService)({
            name,
            price,
            files
        });
        res.status(201).send({
            error: false,
            message: 'Create Product Success',
            data: {}
        });
    }
    catch (error) {
        const files = Array.isArray(req.files) ? req.files : (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.products;
        files === null || files === void 0 ? void 0 : files.forEach((item) => {
            fs_1.default.rmSync(item.path);
        });
        next(error);
    }
});
exports.createProduct = createProduct;
const findProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, find_products_service_1.findProductsService)();
        res.status(200).send({
            error: false,
            message: 'Get Products Success',
            data: products
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findProducts = findProducts;
