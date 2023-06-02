import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';
import PlayerData from '../interface/PlayerData';

class Tibia {

  private async request(player: string) {
    try {
      const { data } = await axios.get(`https://guildstats.eu/character?nick=${player}`);
      return load(data);
    } catch (e) {
      throw new Error('Error getting character information: ' + player);
    }
  };

  public async players(): Promise<PlayerData[]> {
    const top3: string[] = ["Goraca", "Bobeek", "Dejair Invencivel"];
    const players: PlayerData[] = [];

    for (const playerName of top3) {
      const { charLevel, charExperience, date, experience, level }: DailyExperience = await this.dailyExperience(playerName);

      const player: PlayerData = {
        name: playerName,
        level: parseInt(charLevel),
        experience: parseInt(charExperience),
        daily: {
          date: date,
          experience: experience,
          level: level
        }
      };
      players.push(player);
    }
    return players;
  };

  private async dailyExperience(player: string): Promise<DailyExperience> {

    const $ = await this.request(player);

    const charInfo: string[] = [];
    const date: string[] = [];
    const experience: string[] = [];
    const daily_level: string[] = [];

    const rows = $('table.shadow').find('tr:not(:first-child)');
    rows.each((_, e) => {
      const info = $(e).find('td:nth-child(2)').text();
      charInfo.push(info);

      const dates = $(e).find('td:nth-child(1)').text();
      const experiences = $(e).find('td:nth-child(2)').text();
      let daily_levels = $(e).find('td div').html()?.replace(/[()]/g, '');

      if (dates.startsWith("2023-")) date.push(dates);
      if (experiences.startsWith('+')) experience.push(experiences);
      if (!daily_levels) daily_levels = "0";
      daily_level.push(daily_levels);
    });

    const firstLevels = daily_level.slice(41);
    let char = charInfo[6].split(' ');
    if (!parseInt(char[0])) {
      char = charInfo[7].split(' ');
    };

    return {
      charLevel: char[0],
      charExperience: char[1].replace(/[~()exp,]/g, ''),
      date: date.splice(-5),
      experience: experience.splice(-5),
      level: firstLevels.slice(0, -8),
    }
  };

}

export default Tibia;