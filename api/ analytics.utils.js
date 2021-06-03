import {
    GoogleAnalyticsTracker
} from "react-native-google-analytics-bridge";

const tracker =  new GoogleAnalyticsTracker("G-60WYT46HBV")
tracker.trackScreenView("Home");

export const setAppName = (appName) => {
    tracker.setAppName(appName);
};
export const setAppVersion = (appVersion) => {
    tracker.setAppVersion(appVersion);
};
