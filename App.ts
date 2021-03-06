import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import { ChatMessageModel } from './models/ChatMessageModel';
const cors = require('cors');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  public ChatMessages:ChatMessageModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 200;
    this.ChatMessages = new ChatMessageModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(cors());
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();

    router.get('/api/chatmessages', (req, res) => {
      console.log('Query all Chat Messsages');
      this.ChatMessages.retrieveAllChatMessages(res);
    })

    router.get('/api/chatmessages/:id', (req, res) => {
      console.log('Query one Chat Message with id: ' + req.params.id);
      this.ChatMessages.retrieveOneChatMessage(res, req.params.id);
    })

    router.post('/api/chatmessages/', (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.messageID = this.idGenerator;
      this.ChatMessages.model.create([jsonObj], (err) => {
        if (err) {
          console.log('Chat Message creation failed');
        }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    router.get('/', (req, res) => {
      res.send("Hello");
    })

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));

  }

}

export {App};
