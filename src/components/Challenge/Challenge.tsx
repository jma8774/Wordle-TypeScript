import React, { useEffect, useRef, useState } from "react";
import useCloseOnClickOutside from "../../hooks/useCloseOnClickOutside";
import {
  resetModals,
  showWordleLinkCopied,
} from "../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CopyIcon, ExclamationIcon, SearchIcon } from "../icons";
import classNames from "classnames";

interface Props {
  answers: string[];
}

const Challenge = ({ answers }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [answerSet, setAnswerSet] = useState(new Set(answers));
  const { showChallenge } = useAppSelector((state) => state.setting);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close the modal when the user clicks outside of it
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(modalRef, () => dispatch(resetModals()));

  // Convert answers array into a set for faster look up
  useEffect(() => {
    setAnswerSet(new Set(answers));
  }, [answers]);

  // Reset form and everything on hide
  useEffect(() => {
    if (!showChallenge) {
      setValue("");
      setError(false);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChallenge]);

  // Copy the wordle link if the word is valid
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault();
    const word = value.toLowerCase();
    if (answerSet.has(word)) {
      navigator.clipboard.writeText(
        `${window.location.host}/?word=${window.btoa(word.toLowerCase())}`
      );
      dispatch(showWordleLinkCopied());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const word = e.target.value.toLowerCase();
    setError(!answerSet.has(word));
  };

  if (!showChallenge) return null;

  const searchClass = classNames(
    "flex items-center gap-2 bg-slate-800 max-w-md h-16 p-4 mx-auto my-28 rounded shadow-lg text-slate-200 animate-search"
  );
  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <form onSubmit={handleSubmit}>
        <div className={searchClass} ref={modalRef}>
          <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6 fill-slate-400 cursor-default shrink-0" />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            ref={inputRef}
            className="placeholder:text-slate-400 bg-transparent w-full h-full outline-none"
            placeholder="Send a wordle challenge to a friend"
          />
          {error ? (
            <ExclamationIcon
              className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-500 shrink-0 cursor-default"
              altText="Invalid word"
            />
          ) : (
            <CopyIcon
              onClick={() => handleSubmit(null)}
              className="h-5 w-5 sm:h-6 sm:w-6 fill-slate-300 shrink-0 transition-all duration-500 hover:scale-125"
              altText="Copy Challenge Link"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default React.memo(Challenge);
