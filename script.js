document.querySelector("#search-btn").addEventListener("click", getPokemon);

function getPokemon(e) {
  const name = document.querySelector("#pokemon-input").value.toLowerCase().trim();

  // Remove old card if it exists
  let card = document.querySelector("#pokemon-card");
  if (card) card.remove();

  // Create a new card container
  card = document.createElement("div");
  card.id = "pokemon-card";
  card.innerHTML = "<p>Loading...</p>";
  document.body.appendChild(card);

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pokémon not found");
      return response.json();
    })
    .then((data) => {
      const img = data.sprites.other["official-artwork"].front_default;
      const types = data.types.map(t => `<span class="badge">${t.type.name}</span>`).join(" ");
      const abilities = data.abilities.map(a => `<span class="badge">${a.ability.name}</span>`).join(" ");
      const stats = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("");

      card.innerHTML = `
        <div class="pokemon-info">
          <h2>${data.name.toUpperCase()}</h2>
          <img src="${img}" alt="${data.name}" class="pokemon-img" />
          <div><strong>Type:</strong> ${types}</div>
          <div><strong>Abilities:</strong> ${abilities}</div>
          <div><strong>Stats:</strong><ul>${stats}</ul></div>
        </div>
      `;
    })
    .catch((err) => {
      card.innerHTML = `<p style="color:red;">${err.message}</p>`;
      console.log("Error fetching Pokémon:", err);
    });
}




// audio
//add later 