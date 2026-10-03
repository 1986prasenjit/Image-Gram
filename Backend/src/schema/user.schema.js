import { Schema, models } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "User Name address is required"],
    minLength: 3,
    maxLength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (emailValue) {
        // Modern regex allowing long TLDs and common subaddressing (+)
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // Built-in Mongoose length validation (cleaner than doing it inside the validator)
    minlength: [6, "Password should be at least 6 characters"],
    maxlength: [20, "Password cannot be greater than 20 characters"],
    validate: {
      validator: function (passwordValue) {
        // Regex updated to enforce 6 to 20 characters {6,20} along with complexity rules
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(passwordValue);
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    },
    select: false // Recommended: Hides password from standard query results for security
  },
  role:{
    type: String,
    enum: ["user", "admin"],
    default:"user"
  },
  refreshToken:{
    type: String
  },
  forgetPasswordToken: {
    type: String
  },
  forgetPasswordTokenExpiry: {
    type: Date
  },
}, {timestamps: true});

const User = models("User", userSchema);

export { User };
