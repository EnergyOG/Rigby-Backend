import {model, Schema} from 'mongoose';

const loginSchema = new Schema({  
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {timestamps: true});

const Login = model('Login', loginSchema);
export default Login;
