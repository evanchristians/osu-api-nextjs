import axios from "axios";
import { authMiddleware } from "../../../../lib/authMiddleware";

export default async function handler(req, res) {
  await authMiddleware(req);

  const { username, mode } = req.query;

  try {
    const response = await axios.get(
      `https://osu.ppy.sh/api/v2/users/${username}/${mode}`,
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    throw new Error(err.message);
  }
}
