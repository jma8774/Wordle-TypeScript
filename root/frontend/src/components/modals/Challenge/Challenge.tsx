import React, { useEffect, useRef, useState } from "react";
import useCloseOnClickOutside from "../../../hooks/useCloseOnClickOutside";
import {
  resetModals,
  showWordleLinkCopied,
} from "../../../redux/features/setting/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CopyIcon, ExclamationIcon, SearchIcon } from "../../icons";
import classNames from "classnames";
import { Trie } from "../../../utils/trie";
import { Suggestion } from "./Suggestion";

interface Props {
  answers: string[];
}

const Challenge = ({ answers }: Props) => {
  const dispatch = useAppDispatch();
  const showChallenge = useAppSelector((state) => state.setting.showChallenge);
  // Form
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const answersTrie = useRef(Trie());
  const inputRef = useRef<HTMLInputElement>(null);

  // Close the modal when the user clicks outside of it
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(modalRef, () => dispatch(resetModals()));

  // Convert answers array into a Trie for faster look up
  useEffect(() => {
    answersTrie.current = Trie();
    answers.forEach((answer) => answersTrie.current.insert(answer));
  }, [answers]);

  // Reset form on hide and focus input on show
  useEffect(() => {
    if (!showChallenge) {
      setValue("");
      setError(false);
      setSuggestions([]);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChallenge]);

  // Copy the wordle link if the word is valid
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault();
    const word = value.toLowerCase();
    if (answersTrie.current.has(word)) {
      try {
        await navigator.clipboard.writeText(
          `${window.location.host}/Wordle-TypeScript/?word=${window.btoa(word)}`
        );
        dispatch(showWordleLinkCopied());
      } catch (e) {
        // Theoretically, this should never happen because my page will force HTTPS but just in case
        alert("HTTPS connection required to copy link. (https://www...)");
      }
    }
  };

  // Handle set value (which will propogate changes to suggestions/error)
  const handleSetValue = (word: string) => {
    setValue(word);
    setSuggestions(answersTrie.current.getSuggestions(word));
    setError(!answersTrie.current.has(word));
    if (inputRef.current) inputRef.current.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetValue(e.target.value);
  };

  if (!showChallenge) return null;

  return (
    <div className="absolute bg-transparent w-screen h-screen z-10">
      <div
        className="flex flex-col items-center gap-2 bg-slate-800 text-slate-200 shadow-lg max-w-sm sm:max-w-md mx-auto mt-28 rounded animate-search"
        ref={modalRef}
      >
        <form
          className={classNames(
            "flex items-center gap-3 h-16 w-full p-4 mx-auto border-b",
            suggestions.length ? "border-slate-700" : "border-transparent"
          )}
          onSubmit={handleSubmit}
        >
          <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6 fill-slate-400 cursor-default shrink-0" />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            ref={inputRef}
            className="placeholder:text-slate-400 bg-transparent w-full h-full outline-none"
            placeholder="Share a five letter Wordle challenge"
          />
          {error ? (
            <ExclamationIcon
              className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-500 shrink-0 cursor-default"
              altText="Invalid Word"
            />
          ) : (
            <CopyIcon
              onClick={() => handleSubmit(null)}
              className="h-5 w-5 sm:h-6 sm:w-6 fill-slate-300 shrink-0 transition-all duration-500 hover:scale-125"
              altText="Copy Challenge Link"
            />
          )}
        </form>
        <Suggestion suggestions={suggestions} handleSetValue={handleSetValue} />
      </div>
    </div>
  );
};

export default React.memo(Challenge);
