"use strict";
// src/api/routes/schedules.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_service_1 = require("../services/schedule.service");
const express_1 = __importDefault(require("express"));
const schedulesRouter = express_1.default.Router();
schedulesRouter.get("/", async (req, res) => {
    const schedules = await schedule_service_1.ScheduleService.getSchedules();
    res.json(schedules);
});
schedulesRouter.get("/:id", async (req, res) => {
    try {
        const schedule = await schedule_service_1.ScheduleService.getScheduleById(req.params.id);
        res.json(schedule);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Schedule not found";
        return res.status(404).json({ message: errorMessage });
    }
});
schedulesRouter.post("/", async (req, res) => {
    const requiredFields = ["accountId", "agentId", "startTime", "endTime"];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ message: `${field} is required` });
        }
    }
    const schedule = await schedule_service_1.ScheduleService.createSchedule(req.body);
    res.status(201).json(schedule);
});
schedulesRouter.put("/:id", async (req, res) => {
    try {
        const schedule = await schedule_service_1.ScheduleService.updateSchedule(req.params.id, req.body);
        res.json(schedule);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Schedule not found";
        return res.status(404).json({ message: errorMessage });
    }
});
schedulesRouter.delete("/:id", async (req, res) => {
    try {
        await schedule_service_1.ScheduleService.deleteSchedule(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Schedule not found";
        return res.status(404).json({ message: errorMessage });
    }
});
exports.default = schedulesRouter;
