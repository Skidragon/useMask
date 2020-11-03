import React, { useEffect, useRef, useState } from "react";

export const MaskedPhone = () => {
  const { actualValue, maskedValue, setValue } = useMask(7);
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
        value={maskedValue}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};

const useMask = (start = 7, maskChar = "*") => {
  const valueRef = useRef("");
  const [maskedValue, setMaskedValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  useEffect(() => {
    if (maskedValue.length < start) {
      setActualValue(() => maskedValue);
    } else {
      const prevValue = valueRef.current;

      if (prevValue.length > maskedValue.length) {
        setActualValue((prevActual) =>
          prevActual.slice(0, prevActual.length - 1)
        );
      } else if (maskedValue[maskedValue.length - 1] !== maskChar) {
        setActualValue(
          (prevActual) => prevActual + maskedValue[maskedValue.length - 1]
        );
        setMaskedValue(
          () =>
            maskedValue.slice(0, start) +
            maskChar.repeat(maskedValue.length - start)
        );
      }
      valueRef.current = maskedValue;
    }
  }, [maskedValue, start, maskChar]);

  return { actualValue, maskedValue, setValue: setMaskedValue };
};
