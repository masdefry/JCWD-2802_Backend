"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passangers_1 = require("../controller/passangers");
const router = (0, express_1.Router)();
router.get('/', passangers_1.GetAllPassangers);
exports.default = router;
