interface CharColor {
  id: number;
  ch: string;
  color: string;
}

type Alphabet =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

interface AlphabetColor {
  [key: string]: "init" | "almost" | "never" | "success";
}

type Status = "ongoing" | "lose" | "win";

type Callback = () => void;

export type { CharColor, AlphabetColor, Status, Callback };
