var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;

var http = require('http');
chai.use(chaiHttp);

describe('Test ChatMessage Results Getting All ChatMessages', function () {
    
        var requestResult;
        var response;
        var messageID = 200;
             
        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/api/chatmessages/" + messageID)
                .end(function (err, res) {
                    requestResult = res.body;
                    response = res;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
            });
        
        it('Should return an object', function (){
            expect(response.body).to.be.an('object');
            expect(response.body).to.not.be.an('array');
            expect(response).to.have.headers;
            expect(response).to.be.json;
        });
        
        it('The Chat Message has known properties', function(){
            expect(requestResult).to.include.keys('_id');
            expect(requestResult).to.have.property('messageID');
            expect(requestResult).to.have.property('name');
            expect(requestResult).to.have.property('message');
            expect(requestResult).to.not.be.a.string;
        });
    });