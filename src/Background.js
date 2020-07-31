import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getThemePalette } from "./reducers/appThemeReducer";
import clsx from "clsx";

import Styles from "./styles";

import Day from "./img/day0.svg";
import Night from "./img/night0.svg";
import Stars from "./img/stars.png";
import Twinkling from "./img/twinkling.png";

function Background(props) {
    const { appTheme } = props;
    const classes = Styles();

    const startTime = "19:00:00";
    const endTime = "21:00:00";
    const currentDate = new Date();

    let startDate = new Date(currentDate.getTime());
    let endDate = new Date(currentDate.getTime());

    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    const isSunSet = startDate < currentDate && currentDate < endDate;

    return (
        <React.Fragment>
            <div id="sunBackground" className={clsx(classes.Background, appTheme.palette.type === "dark" ? classes.hide : classes.visible)}
                style={isSunSet
                    ? {
                        background: "radial-gradient(circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)",
                        zIndex: -14,
                        opacity: 0.5
                    }
                    : {
                        background: "radial-gradient(circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%, rgba(201,165,132,0) 100%)",
                        zIndex: -14,
                        opacity: 0.5
                    }
                }
            />
            <div id="sun" className={clsx(classes.Background, appTheme.palette.type === "dark" ? classes.hide : classes.visible)}
                style={{
                    background: "radial-gradient(circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)",
                    zIndex: -13,
                    opacity: 0.5
                }}
            />
            <div className={clsx(classes.Background, appTheme.palette.type === "dark" ? classes.FadeIn : classes.FadeOut)}
                style={{
                    background: `#000 url(${Stars}) repeat top center`,
                    zIndex: -12
                }}
            />
            <div className={clsx(classes.Background, appTheme.palette.type === "dark" ? classes.AnimatedTwinkling : classes.hide)}
                style={{
                    background: `transparent url(${Twinkling}) repeat top left`,
                    backgroundSize: "20% 20%",
                    zIndex: -11
                }}
            />
            <div style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                height: "auto",
                zIndex: -10
            }}>
                <div className={clsx(classes.VeryBigImg, appTheme.palette.type === "light" ? classes.FadeIn : classes.FadeOut)}
                    style={{
                        position: "relative",
                        width: "100%",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundImage: `url(${Day})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                        opacity: 0
                    }}
                />
                <div className={clsx(classes.VeryBigImg, appTheme.palette.type === "dark" ? classes.FadeIn : classes.FadeOut)}
                    style={{
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundImage: `url(${Night})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                        filter: "invert(1)"
                    }}
                />
            </div>
        </React.Fragment>
    );
}

Background.propTypes = {
    appTheme: PropTypes.object.isRequired
}

const mapStateToProps = store => {
    return {
        appTheme: getThemePalette(store)
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Background);