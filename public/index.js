const cards = document.getElementById("cards");

async function api() {
  try {
    const response = await fetch("http://localhost:3000/v1/tibia");
    const { result } = await response.json();
    show(result);
  } catch (e) {
    alert("Api offline.")
    throw new Error("Api offline.");
  };
}

function show(result) {
  const playerName = "Dejair Invencivel";
  let playerIndex = result.findIndex(player => player.name === playerName);

  result.forEach((player, i) => {
    const diffLevel = player.level - result[playerIndex].level;
    const diffExperience = player.experience - result[playerIndex].experience;

    const card = `
      <div class="cards">
        <div class="avatar">
          <img src="${outfits(player.name)}"><br>
          ${player.name}<br> 
        </div>
        Ranking: ${i + 1}<br> Level: ${player.level}<br> Experiência: ${player.experience.toLocaleString()}
    `;

    if (i === playerIndex) return cards.innerHTML += card;

    const diffInfo = `
      <hr>Diferença entre ${player.name} e ${playerName}
      <li>Nível: ${diffLevel}<br>
      <li>Experiência: ${diffExperience.toLocaleString()}</li>
    `;

    cards.innerHTML += card + diffInfo + '</div>';
  });
}

function outfits(playerName) {
  const outfit = {
    "Goraca": "./imgs/goraca.png",
    "Bobeek": "./imgs/bobeek.png",
    "Dejair Invencivel": "./imgs/dejair.png"
  };
  return outfit[playerName];
};

api();