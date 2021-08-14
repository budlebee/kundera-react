import { colors } from "../lib/style";

export const ThreeDots = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="#999999"
      viewBox="0 0 24 24"
      stroke="#999999"
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  );
};

export const HeartEmptyIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={colors.softViolet}
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export const HeartFilledIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={colors.softViolet}
      viewBox="0 0 24 24"
      stroke={colors.softViolet}
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export const CommentIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
};

export const UserIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
};

export const QuestionCircle = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#555555"
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const SquarePlusIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-plus"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
};

export const RippleIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-ripple"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" />
      <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" />
      <path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
    </svg>
  );
};

export const BookmarkIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      width={width || "44"}
      height={height || "44"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};

export const BookmarkFilledIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      width={width || "44"}
      height={height || "44"}
      fill={colors.softViolet}
      viewBox="0 0 24 24"
      stroke={colors.softViolet}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};

export const SettingIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#555555"
      width={width || "44"}
      height={height || "44"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export const BlackBellIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bell"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
};

export const RedRingingBellIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-bell-ringing"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#f00061"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
      <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
      <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
    </svg>
  );
};

export const RedFireIcon = ({ width, height }) => {
  return (
    <svg
      version="1.1"
      id="svg2"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      stroke="#f00061"
      fill="#f00061"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 1200 1200"
      enableBackground="new 0 0 1200 1200"
    >
      <path
        id="path8046"
        d="M381.64,1200C135.779,1061.434,71.049,930.278,108.057,751.148
	c27.321-132.271,116.782-239.886,125.36-371.903c38.215,69.544,54.183,119.691,58.453,192.364
	C413.413,422.695,493.731,216.546,498.487,0c0,0,316.575,186.01,337.348,466.98c27.253-57.913,40.972-149.892,13.719-209.504
	c81.757,59.615,560.293,588.838-64.818,942.524c117.527-228.838,30.32-537.611-173.739-680.218
	c13.628,61.319-10.265,290.021-100.542,390.515c25.014-167.916-23.8-238.918-23.8-238.918s-16.754,94.054-81.758,189.065
	C345.537,947.206,304.407,1039.291,381.64,1200L381.64,1200z"
      />
    </svg>
  );
};

export const ArrowRight = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      width={width || "44"}
      height={height || "44"}
      fill="none"
      viewBox="0 0 24 24"
      //stroke="currentColor"
      stroke="#555555"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
};

export const ArrowLeft = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      width={width || "44"}
      height={height || "44"}
      fill="none"
      viewBox="0 0 24 24"
      //stroke="currentColor"
      stroke="#555555"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
  );
};

