import serverConfig from "../configs/serverConfig.js";

const { safaricom } = serverConfig;

if (!safaricom?.consumerKey || !safaricom?.consumerSecret) {
    throw new Error("Missing Safaricom credentials");
}

export default safaricom;