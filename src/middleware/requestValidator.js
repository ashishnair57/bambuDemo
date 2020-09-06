const Validator = require('jsonschema').Validator;
const jsonSchema = require('../jsonSchema')

module.exports = (schema) => {
    return (req, res, next) => {
        let reqBody = getRequestBody(req);
        let jsonSchema = getJsonSchema(schema, req);
        let v = new Validator()
        let response = {}
        let error = []
        let result = null
        // schema validation for get functionality
        result = v.validate(reqBody, jsonSchema)
        if (result) {
            if (result.valid) {
                next()
            } else {
                error = result.errors.map(function (err) {
                    return err.stack.replace(/instance./, '')
                })
                response.code = 400
                response.status = 'fail'
                response.error = error
                res.status(400).json(response);
            }
        }
    }
}

let getRequestBody = (req) => {
    switch (req.method) {
        case 'POST':
            return req.body
            break;
        case 'PUT':
            return req.body
            break;
        default:
            return req.query
    }
}

let getJsonSchema = (schema, req) => {
    return jsonSchema[req.method.toLowerCase() + '.' + schema]
}