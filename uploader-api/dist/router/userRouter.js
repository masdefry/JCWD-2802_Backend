"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_1 = require("../controller/users");
const jwtVerify_1 = require("../middleware/jwtVerify");
router.get('/', jwtVerify_1.jwtVerify, users_1.findUserProfile);
exports.default = router;
