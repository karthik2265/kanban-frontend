import { ThemeContext } from "@/context/ThemeContext";
import { ThemeOptions } from "@/types/styles";
import { useContext } from "react";

const CheckBoxIcon = ({ isChecked }: { isChecked: boolean }) => {
  const { currentTheme } = useContext(ThemeContext)!;
  const isLightTheme = currentTheme === ThemeOptions.Light;
  return (
    <>
      {isChecked && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="2" fill="#635FC7" />
          <path d="M4.27588 8.06593L7.03234 10.8224L12.0323 5.82239" stroke="white" strokeWidth="2" />
        </svg>
      )}
      {!isChecked &&
        (isLightTheme ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="2" fill="white" />
            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#828FA3" stroke-opacity="0.248914" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="2" fill="#2B2C37" />
            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#828FA3" stroke-opacity="0.248914" />
          </svg>
        ))}
    </>
  );
};

export default CheckBoxIcon;
