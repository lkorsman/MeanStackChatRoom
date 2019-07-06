import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IChatMessageModel} from '../interfaces/IChatMessageModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ChatMessageModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                messageID: String,
                name: String,
                message: String
            }, {collection: 'messages'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IChatMessageModel>("messages", this.schema);
    }

    public retrieveAllChatMessages(response:any): any {
        console.log("In retrieve all messages");
        var query = this.model.find({});
        query.exec( (err, results) => {
            console.log("query executed");
            response.json(results) ;
        });
    }

    public retrieveOneChatMessage(response:any, filter:String) {
        var query = this.model.findOne({"messageID": filter});
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }
}
export {ChatMessageModel};