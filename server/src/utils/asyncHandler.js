const asynHandler = ( requestHandler ) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export { asynHandler }

// // other method
// // if function is parameter
// const asynHandler = (func) => {() => {}}
// const asynHandler = (func) => () => {}

// const asynHandler = (requestHandler) => async(req, res, next) => {
//     try {
//         await requestHandler(req, res, next)
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }