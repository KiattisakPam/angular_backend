"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./api/index");
const users_1 = require("./api/users");
const images_1 = require("./api/images");
const vote_1 = require("./api/vote");
const rating_1 = require("./api/rating");
const addimag_1 = require("./api/addimag");
const delete_1 = require("./api/delete");
const updateprofile_1 = require("./api/updateprofile");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.text());
exports.app.use("/", index_1.router);
exports.app.use("/user", users_1.router);
exports.app.use("/image", images_1.router);
exports.app.use("/vote", vote_1.router);
exports.app.use("/rating", rating_1.router);
exports.app.use("/addimg", addimag_1.router);
exports.app.use("/delete", delete_1.router);
exports.app.use("/uppro", updateprofile_1.router);
