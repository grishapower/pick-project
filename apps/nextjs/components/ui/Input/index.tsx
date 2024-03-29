"use client";

import cn from "classnames";
import { useState } from "react";
import { SearchIcon } from "~/images/icons";
import { Text } from "../Text";

type Props = {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  wrapperClassName?: string;
  showIcon?: boolean;
  pattern?: RegExp;
  errorText?: string;
  validCb?: (val: boolean) => void; //TODO: refactor it use lib for form
};

export const Input = ({
  onChange,
  value,
  placeholder,
  wrapperClassName,
  showIcon,
  pattern,
  errorText,
  validCb,
}: Props) => {
  const [isValid, setIsValid] = useState(true);

  return (
    <div className={cn("relative", wrapperClassName)}>
      <input
        className={cn(
          "border-darkGrey placeholder-darkGrey::placeholder h-12 w-full rounded-lg border bg-black px-4 text-base",
          {
            "border-red": !isValid,
          },
        )}
        value={value}
        onChange={(e) => {
          if (pattern) {
            setIsValid(pattern.test(e.target.value));
            validCb?.(pattern.test(e.target.value));
          }
          onChange(e.target.value);
        }}
        placeholder={placeholder || ""}
      />
      {showIcon ? <SearchIcon className="absolute right-4 top-4" /> : null}
      {!isValid ? <Text className="text-red text-sm">{errorText}</Text> : null}
    </div>
  );
};
