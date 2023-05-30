import {FC, ReactNode, useEffect} from "react";

interface InfiniteScrollProps {
    isLoading: boolean;
    triggerFetch: () => void;
    spinner: ReactNode;
    pxToEnd?: number;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = ({isLoading, triggerFetch, spinner, pxToEnd = 4}): JSX.Element => {
    const handleScroll = () => {
        const {scrollHeight, clientHeight, scrollTop} = document.documentElement;

        if (scrollTop + clientHeight > scrollHeight - pxToEnd && !isLoading) {
            triggerFetch();
        }
        return
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>{spinner}</div>
    )
}