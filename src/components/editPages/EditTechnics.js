import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import HomeIcon from "@material-ui/icons/Home";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { setOpenDialogConfirm, setResetDialogConfirm } from "../../actions/actions";
import { getLanguage } from "../../reducers/languageReducer";
import { getTechnicsPending, getTechnicsData } from "../../reducers/technicsReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";
import StyledBreadcrumb from "../StyledBreadcrumb";
import { fetchUpdateTechnics } from "../../functions/fetch";

function EditTechnic(props) {
    const { language, technicsPending, technicsData, updateTechnics, openDialogConfirm, dialogConfirmData, dialogConfirmAction, resetDialogConfirm } = props;
    const { id } = props.location.defaultData;
    const classes = Styles();

    const [title_ru, setTitle_ru] = React.useState(typeof props.location.defaultData !== "undefined" ? technicsData.find(item => (item.id === id))[`name_ru`] : "");
    const [title_en, setTitle_en] = React.useState(typeof props.location.defaultData !== "undefined" ? technicsData.find(item => (item.id === id))[`name_en`] : "");
    const [description_ru, setDescription_ru] = React.useState(typeof props.location.defaultData !== "undefined" ? technicsData.find(item => (item.id === id))[`description_ru`] : "");
    const [description_en, setDescription_en] = React.useState(typeof props.location.defaultData !== "undefined" ? technicsData.find(item => (item.id === id))[`description_en`] : "");

    const handleSetTitleRu = (event) => {
        if (event.target.value.search(/[a-zA-Z]/g) === -1) {
            setTitle_ru(event.target.value);
        }
    };

    const handleSetTitleEn = (event) => {
        if (event.target.value.search(/[а-яА-ЯёЁ]/g) === -1) {
            setTitle_en(event.target.value);
        }
    };

    const handleSetDescriptionRu = (event) => {
        if (event.target.value.search(/[a-zA-Z]/g) === -1) {
            setDescription_ru(event.target.value);
        }
    };

    const handleSetDescriptionEn = (event) => {
        if (event.target.value.search(/[а-яА-ЯёЁ]/g) === -1) {
            setDescription_en(event.target.value);
        }
    };

    const handleBackMainPage = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.MainPage
        });
    };

    const handleBackTechnics = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.Technics
        });
    };

    const handleBackReadTechnic = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.ReadTechnic,
            id: id
        });
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                history.push({
                    pathname: dialogConfirmData.path,
                    defaultData: {
                        id: dialogConfirmData.id
                    }
                });
            }
        }
    }, [dialogConfirmAction, resetDialogConfirm, dialogConfirmData]);

    const handleSaveTechnic = () => {
        updateTechnics({
            language: language,
            id: id,
            data: {
                name_ru: title_ru,
                name_en: title_en,
                description_ru: description_ru,
                description_en: description_en,
                published: true
            }
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" disabled={technicsPending} label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBackMainPage} />
                    <StyledBreadcrumb component="a" color="primary" disabled={technicsPending} label={dict[language].buttons.Technics} onClick={handleBackTechnics} />
                    <StyledBreadcrumb component="a" color="primary" disabled={technicsPending} label={technicsData.find(item => (item.id === id))[`name_${language}`]} onClick={handleBackReadTechnic} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].texts.Editing} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Typography align="center" variant="h6" className={`${classes.margin2}`}>
                    {dict[language].texts.Title}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="subtitle2" >
                            {dict[language].texts.Title + " (" + dict[language].texts.Ru + ")"}
                        </Typography>
                        <Paper className={`${classes.margin1} ${classes.padding1}`} >
                            <InputBase
                                fullWidth
                                spellCheck={true}
                                placeholder={dict[language].texts.Title + " (" + dict[language].texts.Ru + ")"}
                                value={title_ru}
                                inputProps={{ "aria-label": "technic-title-ru" }}
                                onChange={handleSetTitleRu}
                                pattern="[A-Za-z]"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="subtitle2" >
                            {dict[language].texts.Title + " (" + dict[language].texts.En + ")"}
                        </Typography>
                        <Paper className={`${classes.margin1} ${classes.padding1}`} >
                            <InputBase
                                fullWidth={true}
                                spellCheck={true}
                                placeholder={dict[language].texts.Title + " (" + dict[language].texts.En + ")"}
                                value={title_en}
                                inputProps={{ "aria-label": "technic-title-en" }}
                                onChange={handleSetTitleEn}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Typography align="center" variant="h6" className={`${classes.margin2}`}>
                    {dict[language].texts.Description}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="subtitle2" >
                            {dict[language].texts.Description + " (" + dict[language].texts.Ru + ")"}
                        </Typography>
                        <Paper className={`${classes.margin1} ${classes.padding1}`} >
                            <InputBase multiline
                                fullWidth={true}
                                spellCheck={true}
                                placeholder={dict[language].texts.Description + " (" + dict[language].texts.Ru + ")"}
                                value={description_ru}
                                inputProps={{ "aria-label": "technic-description-ru" }}
                                onChange={handleSetDescriptionRu}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="subtitle2" >
                            {dict[language].texts.Description + " (" + dict[language].texts.En + ")"}
                        </Typography>
                        <Paper className={`${classes.margin1} ${classes.padding1}`} >
                            <InputBase
                                multiline
                                fullWidth={true}
                                spellCheck={true}
                                placeholder={dict[language].texts.Description + " (" + dict[language].texts.En + ")"}
                                value={description_en}
                                inputProps={{ "aria-label": "technic-description-en" }}
                                onChange={handleSetDescriptionEn}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Container className={`${classes.margin2}`}>
                {technicsPending
                    ? <Grid item className={`${classes.margin1}`}>
                        <LinearProgress />
                    </Grid>
                    : <Grid container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button size="small" variant="outlined" color="primary" onClick={handleBackReadTechnic}>
                                        {dict[language].buttons.Cancel}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button size="small" variant="outlined" color="primary" onClick={handleSaveTechnic}>
                                        {dict[language].buttons.Save}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Container>
        </div>
    );
}

EditTechnic.propTypes = {
    language: PropTypes.string.isRequired,
    technicsPending: PropTypes.bool.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    updateTechnics: PropTypes.func.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        technicsPending: getTechnicsPending(store),
        technicsData: getTechnicsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateTechnics: fetchUpdateTechnics,
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTechnic);