import { useEffect, useState } from "react";
// import Logo from "../Logo";
import user from "../../assets/lanre.png";
import adinLogo from "../../assets/adin-logo.svg";
import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import "./NavBar.css";

export default function NavBarQuiz() {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  return (
    <nav className="quiz-navbar">
      <div className="quiz-navbar-logo">
        {/* <Logo width={200} imageUrl={adinLogo} imageAlt="Adin University Logo" /> */}
        <img src={adinLogo} alt="adin" />
      </div>

      <div className="quiz-navbar-countdown">
        <span>Time Remaining:</span>
        <span className="time-remaining">
          00:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="icons ">
        <span className="icon other-icons">
          <IoChatbubbleEllipsesOutline size={20} color="#6E917E" />
          <span className="chat">2</span>
        </span>

        <span className="icon split-icons other-icons">
          <IoNotificationsOutline size={20} color="#6E917E" />
          <span className="notifications"></span>
        </span>

        <span className="user icon">
          <img src={user} alt="user-image" className="user-image" />
        </span>

        <span>
          <span className="user-name">Olanrewaju O.</span>
          <p className="user-info">
            <span>Web development | </span>
            <span>300lvl</span>
          </p>
        </span>
      </div>
    </nav>
  );
}
