interface PlayerData {
  name: string,
  level: number,
  experience: number,
  daily: {
    date: string[],
    experience: string[]
    level: string[]
  }
}

export default PlayerData;