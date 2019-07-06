"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ChatMessageModel = /** @class */ (function () {
    function ChatMessageModel() {
        this.createSchema();
        this.createModel();
    }
    ChatMessageModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            messageID: String,
            name: String,
            message: String
        }, { collection: 'messages' });
    };
    ChatMessageModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("messages", this.schema);
    };
    ChatMessageModel.prototype.retrieveAllChatMessages = function (response) {
        console.log("In retrieve all messages");
        var query = this.model.find({});
        query.exec(function (err, results) {
            console.log("query executed");
            response.json(results);
        });
    };
    ChatMessageModel.prototype.retrieveOneChatMessage = function (response, filter) {
        var query = this.model.findOne({ "messageID": filter });
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return ChatMessageModel;
}());
exports.ChatMessageModel = ChatMessageModel;
