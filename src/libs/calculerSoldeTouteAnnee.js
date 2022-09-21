
import calculerSolde from './calculerSolde.js'

function calculerSoldeTouteAnnee(type, scenario, reference, niveauCotisation, ageDepart, pensionMoyenne) {
    let data = [];
    for(let annee=2005; annee < 2071; annee++)
    {
        
        data.push({x:annee, y:calculerSolde(type, annee, scenario, reference, niveauCotisation, ageDepart, pensionMoyenne)})
    }
    
      

   return(data);
}
export default calculerSoldeTouteAnnee