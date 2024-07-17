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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductService = void 0;
const connection_1 = require("../../connection");
const createProductService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, price, files }) {
    yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield tx.product.create({
            data: {
                name,
                price: parseInt(price)
            }
        });
        /*
        files.forEach(async(item: any) => {
            await prisma.productImage.create({
                data: {
                    url: item.filename,
                    productId: createdProduct.id
                }
            })
        })
        */
        const productImage = [];
        files.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            productImage.push({ url: item.path, productId: createdProduct.id });
        }));
        yield tx.productImage.createMany({
            data: productImage
        });
    }));
});
exports.createProductService = createProductService;
