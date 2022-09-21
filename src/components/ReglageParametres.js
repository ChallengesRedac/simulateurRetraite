import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const descriptionAgeDepart =
  "L'âge de départ légal correspond à l'âge minimum auquel un retraité peut partir pour espérer pouvoir toucher le taux plein de sa retraite. Plus vous augmenterez cet âge, plus votre système a de chances d'être à l'équilibre. En revanche, cela aura une incidence négative sur la durée de vie à la retraite.";

const descriptionCotisation = "Le taux de cotisation correspond à la part du salaire brut qui est affecté, d'une quelconque manière, au financement des retraites. Il est autour de 29,5% aujourd'hui. Une modification de votre part sera lissée pour atteindre son plein effet en 2030.";
const descriptionPensionMoyenne = "C'est la moyenne des pensions brutes versées au retraités, en euro constant de 2022, c'est-à-dire sans prendre en compte l'inflation au fil des années.";

function ReglageParametres({
  ageDepart,
  baseAgeDepart,
  handleAgeDepart,
  niveauCotisationUtilisateur,
  baseNiveauCotisation,
  handleNiveauCotisationUtilisateur,
  pensionMoyenne,
  basePensionMoyenne,
  handlePensionMoyenne,
}) {
  return (
    <FormGroup>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={5} sm={5}>
          <Typography
            textAlign="right"
            color={ageDepart != baseAgeDepart ? "primary" : ""}
            fontWeight={ageDepart != baseAgeDepart ? "bold" : ""}
          >
            Age de départ{" "}
            <Tooltip title={descriptionAgeDepart}>
              <InfoIcon fontSize="small" color="info" />
            </Tooltip>{" "}
            :
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <TextField
            label="Age de départ"
            id="ageDepart"
            type="number"
            value={ageDepart}
            onChange={handleAgeDepart}
            sx={{ m: 1, minWidth: "15ch" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ans</InputAdornment>,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography color="primary" fontWeight="bold">
            {ageDepart > baseAgeDepart ? <ArrowUpwardIcon /> : ""}{" "}
            {ageDepart < baseAgeDepart ? <ArrowDownwardIcon /> : ""}
            {ageDepart != baseAgeDepart
              ? ageDepart -
                baseAgeDepart +
                " an" +
                (Math.abs(ageDepart - baseAgeDepart) > 1 ? "s" : "")
              : " "}
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Typography
            textAlign="right"
            color={
              niveauCotisationUtilisateur != baseNiveauCotisation
                ? "primary"
                : ""
            }
            fontWeight={
              niveauCotisationUtilisateur != baseNiveauCotisation ? "bold" : ""
            }
          >
            Taux de cotisation{" "}
            <Tooltip title={descriptionCotisation}>
              <InfoIcon fontSize="small" color="info" />
            </Tooltip>{" "}
            :
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <TextField
            label="Taux de cotisation"
            id="tauxCotisation"
            type="number"
            value={niveauCotisationUtilisateur}
            onChange={handleNiveauCotisationUtilisateur}
            sx={{ m: 1, minWidth: "15ch" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography color="primary" fontWeight="bold">
            {niveauCotisationUtilisateur > baseNiveauCotisation ? (
              <ArrowUpwardIcon />
            ) : (
              ""
            )}{" "}
            {niveauCotisationUtilisateur < baseNiveauCotisation ? (
              <ArrowDownwardIcon />
            ) : (
              ""
            )}
            {niveauCotisationUtilisateur != baseNiveauCotisation
              ? niveauCotisationUtilisateur -
                baseNiveauCotisation +
                " pt" +
                (Math.abs(niveauCotisationUtilisateur - baseNiveauCotisation) >
                1
                  ? "s"
                  : "")
              : " "}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography
            textAlign="right"
            color={
              pensionMoyenne != basePensionMoyenne
                ? "primary"
                : ""
            }
            fontWeight={
              pensionMoyenne != basePensionMoyenne ? "bold" : ""
            }
          >
            Pension moyenne{" "}
            <Tooltip title={descriptionPensionMoyenne}>
              <InfoIcon fontSize="small" color="info" />
            </Tooltip>{" "}
            :
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Pension moyenne"
            id="pensionMoyenne"
            type="number"
            value={pensionMoyenne}
            onChange={handlePensionMoyenne}
            sx={{ m: 1, minWidth: "15ch" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Typography color="primary" fontWeight="bold">
            {pensionMoyenne > basePensionMoyenne ? <ArrowUpwardIcon /> : ""}{" "}
            {pensionMoyenne < basePensionMoyenne ? <ArrowDownwardIcon /> : ""}
            {pensionMoyenne != basePensionMoyenne
              ? Math.round(
                  ((pensionMoyenne - basePensionMoyenne) / basePensionMoyenne) *
                    1000
                ) /
                  10 +
                " %"
              : " "}
          </Typography>
        </Grid>
      </Grid>
    </FormGroup>
  );
}

export default ReglageParametres;
