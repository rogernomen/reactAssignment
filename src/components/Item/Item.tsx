import {memo} from "react";

export const Item = memo(({url}) => {
    console.log("Console to check, just 5 new elements have been rendered");
    return (
        <img src={url} width={200} height={200}/>
    )
})