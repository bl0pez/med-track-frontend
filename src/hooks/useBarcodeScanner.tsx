import { useEffect } from "react";

export const useBarcodeScanner = (onScan: (barcode: string) => void) => {
  useEffect(() => {
    let buffer = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (buffer) {
          onScan(buffer);
        }
        buffer = "";
      } else {
        buffer += event.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onScan]);
};
