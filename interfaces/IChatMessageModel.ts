import Mongoose = require("mongoose");

interface IChatMessageModel extends Mongoose.Document {
    messageID: string;
    name: string;
    message: string
}
export {IChatMessageModel};