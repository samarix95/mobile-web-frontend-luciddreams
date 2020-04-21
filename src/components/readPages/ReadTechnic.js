import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import HomeIcon from "@material-ui/icons/Home";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { getLanguage } from "../../reducers/languageReducer";
import { getTechnicsData } from "../../reducers/technicsReducer";
import StyledBreadcrumb from "../StyledBreadcrumb";

function ReadTechnic(props) {
    const { language, technicsData } = props;
    const { id } = props.location.defaultData;
    const classes = Styles();

    const handleBackMainPage = () => {
        history.push(historyPath.MainPage);
    };

    const handleBackTechnics = () => {
        history.push(historyPath.Technics);
    };

    const handleEditTechnic = () => {
        history.push({
            pathname: historyPath.EditTechnic,
            defaultData: {
                id: id
            }
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBackMainPage} />
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Technics} onClick={handleBackTechnics} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={technicsData.find(item => (item.id === id))[`name_${language}`]} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Typography variant="h6" align="center" paragraph={true}>
                    {technicsData.find(item => (item.id === id))[`name_${language}`]}
                </Typography>
                <Typography variant="body1" align="justify">
                    {technicsData.find(item => (item.id === id))[`description_${language}`]}
                </Typography>
            </Container>
            <Container className={`${classes.margin2}`}>
                <Divider />
            </Container>
            <Container className={`${classes.margin2}`}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button size="small" variant="outlined" color="primary" onClick={handleBackTechnics}>
                                    {dict[language].buttons.Back}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button size="small" variant="outlined" color="primary" onClick={handleEditTechnic}>
                                    {dict[language].buttons.Edit}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

ReadTechnic.propTypes = {
    language: PropTypes.string.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        technicsData: getTechnicsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadTechnic);