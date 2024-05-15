import { Dispatch, SetStateAction } from "react";

export interface EditButtonAndModalProps {
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
}
