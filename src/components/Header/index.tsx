import React from "react";
import ButtonWrapper from "../buttons/ButtonWrapper";
import StatIcon from "../icons/StatIcon";
import SettingIcon from "../icons/SettingIcon";
import QuestionIcon from "../icons/QuestionIcon";

const handleStatClick = () => {
  console.log("Stat icon clicked");
  alert("Stat icon clicked");
};

const handleQuestionClick = () => {
  console.log("Setting icon clicked");
  alert("Setting icon clicked");
};

const Header = () => {
  console.log("Log: render header");
  return (
    <div className="flex justify-center items-center p-5 text-center font-sans text-4xl text-slate-200 font-extrabold gap-10">
      <ButtonWrapper onClick={handleStatClick}>
        <StatIcon className="h-8 w-8 stroke-green-400 fill-green-400 hover:fill-green-600 hover:stroke-green-600" />
      </ButtonWrapper>

      <span>Just Wordle</span>

      {/* <ButtonWrapper onClick={handleSettingClick}>
        <SettingIcon className="h-8 w-8 stroke-blue-400 fill-blue-400 hover:fill-blue-600 hover:stroke-blue-600" />
      </ButtonWrapper>       */}
      <ButtonWrapper onClick={handleQuestionClick}>
        <QuestionIcon className="h-8 w-8 stroke-blue-400 fill-blue-400 hover:fill-blue-600 hover:stroke-blue-600" />
      </ButtonWrapper>
    </div>
  );
};

export default React.memo(Header);
