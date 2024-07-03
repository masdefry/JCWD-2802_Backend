"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = require("../controller/auth");
const example_1 = require("../middleware/example");
const validationAuth_1 = require("../middleware/validationAuth");
router.post('/', example_1.exampleMiddleware, example_1.exampleMiddleware, validationAuth_1.validationAuth, auth_1.authenticate);
exports.default = router;
