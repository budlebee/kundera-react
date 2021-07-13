import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  loading: false,
  error: null,
  myId: cookies.get("user-id"),
  myNickname: "",
  accessToken: null,
  tempLoveId: "",
  hasNoti: false,
};

const SAVE_LOVE_ID_FOR_GUEST = "user/SAVE_LOVE_ID_FOR_GUEST";
export const saveLoveIdForGuest = (id) => {
  return { type: SAVE_LOVE_ID_FOR_GUEST, tempLoveId: id };
};

const SIGNUP_TRY = "user/SIGNUP_TRY";
const SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS";
const SIGNUP_FAIL = "user/SIGNUP_FAIL";
export const signUp = (email, nickname, pwd, tempLove) => async (dispatch) => {
  dispatch({ type: SIGNUP_TRY });
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/signup`,
      data: { email: email, nickname: nickname, pwd: pwd, tempLove: tempLove },
      withCredentials: true,
    });
    console.log(res.data);
    if (!res.data.result) {
      alert(res.data.message);
      throw "이미 가입한 상태임";
    }
    window.localStorage.removeItem("tempLove");

    if (cookies.get("user-id")) {
      cookies.remove("user-id", { path: "/" });
    }
    if (res.data.userId) {
      cookies.set("user-id", res.data.userId, {
        path: "/",
        maxAge: 3600 * 24 * 3,
      });
    }
    if (res.data.hasNoti) {
      window.localStorage.setItem("has-noti", res.data.hasNoti);
    }
    dispatch({
      type: SIGNUP_SUCCESS,
      //accessToken: res.data.token,
      userId: res.data.userId,
      hasNoti: res.data.hasNoti,
    });
  } catch (e) {
    dispatch({ type: SIGNUP_FAIL, error: e });
  }
};

const LOG_IN_TRY = "user/LOG_IN_TRY";
const LOG_IN_SUCCESS = "user/LOG_IN_SUCCESS";
const LOG_IN_FAIL = "user/LOG_IN_FAIL";
export const login = (email, pwd) => async (dispatch) => {
  dispatch({ type: LOG_IN_TRY });
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/login`,
      data: { email: `${email}`, pwd: `${pwd}` },
      withCredentials: true,
    });
    if (res.data) {
      console.log(res);
      if (cookies.get("user-id")) {
        cookies.remove("user-id", { path: "/" });
      }
      if (res.data.userId) {
        cookies.set("user-id", res.data.userId, {
          path: "/",
          maxAge: 3600 * 24 * 3,
        });
      }
      if (res.data.hasNoti) {
        window.localStorage.setItem("has-noti", res.data.hasNoti);
      }
      console.log("로그인 성공!");
      dispatch({
        type: LOG_IN_SUCCESS,
        //accessToken: res.data.token,
        userId: res.data.userId,
        hasNoti: res.data.hasNoti,
      });
    } else {
      console.log(res.data);
      console.log("로그인 실패!");
      throw "login failure";
    }
  } catch (e) {
    dispatch({ type: LOG_IN_FAIL, error: e });
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
    console.log(res.data);
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
      hasNoti: res.data.hasNoti,
    });
  } catch (e) {
    console.log("error: ", e);
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
    case LOG_IN_TRY:
      return {
        ...state,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        //accessToken: action.accessToken,
        myId: action.userId,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
      };
    case REFRESH_TOKEN_TRY:
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        // accessToken: action.accessToken,
        myId: action.userId,
        loading: false,
      };
    case REFRESH_TOKEN_FAIL:
      return { ...state, loading: false, myId: null, hasNoti: false };

    case SIGNUP_TRY:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        //  accessToken: action.accessToken,
        myId: action.userId,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
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
