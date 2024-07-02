"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const staff_1 = require("../controller/staff");
router.post('/auth', staff_1.auth);
router.post('/register-member', staff_1.createMember);
exports.default = router;
