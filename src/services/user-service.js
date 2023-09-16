const { UserRepository} = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Auth  } = require('../utils/common');
const userRepo = new UserRepository();



async function create(data) {
    try {
        const user = await userRepo.create(data);
        return user;
    } catch(error) {
        console.log(error.name);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getuser(id){
    try{
        const user = await userRepo.get(id);
        return user;
    } catch(error){
        console.log(error);
        if(error.statusCode==StatusCodes.NOT_FOUND){

            throw new AppError('THE user you requested is not present',error.statusCode);
        }
        throw new AppError('cannot fetch data of all the users',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyUser(id){
    try{
        const user = await userRepo.destroy(id);
        return user;
    } catch(error){
        console.log(error);
        if(error.statusCode==StatusCodes.NOT_FOUND){

            throw new AppError('THE user you requested is not present',error.statusCode);
        }
        throw new AppError('cannot fetch data of all the users',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateUser(id,data){
    try{
        const user = await userRepo.update(id,data);
        return user;
    } catch(error){
        console.log(error);
        if(error.statusCode==StatusCodes.NOT_FOUND){

            throw new AppError('THE user you requested is not present',error.statusCode);
        }
        throw new AppError('cannot fetch data of all the users',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


async function signin(data) {
    try {
        const user = await userRepo.getUserByEmail(data.user_email);
        if(!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.user_password, user.user_password);
        console.log("password match", passwordMatch)
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.user_email});
        
        return jwt;
    } catch(error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepo.get(response.id);
        if(!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch(error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    create,
    signin,
    isAuthenticated,
    getuser,
    destroyUser,
    updateUser
}