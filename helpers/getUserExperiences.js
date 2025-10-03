import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function getUserExperiences(username) {
  // Fetch Roblox profile page
  const res = await fetch(
    `https://www.roblox.com/users/profile?username=${encodeURIComponent(
      username
    )}#!#creations`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch profile for ${username}`);
  const html = await res.text();

  // Load HTML with Cheerio
  const $ = cheerio.load(html);

  const games = [];

  // Find each game-card under Creations tab
  $("#creations li.list-item.game-card.game-tile").each((_, el) => {
    const link = $(el).find("a.game-card-link").attr("href") || "";
    const title = $(el).find(".game-card-name").text().trim();
    const thumbnail =
      $(el).find("img.game-card-thumb").attr("src") ||
      $(el).find("img.game-card-thumb").attr("data-src");

    // Extract gameId from URL
    let gameId = null;
    const match = link.match(/\/games\/(\d+)/);
    if (match) gameId = match[1];

    games.push({
      id: gameId,
      title,
      thumbnail,
    });
  });

  return games;
}
