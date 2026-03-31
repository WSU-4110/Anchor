import ErrorDisplay from "@/components/error-display";
import { useGetAllBusinesses } from "@/convex/queries";
import { Loader2 } from "lucide-react-native";
import { View } from "react-native";
import { useState } from "react";
import SearchTab from "./search";
export default function SearchBarContainer(){
    
const { data, isLoading, isError, error } = useGetAllBusinesses();
const [open, setOnOpen] = useState<boolean>(false);
if (isLoading){
    return(
        <View>
            <Loader2 className="animate-spin"/>
        </View>
    )
}

if (isError){
    <View>
        <ErrorDisplay
        onClose={open}
        errorMessage={String(error)}
        setOnClose={setOnOpen}
        />
    </View>
}
return(
    <>
        {data && (
            <SearchTab
            data={data}
            />
        )}
   
    </>
)
}