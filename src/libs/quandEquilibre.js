import calculerSolde from "./calculerSolde";

function quandEquilibre(scenario, niveauCotisation, ageDepart, pensionMoyenne) {
  let annee = 2070;
  let equilibreAtteint = 0;
  let step = 2022;
  let solde = -1;

  while (equilibreAtteint === 0 && step <= 2070) {
    solde = calculerSolde(
      0,
      step,
      scenario,
      0,
      niveauCotisation,
      ageDepart,
      pensionMoyenne
    );
    if (solde > 0) {
      equilibreAtteint = 1;
      annee = step;
    }
    console.log("année: " + step + " solde: " + solde);
    step++;
  }
  return annee;
}
export default quandEquilibre;
