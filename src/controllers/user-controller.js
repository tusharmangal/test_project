const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST : /signup 
 * req-body {email: 'a@b.com', password: '1234'}
 */
async function signup(req, res) {
    try {
        const user = await UserService.create({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_image: req.body.user_image,
            total_orders:req.body.total_orders
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const user = await UserService.signin({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_image: req.body.user_image,
            total_orders:req.body.total_orders
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

// async function addRoleToUser(req, res) {
//     try {
//         const user = await UserService.addRoletoUser({
//             role: req.body.role,
//             id: req.body.id
//         });
//         SuccessResponse.data = user;
//         return res
//                 .status(StatusCodes.CREATED)
//                 .json(SuccessResponse);
//     } catch(error) {
//         console.log(error);
//         ErrorResponse.error = error;
//         return res
//                 .status(error.statusCode)
//                 .json(ErrorResponse);
//     }
// }

module.exports = {
    signup,
    signin,
    // addRoleToUser
}