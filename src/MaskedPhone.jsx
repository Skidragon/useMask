import React, { useEffect, useReducer, useRef, useState } from "react";

export const MaskedPhone = () => {
  const valueRef = useRef("");
  const [value, setValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  useEffect(() => {
    if (value.length < 7) {
      setActualValue(() => value);
    } else if (value.length >= 7) {
      const prevValue = valueRef.current;

      if (prevValue.length > value.length) {
        setActualValue((prevActual) =>
          prevActual.slice(0, prevActual.length - 1)
        );
      } else if (value[value.length - 1] !== "*") {
        setActualValue((prevActual) => prevActual + value[value.length - 1]);
        setValue(() => value.slice(0, 6) + "*".repeat(value.length - 6));
      }
      valueRef.current = value;
    }
  }, [value]);
  return (
    <>
      {JSON.stringify(
        {
          actualValue
        },
        undefined,
        3
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};
const useMask = (start = 0, end = 0, maskChar = "*") => {
  const valueRef = useRef("");
  const [maskedValue, setMaskedValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  useEffect(() => {
    if (maskedValue.length < start && maskedValue.length > end) {
      setActualValue(() => maskedValue);
    } else {
      const prevValue = valueRef.current;

      if (prevValue.length > maskedValue.length) {
        setActualValue((prevActual) =>
          prevActual.slice(0, prevActual.length - 1)
        );
      } else if (maskedValue[maskedValue.length - 1] !== "*") {
        setActualValue(
          (prevActual) => prevActual + maskedValue[maskedValue.length - 1]
        );
        setMaskedValue(
          () =>
            maskedValue.slice(start, end) + "*".repeat(maskedValue.length - 6)
        );
      }
      valueRef.current = maskedValue;
    }
  }, [maskedValue, start, end, maskChar]);

  return { actualValue, setValue: setMaskedValue };
};
