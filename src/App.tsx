import type { ReactElement } from 'react'
import {List} from "./components/List";
import {InfiniteScroll} from "./components/InfiniteScroll";
import {useCallback, useEffect, useState} from "react";
import {useFetch} from "use-http";
import {Spinner} from "./components/Spinner";
import {Item} from "./models/Item";

const ENDPOINT_CONFIG = {
	BASE_URL: 'https://picsum.photos/v2',
	GET_URL: '/list',
	LIMIT: 5
}

export default function App(): ReactElement {
	const [page, setPage] = useState(1);
	const [items, setItems] = useState<Item[]>([]);
	const { get, loading} = useFetch(ENDPOINT_CONFIG.BASE_URL);

	useEffect(() => { loadData(page) }, []);

	async function loadData(page: number) {
		const data = await get<Item[]>(`/${ENDPOINT_CONFIG.GET_URL}?page=${page}&limit=5`);
		setItems((prevItems) => [...prevItems, ...data]);
	}

	const triggerFetch = useCallback (() => {
		setPage((prevPage) => {
			const nextPage = prevPage + 1;
			loadData(nextPage);
			return nextPage
		})
	}, [])

	return (
		<div>
			<List items={items} />
			<InfiniteScroll triggerFetch={triggerFetch} isLoading={loading} spinner={<Spinner />}/>
		</div>
	)
}
