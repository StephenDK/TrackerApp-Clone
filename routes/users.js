
const express = require("express");

const { getUsers, getUser, updateRole, deleteUser } = require("../controllers/user");

const router = express.Router();

router.route("/").get(getUsers);
router.route('/user').post(getUser);
router.route('/update/role/:id').put(updateRole);
router.route('/delete/:id').delete(deleteUser);

module.exports = router;
