// https://randomuser.me/api/?results=24
// Je vais essayé de décrire chaque étape
// Il faut partitionner son code au mieux pour le rendre lisible et maintenable
//On récupère les données de l'API grace au Fetch

// fetch("https://randomuser.me/api/?results=24").then((res) => {
//   //   console.log(res); // On va convertir notre résultat en JSON pour pouvoir le manipuler
//   res.json().then((data) => {
//     console.log(data); // On va afficher les données dans la console (il y a 24 elements)
//   });
// });

//logique pour aller chercher les données de l'API
let userData = [];

// On va créer une fonction avec le fetch du dessus (ligne 1 à 10)
const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData);
};

// On va créer une fonction pour afficher les données dans le DOM (notre fonction d'affichage)
const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timeStamp = Date.parse(date);

    return Math.ceil((todayTimestamp - timeStamp) / 8.64e7);
  };

  document.body.innerHTML = userData
    .map(
      (user) => `<div class=card>
      <img src=${user.picture.large} alt=photo de ${user.name.last} />
  <h3>${user.name.first} ${user.name.last}</h3>
  <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
  <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
  </div>
  `
    )
    .join("");
  // Pour afficher les choses on va s'y prendre en faisant un map
};

// On appelle notre fonction ci dessous :
userDisplay();