export const SearchIcon = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export const InstaIcon = ({ width, height }) => {
  return (
    <svg
      width={width || "44"}
      height={height || "44"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.46494 1.066C8.63828 1.01222 9.01228 1 12 1C14.9883 1 15.3617 1.01283 16.5344 1.066C17.7059 1.11917 18.5059 1.30556 19.2056 1.5775C19.9395 1.85381 20.6043 2.28674 21.1538 2.84617C21.7133 3.3956 22.1463 4.06046 22.4225 4.79439C22.6944 5.49411 22.8802 6.29406 22.934 7.46494C22.9878 8.63828 23 9.01228 23 12C23 14.9877 22.9872 15.3617 22.934 16.5351C22.8808 17.7059 22.6944 18.5059 22.4225 19.2056C22.1414 19.9286 21.7649 20.5427 21.1538 21.1538C20.6044 21.7133 19.9395 22.1463 19.2056 22.4225C18.5059 22.6944 17.7059 22.8802 16.5351 22.934C15.3617 22.9878 14.9877 23 12 23C9.01228 23 8.63828 22.9872 7.46494 22.934C6.29406 22.8808 5.49411 22.6944 4.79439 22.4225C4.07144 22.1414 3.45728 21.7649 2.84617 21.1538C2.28664 20.6044 1.85368 19.9395 1.5775 19.2056C1.30556 18.5059 1.11978 17.7059 1.066 16.5351C1.01222 15.3617 1 14.9883 1 12C1 9.01167 1.01283 8.63828 1.066 7.46556C1.11917 6.29406 1.30556 5.49411 1.5775 4.79439C1.85381 4.06051 2.28674 3.39568 2.84617 2.84617C3.39559 2.28664 4.06045 1.85368 4.79439 1.5775C5.49411 1.30556 6.29406 1.11978 7.46494 1.066ZM16.4452 3.046C15.2853 2.99344 14.937 2.98183 12 2.98183C9.063 2.98183 8.71467 2.99344 7.55478 3.046C6.48228 3.09489 5.89989 3.27394 5.51244 3.42489C4.99911 3.62411 4.63244 3.86244 4.24744 4.24744C3.86306 4.63244 3.62411 4.99911 3.42489 5.51244C3.27394 5.89989 3.09489 6.48228 3.046 7.55478C2.99344 8.71467 2.98183 9.063 2.98183 12C2.98183 14.937 2.99344 15.2853 3.046 16.4452C3.09489 17.5177 3.27394 18.1001 3.42489 18.4876C3.60111 18.9654 3.88219 19.3976 4.24744 19.7526C4.60234 20.1178 5.03461 20.3989 5.51244 20.5751C5.89989 20.7261 6.48228 20.9051 7.55478 20.954C8.71467 21.0066 9.06239 21.0182 12 21.0182C14.9376 21.0182 15.2853 21.0066 16.4452 20.954C17.5177 20.9051 18.1001 20.7261 18.4876 20.5751C19.0009 20.3759 19.3676 20.1376 19.7526 19.7526C20.1178 19.3977 20.3989 18.9654 20.5751 18.4876C20.7261 18.1001 20.9051 17.5177 20.954 16.4452C21.0066 15.2853 21.0182 14.937 21.0182 12C21.0182 9.063 21.0066 8.71467 20.954 7.55478C20.9051 6.48228 20.7261 5.89989 20.5751 5.51244C20.3759 4.99911 20.1376 4.63244 19.7526 4.24744C19.3676 3.86306 19.0009 3.62411 18.4876 3.42489C18.1001 3.27394 17.5177 3.09489 16.4452 3.046ZM10.5955 15.3909C11.0408 15.5754 11.518 15.6703 12 15.6703C12.9735 15.6703 13.907 15.2836 14.5953 14.5953C15.2837 13.907 15.6704 12.9734 15.6704 12C15.6704 11.0266 15.2837 10.093 14.5953 9.40468C13.907 8.71636 12.9735 8.32966 12 8.32966C11.518 8.32966 11.0408 8.4246 10.5955 8.60905C10.1501 8.7935 9.74553 9.06385 9.40471 9.40468C9.06389 9.7455 8.79353 10.1501 8.60908 10.5954C8.42463 11.0407 8.3297 11.518 8.3297 12C8.3297 12.482 8.42463 12.9593 8.60908 13.4046C8.79353 13.8499 9.06389 14.2545 9.40471 14.5953C9.74553 14.9361 10.1501 15.2065 10.5955 15.3909ZM8.00205 8.00201C9.06238 6.94168 10.5005 6.34599 12 6.34599C13.4996 6.34599 14.9377 6.94168 15.998 8.00201C17.0583 9.06234 17.654 10.5005 17.654 12C17.654 13.4995 17.0583 14.9376 15.998 15.998C14.9377 17.0583 13.4996 17.654 12 17.654C10.5005 17.654 9.06238 17.0583 8.00205 15.998C6.94172 14.9376 6.34603 13.4995 6.34603 12C6.34603 10.5005 6.94172 9.06234 8.00205 8.00201ZM18.9077 7.18838C19.1583 6.93773 19.2991 6.59779 19.2991 6.24333C19.2991 5.88886 19.1583 5.54892 18.9077 5.29828C18.657 5.04764 18.3171 4.90683 17.9626 4.90683C17.6082 4.90683 17.2682 5.04764 17.0176 5.29828C16.7669 5.54892 16.6261 5.88886 16.6261 6.24333C16.6261 6.59779 16.7669 6.93773 17.0176 7.18838C17.2682 7.43902 17.6082 7.57983 17.9626 7.57983C18.3171 7.57983 18.657 7.43902 18.9077 7.18838Z"
        fill="black"
      />
    </svg>
  );
};
