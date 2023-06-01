import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';
import PlayerData from '../interface/PlayerData';

class Tibia {

  public async players(): Promise<PlayerData[]> {
    const { data } = await axios.get('https://www.tibia.com/community/?subtopic=highscores');
    const $ = load(data);

    const players: PlayerData[] = [];

    const playerElements = $('table.TableContent tr').slice(1, 4);

    await Promise.all(
      playerElements.map(async (_, e) => {
        const playerName = $(e).find('td:nth-child(2) a').text();
        const dailyExp = await this.dailyExperience(playerName);

        const player: PlayerData = {
          name: playerName,
          level: parseInt($(e).find('td:nth-child(5)').text()),
          experience: parseInt($(e).find('td:nth-child(6)').text().replace(/,/g, '')),
          daily: {
            date: dailyExp.date,
            experience: dailyExp.experience,
            level: dailyExp.level
          }
        };
        players.push(player);
      })
    );

    return players;
  };


  public async dailyExperience(player: string): Promise<{ date: string[], experience: string[], level: string[] }> {
    const { data } = await axios.get(`https://guildstats.eu/character?nick=${player}`);
    const $ = load(data);

    const date: string[] = [];
    const experience: string[] = [];
    const level: string[] = [];

    const table = $('table.shadow');
    const rows = table.find('tr:not(:first-child)');

    rows.each((_, e) => { 
      const dates = $(e).find('td:nth-child(1)').text();
      const experiences = $(e).find('td:nth-child(2)').text();
      let levels = $(e).find('td div').html()?.replace(/[()]/g, '');
      
      if (dates.startsWith("2023-")) date.push(dates);
      if (experiences.startsWith('+')) experience.push(experiences);
      if (!levels) levels = "0";
      level.push(levels);
    });

    const firstLevels = level.slice(41);

    return {
      date: date.splice(-5),
      experience: experience.splice(-5),
      level: firstLevels.slice(0, -8)
    }
  };

}

export default Tibia;