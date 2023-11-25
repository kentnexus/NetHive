const User = require("../models/Users");
const Asset = require("../models/Assets");
const {
    createSecretToken
} = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
            role,
            account_name,
            status,
            email,
            password,
            created_by,
            created_dt,
            modified_dt
        } = req.body;
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.json({
                message: "User already exists"
            });
        }
        const user = await User.create({
            first_name,
            last_name,
            role,
            account_name,
            status,
            email,
            password,
            created_by,
            created_dt,
            modified_dt
        });
        // const token = createSecretToken(user._id);
        // res.cookie("token", token, {
        //     withCredentials: true,
        //     httpOnly: false,
        // });
        res
            .status(201)
            .json({
                message: "User signed up successfully",
                success: true,
                user
            });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password, user.password)
      if (!auth) { 
        return res.json({message:'Incorrect password or email' }) 
      }
      const status = user.status;
      if(!status){
        return res.json({message:'Account is locked and inactive. Please contact your IT support.' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false
       });
      //  console.log(user);
       res.cookie("user", user, {
        withCredentials: true,
        httpOnly: false
      });
       res.status(201).json({ message: "User logged in successfully", success: true, name: user.first_name});
       next()
    } catch (error) {
      console.error(error);
    }
  }