import { memo } from "react";

export const NumberInput: React.FC<{
  className?: string;
  value: string;
  onChange: (v: string) => void;
  // eslint-disable-next-line react/display-name
}> = memo(({ className, onChange, value }) => {
  const handleInput = (value: string) => {
    if (value === "" || RegExp(`^[0-9]*[.,]?[0-9]*$`).test(value)) {
      onChange(value);
    }
  };
  return (
    <input
      type="text"
      inputMode="decimal"
      pattern="^[0-9]*[.,]?[0-9]*$"
      autoComplete="off"
      autoCorrect="off"
      minLength={1}
      maxLength={79}
      spellCheck="false"
      placeholder="0.0"
      className={className}
      onChange={(e) => handleInput(e.target.value)}
      value={value}
    />
  );
});
