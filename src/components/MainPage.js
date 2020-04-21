import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";

import { setAppTheme } from "../actions/actions";
import { removeToken } from "../functions/auth";
import { getLanguage } from "../reducers/languageReducer";
import { getThemePalette } from "../reducers/appThemeReducer";

import Sun from "../img/sun.svg";
import Moon from "../img/moon.svg";

function MainPage(props) {
    const { setAppTheme, appTheme, language } = props;
    const classes = Styles();
    const [currentThemeIcon, setCurrenThemeIcon] = React.useState(Sun);

    const handleChangeTheme = () => {
        if (currentThemeIcon === Sun) {
            setCurrenThemeIcon(Moon)
            setAppTheme({
                pallete: {
                    type: "dark",
                    primary: {
                        main: "#ffffff"
                    },
                    secondary: {
                        main: "#f50057"
                    },
                    error: {
                        main: "#cc0000"
                    }
                }
            });
        }
        else {
            setCurrenThemeIcon(Sun)
            setAppTheme({
                pallete: {
                    type: "light",
                    primary: {
                        main: "#ffffff"
                    },
                    secondary: {
                        main: "#f50057"
                    },
                    error: {
                        main: "#cc0000"
                    }
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
        removeToken();
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>
                        <ButtonBase
                            className={`${classes.SunImg}`}
                            style={{ backgroundImage: `url(${currentThemeIcon})` }}
                            onClick={handleChangeTheme}
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickDreams}>
                                    {dict[language].buttons.MyDreams}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickAddDream}>
                                    {dict[language].buttons.AddDream}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button fullWidth size="medium" variant="outlined" color="primary" onClick={handleClickTechnics}>
                                    {dict[language].buttons.Technics}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.MenuButtons}`}>
                                <Button fullWidth size="medium" variant="outlined" color="primary" onClick={handleLogout}>
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
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setAppTheme: setAppTheme
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);