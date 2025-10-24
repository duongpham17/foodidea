import { data } from "@data/business";
import type { Metadata } from "next";

interface Props {
    title: string, 
    description?: string
}

export function metadata({title, description}: Props): Metadata {
  return {
    title: `${data.special} | ${title}`,
    description: description ?? "uknown page",
  };
};