"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var ChatMessageModel_1 = require("./models/ChatMessageModel");
var cors = require('cors');
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 200;
        this.ChatMessages = new ChatMessageModel_1.ChatMessageModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cors());
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var router = express.Router();
        router.get('/api/chatmessages', function (req, res) {
            console.log('Query all Chat Messsages');
            _this.ChatMessages.retrieveAllChatMessages(res);
        });
        router.get('/api/chatmessages/:id', function (req, res) {
            console.log('Query one Chat Message with id: ' + req.params.id);
            _this.ChatMessages.retrieveOneChatMessage(res, req.params.id);
        });
        router.post('/api/chatmessages/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.messageID = _this.idGenerator;
            _this.ChatMessages.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('Chat Message creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/', function (req, res) {
            res.send("Hello");
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
    };
    return App;
}());
exports.App = App;
