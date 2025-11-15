# TODO: Implement Forget Password Functionality

## Backend Changes
- [x] Add resetToken and resetTokenExpiry fields to user model
- [x] Create sendResetCode controller function (generate token, send email)
- [x] Create resetPassword controller function (verify token, update password)
- [x] Add routes for /sendResetCode and /resetPassword

## Frontend Changes
- [x] Create ForgetPassword.jsx component with multi-step flow
- [x] Add /forgetpage route in App.jsx
- [x] Update AuthContext with reset password functions (if needed)
- [x] Test the complete flow

## Testing
- [ ] Test sending reset code
- [ ] Test password reset with valid token
- [ ] Test error cases (invalid token, expired token)
