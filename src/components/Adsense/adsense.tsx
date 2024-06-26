import { GoogleAdSense } from "nextjs-google-adsense";
import React from "react";
import { getEnvironment } from "@/scripts/Utils/Environment";

export function Adsense(): React.ReactNode {
  React.useEffect(() => {
    if (getEnvironment() === "development") {
      console.info("Google Adsense disabled during development");
    }
  }, []);

  return getEnvironment() === "development" ? (
    <></>
  ) : (
    <GoogleAdSense publisherId="pub-XXXXXXXXXXXXXXXX" />
  );
}

export default Adsense;
