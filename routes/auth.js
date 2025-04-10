const express = require("express");

const {
  register,
  login,
  isAuthenticated,
  registerEmail,
  backDoorRegister,
  forgotPassword,
  resetPassword,
  sendGeneratedURL,
} = require("../controllers/auth");
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/isauth").post(isAuthenticated);

// router.route("/register/email").post(registerEmail);
router.route("/register/email/:id").post(sendGeneratedURL);

router.route("/register/email/backdoor/newuser").post(backDoorRegister);
//   router
//     .route('/update/entry/:id')
//     .put(updateInventoryItem)
router.route("/register/forgot/password").post(forgotPassword);
router.route("/register/forgot/password/reset").put(resetPassword);

module.exports = router;
