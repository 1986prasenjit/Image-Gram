import User from "../schemas/user.schema.js";


class UserRepository  {


    async findAll(){
        return await User.find();
    }

    async findById(id){
        return await User.findById(id)
    }

    async findByEmail(email){
        return await User.findOne({email})
    }

    async createUser(userData){
        return await User.create(userData)
    }

    async updateById(id, userData){
        return await User.findByIdAndUpdate(
            id,
            userData,
            {
                new: true,
                runValidators: true
            }
        )
    }

    async deleteUser(id){
        return await User.findByIdAndDelete(id)
    }
}

export default UserRepository;