import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FormControl from "@material-ui/core/FormControl";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SearchIcon from "@material-ui/icons/Search";

import StyledBreadcrumb from "../StyledBreadcrumb";
import ColourWheel from "../colourWheel/index"

import history from "../../history";
import Styles from "../../styles";
import dict from "../../dictionary";

import { fetchSearchIcon, fetchAddLocation } from "../../functions/fetch";
import { setOpenDialogConfirm, setResetDialogConfirm } from "../../actions/actions";
import { getLanguage } from "../../reducers/languageReducer";
import { getDialogConfirmData, getDialogConfirmAction } from "../../reducers/dialogConfirmReducer";
import { getSearchIconPending, getSearchIconData } from "../../reducers/searchIconReducer";
import { getAddLocationPending } from "../../reducers/addLocationReducer";

const radius = (window.innerWidth - 100) / 2 > 200 ? 200 : ((window.innerWidth - 100) / 2);

function AddLocation(props) {
    const { language,
        openDialogConfirm, resetDialogConfirm, dialogConfirmData, dialogConfirmAction,
        searchIconPending, searchIconData, fetchSearchIcon,
        addLocation, addLocationPending } = props;
    const { breadcrumbs, backPath } = props.location.defaultData;
    const classes = Styles();

    const [name_ru, setTitleRu] = React.useState("");
    const [name_en, setTitleEn] = React.useState("");
    const [searchName, setSearchName] = React.useState("");
    const [anchorElPopover, setAnchorElPopover] = React.useState(null);
    const [selectedIcon, setSelectedIcon] = React.useState("");
    const [openColorDialog, setOpenColorDialog] = React.useState(false);
    const [iconColor, setIconColor] = React.useState('#ffffff');

    const handleSetSearchName = (e) => {
        if (e.target.value.search(/[а-яА-ЯёЁ]/g) !== -1) {
            setAnchorElPopover(e.currentTarget);
            setSearchName(e.target.value.replace(/[а-яА-ЯёЁ]/g, ""));
        }
        else {
            handleClosePopover();
            setSearchName(e.target.value);
        }
    };

    const openPopover = Boolean(anchorElPopover);
    const idPopover = Boolean(anchorElPopover) ? "simple-popover" : undefined;

    const handleClosePopover = () => {
        setAnchorElPopover(null);
    };

    const searchIcon = () => {
        fetchSearchIcon({
            name: searchName.replace(/ /g, "%20"),
            language: language
        });
    };

    const handleSetSelectedIcon = (event) => {
        setSelectedIcon(event.target.value);
    }

    const hadnleOpenColorDialog = () => {
        setOpenColorDialog(true);
    };

    const handleCloseColorDialog = () => {
        setOpenColorDialog(false);
    };

    const setColor = (color) => {
        setIconColor(color);
        setOpenColorDialog(false);
    };

    const handleBack = (path) => {
        openDialogConfirm({
            title: dict[language].texts.CancelCreating,
            message: dict[language].texts.DataWillLost,
            path: path
        });
    };

    const handleSave = () => {
        addLocation({
            name_ru: name_ru,
            name_en: name_en,
            img_url: selectedIcon,
            color: iconColor,
            backPath: backPath,
            language: language
        });
    };

    React.useEffect(() => {
        if (typeof dialogConfirmAction === "boolean") {
            resetDialogConfirm();
            if (dialogConfirmAction) {
                history.push(dialogConfirmData.path);
            }
        }
    }, [dialogConfirmAction, resetDialogConfirm, dialogConfirmData]);

    return (
        <div className={classes.root}>
            <Dialog onClose={handleCloseColorDialog} open={openColorDialog} >
                <DialogContent className={classes.padding1}>
                    <ColourWheel
                        radius={radius}
                        padding={10}
                        lineWidth={30}
                        onCenterCircleClick={(hex) => setColor(hex)}
                        onRef={ref => (ColourWheel.ColourWheel = ref)}
                        spacers={{
                            colour: '#00000000',
                            shadowColour: 'grey',
                            shadowBlur: 5
                        }}
                        preset
                        presetColour={iconColor}
                        animated
                    />
                </DialogContent>
            </Dialog>
            <Paper className={`${classes.padding1} ${classes.stickyTop}`} >
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs.map((item, key) =>
                        <StyledBreadcrumb key={key} component="a" color="primary" label={item.backName} icon={item.icon} onClick={() => handleBack(item.urlBack)} />
                    )}
                    <StyledBreadcrumb component="a" color="primary" disabled={true} label={dict[language].buttons.AddLocation} />
                </Breadcrumbs>
            </Paper>
            <Container className={`${classes.margin2}`}>
                <Grid container
                    direction="column"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item >
                        <Grid container spacing={1}>
                            <Hidden only={["xs", "sm"]}>
                                <Grid item md={2} />
                            </Hidden>
                            <Grid item xs={12} sm={6} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <InputBase fullWidth
                                        spellCheck={true}
                                        placeholder={dict[language].texts.Title + " (" + dict[language].texts.Ru + ")"}
                                        value={name_ru}
                                        inputProps={{ "aria-label": "location-title-ru" }}
                                        onChange={e => setTitleRu(e.target.value)}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <InputBase fullWidth
                                        spellCheck={true}
                                        placeholder={dict[language].texts.Title + " (" + dict[language].texts.En + ")"}
                                        value={name_en}
                                        inputProps={{ "aria-label": "location-title-en" }}
                                        onChange={e => setTitleEn(e.target.value)}
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
                            <Grid item xs={12} sm={6} md={4} >
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={10}>
                                            <InputBase fullWidth
                                                spellCheck={true}
                                                disabled={searchIconPending}
                                                placeholder={dict[language].texts.FindIcon + " (" + dict[language].texts.En + ")"}
                                                value={searchName}
                                                inputProps={{ "aria-label": "icon-name" }}
                                                onChange={handleSetSearchName}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton className={classes.padding1}
                                                aria-label="search"
                                                spellCheck={true}
                                                disabled={searchName.length > 0 && !searchIconPending ? false : true}
                                                onClick={searchIcon}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Popover
                                        id={idPopover}
                                        open={openPopover}
                                        anchorEl={anchorElPopover}
                                        onClose={handleClosePopover}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Typography className={classes.padding1}>
                                            {dict[language].errors.ENGLISH_WORDS_ONLY}
                                        </Typography>
                                    </Popover>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Paper className={`${classes.margin1} ${classes.padding1}`} >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            {!searchIconPending
                                                ? <FormControl
                                                    variant="outlined"
                                                    disabled={Object.keys(searchIconData).length !== 0 ? false : true}
                                                >
                                                    <InputLabel id="select-icon">
                                                        {dict[language].texts.Icon}
                                                    </InputLabel>
                                                    <Select
                                                        labelId="select-icon"
                                                        style={{
                                                            minWidth: 100
                                                        }}
                                                        value={selectedIcon}
                                                        onChange={handleSetSelectedIcon}
                                                    >
                                                        {Object.keys(searchIconData).length > 0
                                                            ? searchIconData.map((item, key) => (
                                                                <MenuItem key={key} value={item} >
                                                                    <Avatar variant="rounded" style={{ backgroundColor: iconColor }} src={item} />
                                                                </MenuItem>
                                                            ))
                                                            : <MenuItem value={""} />
                                                        }
                                                    </Select>
                                                </FormControl>
                                                : <CircularProgress />
                                            }
                                        </Grid>
                                        <Grid item style={{ borderRadius: 4, backgroundColor: iconColor }}>
                                            <ButtonBase onClick={hadnleOpenColorDialog}>
                                                <Typography style={{ color: "black" }}>
                                                    {dict[language].texts.IconColor}
                                                </Typography>
                                            </ButtonBase>
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
                        <Container className={`${classes.margin2}`}>
                            <Grid container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={3} />
                                </Hidden>
                                {!addLocationPending
                                    ? <React.Fragment>
                                        <Grid item xs={6} md={3}>
                                            <Grid container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Button disabled={searchIconPending ? true : false} size="small" variant="outlined" color="primary" onClick={() => handleBack(backPath)}>
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
                                                    <Button disabled={searchIconPending ? true : false} size="small" variant="outlined" color="primary" onClick={handleSave}>
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

AddLocation.propTypes = {
    language: PropTypes.string.isRequired,
    searchIconPending: PropTypes.bool.isRequired,
    searchIconData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    fetchSearchIcon: PropTypes.func.isRequired,
    addLocation: PropTypes.func.isRequired,
    addLocationPending: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        language: getLanguage(store),
        dialogConfirmData: getDialogConfirmData(store),
        dialogConfirmAction: getDialogConfirmAction(store),
        searchIconPending: getSearchIconPending(store),
        searchIconData: getSearchIconData(store),
        addLocationPending: getAddLocationPending(store)
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openDialogConfirm: setOpenDialogConfirm,
    resetDialogConfirm: setResetDialogConfirm,
    fetchSearchIcon: fetchSearchIcon,
    addLocation: fetchAddLocation
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLocation);
