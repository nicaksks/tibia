const cards = document.getElementById("cards");

async function api() {
  try {
    const response = await fetch('http://localhost:3000/v1/tibia');
    const { result } = await response.json();
    show(result);
  } catch (e) {
    alert('Api provavelmente está offline.');
    throw new Error('Api offline.');
  };
}

function show(result) {

  const playerName = "Dejair Invencivel";

  result.sort((a, b) => b.level - a.level);
  result.forEach((player, ranking) => {

    const level = player.level - result.find(p => p.name === playerName).level;
    const experience = player.experience - result.find(p => p.name === playerName).experience;

    const card = `
    <div class="cards">
      <div class="sites">
      <a href="https://www.tibia.com/community/?name=${player.name}" target="_blank">
        <img src="./imgs/icons/tibia.ico" style="width: 20px; height: 20px;">
      </a>
      <a href="https://guildstats.eu/character?nick=${player.name}" target="_blank">
        <img src="./imgs/icons/guildstats.ico" style="width: 20px; height: 20px;">
      </a>
      </div>
      <div class="avatar">
        <img src="${outfits(player.name)}" style="width: 100px; height: 100px; margin-right: 40px;"><br>
        ${player.name}<br> 
    </div>
      Ranking: ${ranking + 1}<br> Level: ${player.level}<br> Experiência: ${player.experience.toLocaleString()}`;

    const diffInfo = `
    <hr>Diferença entre ${player.name} e ${playerName}
      <li>Nível: ${level}<br>
      <li>Experiência: ${experience.toLocaleString()}</li>`;

    const diffDaily = `
    <hr>
      <table>
        <tr>
          <th>Data</th>
          <th>Exp</th>
          <th>Nível</th>
        </tr>
        <tr>
          <th>${player.daily.date.join('<br>')}</th>
          <th>${player.daily.experience.join('<br>')}</th>
          <th>${player.daily.level.join('<br>')}</th>
        </tr>
      </table>`;

    if (player.name === playerName) {
      return cards.innerHTML += card + diffDaily;
    };

    cards.innerHTML += card + diffInfo + diffDaily + '<div>';
  });
}

function outfits(playerName) {
  const outfit = {
    "Goraca": "./imgs/characters/goraca.png",
    "Bobeek": "./imgs/characters/bobeek.png",
    "Dejair Invencivel": "./imgs/characters/dejair.png"
  };
  return outfit[playerName];
};

api();