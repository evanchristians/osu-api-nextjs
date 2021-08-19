import axios from "axios";

const params = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: "client_credentials",
  scope: "public",
};

export const authMiddleware = async (req, res) => {
  const response = await axios.post("https://osu.ppy.sh/oauth/token", params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const accessToken = response.data.access_token;

  return (req.accessToken = accessToken);
};
