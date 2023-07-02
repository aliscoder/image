import axios from "axios";

const url = "https://api.api-ninjas.com/v1";

export async function getImage() {
  try {
    const res = await axios.get<string>(
      `https://api.api-ninjas.com/v1/randomimage?category=nature`,
      {
        headers: {
          "X-Api-Key": "20feb8KIgEptWMOzneTQjA==hIW9dFcaBrR2bwM9",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
