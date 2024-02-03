const asyncHandler = ( requestHandler ) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export { asyncHandler }

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