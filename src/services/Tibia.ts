import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';
import PlayerData from '../interface/PlayerData';

class Tibia {

  private readonly _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: "https://www.tibia.com/community",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0"
      }
    });
  };

  public async players(): Promise<PlayerData[]> {
    const { data } = await this._instance.get("/?subtopic=highscores");
    const $ = load(data);

    const players: PlayerData[] = [];

    $('table.TableContent tr').slice(1, 4).each((_, e) => {
      const player: PlayerData = {
        name: $(e).find('td:nth-child(2) a').text(),
        level: parseInt($(e).find('td:nth-child(5)').text()),
        experience: parseInt($(e).find('td:nth-child(6)').text().replace(/,/g, '')),
      };
      players.push(player);
    });
    return players;
  };
}

export default Tibia;
