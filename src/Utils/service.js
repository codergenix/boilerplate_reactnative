import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
//=======================
const loginexpire = async () => {
    const getitem = await AsyncStorage.getItem('ReactNativeloginTime');
    let pasgetitem = getitem != null ? getitem : null;
    let currentday = moment().format('YYYY-MM-DD');
    if (moment(pasgetitem).isBefore(currentday)) {
        logout();
    }
    return true;
}
const getlogin = async() => {
    const getitem = await AsyncStorage.getItem('ReactNativeisLogin');
    let pasgetitem = getitem != null ? getitem : null;
    if (pasgetitem) {
        loginexpire();
    }
    return pasgetitem;
}
const getUserid = async () => {
    let getitem = await AsyncStorage.getItem('ReactNativeuserId');
    let pasgetitem = getitem != null ? getitem : null;
    return pasgetitem
}
const getUserData = async () => {
    const getitem = await AsyncStorage.getItem('ReactNativeuserData');
    let pasgetitem = getitem != null ? JSON.parse(getitem) : null;
    return pasgetitem;
}
const logout = async () => {
    //await AsyncStorage.clear();
    await AsyncStorage.setItem('ReactNativeloginTime', '');
    await AsyncStorage.setItem('ReactNativeisLogin', '');
    await AsyncStorage.setItem('ReactNativestatus', 'logout');
    await AsyncStorage.setItem('ReactNativetoken', '');
    await AsyncStorage.setItem('ReactNativeuserData', '');
    await AsyncStorage.setItem('ReactNativeuserId', '');
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