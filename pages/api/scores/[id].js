import axios from "axios";
import { authMiddleware } from "../../../lib/authMiddleware";

export default async function handler(req, res) {
  await authMiddleware(req);

  const { id } = req.query;

  try {
    const response = await axios.get(
      `https://osu.ppy.sh/api/v2/users/${id}/scores/best`,
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    throw new Error();
  }
}
