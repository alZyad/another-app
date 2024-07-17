export type JokeType = {
  error: boolean;
  category: string; // "Programming" | "Misc" | "Dark" | "Pun" | "Spooky" | "Christmas";
  type: string; // "single" | "twopart";
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string; // "en";
  internalError?: boolean;
  code?: number;
  message?: string;
  causedBy?: string[];
  additionalInfo?: string;
  timestamp?: number;
};

export type DataType = {
  error: boolean;
  amount: number;
  jokes: JokeType[];
  internalError?: boolean;
  code?: number;
  message?: string;
  causedBy?: string[];
  additionalInfo?: string;
  timestamp?: number;
};
