"use strict";
// src/api/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_1 = __importDefault(require("./routes/schedules"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const router = (0, express_1.Router)();
router.use("/schedules", schedules_1.default);
router.use("/tasks", tasks_1.default);
exports.default = router;
