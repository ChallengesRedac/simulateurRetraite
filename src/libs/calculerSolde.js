import data from "../data/dernieresDonnees.json";

function calculerSolde(type, annee, scenario, reference, niveauCotisation, ageDepart, pensionMoyenne) {


      let facteurTemps = annee > 2030 ? 1 : (annee-2022)/8
      let dataT = data["T"][annee]
      if(reference === 0 && annee > 2022 && niveauCotisation !== 29.5/100) {
         dataT = data["T"][annee]+(niveauCotisation-data["T"][annee])*facteurTemps


      }
      let dataB = data["B"][annee];

      let dataP = data["P"][annee]
      if(reference === 0 && annee > 2022 && pensionMoyenne!==1583) {
 
        dataP = data["P"][annee]*(((pensionMoyenne/1583)-1)*facteurTemps+1);
 
      }
      let differenceAgeDepartLegal = 0;
      if(reference === 0 && annee > 2022 && ageDepart!==62) {
        differenceAgeDepartLegal = (ageDepart-62)*facteurTemps;


     }

      let F1 = dataB;
      let F2 = dataT;
      let F3 = data["NR"][annee]-data["G"][annee]*differenceAgeDepartLegal;
      let F4 = data["NC"][annee]+0.6*data["G"][annee]*differenceAgeDepartLegal;
      let F5 = (dataP + data["dP"][annee])

      let F6 = dataP;
      let F7 = 1-data["TCR"][annee];
      let F8 = data["TCS"][annee] + (dataT - data["T"][annee])
      let F9 = data["CNV"][annee];

      let F10 = data["A"][annee] + differenceAgeDepartLegal;
      let F11 = data["EV"][(Math.round(annee + 0.5 - F10))];

      let resultSoldeFinancier = F1*(F2-((F3/F4)*F5))
      let resultNiveauVie = F6*(F7/(1-F8))*F9;
      let resultTempsRetraite2 = (60+F11-F10)/(60+F11);
      let resultTempsRetraite = (60+F11-F10);

      let result = resultSoldeFinancier;
      if(type===1) {
        result = resultNiveauVie
      }
      if(type===2) {
        result = resultTempsRetraite
      }

    return(result);
}

export default calculerSolde