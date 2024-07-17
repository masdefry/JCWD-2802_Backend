"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_1 = require("../controllers/product");
const uploader_middleware_1 = require("../middlewares/uploader.middleware");
router.post('/', (0, uploader_middleware_1.uploader)('IMG', 'Images', ['png', 'jpg', 'jpeg'], 1000000).fields([{ name: 'products', maxCount: 3 }]), product_1.createProduct);
exports.default = router;
