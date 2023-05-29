const cards = document.getElementById("cards");

async function api() {
  try {
    const response = await fetch("http://localhost:3000/v1/tibia");
    const { result } = await response.json();
    const { name, level, experience } = result;
    show(name, level, experience);
  } catch(e) {
    alert("Api offline.")
    throw new Error("Api offline.");
  };
}

function show(name, level, experience) {
  const playerName = "Dejair Invencivel";
  const playerIndex = name.indexOf(playerName);

  for (let i = 0; i < name.length; i++) {
    const diffLevel = level[i] - level[playerIndex];
    const diffExperience = experience[i] - experience[playerIndex];
    const isDejair = i === playerIndex;

    const card = `
      <div class="cards">
        <div class="avatar">
          <img src="${avatar(name[i])}"><br>
          ${name[i]}<br> 
          </div>
          Ranking: ${i + 1}<br> Level: ${level[i]}<br> Experiência: ${experience[i].toLocaleString()}
    `;

    if (isDejair) {
      cards.innerHTML += card;
      continue;
    }

    const diffInfo = `
      <hr>Diferença entre ${name[i]} e ${playerName}
      <li>Nível: ${diffLevel}<br>
      <li>Experiência: ${diffExperience.toLocaleString()}</li>
    `;

    cards.innerHTML += card + diffInfo + '</div>';
  }
}

function avatar(playerName) {
  let avatar = "";
  if (playerName === "Goraca") {
    avatar = './imgs/goraca.png';
  } else if (playerName === "Bobeek") {
    avatar = "./imgs/bobeek.png";
  } else {
    avatar = './imgs/dejair.png'
  };
  return avatar;
};

api();