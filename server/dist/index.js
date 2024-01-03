"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./connection/connect"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
(0, connect_1.default)();
const app = (0, express_1.default)();
// Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, this is your backend!');
// });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_1.default);
const port = 8000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
