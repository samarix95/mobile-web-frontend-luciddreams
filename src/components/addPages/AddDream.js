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
import { convertToRaw, EditorState } from "draft-js";
import ReactAudioPlayer from "react-audio-player";
import MicRecorder from 'mic-recorder-to-mp3';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogActions from "@material-ui/core/DialogActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Radio from '@material-ui/core/Radio';
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Rating from "@material-ui/lab/Rating";

import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from "@material-ui/icons/Home";
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from "@material-ui/icons/Add";
import MicIcon from "@material-ui/icons/Mic";

import StyledBreadcrumb from "../StyledBreadcrumb";

import history from "../../history";
import historyPath from "../../historyPath";
import Styles from "../../styles";
import dict from "../../dictionary";

import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "../../functions/localStorage";
import { setOpenDialogConfirm, setResetDialogConfirm, setOpenSnackbar } from "../../actions/actions";
import { fetchTags, fetchTechnics, fetchAddPost, fetchSTT } from "../../functions/fetch";
import { getLanguage } from "../../reducers/languageReducer";
import { getTagsPending, getTagsData } from "../../reducers/tagsReducer";
import { getTechnicsPending, getTechnicsData } from "../../reducers/technicsReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";
import { getAddPostPending } from "../../reducers/addPostReducer";
import { getSTTPending } from "../../reducers/speechToTextReducer";

const localeMap = {
    en: enLocale,
    ru: ruLocale
};

