class RestResponse {

    success(data) {
        let reponse = {}
        reponse.data = data
        return reponse
    }

    error(code, message, error) {
        let reponse = {}
        reponse.error = {}
        reponse.error.code = code
        reponse.error.message = message
        reponse.error.error = error
        return reponse
    }
}

module.exports = new RestResponse()