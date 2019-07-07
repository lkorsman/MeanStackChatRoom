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
             
        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/api/chatmessages/")
                .end(function (err, res) {
                    requestResult = res.body;
                    response = res;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
            });
        
        it('Should return an array objects with more than 1 object', function (){
            expect(response.body).to.not.be.an('object');
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length.above(1);
            expect(response).to.have.headers;
            expect(response).to.be.json;
        });
        
        it('The first entry in the array has known properties', function(){
            expect(requestResult[0]).to.include.keys('_id');
            expect(requestResult[0]).to.have.property('messageID');
            expect(requestResult[0]).to.have.property('name');
            expect(requestResult[0]).to.have.property('message');
            expect(requestResult).to.not.be.a.string;
        });

        it('The elements in the array have the expected properties', function(){
            expect(requestResult).to.satisfy(
                function (requestResult) {
                    for (var i = 0; i < requestResult.length; i++) {
                        expect(requestResult[i]).to.include.keys('_id');
                        expect(requestResult[i]).to.have.property('messageID');
                        expect(requestResult[i]).to.have.property('name');
                        expect(requestResult[i]).to.have.property('message');
                    }
                    return true;
                });
        });	
        
    });