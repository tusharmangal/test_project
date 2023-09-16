const CrudRepository = require('./crud-repositories');
const {User}=require('../models');

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getUserByEmail(user_email) {
        const user = await User.findOne({ where: { user_email: user_email } });
        return user;
    }

   
    
}

module.exports= UserRepository;