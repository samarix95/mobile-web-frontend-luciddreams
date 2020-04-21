import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Skeleton from "@material-ui/lab/Skeleton";

import HomeIcon from "@material-ui/icons/Home";

import history from "../history";
import historyPath from "../historyPath";
import Styles from "../styles";
import dict from "../dictionary";

import { fetchTechnics } from "../functions/fetch";
import { getLanguage } from "../reducers/languageReducer";
import { getTechnicsPending, getTechnicsData } from "../reducers/technicsReducer";

import CardTechnic from "./multiple/CardTechnic";
import StyledBreadcrumb from "./StyledBreadcrumb";

function Technics(props) {
    const { language, fetchTechnics, technicsPending, technicsData } = props;
    const classes = Styles();

    React.useEffect(() => {
        fetchTechnics();
    }, [fetchTechnics]);

    const handleBack = () => {
        history.push(historyPath.MainPage);
    };

    return (
        <div className={classes.root}>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBack} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].buttons.Technics} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Grid container alignItems="stretch" justify="center" spacing={1}>
                    {technicsData.length
                        ? technicsData.map((item, key) => <CardTechnic key={key} card_id={item.id} />)
                        : technicsPending
                            ? <React.Fragment>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Skeleton animation="wave" variant="rect" className={`${classes.skeletonCard} ${classes.margin1}`} />
                                </Grid>
                            </React.Fragment>
                            : <React.Fragment />
                    }
                </Grid>
            </Container>
        </div>
    );
}

Technics.propTypes = {
    language: PropTypes.string.isRequired,
    technicsPending: PropTypes.bool.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchTechnics: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        technicsPending: getTechnicsPending(store),
        technicsData: getTechnicsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchTechnics: fetchTechnics
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Technics);