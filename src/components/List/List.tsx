import {Item} from "../Item";
import {memo} from "react";

export const List = memo(({items}) => {
    return (
        <div>
            {items.map((item) => {
                return (<div key={item.id}>
                    <Item url={item.download_url} />
                </div>)
            })}
        </div>
    )
})