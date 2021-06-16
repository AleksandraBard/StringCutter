process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

const should = chai.should()

describe('/test', () => {
    it ('POST must respond with a correctly cutted sting', done => {
        chai.request(app)
            .post('/test')
            .send({'string_to_cut': "iamyourlyftdriver"})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.a.property('return_string')
                res.body.return_string.should.equal("muydv")
                done()
            }) 
    })

    it ('POST must respond with an empty string if sent string was too short', done => {
        chai.request(app)
            .post('/test')
            .send({'string_to_cut': "er"})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.a.property('return_string')
                res.body.return_string.should.equal("")
                done()
            }) 
    })

    it ('POST must respond with an Error if an empty string was sent', done => {
        chai.request(app)
            .post('/test')
            .send({'string_to_cut': ""})
            .end((err, res) => {
                res.should.have.status(400)
                res.body.error.should.be.a('string')
                res.body.error.should.equal('Enter the correct data please!')
                done()
            }) 
    })

    it ('POST must respond with an Error if sent something other than string', done => {
        chai.request(app)
            .post('/test')
            .send({'string_to_cut': 777})
            .end((err, res) => {
                res.should.have.status(400)
                res.body.error.should.be.a('string')
                res.body.error.should.equal('Enter the correct data please!')
                done()
            }) 
    })
})

