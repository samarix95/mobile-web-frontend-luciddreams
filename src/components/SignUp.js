import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";
import { userSignUp } from "../functions/fetch";
import { getAuthPending } from "../reducers/authReducer";
import { getLanguage } from "../reducers/languageReducer";

function SignUp(props) {
    const { language, authPending, signUp } = props;
    const classes = Styles();
    const [login, setLogin] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    };

    const handleChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = () => {
        signUp({ login: login, password: password, nickname: nickname, language: language })
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
                            autoComplete="off"
                            type="email"
                            id="input-login"
                            label={dict[language].texts.Email}
                            variant="outlined"
                            onBlur={handleChangeLogin}
                        />
                    </Grid>
                    <Grid item className={`${classes.margin1}`}>
                        <TextField
                            className={classes.input}
                            autoComplete="off"
                            onBlur={handleChangeNickname}
                            type="text"
                            id="input-nickname"
                            label={dict[language].texts.Nickname}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item className={`${classes.margin1}`}>
                        <TextField
                            className={classes.input}
                            autoComplete="new-password"
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
                                <Button fullWidth size="small" onClick={handleSignUp} variant="outlined" color="primary">
                                    {dict[language].buttons.SignUp}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.margin1}`}>
                                <Button fullWidth size="small" onClick={handleBack} variant="outlined" color="primary">
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

SignUp.propTypes = {
    language: PropTypes.string.isRequired,
    authPending: PropTypes.bool.isRequired,
    signUp: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        authPending: getAuthPending(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signUp: userSignUp
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);