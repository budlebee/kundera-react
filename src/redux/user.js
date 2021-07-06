import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  loading: false,
  error: null,
  myId: cookies.get("user-id"),
  myNickname: "",
  accessToken: "",
};

const SIGNUP_TRY = "user/SIGNUP_SUCCESS";
const SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS";
const SIGNUP_FAIL = "user/SIGNUP_FAIL";
export const signUp = (email, nickname, pwd) => async (dispatch) => {
  dispatch({ type: SIGNUP_TRY });
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/signup`,
      data: { email: email, nickname: nickname, pwd: pwd },
    });
    console.log(res.data);
    //const cookies = new Cookies();
    if (cookies.get("user-id")) {
      cookies.remove("user-id");
      cookies.set("user-id", res.data.userId, { maxAge: 3600 });
    } else {
      cookies.set("user-id", res.data.userId, { maxAge: 3600 });
    }
    console.log("회원가입 성공!");
    dispatch({
      type: SIGNUP_SUCCESS,
      accessToken: res.data.token,
      userId: res.data.userId,
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
      data: { email, pwd },
      //withCredentials: true,
    });
    if (res.data.result) {
      console.log(res.data);
      //const cookies = new Cookies();
      if (cookies.get("user-id")) {
        cookies.remove("user-id");
        cookies.set("user-id", res.data.userId, { maxAge: 3600 });
      } else {
        cookies.set("user-id", res.data.userId, { maxAge: 3600 });
      }
      //cookies.set("refresh_token", JSON.stringify({ id: res.data.userId }));
      console.log("로그인 성공!");
      dispatch({
        type: LOG_IN_SUCCESS,
        accessToken: res.data.token,
        userId: res.data.userId,
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

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_TRY:
      return {
        ...state,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        userId: action.userId,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
      };
    case SIGNUP_TRY:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        userId: action.userId,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
      };
    case LOG_OUT:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}
