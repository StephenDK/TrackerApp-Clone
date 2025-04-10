const asyncHandler = require("./async");
const Action = require("../model/actions");
const ErrorResponse = require("../utils/errorResponse");

const userAction = (action) =>
  asyncHandler(async (req, res, next) => {
    try {
      console.log("Backing up user request");
      console.log("[USER Action]", action);
      console.log("[BODY]", req.body);
      console.log("[REQ.USER]", req.user);
      console.log("[PARAMS]: ", req.params);
      let data = {
        action,
        serial: "gjkdfsgjsdflkgjr23",
        receiver: req.body.name,
        owner: req.user._id,
      };
      console.log("[DATA]", data);
      await Action.create(data);

      next();
    } catch (err) {
      console.log(err);
      // return next(
      //   new ErrorResponse("Not authorized to access this route. Error"),
      //   401
      // );
    }
  });

module.exports = userAction;

/*
const ActionsSchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, "Action is Required"],
  },
  serial: {
    type: String,
    required: [true, "Serial Number Required"],
  },
  receiver: {
    type: String,
    trim: true,
    default: null,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    index: { expires: "5m" }, // TTL set to 5 minutes, 30d 30 days
  },
*/
