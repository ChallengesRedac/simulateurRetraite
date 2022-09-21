import * as React from "react";
import ChartSoldeFinancier from "./ChartSoldeFinancier";
import ChartNiveauVie from "./ChartNiveauVie";
import ChartTempsRetraite from "./ChartTempsRetraite";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Info } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import calculerSolde from "./calculerSolde.js";
import calculerSoldeTouteAnnee from "./calculerSoldeTouteAnnee.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import Filter2OutlinedIcon from "@mui/icons-material/Filter2Outlined";
import Filter3OutlinedIcon from "@mui/icons-material/Filter3Outlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

let sizeH1 = "45px";
let sizeInfo = 12;
const steps = [
  "L'âge de départ",
  "Les cotisations retraite",
  "Le montant des pensions",
];

function App() {
  const [contexteSocioEco, setContexteSocioEco] = React.useState("Neutre");
  const [niveauCotisationUtilisateur, setNiveauCotisationUtilisateur] =
    React.useState(29.5);
  const [parametresModifies, setParametresModifies] = React.useState(0);
  const [ageDepart, setAgeDepart] = React.useState(62);
  const [pensionMoyenne, setPensionMoyenne] = React.useState(1583);
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
  };

  const handleContexteSocioEco = (event, newContexteSocioEco) => {
    setContexteSocioEco(newContexteSocioEco);
  };
  const handleNiveauCotisationUtilisateur = (event) => {
    setNiveauCotisationUtilisateur(event.target.value);
    setParametresModifies(1);
  };
  const handleAgeDepart = (event) => {
    setAgeDepart(event.target.value);
    setParametresModifies(1);
  };
  const handlePensionMoyenne = (event) => {
    setPensionMoyenne(event.target.value);
    setParametresModifies(1);
  };

  let texteEquilibreFinancier =
    "à l'équilibre, voire bénéficiaire financièrement";
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
        2022,
        contexteSocioEco,
        0,
        niveauCotisationUtilisateur / 100,
        ageDepart,
        pensionMoyenne
      ) >
    0
  ) {
    texteNiveauVie = "plus élevé";
  }

  let texteDureeRetraite = "plus courte";
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
    texteDureeRetraite = "plus longue";
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Franklin Gothic",
    },
    palette: {
      primary: {
        main: "#ab2926",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="p-12 flex items-center justify-center">
        <Box sx={{ maxWidth: "800px" }}>
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant="h1" fontSize={sizeH1}>
                  Simulez votre propre réforme des retraites...
                  <Typography variant="h1" fontSize={sizeH1} color="primary">
                    ... et observez son impact jusqu'en 2070
                  </Typography>
                </Typography>

                <Stepper
                  activeStep={activeStep}
                  style={{ padding: "24px 0px 24px 0px" }}
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
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>

                {activeStep === steps.length ? (
                  <React.Fragment>
                    <div className="">
                      <Stack spacing={3}>
                        <Typography variant="h1" fontSize={sizeH1}>
                          Résultats de la simulation
                        </Typography>
                        
                        <Typography>
                          Votre réforme pourrait être évaluée sur trois critères
                          : est-ce que les caisses de retraite sont à
                          l'équilibre avec les cotisations ? Le niveau des vie
                          des retraités a-t-il trop chuté par par rapport au
                          reste de la population active ? Le temps passé à la
                          retraite a-t-il diminué ? Voici les résultats de la
                          simulation.{" "}
                        </Typography>
                        <div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography level="h2" fontSize="26px">Equilibre financier</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Slider
                      key={`slider-${ageDepart}`}
                      value={ageDepart}
                      onChange={handleAgeDepart}
                      valueLabelDisplay="on"
                      step={1}
                      marks
                      min={58}
                      max={68}
                      valueLabelFormat={(x) => x + " ans"}
                      size="big"
                      color="primary"
                    />
                    <TextField
                      label="Taux de cotisation"
                      id="tauxCotisation"
                      type="number"
                      value={niveauCotisationUtilisateur}
                      onChange={handleNiveauCotisationUtilisateur}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                              <Typography>
                                Selon le modèle, votre réforme pourrait amener
                                les caisses de retraite à être{" "}
                                <Typography
                                  variant="span"
                                  color="primary"
                                  fontWeight="bold"
                                >
                                  {texteEquilibreFinancier}
                                </Typography>{" "}
                                en 2070.{" "}
                              </Typography>
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
                            </AccordionDetails>
                          </Accordion>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography>Accordion 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion disabled>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3a-content"
                              id="panel3a-header"
                            >
                              <Typography>Disabled Accordion</Typography>
                            </AccordionSummary>
                          </Accordion>
                        </div>

                        <Typography level="h2" fontSize="26px">
                          Equilibre financier
                        </Typography>

                        <Typography>
                          Selon le modèle, votre réforme pourrait amener les
                          caisses de retraite à être{" "}
                          <Typography
                            variant="span"
                            color="primary"
                            fontWeight="bold"
                          >
                            {texteEquilibreFinancier}
                          </Typography>{" "}
                          en 2070.{" "}
                        </Typography>
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

                        <Typography level="h2" fontSize="26px">
                          Niveau de vie des retraités
                        </Typography>
                        <Typography>
                          Selon le modèle, votre réforme amènerait le niveau de
                          vie des retraités par rapport au reste de la
                          population active à un niveau{" "}
                          <Typography
                            variant="span"
                            color="primary"
                            fontWeight="bold"
                          >
                            {texteNiveauVie}
                          </Typography>{" "}
                          en 2070 qu'aujourd'hui.{" "}
                        </Typography>
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
                        <Typography level="h2" fontSize="26px">
                          Durée de vie passée à la retraite
                        </Typography>
                        <Typography>
                          Selon le modèle, votre réforme aboutirait à ce que les
                          retraités qui partiront à la retraite en 2070
                          passeront une proportion de leur vie{" "}
                          <Typography
                            variant="span"
                            color="primary"
                            fontWeight="bold"
                          >
                            {texteDureeRetraite}
                          </Typography>{" "}
                          à la retraite que les retraités partis en 2022.{" "}
                        </Typography>
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
                      </Stack>
                    </div>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : activeStep === 0 ? (
                  <React.Fragment>
                    <Typography level="h2" fontSize="26px">
                      <Typography color="primary" level="h2" fontSize="23px">
                        <Filter1OutlinedIcon /> Etape 1 :
                      </Typography>
                      L'âge de départ
                    </Typography>

                    <Typography textAlign="center">
                      Tout d'abord, fixez l'âge de départ légal de votre
                      réforme, c'est-à-dire l'âge minimum auquel un travailleur
                      peut partir à la retraite en espérant pouvoir toucher le
                      taux plein.{" "}
                    </Typography>

                    <Slider
                      key={`slider-${ageDepart}`}
                      value={ageDepart}
                      onChange={handleAgeDepart}
                      valueLabelDisplay="on"
                      step={1}
                      marks
                      min={58}
                      max={68}
                      valueLabelFormat={(x) => x + " ans"}
                      size="big"
                      color="primary"
                    />

                    <Paper
                      elevation={8}
                      sx={{
                        padding: "10px",
                        borderRadius: "md",
                        overflow: "auto",
                        bgcolor: "#F1F1F1",
                        color: "#656565",
                      }}
                    >
                      <Typography>
                        <AddCircleIcon /> Plus vous augmenterez l'âge de départ,
                        plus le système des retraites a des chances d'être à
                        l'équilibre financièrement.{" "}
                      </Typography>
                      <Typography>
                        <RemoveCircleIcon /> En revanche, un âge de départ plus
                        important que l'augmentation de l'espérance de vie
                        pourrait réduire la durée que les Français passeront à
                        la retraite.{" "}
                      </Typography>
                    </Paper>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}

                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : activeStep === 1 ? (
                  <React.Fragment>
                    <Typography level="h2" fontSize="26px">
                      <Typography color="primary" level="h2" fontSize="23px">
                        <Filter2OutlinedIcon /> Etape 2 :
                      </Typography>
                      Les cotisations retraite
                    </Typography>

                    <Typography textAlign="center">
                      Dans votre réforme, quelle part du salaire brut d'un actif
                      doit être consacré au cotisations pour la retraite ?{" "}
                    </Typography>

                    <TextField
                      label="Taux de cotisation"
                      id="tauxCotisation"
                      type="number"
                      value={niveauCotisationUtilisateur}
                      onChange={handleNiveauCotisationUtilisateur}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />

                    <Paper
                      elevation={8}
                      sx={{
                        padding: "10px",
                        borderRadius: "md",
                        overflow: "auto",
                        bgcolor: "#F1F1F1",
                        color: "#656565",
                      }}
                    >
                      <Typography>
                        <AddCircleIcon /> Plus cette part sera importante, plus
                        le système de retraite a de chances d'être à
                        l'équilibre.{" "}
                      </Typography>
                      <Typography>
                        <RemoveCircleIcon /> Un taux de cotisation trop élevé
                        pèsera néanmoins sur le pouvoir d'achat des actifs.{" "}
                      </Typography>
                    </Paper>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}

                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography level="h2" fontSize="26px">
                      <Typography color="primary" level="h2" fontSize="23px">
                        <Filter3OutlinedIcon /> Etape 3 :
                      </Typography>
                      Le montant des pensions
                    </Typography>
                    <Typography textAlign="center">
                      Fixez le montant brut de la pension moyenne que recevront
                      les bénéficiaires de la retraite avec votre réforme,
                      actuellement autour de 1583 euros pour les retraités.
                    </Typography>
                    <TextField
                      label="Pension moyenne"
                      id="pensionMoyenne"
                      type="number"
                      value={pensionMoyenne}
                      onChange={handlePensionMoyenne}
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">€</InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                    <Paper
                      elevation={8}
                      sx={{
                        padding: "10px",
                        borderRadius: "md",
                        overflow: "auto",
                        bgcolor: "#F1F1F1",
                        color: "#656565",
                      }}
                    >
                      <Typography fontSize={12}>
                        <Info color="disabled" sx={{ fontSize: 20 }} /> Etant
                        donné que le modèle s'intéresse aux niveaux de vie
                        relatifs, il ne faut pas tenir compte ici de
                        l'inflation. Autrement dit, partez du principe que 2000
                        euros en 2070 vaudront autant que 2000 aujourd'hui.
                      </Typography>
                    </Paper>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}

                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
