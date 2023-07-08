const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WixAuthSchema = new Schema({
  wix_token: {
    type: String,
  },
  state: {
    type: String,
  },
  instanceId: {
    type: String,
    default: null,
  },
  authCode: {
    type: String,
    default: null,
  },
  uid: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  refreshToken : {
    type: String,
    default: null
  },
  accessToken: {
    type: String,
    default: null
  }
});

const WixAuth = mongoose.model("WixAuth", WixAuthSchema);

module.exports = WixAuth;
