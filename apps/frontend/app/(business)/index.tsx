import { testClerkApi } from "@/api/helperFuncs";
import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";

export default function HomeScreen() {
  const { getToken } = useAuth();
  const [data, setData] = useState<string>("");

  return (
    <TView className="flex-1 items-center justify-center">
      <TText type="default">This is the business home screen</TText>
      <TButton
        type="secondary"
        onPress={() => {
          getToken().then((tok)=>{
            if(tok){
              testClerkApi(tok).then((res)=>{
                setData(res);
              })
            }
          })
        }}
      >
        <TText type="secondary">Test Clerk api</TText>
      </TButton>
      <TView>{data && <TText>{data}</TText>}</TView>
    </TView>
  );
}
