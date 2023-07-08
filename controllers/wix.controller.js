const { wix } = require("../services/wix.service");

async function install(req, res) {
  try {
    const query = req.query;
    if (!query.token) throw new Error("No token provided to install app");
    const installRequest = await wix.installWix(query, res)
    return installRequest;
  } catch (e) {
    return res
      .status(400)
      .json({ message: e.message || "An error occurred installing app" });
  }
}

async function completeSetup (req, res){
  try{
    const payload = req.body;
    payload['uid'] = req.auth._id;
    const completeSetupRequest = await wix.setupWix(payload);
    return res.json(completeSetupRequest);
  }catch (e){
    return res.status(400).json({message: e.message || "An error occurred completing wix setup."});
  }
}

module.exports = {
  install,
  completeSetup
};
