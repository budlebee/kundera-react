import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const cookies = new Cookies();

const initialState = {
  loading: false,
  error: null,
  myId: cookies.get("user-id"),
  myNickname: "",
  myProfile: "",
  accessToken: null,
  tempLoveId: "",
  hasNoti: false,
};

const SAVE_LOVE_ID_FOR_GUEST = "user/SAVE_LOVE_ID_FOR_GUEST";
export const saveLoveIdForGuest = (id) => {
  return { type: SAVE_LOVE_ID_FOR_GUEST, tempLoveId: id };
};

const CHANGE_NICKNAME = "user/CHANGE_NICKNAME";
export const changeNickname = (nickname) => {
  return { type: CHANGE_NICKNAME, nickname };
};

const CHANGE_PROFILE = "user/CHANGE_PROFILE";
export const changeProfile = (profile) => {
  return { type: CHANGE_PROFILE, profile };
};

const SIGNUP_TRY = "user/SIGNUP_TRY";
const SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS";
const SIGNUP_FAIL = "user/SIGNUP_FAIL";
export const signUp = (email, nickname, pwd, tempLove) => async (dispatch) => {
  dispatch({ type: SIGNUP_TRY, loading: true });
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/signup`,
      data: { email: email, nickname: nickname, pwd: pwd, tempLove: tempLove },
      withCredentials: true,
    });

    window.localStorage.removeItem("tempLove");

    if (cookies.get("user-id")) {
      cookies.remove("user-id", { path: "/" });
    }
    if (res.data.userId) {
      cookies.set("user-id", res.data.userId, {
        path: "/",
        maxAge: 3600 * 24 * 3,
        domain: ".kundera.so",
      });
    }
    if (res.data.hasNoti) {
      window.localStorage.setItem("has-noti", res.data.hasNoti);
    }
    dispatch({
      type: SIGNUP_SUCCESS,
      //accessToken: res.data.token,
      userId: res.data.userId,
      nickname: res.data.nickname,
      profile: res.data.profile,
      hasNoti: res.data.hasNoti,
      loading: false,
    });
  } catch (e) {
    dispatch({ type: SIGNUP_FAIL, error: e, loading: false });
    Swal.fire(e.response.data.message);
  }
};

const LOG_IN_TRY = "user/LOG_IN_TRY";
const LOG_IN_SUCCESS = "user/LOG_IN_SUCCESS";
const LOG_IN_FAIL = "user/LOG_IN_FAIL";
export const login = (email, pwd) => async (dispatch) => {
  dispatch({ type: LOG_IN_TRY, loading: true });
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/login`,
      data: { email: `${email}`, pwd: `${pwd}` },
      withCredentials: true,
    });
    if (res.data) {
      if (cookies.get("user-id")) {
        cookies.remove("user-id", { path: "/" });
      }
      if (res.data.userId) {
        cookies.set("user-id", res.data.userId, {
          path: "/",
          maxAge: 3600 * 24 * 3,
          domain: ".kundera.so",
        });
      }
      if (res.data.hasNoti) {
        window.localStorage.setItem("has-noti", res.data.hasNoti);
      }

      dispatch({
        type: LOG_IN_SUCCESS,
        //accessToken: res.data.token,
        userId: res.data.userId,
        nickname: res.data.nickname,
        profile: res.data.profile,
        hasNoti: res.data.hasNoti,
        loading: false,
      });
    } else {
      throw "login failure";
    }
  } catch (e) {
    dispatch({ type: LOG_IN_FAIL, error: e, loading: false });
    Swal.fire(e.response.data.message);
  }
};

const LOG_OUT = "user/LOG_OUT";
export const logout = () => async (dispatch) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/logout`,
    withCredentials: true,
  });
  console.log("localStorage set logout!");
  window.localStorage.setItem("logout", Date.now());

  cookies.remove("user-id", { path: "/" });
  dispatch({ type: LOG_OUT });
};

const REFRESH_TOKEN_TRY = "user/REFRESH_TOKEN_TRY";
const REFRESH_TOKEN_SUCCESS = "user/REFRESH_TOKEN_SUCCESS";
const REFRESH_TOKEN_FAIL = "user/REFRESH_TOKEN_FAIL";
export const refreshToken = (accessToken) => async (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_TRY });
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/silent-refresh`,
      data: {},
      withCredentials: true,
    });

    if (res.data.userId) {
      cookies.set("user-id", res.data.userId, {
        path: "/",
        maxAge: 3600 * 24 * 3,
      });
    } else {
      cookies.remove("user-id", { path: "/" });
      throw "로그인이 필요해요";
    }
    if (res.data.hasNoti) {
      window.localStorage.setItem("has-noti", res.data.hasNoti);
    }
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      //accessToken: res.data.token,
      userId: res.data.userId,
      nickname: res.data.myNickname,
      profile: res.data.myProfile,
      hasNoti: res.data.hasNoti,
    });
  } catch (e) {
    dispatch({ type: REFRESH_TOKEN_FAIL });
  }
};

const CHECK_NOTI = "user/CHECK_NOTI";
export const CheckNoti = () => {
  return { type: CHECK_NOTI };
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case CHECK_NOTI:
      return { ...state, hasNoti: false };
    case CHANGE_NICKNAME:
      return { ...state, myNickname: action.nickname };
    case CHANGE_PROFILE:
      return { ...state, myProfile: action.profile };
    case LOG_IN_TRY:
      return {
        ...state,
        loading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        //accessToken: action.accessToken,
        hasNoti: action.hasNoti,
        myId: action.userId,
        myNickname: action.nickname,
        myProfile: action.profile,
        loading: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REFRESH_TOKEN_TRY:
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        // accessToken: action.accessToken,
        myId: action.userId,
        myNickname: action.nickname,
        myProfile: action.profile,
        loading: false,
      };
    case REFRESH_TOKEN_FAIL:
      return { ...state, loading: false, myId: null, hasNoti: false };

    case SIGNUP_TRY:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        //  accessToken: action.accessToken,
        myId: action.userId,
        hasNoti: action.hasNoti,
        myNickname: action.nickname,
        myProfile: action.profile,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        accessToken: null,
        myId: null,
        myNickname: null,
      };
    case SAVE_LOVE_ID_FOR_GUEST:
      return {
        ...state,
        tempLoveId: action.tempLoveId,
      };
    default:
      return { ...state };
  }
}
