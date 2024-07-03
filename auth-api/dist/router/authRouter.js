"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_1 = require("../controller/auth");
const example_1 = require("../middleware/example");
router.post('/', example_1.exampleMiddleware, example_1.exampleMiddleware, auth_1.authenticate);
exports.default = router;
