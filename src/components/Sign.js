import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";
import { getLanguage } from "../reducers/languageReducer";

function Sign(props) {
    const { language } = props;
    const classes = Styles();

    const handleSignIn = () => {
        history.push(historyPath.SignIn);
    };

    const handleSignUp = () => {
        history.push(historyPath.SignUp);
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Grid item className={`${classes.padding2}`}>
                    <Typography className={`${classes.margin2}`}
                        component="div"
                        variant="h6"
                        align="center"
                        paragraph={true}
                    >
                        {dict[language].texts.SignPageText1}
                    </Typography>
                    <Typography className={`${classes.margin2}`}
                        component="div"
                        variant="subtitle2"
                        align="center"
                        paragraph={true}
                    >
                        {dict[language].texts.SignPageText2}
                    </Typography>
                    <Typography className={`${classes.margin2}`}
                        component="div"
                        variant="h6"
                        align="center"
                        paragraph={true}
                    >
                        {dict[language].texts.SignPageText3}
                    </Typography>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Grid spacing={1}
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Grid item className={`${classes.margin1}`}>
                                <Button fullWidth size="small" onClick={handleSignIn} variant="outlined" color="primary">
                                    {dict[language].buttons.SignIn}
                                </Button>
                            </Grid>
                            <Grid item className={`${classes.margin1}`}>
                                <Button fullWidth size="small" onClick={handleSignUp} variant="outlined" color="primary">
                                    {dict[language].buttons.SignUp}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

Sign.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store)
    }
};

export default connect(
    mapStateToProps,
    null
)(Sign);