import axios from 'axios';
import { NextResponse } from 'next/server';

export const maxDuration = 59;

export async function GET(req, res) {
  try {
    const { data: users } = await axios.get("https://pingpilot.vercel.app/api/get-all");

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" });
    }

    // Parallel processing of lighthouse records
    const lighthousePromises = users.map(user =>
      axios.get(`https://pingpilot.vercel.app/api/lighthouse`, {
        params: { id: user.id, url: user.url }
      })
    );

    await Promise.all(lighthousePromises);

    console.log("Lighthouse records processed successfully!");
    return NextResponse.json({ message: "Done" });

  } catch (error) {
    console.error("Error in processing:", error);
    return NextResponse.json({ message: "Error occurred", error: error.message });
  }
}
