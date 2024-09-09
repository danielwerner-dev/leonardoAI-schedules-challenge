"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const express_1 = __importDefault(require("express"));
const tasksRouter = express_1.default.Router();
tasksRouter.get("/", async (req, res) => {
    try {
        const tasks = await task_service_1.TaskService.getTasks();
        res.json(tasks);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Task not found";
        return res.status(404).json({ message: errorMessage });
    }
});
tasksRouter.get("/:id", async (req, res) => {
    try {
        const task = await task_service_1.TaskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Task not found";
        return res.status(404).json({ message: errorMessage });
    }
});
tasksRouter.post("/", async (req, res) => {
    try {
        const requiredFields = ["accountId", "scheduleId", "startTime", "duration", "type"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field} is required` });
            }
        }
        // Check if type is enumerated to 'break' or 'work'
        if (!['break', 'work'].includes(req.body.type)) {
            return res.status(400).json({ message: 'Type can either be \'work\' or \'break\'' });
        }
        const task = await task_service_1.TaskService.createTask(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Task not found";
        return res.status(404).json({ message: errorMessage });
    }
});
tasksRouter.put("/:id", async (req, res) => {
    try {
        console.log("rew ", req.body);
        // Check if type is enumerated to 'break' or 'work'
        if (!['break', 'work'].includes(req.body.type)) {
            return res.status(400).json({ message: 'Type can either be \'work\' or \'break\'' });
        }
        const task = await task_service_1.TaskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Task not found";
        return res.status(404).json({ message: errorMessage });
    }
});
tasksRouter.delete("/:id", async (req, res) => {
    try {
        await task_service_1.TaskService.deleteTask(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Task not found";
        return res.status(404).json({ message: errorMessage });
    }
});
exports.default = tasksRouter;
