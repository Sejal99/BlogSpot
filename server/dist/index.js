"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create an Express application
const app = (0, express_1.default)();
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, this is your backend!');
});
// Set the port for the server
const port = 8000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
