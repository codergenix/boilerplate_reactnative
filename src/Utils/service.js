import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginexpire = () => {
    let currentday = moment().format('YYYY-MM-DD');
    let logintime = AsyncStorage.getItem('ReactNativeloginTime');
    if (moment(logintime).isBefore(currentday)) {
        logout();
    }
    return true;
}
const getlogin = () => {
    if (AsyncStorage.ReactNativeisLogin) {
        loginexpire();
    }
    return AsyncStorage.getItem('ReactNativeisLogin');
}
const getUserid = () => {
    return AsyncStorage.getItem('ReactNativeuserId');
}
const getUserData = () => {
    let getdata = AsyncStorage.getItem('ReactNativeuserData');
    if (getdata) {
        return JSON.parse(getdata);
    }
}

const logout = async () => {
    //await AsyncStorage.clear();
    await AsyncStorage.setItem('ReactNativeloginTime', '');
    await AsyncStorage.setItem('ReactNativeisLogin', '');
    await AsyncStorage.setItem('ReactNativestatus', 'logout');
    await AsyncStorage.setItem('ReactNativetoken', '');
    await AsyncStorage.setItem('ReactNativeuserData', '');
    await AsyncStorage.setItem('ReactNativeuserId', '');
    await window.location.reload(false);
    return true;
}

const htmltoText = (htmlsting) => {
    if (htmlsting)
        return <span dangerouslySetInnerHTML={{ __html: `${htmlsting.replace(/<[^>]+>/g, '')}` }}></span>;
}
const texttohtml = (htmlsting) => {
    if (htmlsting)
        return <div dangerouslySetInnerHTML={{ __html: `${htmlsting}` }}></div>;
}

const Service = { getUserid, getlogin, logout, getUserData, htmltoText, texttohtml };
export default Service;