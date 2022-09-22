import * as React from "react";
import ChartSoldeFinancier from "./ChartSoldeFinancier";
import ChartNiveauVie from "./ChartNiveauVie";
import ChartTempsRetraite from "./ChartTempsRetraite";
import ReglageParametres from "./ReglageParametres";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Info } from "@mui/icons-material";
import Box from "@mui/material/Box";
import calculerSolde from "../libs/calculerSolde.js";
import calculerSoldeTouteAnnee from "../libs/calculerSoldeTouteAnnee.js";
import quandEquilibre from "../libs/quandEquilibre.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import Filter2OutlinedIcon from "@mui/icons-material/Filter2Outlined";
import Filter3OutlinedIcon from "@mui/icons-material/Filter3Outlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhraseCourbeRouge from "./PhraseCourbeRouge";
let sizeH1 = "45px";
let sizeInfo = 12;

const steps = [
  "L'équilibre financier",
  "Le niveau de vie des retraités",
  "La durée de la retraite",
];

const titreEtape = [
  "Retrouvez l'équilibre financier",
  "Sauvegardez le niveau de vie des retraités",
  "Veillez à la durée de la retraite",
];

const messageExplicationProjection = [
  "Le Conseil d'orientation des retraites projette que le système actuel des réformes des retraites ne sera pas à l'équilibre avant 2054. ",
  "Le niveau de vie des personnes à la retraite par rapport aux actifs devrait être plus faible dans les décennies à venir, selon les projections du Conseil d'orientation des retraites. Cela ne signifie pas que ce niveau de vie sera moindre dans l'absolu, mais uniquement comparé à celui des actifs qui a tendance à augmenter plus vite. ",
  "En 2010, le gouvernement de Nicolas Sarkozy avance l'âge du départ légal de deux ans, ce qui a fait reculer significativement la durée de retraite de ceux partis dès 2010, que l'augmentation de l'espérance de vie ne compensera pas avant des dizaines d'années. ",
];

const messageExplicationAction = [
  "A votre tour de modifier les paramètres de votre réforme et voir l'impact que cela aurait sur l'équilibre financier.",
  "Vous pouvez jouer avec les différents paramètres de la réforme pour essayer de modérer cette différence de niveau de vie entre les retraités et les actifs.",
  "En agissant sur l'âge de départ, vous pourrez voir l'évolution de la durée de la retraite prévisionnelle, en prenant en compte l'évolution de l'espérance de vie que projette l'Insee.",
];

