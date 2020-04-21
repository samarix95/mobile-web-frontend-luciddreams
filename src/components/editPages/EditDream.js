import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import MUIRichTextEditor from "mui-rte";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";
import moment from "moment";
import { convertToRaw } from 'draft-js';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Rating from "@material-ui/lab/Rating";

import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HomeIcon from "@material-ui/icons/Home";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { setOpenDialogConfirm, setResetDialogConfirm, setOpenSnackbar } from "../../actions/actions";
import { fetchTags, fetchTechnics, fetchUpdatePost } from "../../functions/fetch";
import { getLanguage } from "../../reducers/languageReducer";
import { getAuthData } from "../../reducers/authReducer";
import { getTagsPending, getTagsData } from "../../reducers/tagsReducer";
import { getTechnicsPending, getTechnicsData } from "../../reducers/technicsReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";
import { getUpdatePostPending } from "../../reducers/updatePostReducer";
import { getUserPostsData } from "../../reducers/userPostsReducer";
import StyledBreadcrumb from "../StyledBreadcrumb";

const localeMap = {
    en: enLocale,
    ru: ruLocale
};

const localeCancelLabelMap = {
    en: "cancel",
    ru: "отмена"
};

function EditDream(props) {
    const { language, authData, userPostsData,
        tagsPending, tagsData, fetchTags,
        technicsPending, technicsData, fetchTechnics,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction,
        updatePost, updatePostPending,
        openSnackbar } = props;
    const { id } = props.location.defaultData;
    const classes = Styles();

    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(moment());
    const [oldContent, setOldContent] = React.useState();
    const [content, setContent] = React.useState();
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLucidDream, setIsLucidDream] = React.useState(false);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [selectedTechnics, setSelectedTechnics] = React.useState([]);
    const [realisticsValue, setRealisticsValue] = React.useState(1);

    const handleChangeTags = (event, value) => {
        setSelectedTags(value);
    };

    const handleChangeTechnics = (event, value) => {
        setSelectedTechnics(value);
    };

    const hadleSetIsVisible = (event) => {
        setIsVisible(event.target.checked);
    };

    const changeContent = (state) => {
        const currCont = state.getCurrentContent();
        const convert = convertToRaw(currCont);
        const newContent = JSON.stringify(convert);
        if (content !== newContent) {
            setOldContent(newContent);
        }
    };

    const hadleSetIsLucidDream = (event) => {
        setIsLucidDream(event.target.checked);
        if (event.target.checked)
            fetchTechnics();
    };

    const handleChangeRealistics = (event, newValue) => {
        setRealisticsValue(newValue);
    };

    const handleBackMainPage = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.MainPage
        });
    };

    const handleBackDreams = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.Dreams
        });
    };

    const handleBackReadDream = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelEditing,
            message: dict[language].texts.DataWillLost,
            path: historyPath.ReadDream,
            id: id
        });
    };

    const handleSaveDream = () => {
        if (oldContent) {
            const convert = JSON.parse(oldContent);
            if (convert.blocks[0].text.length > 0) {
                const dreamContent = JSON.stringify(convert);
                updatePost({
                    title: title,
                    content: dreamContent,
                    rating: realisticsValue,
                    post_type: isLucidDream ? 1 : 0,
                    dream_date: moment.utc(date),
                    is_public: isVisible ? 1 : 0,
                    tags: selectedTags,
                    technics: selectedTechnics,
                    language: language,
                    id: id,
                    create_user: authData.id
                });
            }
            else {
                openSnackbar({ variant: "error", message: dict[language].errors.EMPTY_DREAM });
            }
        }
        else {
            openSnackbar({ variant: "error", message: dict[language].errors.EMPTY_DREAM });
        }
    };

    React.useEffect(() => {
        let defaultTags = [];
        userPostsData.find(item => (item.id === id))[`posts_tags`].map(item => defaultTags.push(item.tag));
        setSelectedTags(defaultTags);

        let defaultTechnics = [];
        userPostsData.find(item => (item.id === id))[`posts_technics`].map(item => defaultTechnics.push(item.technic));
        setSelectedTechnics(defaultTechnics);

        fetchTags();
        fetchTechnics();
        setTitle(userPostsData.find(item => (item.id === id))[`title`]);
        setDate(userPostsData.find(item => (item.id === id))[`dream_date`]);
        setContent(userPostsData.find(item => (item.id === id))[`content`]);
        setOldContent(userPostsData.find(item => (item.id === id))[`content`]);
        setIsVisible(userPostsData.find(item => (item.id === id))[`is_public`] === 0 ? false : true);
        setIsLucidDream(userPostsData.find(item => (item.id === id))[`post_type`] === 0 ? false : true);
        setRealisticsValue(userPostsData.find(item => (item.id === id))[`rating`]);
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
    }, [id, userPostsData, dialogConfirmAction, dialogConfirmData, fetchTags, fetchTechnics, resetDialogConfirm]);

    return (
        <div className={classes.root}>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBackMainPage} />
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.MyDreams} onClick={handleBackDreams} />
                    <StyledBreadcrumb component="a" color="primary" label={`${dict[language].texts.Dream}: ${userPostsData.find(item => (item.id === id))[`title`]}`} onClick={handleBackReadDream} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].texts.Editing} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Grid container
                    direction="column"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item>
                        <Grid container spacing={1}>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                            <Grid item xs={12} sm={7} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <InputBase fullWidth
                                        spellCheck={true}
                                        placeholder={dict[language].texts.Title}
                                        value={title}
                                        inputProps={{ "aria-label": "dream-title" }}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={5} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language]} >
                                        <KeyboardDateTimePicker className={classes.fullWidth}
                                            animateYearScrolling
                                            disableToolbar
                                            ampm={false}
                                            value={date}
                                            onChange={setDate}
                                            format="dd.MM.yyyy HH:mm"
                                            cancelLabel={localeCancelLabelMap[language]}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Paper>
                            </Grid>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                            <Grid item xs={12} md={8}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <MUIRichTextEditor
                                        value={content}
                                        label={dict[language].texts.Dream}
                                        onChange={changeContent}
                                        controls={[
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strikethrough",
                                            "colorfill"
                                        ]}
                                        customControls={[{
                                            name: "colorfill",
                                            icon: <FormatColorFillIcon />,
                                            type: "inline",
                                            inlineStyle: {
                                                backgroundColor: "yellow",
                                                color: "black"
                                            }
                                        }]}
                                        draftEditorProps={{
                                            spellCheck: true,
                                            autoCorrect: "on"
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                            <Grid item xs={12} sm={7} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`}>
                                    {Object.keys(tagsData).length > 0
                                        ? <Autocomplete id="tags"
                                            size="small"
                                            multiple
                                            filterSelectedOptions
                                            options={tagsData}
                                            getOptionLabel={option => option[`name_${language}`]}
                                            renderOption={option => (
                                                <Chip size="small"
                                                    avatar={<Avatar src={option.img_url} />}
                                                    label={option.name_ru} />
                                            )}
                                            getOptionSelected={(option, value) => option.id === value.id}
                                            defaultValue={
                                                userPostsData.find(item => (item.id === id))[`posts_tags`]
                                                    .map(item => tagsData.find(tag => (tag.id === item.tag.id)))
                                            }
                                            onChange={(event, value) => handleChangeTags(event, value)}
                                            renderInput={params => (
                                                <TextField {...params}
                                                    label={dict[language].texts.Locations}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        : tagsPending
                                            ? <LinearProgress />
                                            : <div>Нет лока</div>
                                    }
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={5} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`}>
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Tooltip disableFocusListener
                                                disableTouchListener
                                                title={isVisible ? dict[language].texts.UsersCanRead : dict[language].texts.UsersCantRead}
                                            >
                                                <Checkbox
                                                    checked={isVisible}
                                                    onChange={hadleSetIsVisible}
                                                    icon={<VisibilityOffIcon />}
                                                    checkedIcon={<VisibilityIcon />}
                                                    color="primary"
                                                />
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                label={dict[language].texts.LucidDream}
                                                labelPlacement="start"
                                                control={
                                                    <Checkbox
                                                        checked={isLucidDream}
                                                        onChange={hadleSetIsLucidDream}
                                                        color="primary"
                                                    />
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Collapse in={isLucidDream} timeout="auto" unmountOnExit >
                            <Grid container spacing={1}>
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={2} />
                                </Hidden>
                                <Grid item xs={12} sm={7} md={4}>
                                    <Paper className={`${classes.margin1} ${classes.padding1}`}>
                                        {Object.keys(technicsData).length > 0
                                            ? <Autocomplete id="technics"
                                                size="small"
                                                multiple
                                                filterSelectedOptions
                                                options={technicsData}
                                                getOptionLabel={option => option[`name_${language}`]}
                                                renderOption={option => (
                                                    <Chip size="small" label={option[`name_${language}`]} />
                                                )}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                defaultValue={
                                                    userPostsData.find(item => (item.id === id))[`posts_technics`]
                                                        .map(item => technicsData.find(technic => (technic.id === item.technic.id)))
                                                }
                                                onChange={(event, value) => handleChangeTechnics(event, value)}
                                                renderInput={params => (
                                                    <TextField {...params}
                                                        label={dict[language].texts.Technics}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                            : technicsPending
                                                ? <LinearProgress />
                                                : <div>Нет лока</div>
                                        }
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={5} md={4}>
                                    <Paper className={`${classes.margin1} ${classes.padding1}`}>
                                        <Grid container
                                            direction="column"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Grid item xs={12}>
                                                <Typography variant="body2">
                                                    {dict[language].texts.Realistic}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Rating name="simple-controlled"
                                                    value={realisticsValue}
                                                    onChange={handleChangeRealistics}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={2} />
                                </Hidden>
                            </Grid>
                        </Collapse>
                    </Grid>
                    <Grid item>
                        <Container className={`${classes.margin2}`}>
                            <Grid container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={3} />
                                </Hidden>
                                {!updatePostPending
                                    ? <React.Fragment>
                                        <Grid item xs={6} md={3}>
                                            <Grid container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Button size="small" variant="outlined" color="primary" onClick={handleBackReadDream}>
                                                        {dict[language].buttons.Cancel}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Grid container
                                                direction="row"
                                                justify="flex-end"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Button size="small" variant="outlined" color="primary" onClick={handleSaveDream}>
                                                        {dict[language].buttons.Save}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    : <Grid item xs={12} md={6}>
                                        <LinearProgress />
                                    </Grid>
                                }
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={3} />
                                </Hidden>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

EditDream.propTypes = {
    language: PropTypes.string.isRequired,
    authData: PropTypes.object.isRequired,
    tagsPending: PropTypes.bool.isRequired,
    tagsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchTags: PropTypes.func.isRequired,
    technicsPending: PropTypes.bool.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    fetchTechnics: PropTypes.func.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    updatePostPending: PropTypes.bool.isRequired,
    userPostsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        authData: getAuthData(store),
        tagsPending: getTagsPending(store),
        tagsData: getTagsData(store),
        technicsPending: getTechnicsPending(store),
        technicsData: getTechnicsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store),
        updatePostPending: getUpdatePostPending(store),
        userPostsData: getUserPostsData(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchTags: fetchTags,
    fetchTechnics: fetchTechnics,
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    updatePost: fetchUpdatePost,
    openSnackbar: setOpenSnackbar
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDream);