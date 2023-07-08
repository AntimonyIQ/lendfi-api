const WixAuth = require("../models/WixAuth");
const { generateRandomString } = require("../utils/util");
const fetch = require("node-fetch");

class WixService {
  installerUrl = "https://www.wix.com/installer/install";
  wixAppId = "e968c2de-b041-476a-8d07-45ce6f3e975e";
  wixAppSecret = "becf71e6-190b-4389-adeb-f98470d9641d";
  redirectUrl = "https://wishpo-connect.onrender.com/wix";
  endpoints = {
    oauth : 'https://www.wixapis.com/oauth/access',
    completeReg: 'https://www.wixapis.com/apps/v1/bi-event'
  }

  constructor() {
    //
  }

  /**
   *
   * @param {*} query : token
   * @param {*} res : express response object
   * @returns
   */
  async installWix(query, res) {
    // save token for user and create a unique id for the user (store owner )
    const newAuthUser = new WixAuth();
    newAuthUser.wix_token = query.token;
    newAuthUser.state = await generateRandomString(); // id generated for user as guest
    await newAuthUser.save();
    return res.redirect(
      `${this.installerUrl}?token=${newAuthUser.wix_token}&appId=${this.wixAppId}&state=${newAuthUser.state}&redirectUrl=${this.redirectUrl}`
    );
  }

  async setupWix(payload, res) {
    // update store owner installation with there instanceID
    const storeState = payload.state;
    const wixAuth = await WixAuth.findOne({ state: storeState });
    wixAuth.authCode = payload.code;
    wixAuth.instanceId = payload.instanceId;
    wixAuth.uid = payload.uid;
    await wixAuth.save();

    const authPayload = {
      grant_type: "authorization_code",
      client_id: this.wixAppId,
      client_secret: this.wixAppSecret,
      code: payload.code
    }

    // fetch oauth from wix for user
    const request = await fetch(this.endpoints.oauth, {method: "POST", body: JSON.stringify(authPayload), headers: {'Content-Type': 'application/json'}});
    const response  = await request.json();

    wixAuth.refresh_token = response.refresh_token;
    wixAuth.access_token = response.access_token;
    await wixAuth.save();

    // complete wix
    const payloadWixComplete = {
      "eventName" : "APP_FINISHED_CONFIGURATION"
    }
    const requestWixComplete = await fetch(this.endpoints.completeReg, {method: "POST", body: JSON.stringify(payloadWixComplete), headers: {'Content-Type': 'application/json'}});
    const responseWixComplete  = await requestWixComplete.json();
    console.log(responseWixComplete)

    return {message: "Successfully installed wix"};
  }
}

const wix = new WixService();

module.exports = {
  wix,
};
