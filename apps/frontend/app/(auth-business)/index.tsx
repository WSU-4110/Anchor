import { useState } from "react";
import SetUp from "./set-up";
import { TView } from "@/components/themedComponents/themed-view";

export default function Page(){
   const [businessName, setBusinessName] = useState("");
  return(
    <TView className="flex-1">
      <SetUp
        businessName={businessName}
        setBusinessName={setBusinessName}
      />
    </TView>
  )
}