function App() {
  const baseAgeDepart = 62;
  const basePensionMoyenne = 1583;
  const baseNiveauCotisation = 29.5;

  const [contexteSocioEco, setContexteSocioEco] = React.useState("Neutre");
  const [niveauCotisationUtilisateur, setNiveauCotisationUtilisateur] =
    React.useState(baseNiveauCotisation);
  const [parametresModifies, setParametresModifies] = React.useState(0);
  const [ageDepart, setAgeDepart] = React.useState(baseAgeDepart);
  const [pensionMoyenne, setPensionMoyenne] =
    React.useState(basePensionMoyenne);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  function handleChangeStep(stepTarget) {
    setActiveStep(stepTarget);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setAgeDepart(baseAgeDepart);
    setPensionMoyenne(basePensionMoyenne);
    setNiveauCotisationUtilisateur(baseNiveauCotisation);
    setParametresModifies(0);
  };

  const handleContexteSocioEco = (event, newContexteSocioEco) => {
    setContexteSocioEco(newContexteSocioEco);
  };
  const handleAgeDepart = (event) => {
    setAgeDepart(event.target.value);
    setParametresModifies(1);
    if (
      event.target.value == baseAgeDepart &&
      pensionMoyenne == basePensionMoyenne &&
      niveauCotisationUtilisateur == baseNiveauCotisation
    ) {
      setParametresModifies(0);
    }
  };

  const handleNiveauCotisationUtilisateur = (event) => {
    setNiveauCotisationUtilisateur(event.target.value);
    setParametresModifies(1);
    if (
      event.target.value == baseNiveauCotisation &&
      pensionMoyenne == basePensionMoyenne &&
      ageDepart == baseAgeDepart
    ) {
      setParametresModifies(0);
    }
  };

  const handlePensionMoyenne = (event) => {
    setPensionMoyenne(event.target.value);
    setParametresModifies(1);
    if (
      event.target.value == basePensionMoyenne &&
      niveauCotisationUtilisateur == baseNiveauCotisation &&
      ageDepart == baseAgeDepart
    ) {
      setParametresModifies(0);
    }
  };

  let texteEquilibreFinancier =
    "à l'équilibre dès " +
    quandEquilibre(
      contexteSocioEco,
      niveauCotisationUtilisateur / 100,
      ageDepart,
      pensionMoyenne
    );
  if (
    calculerSolde(
      0,
      2070,
      contexteSocioEco,
      0,
      niveauCotisationUtilisateur / 100,
      ageDepart,
      pensionMoyenne
    ) < 0
  ) {
    texteEquilibreFinancier = "en déficit";
  }

  let texteNiveauVie = "plus bas";
  if (
    calculerSolde(
      1,
      2070,
      contexteSocioEco,
      0,
      niveauCotisationUtilisateur / 100,
      ageDepart,
      pensionMoyenne
    ) -
      calculerSolde(
        1,
        2070,
        contexteSocioEco,
        1,
        niveauCotisationUtilisateur / 100,
        ageDepart,
        pensionMoyenne
      ) >
    0
  ) {
    texteNiveauVie = "plus élevé";
  }

  let texteDureeRetraite = "moins de temps";
  if (
    calculerSolde(
      2,
      2070,
      contexteSocioEco,
      0,
      niveauCotisationUtilisateur / 100,
      ageDepart,
      pensionMoyenne
    ) -
      calculerSolde(
        2,
        2022,
        contexteSocioEco,
        0,
        niveauCotisationUtilisateur / 100,
        ageDepart,
        pensionMoyenne
      ) >
    0
  ) {
    texteDureeRetraite = "plus de temps";
  }
  if (
    calculerSolde(
      2,
      2070,
      contexteSocioEco,
      0,
      niveauCotisationUtilisateur / 100,
      ageDepart,
      pensionMoyenne
    ) -
      calculerSolde(
        2,
        2022,
        contexteSocioEco,
        0,
        niveauCotisationUtilisateur / 100,
        ageDepart,
        pensionMoyenne
      ) ==
    0
  ) {
    texteDureeRetraite = "identique";
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Franklin Gothic",
    },
    palette: {
      primary: {
        main: "#ab2926",
      },
      info: {
        main: "#959da2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <Box sx={{ maxWidth: "800px" }}>
          <Stack spacing={4}>
            <Typography variant="h1" fontSize={sizeH1}>
              Simulez votre propre réforme des retraites
              <Typography variant="h1" fontSize={sizeH1} color="primary">
                et observez son impact jusqu'en 2070
              </Typography>
            </Typography>

            <div>
              <Box sx={{ width: "100%"}}>
                <Stepper
                  id="debutEtape"
                  activeStep={activeStep}
                  style={{ padding: "30px 0px 30px 0px" }}
                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>
                          <Button
                            color="inherit"
                            onClick={() => handleChangeStep(index)}
                            sx={{ height: "8vh", width: "0.1vh" }}
                          >
                            {label}
                          </Button>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>

              <React.Fragment>
                <Typography level="h2" fontSize="26px">
                  <Typography color="primary" level="h2" fontSize="23px">
                    {activeStep === 0 ? (
                      <Filter1OutlinedIcon />
                    ) : activeStep === 1 ? (
                      <Filter2OutlinedIcon />
                    ) : (
                      <Filter3OutlinedIcon />
                    )}{" "}
                    Étape {activeStep + 1} :
                  </Typography>
                  {titreEtape[activeStep]}
                </Typography>
                <Typography>
                  {messageExplicationProjection[activeStep]}
                  C'est ce que montre{" "}
                  <Typography variant="span" color="#959da2" fontWeight="bold">
                    <ShowChartIcon /> la courbe grise
                  </Typography>{" "}
                  ci-dessous.{" "}
                </Typography>
                <Typography>{messageExplicationAction[activeStep]}</Typography>
                <ReglageParametres
                  ageDepart={ageDepart}
                  baseAgeDepart={baseAgeDepart}
                  handleAgeDepart={handleAgeDepart}
                  niveauCotisationUtilisateur={niveauCotisationUtilisateur}
                  baseNiveauCotisation={baseNiveauCotisation}
                  handleNiveauCotisationUtilisateur={
                    handleNiveauCotisationUtilisateur
                  }
                  pensionMoyenne={pensionMoyenne}
                  basePensionMoyenne={basePensionMoyenne}
                  handlePensionMoyenne={handlePensionMoyenne}
                />

                {parametresModifies ? (
                  <PhraseCourbeRouge
                    step={activeStep}
                    texteEquilibreFinancier={texteEquilibreFinancier}
                    texteNiveauVie={texteNiveauVie}
                    texteDureeRetraite={texteDureeRetraite}
                  />
                ) : null}
                {activeStep === 0 ? (
                  <ChartSoldeFinancier
                    soldeFinancierSansReforme={calculerSoldeTouteAnnee(
                      0,
                      contexteSocioEco,
                      1,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    soldeFinancierAvecReforme={calculerSoldeTouteAnnee(
                      0,
                      contexteSocioEco,
                      0,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    parametresModifies={parametresModifies}
                  />
                ) : activeStep === 1 ? (
                  <ChartNiveauVie
                    soldeFinancierSansReforme={calculerSoldeTouteAnnee(
                      1,
                      contexteSocioEco,
                      1,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    soldeFinancierAvecReforme={calculerSoldeTouteAnnee(
                      1,
                      contexteSocioEco,
                      0,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    parametresModifies={parametresModifies}
                  />
                ) : (
                  <ChartTempsRetraite
                    soldeFinancierSansReforme={calculerSoldeTouteAnnee(
                      2,
                      contexteSocioEco,
                      1,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    soldeFinancierAvecReforme={calculerSoldeTouteAnnee(
                      2,
                      contexteSocioEco,
                      0,
                      niveauCotisationUtilisateur / 100,
                      ageDepart,
                      pensionMoyenne
                    )}
                    parametresModifies={parametresModifies}
                  />
                )}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    href="#debutEtape"
                  >
                    Retour
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button
                    onClick={
                      activeStep === steps.length - 1 ? handleReset : handleNext
                    }
                    href="#debutEtape"
                  >
                    {activeStep === steps.length - 1
                      ? "Recommencer"
                      : "Suivant"}
                  </Button>
                </Box>
              </React.Fragment>
            </div>
          </Stack>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
