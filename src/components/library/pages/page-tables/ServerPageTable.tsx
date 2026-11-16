'use client';

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Direct imports instead of barrel export
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import CustomTable from '../../components/table/CustomTable';
import Layout from '../../nav/Layout';
import Toast from '../../components/toast/Toast';
import Headers from '../../components/table/table-components/header/Headers';
import TableRowComponent from '../../components/table/table-components/row/TableRowComponent';
import { setFields, setPreferences } from '../../store/slices/tableSlice';
import { useGetAllQuery, useGetConfigQuery, useGetSelfQuery, useGetRouteQuery } from '../../store';
import Column from '../../containers/Column';
import ServerPageHeading from '../../components/table/ServerPageHeading';
import { Flex } from '@chakra-ui/react';
import { ServerTableObjectProps } from '../../types';

type TableProps = {
	table: ServerTableObjectProps;
	layoutPath?: string;
	children?: React.ReactNode;
};

// Define the PageTable component
const ServerPageTable: FC<TableProps> = ({ table, layoutPath, children }) => {
	const { page, limit, search, sort, filters, preferences, selectedItems }: any = useAppSelector(
		(state: any) => state.table
	);

	const [schema, setSchema] = useState<any>(null);
	const { data: schemaData, isFetching: schemaLoading } = useGetConfigQuery(table?.path);

	const dispatch = useAppDispatch();
	const [col, setCol] = useState<number>(5);
	const router = useRouter();

	useEffect(() => {
		if (schemaData) {
			const tableFields = schemaData?.table;
			const allowedFields = table?.fields || table?.preferences;
			const filteredTableFields = allowedFields
				? tableFields?.filter((item: any) =>
						allowedFields?.includes(item?.dataKey) || item?.type === 'menu'
				  )
				: tableFields;
			setSchema(filteredTableFields);
			const defaultFields = filteredTableFields
				? filteredTableFields?.filter((item: any) => item.type !== 'menu').map((item: any) => item?.dataKey)
				: [];
			dispatch(setFields(defaultFields));
		}
	}, [schemaData, schemaLoading, table?.fields, table?.preferences]);

	const selectable = table?.select?.show ? true : false;
	const tableFilters = table?.filters !== undefined ? table?.filters : true;
	// Get the table state from the redux store
	const { data, isLoading, isError, error, isSuccess } = useGetAllQuery({
		page,
		limit: table?.limit || limit,
		search,
		sort,
		filters: table?.preFilters ?? (tableFilters ? filters : null),
		path: table?.path,
	});

	const { data: userData } = useGetSelfQuery({});

	useEffect(() => {
		const preferenceKey = layoutPath || table?.path;
		const allowedFields = table?.fields || table?.preferences;

		const defaultPreferences =
			table?.preferences && table?.preferences?.length > 0
				? table.preferences
				: schema
				? schema?.filter((item: any) => item.default).map((item: any) => item?.dataKey)
				: [];

		if (userData && userData?.preferences) {
			const preference = userData?.preferences[preferenceKey];
			// Only allow preferences that actually belong to this page's allowedFields
			const validPreferences = preference?.filter((p: string) =>
				allowedFields ? allowedFields?.includes(p) : true
			);
			const value =
				validPreferences && validPreferences?.length > 0
					? validPreferences
					: defaultPreferences;
			dispatch(setPreferences(value));
			setCol(value.length + 1);
		} else if (defaultPreferences?.length > 0) {
			dispatch(setPreferences(defaultPreferences));
			setCol(defaultPreferences.length + 1);
		}
	}, [userData, table?.preferences, table?.path, table?.fields, schema, layoutPath]);

	// Create the table headers
	const header = (
		<Headers
			selectable={selectable}
			fields={preferences}
			tableData={schema}
			isLoading={schemaLoading || isLoading}
			data={data?.doc}
			showMenu={table?.menu ? true : false}
		/>
	);
	// Create the table body by mapping over the data and creating a TableRowComponent for each item
	const body = data?.doc?.map((item: any) => (
		<TableRowComponent
			onClick={() => table?.clickable && router.push(`${table?.toPath}/${item?._id}`)}
			selectable={selectable}
			fields={preferences}
			item={item}
			data={schema}
			menu={table?.menu}
			path={table?.path}
			key={item?._id}
			clickable={table?.clickable}
		/>
	));

	// Return the layout, page heading, table, and toast components
	return (
		<>
			<Layout
				pb='32px'
				title={table?.title}
				path={layoutPath || table?.path}>
				<Column gap={2}>
					<ServerPageHeading
						data={schemaData?.form}
						table={table}
						title={table?.title} //Heading of the page
						button={table?.button?.title} //Button Title
						href={table?.button?.path} //Page where button would redirect to
						isModal={table?.button?.isModal || table?.isModal} //If create page should be modal
						path={table?.path} //Path of the table
						export={table?.export} //If export button should be displayed
					/>
					<Flex>{children}</Flex>

					<CustomTable
						schema={schema} //Schema of the table
						search={table?.search} //Hide search bar
						showFilters={table?.filters} //Hide filters
						filters={table?.path} //Name of the filters
						col={col} //No of columns for skeleton
						isLoading={schemaLoading || isLoading} //Loading state of the table
						header={header} //Header of the table
						data={isSuccess && data} //Data to be displayed in the table
						preferences={table?.preferences} //Preferences for the table
						path={table?.path} //Path of the table
						preferencePath={layoutPath || table?.path} //Preferences storage key
						hidePreferences={table?.hidePreferences} //Hide preferences
						selectedItems={selectedItems} //Selected items
						isError={isError} //If error while fetching data
						select={table?.select} //Select menu
						error={error} //Error message
						table={table}>
						<>{body}</>
					</CustomTable>
				</Column>
			</Layout>
			{/* Toast component to display error */}
			<Toast
				error={error}
				isError={isError}
			/>
		</>
	);
};

export default ServerPageTable;
