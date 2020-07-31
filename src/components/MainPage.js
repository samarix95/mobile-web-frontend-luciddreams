import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";

import { setAppTheme, setOpenDialogConfirm, setResetDialogConfirm } from "../actions/actions";
import { removeToken } from "../functions/auth";
import { getLanguage } from "../reducers/languageReducer";
import { getThemePalette } from "../reducers/appThemeReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../reducers/dialogConfirmReducer";

import Sun from "../img/sun.svg";
import Moon from "../img/moon.svg";
import Aeronaut from "../img/aeronaut.svg";
import Map from "../img/map.svg";

function MainPage(props) {
    const { setAppTheme, appTheme, language,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction
    } = props;
    const classes = Styles();
    const handleChangeTheme = () => {
        if (appTheme.palette.type === "light") {
            setAppTheme({
                palette: {
                    type: "dark",
                    primary: { main: "#bdbdbd" },
                    secondary: { main: "#f50057" },
                    error: { main: "#cc0000" }
                }
            });
        }
        else {
            setAppTheme({
                palette: {
                    type: "light",
                    primary: { main: "#424242" },
                    secondary: { main: "#f50057" },
                    error: { main: "#cc0000" }
                }
            });
        }
    };

    const handleClickDreams = () => {
        history.push(historyPath.Dreams);
    };

    const handleClickAddDream = () => {
        history.push(historyPath.AddDream);
    };

    const handleClickTechnics = () => {
        history.push(historyPath.Technics);
    };

    const handleLogout = () => {
        openDialogConfirm({
            title: dict[language].buttons.LogOut,
            message: dict[language].texts.LogOut,
            action: "log_out"
        });
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean" && dialogConfirmData.action === "log_out") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                removeToken();
            }
        }
    }, [dialogConfirmAction, resetDialogConfirm, dialogConfirmData]);

    return (
        <div className={classes.root}>
            <Container className={classes.MainPageContainer}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="flex-end"
                        >
                            <Grid item>
                                <ButtonBase className={clsx(classes.MedImg, classes.BackgroundImg, appTheme.palette.type === "light" ? classes.InvertOut : classes.InvertIn)}
                                    style={{
                                        backgroundImage: `url(${Aeronaut})`,
                                        filter: appTheme.palette.type === "dark" ? "invert(1)" : "invert(0)"
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <div style={{ position: "relative" }}>
                                    <ButtonBase className={clsx(classes.BigImg, classes.BackgroundImg, appTheme.palette.type === "light" ? classes.FadeIn : classes.FadeOut)}
                                        style={{
                                            backgroundImage: `url(${Sun})`,
                                            opacity: "0"
                                        }}
                                        onClick={handleChangeTheme}
                                    />
                                    <ButtonBase className={clsx(classes.BigImg, classes.BackgroundImg, appTheme.palette.type === "dark" ? classes.FadeIn : classes.FadeOut)}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            backgroundImage: `url(${Moon})`,
                                            filter: "invert(1)"
                                        }}
                                        onClick={handleChangeTheme}
                                    />
                                </div>
                            </Grid>
                            <Grid item>
                                <ButtonBase className={clsx(classes.MedImg, classes.BackgroundImg, appTheme.palette.type === "light" ? classes.InvertOut : classes.InvertIn)}
                                    style={{
                                        backgroundImage: `url(${Map})`,
                                        filter: appTheme.palette.type === "dark" ? "invert(1)" : "invert(0)"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.marginTop8}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)} fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickDreams}>
                                    {dict[language].buttons.MyDreams}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)} fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickAddDream}>
                                    {dict[language].buttons.AddDream}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)} fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickTechnics}>
                                    {dict[language].buttons.Technics}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)} fullWidth size="medium" variant="outlined" color="primary" onClick={handleLogout}>
                                    {dict[language].buttons.LogOut}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

MainPage.propTypes = {
    language: PropTypes.string.isRequired,
    appTheme: PropTypes.object.isRequired,
    setAppTheme: PropTypes.func.isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setAppTheme: setAppTheme,
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);