import React from "react";

export interface AutoCompletionProps {
    theme: "light" | "dark";
    snippets: {
        name: string,
        definition: string,
    }[];
    source: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes {
    theme?: "light" | "dark";
    preference: "primary" | "secondary";
    text: string;
}