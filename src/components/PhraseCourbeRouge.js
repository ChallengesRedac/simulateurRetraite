import * as React from "react";
import Typography from "@mui/material/Typography";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const PhraseCourbeRouge = ({
  step,
  texteEquilibreFinancier,
  texteNiveauVie,
  texteDureeRetraite,
}) => {
  if (step === 0) {
    return (
      <Typography>
        Comme le montre{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          <ShowChartIcon /> la courbe rouge
        </Typography>
        , votre réforme pourrait amener les caisses de retraite à être{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          {texteEquilibreFinancier}
        </Typography>
        .{" "}
      </Typography>
    );
  }
  if (step === 1) {
    return (
      <Typography>
        Comme le montre{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          <ShowChartIcon /> la courbe rouge
        </Typography>
        , votre réforme amènerait le niveau de vie des retraités par rapport au
        reste de la population active à un niveau{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          {texteNiveauVie}
        </Typography>{" "}
        qu'en l'absence de réforme, selon les projections du COR.{" "}
      </Typography>
    );
  }
  if (step === 2) {
    return (
      <Typography>
        Comme le montre{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          <ShowChartIcon /> la courbe rouge
        </Typography>
        , votre réforme aboutirait à ce que les retraités qui partiront à la
        retraite en 2070 passeront une proportion de leur vie{" "}
        <Typography variant="span" color="primary" fontWeight="bold">
          {texteDureeRetraite}
        </Typography>{" "}
        à la retraite que les retraités partis en 2022.{" "}
      </Typography>
    );
  }
};

export default PhraseCourbeRouge;
