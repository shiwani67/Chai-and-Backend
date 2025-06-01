class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        error = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.error = error
        this.stack = stack
        this.data = null
        this.sucess = false

        if(stack){
            this.stack  = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}