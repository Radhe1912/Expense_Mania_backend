const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{
    try{
        const { firstname, lastname, email, password } = req.body;

        const userExists = await userModel.findOne({email:email});
        if(userExists){
            return res.status(400).send({msg:"User already exists"});
        }

        const userCreated = await userModel.create({ firstname, lastname, email, password });

        const token = jwt.sign({ id: userCreated._id, email: userCreated.email }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

        // Set token as HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });

        console.log(userCreated);
        res.status(200).json({ msg: "User Registered", user: userCreated, token: token });
    }catch(error){
        res.status(500).send({ msg: "Internal server error" });
    }
}

const login = async (req, res)=>{
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        
        if(!user || password!=user.password){
            return res.status(400).send({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

        res.cookie('token', token, {httpOnly: true, maxAge: 3*60*60*1000});
        res.status(200).json({ msg: "Login successful", token: token });

    }catch(error){
        res.status(500).send({msg: "Internal server error"});
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true }); // Clear the auth token cookie
        res.status(200).json({ msg: "Logout successful", redirect: "/" }); // Send response with redirect info
    } catch (error) {
        res.status(500).send({ msg: "Internal server error" });
    }
};

module.exports = { register, login, logout };