const localeCancelLabelMap = {
    en: "cancel",
    ru: "отмена"
};

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function AddDream(props) {
    const { language,
        tagsPending, tagsData, fetchTags,
        technicsPending, technicsData, fetchTechnics,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction,
        addPost, addPostPending,
        openSnackbar,
        STT, STTPending } = props;
    const classes = Styles();
    const emptyContent = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(moment());
    const [content, setContent] = React.useState(emptyContent);
    const [oldContent, setOldContent] = React.useState(emptyContent);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [selectedTechnics, setSelectedTechnics] = React.useState([]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLucidDream, setIsLucidDream] = React.useState(false);
    const [realisticsValue, setRealisticsValue] = React.useState(1);

    const [openVoiceDialog, setOpenVoiceDialog] = React.useState(false);
    const [record, setRecord] = React.useState(false);
    const [insertType, setInsertType] = React.useState("replace");
    const [blobURL, setBlobURL] = React.useState(null);

    const handleBack = () => {
        openDialogConfirm({
            title: dict[language].texts.CancelCreating,
            message: dict[language].texts.DataWillLost,
            path: historyPath.MainPage
        });
    };

    const handleChangeTags = (event, value) => {
        setSelectedTags(value);
    };

    const handleChangeTechnics = (event, value) => {
        setSelectedTechnics(value);
    };

    const hadleSetIsVisible = (event) => {
        setIsVisible(event.target.checked);
    };

    const hadleSetIsLucidDream = (event) => {
        setIsLucidDream(event.target.checked);
        if (event.target.checked)
            fetchTechnics();
    };

    const handleChangeRealistics = (event, newValue) => {
        setRealisticsValue(newValue);
    };

    const openAddLocation = () => {
        let data = [
            { date: JSON.stringify(date) },
        ];
        if (title) data.push({ title: title })
        if (content) {
            const currCont = content.getCurrentContent();
            const convert = convertToRaw(currCont);
            if (convert.blocks[0].text.length > 0)
                data.push({ content: JSON.stringify(convert) });
        }
        saveToLocalStorage(data);
        history.push({
            pathname: historyPath.AddLocation,
            defaultData: {
                breadcrumbs: [
                    {
                        backName: dict[language].buttons.Main,
                        urlBack: historyPath.MainPage,
                        icon: <HomeIcon />
                    },
                    {
                        backName: dict[language].buttons.AddDream,
                        urlBack: historyPath.AddDream
                    }
                ],
                backPath: historyPath.AddDream
            }
        });
    };

    const handleSaveDream = () => {
        if (content) {
            const currCont = content.getCurrentContent();
            const convert = convertToRaw(currCont);
            if (convert.blocks[0].text.length > 0) {
                const dreamContent = JSON.stringify(convert);
                addPost({
                    title: title,
                    content: dreamContent,
                    rating: realisticsValue,
                    post_type: isLucidDream,
                    dream_date: date,
                    is_public: isVisible,
                    tags: selectedTags,
                    technics: selectedTechnics,
                    language: language
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

    const handleCloseVoiceDialog = () => {
        setOpenVoiceDialog(false);
        setRecord(false);
        setBlobURL(null);
    }

    const handleOpenVoiceDialog = () => {
        setOpenVoiceDialog(true);
        handleClearRecord();
        setInsertType("replace");
    }

    const handleClearRecord = () => {
        setRecord(false);
        setBlobURL(null);
    }

    const startRecording = () => {
        Mp3Recorder
            .start()
            .then(() => {
                setRecord(true);
            })
            .catch((e) => console.error(e));
    }

    const stopRecording = () => {
        setRecord(false);
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setBlobURL(URL.createObjectURL(blob));
            })
            .catch((e) => console.log(e));
    }

    const handleChangeInsertType = (event) => {
        setInsertType(event.target.value);
    }

    const blobToBase64 = function (blob, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };

    async function handleTranslateVoice() {
        await fetch(blobURL)
            .then(res =>
                res.blob()
                    .then(blobFile =>
                        blobToBase64(blobFile, function (base64) {
                            STT({ "blob": base64 })
                                .then(res => {
                                    if (typeof content === "string") {
                                        let jsonContent = JSON.parse(content);
                                        switch (insertType) {
                                            case "before":
                                                jsonContent.blocks[0].text = res.result + jsonContent.blocks[0].text;
                                                break;
                                            case "replace":
                                                if (jsonContent.blocks.length > 1)
                                                    jsonContent.blocks.splice(1, jsonContent.blocks.length - 1);
                                                jsonContent.blocks[0].text = res.result;
                                                break;
                                            case "after":
                                                jsonContent.blocks[jsonContent.blocks.length - 1].text = jsonContent.blocks[0].text + res.result;
                                                break;
                                            default:
                                                break;
                                        }
                                        const replacedText = JSON.stringify(jsonContent);
                                        setOldContent(replacedText);
                                        setContent(replacedText);
                                    }
                                    else {
                                        const currContent = content.getCurrentContent();
                                        let rawContent = convertToRaw(currContent);
                                        switch (insertType) {
                                            case "before":
                                                rawContent.blocks[0].text = res.result + rawContent.blocks[0].text;
                                                break;
                                            case "replace":
                                                if (rawContent.blocks.length > 1)
                                                    rawContent.blocks.splice(1, rawContent.blocks.length - 1);
                                                rawContent.blocks[0].text = res.result;
                                                break;
                                            case "after":
                                                rawContent.blocks[rawContent.blocks.length - 1].text = rawContent.blocks[0].text + res.result;
                                                break;
                                            default:
                                                break;
                                        }
                                        const replacedText = JSON.stringify(rawContent);
                                        setOldContent(replacedText);
                                        setContent(replacedText);
                                    }
                                    handleCloseVoiceDialog();
                                })
                        })
                    )
            )
    }

    React.useEffect(() => {
        const savedData = getFromLocalStorage(["title", "date", "content"]);
        if (savedData.length > 0) {
            savedData.forEach(element => {
                switch (Object.keys(element)[0]) {
                    case "title":
                        setTitle(Object.values(element)[0]);
                        break;
                    case "date":
                        setDate(JSON.parse(Object.values(element)[0]));
                        break;
                    case "content":
                        setOldContent(Object.values(element)[0]);
                        setContent(Object.values(element)[0]);
                        break;
                    default:
                        break;
                }
            });
        }

        fetchTags();
        if (typeof dialogConfirmAction === "boolean") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                removeFromLocalStorage(["title", "date", "content"])
                history.push(historyPath.MainPage);
            }
        }
    }, [fetchTags, dialogConfirmAction, resetDialogConfirm, dialogConfirmData]);

    return (
        <div className={classes.root}>

            <Dialog open={openVoiceDialog} aria-labelledby="simple-voice-dialog-title">

                <DialogTitle id="simple-voice-dialog-title">
                    {dict[language].texts.SpeechToText}
                </DialogTitle>

                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    {blobURL
                        ? <React.Fragment>
                            <Grid item>
                                <ReactAudioPlayer className={`${classes.fullWidth} ${classes.padding1}`}
                                    controls
                                    src={blobURL}
                                />
                            </Grid>
                            <Grid item
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                className={`${classes.padding2}`}
                            >
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            {dict[language].buttons.Insert}:
                                        </FormLabel>
                                        <RadioGroup aria-label="insert-type" name="radio-insert-type" value={insertType} onChange={handleChangeInsertType}>
                                            <FormControlLabel disabled={STTPending} value="before" control={<Radio color="primary" />} label={dict[language].texts.InsertBefore} />
                                            <FormControlLabel disabled={STTPending} value="replace" control={<Radio color="primary" />} label={dict[language].texts.InsertReplace} />
                                            <FormControlLabel disabled={STTPending} value="after" control={<Radio color="primary" />} label={dict[language].texts.InsertEnd} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleClearRecord} color="primary" disabled={STTPending}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton >
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        : <React.Fragment>
                            <Grid item>
                            </Grid>
                            <Grid item>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <IconButton onClick={startRecording} color="primary" disabled={record}>
                                            <MicIcon fontSize="large" />
                                        </IconButton >
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={stopRecording} color="primary" disabled={!record}>
                                            <StopIcon fontSize="large" />
                                        </IconButton >
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    }
                </Grid>
                <DialogActions>
                    <Button onClick={handleCloseVoiceDialog} color="primary" disabled={STTPending}>
                        {dict[language].buttons.Cancel}
                    </Button>
                    <Button onClick={handleTranslateVoice} color="primary" disabled={blobURL === null || STTPending}>
                        {dict[language].buttons.Translate}
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper className={`${classes.padding1} ${classes.stickyTop} ${classes.transprent02}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <StyledBreadcrumb component="a" color="primary" label={dict[language].buttons.Main} icon={<HomeIcon />} onClick={handleBack} />
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].buttons.AddDream} />
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
                                        value={oldContent}
                                        label={dict[language].texts.Dream}
                                        onChange={setContent}
                                        controls={[
                                            "bold",
                                            "colorfill",
                                            "voice"
                                        ]}
                                        customControls={[
                                            {
                                                name: "colorfill",
                                                icon: <FormatColorFillIcon />,
                                                type: "inline",
                                                inlineStyle: {
                                                    backgroundColor: "yellow",
                                                    color: "black"
                                                }
                                            },
                                            {
                                                name: "voice",
                                                icon: <MicIcon />,
                                                type: "callback",
                                                onClick: () => handleOpenVoiceDialog()
                                            }
                                        ]}
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
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item xs={10}>
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
                                                            label={option[`name_${language}`]} />
                                                    )}
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
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Grid container
                                                direction="column"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <IconButton size="small" onClick={openAddLocation}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
                                            ? <Autocomplete id="tags"
                                                size="small"
                                                multiple
                                                filterSelectedOptions
                                                options={technicsData}
                                                getOptionLabel={option => option[`name_${language}`]}
                                                renderOption={option => (
                                                    <Chip size="small" label={option[`name_${language}`]} />
                                                )}
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
                                <Hidden only="xs">
                                    <Grid item sm={2} md={3} />
                                </Hidden>
                                {!addPostPending
                                    ? <React.Fragment>
                                        <Grid item sm={4} md={3}>
                                            <Grid container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Button size="small" variant="outlined" color="primary" onClick={handleBack}>
                                                        {dict[language].buttons.Back}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={4} md={3}>
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
                                <Hidden only="xs">
                                    <Grid item sm={2} md={3} />
                                </Hidden>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

AddDream.propTypes = {
    language: PropTypes.string.isRequired,
    tagsPending: PropTypes.bool.isRequired,
    tagsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchTags: PropTypes.func.isRequired,
    technicsPending: PropTypes.bool.isRequired,
    technicsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dialogConfirmData: PropTypes.object.isRequired,
    fetchTechnics: PropTypes.func.isRequired,
    openDialogConfirm: PropTypes.func.isRequired,
    resetDialogConfirm: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    addPostPending: PropTypes.bool.isRequired,
    STT: PropTypes.func.isRequired,
    STTPending: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        tagsPending: getTagsPending(store),
        tagsData: getTagsData(store),
        technicsPending: getTechnicsPending(store),
        technicsData: getTechnicsData(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store),
        addPostPending: getAddPostPending(store),
        STTPending: getSTTPending(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchTags: fetchTags,
    fetchTechnics: fetchTechnics,
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    addPost: fetchAddPost,
    openSnackbar: setOpenSnackbar,
    STT: fetchSTT
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDream);