import { BlackBellIcon, RedRingingBellIcon } from "../components/Icons";

export const Nav = () => {
  return (
    <header
      style={{
        position: "fixed",
        top: "0px",
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>kundera 로고</div>{" "}
      <button
        style={{
          border: "none",
          padding: "8px",
          backgroundColor: "transparent",
        }}
      >
        <BlackBellIcon width="30px" height="30px" />
      </button>
    </header>
  );
};
