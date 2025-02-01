const express = require('express');
const router = express.Router();
const authControllers = require('../controller/auth-controller');

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").get(authControllers.logout);

module.exports = router;