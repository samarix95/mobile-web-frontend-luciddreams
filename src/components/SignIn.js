import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";
import { userSignIn } from "../functions/fetch";
import { getAuthPending } from "../reducers/authReducer";
import { getThemePalette } from "../reducers/appThemeReducer";
import { getLanguage } from "../reducers/languageReducer";

function SignIn(props) {
    const { appTheme, language, authPending, signIn } = props;
    const classes = Styles();
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        signIn({ login: login, password: password, language: language })
    };

    const handleBack = () => {
        history.push(historyPath.Sign);
    };

    return (
        <div className={classes.root}>
            <Paper className={`${classes.paper}`}>
                <Grid spacing={1}
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item className={`${classes.margin1}`}>
                        <TextField
                            className={classes.input}
                            onBlur={handleChangeLogin}
                            type="email"
                            id="input-login"
                            label={dict[language].texts.Email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={`${classes.margin1}`}>
                        <TextField
                            className={classes.input}
                            onBlur={handleChangePassword}
                            type="password"
                            id="input-password"
                            label={dict[language].texts.Password}
                            variant="outlined"
                        />
                    </Grid>
                    {authPending
                        ? <Grid item className={`${classes.margin1}`}>
                            <LinearProgress />
                        </Grid>
                        : <React.Fragment>
                            <Grid item className={`${classes.margin1}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)}
                                    fullWidth size="small" onClick={handleSignIn} variant="outlined" color="primary"
                                >
                                    {dict[language].buttons.SignIn}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.margin1}`}>
                                <Button className={clsx(appTheme.palette.type === "dark" ? classes.DarkBackgroundColor : classes.LightBackgroundColor)}
                                    fullWidth size="small" onClick={handleBack} variant="outlined" color="primary"
                                >
                                    {dict[language].buttons.Back}
                                </Button>
                            </Grid>
                        </React.Fragment>
                    }
                </Grid>
            </Paper>
        </div >
    );
}

SignIn.propTypes = {
    appTheme: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    authPending: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store),
        language: getLanguage(store),
        authPending: getAuthPending(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signIn: userSignIn,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);