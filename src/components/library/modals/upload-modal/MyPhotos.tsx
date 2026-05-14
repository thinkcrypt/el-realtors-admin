'use client';
import { useEffect, useState, useRef } from 'react';
import {
	Button,
	Grid,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { Column, useGetAllQuery, useDeleteByIdMutation } from '../..';
import { ImageComponent } from '.';

const MyPhotos = ({ handleSelect, type = 'image' }: { handleSelect: any; type?: string }) => {
	const [page, setPage] = useState<number>(1);
	const [viewData, setViewData] = useState<any>([]);
	const { data, isFetching } = useGetAllQuery({
		path: `upload`,
		limit: '20',
		type,
		page,
		sort: '-createdAt',
		filters: { type: type || 'image' },
	});
	const [selected, setSelected] = useState<any>(null);
	const [deleteImage, result] = useDeleteByIdMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<any>(undefined);
	const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

	const confirmDelete = (id: string, e: any) => {
		e.stopPropagation();
		setDeleteTarget(id);
		onOpen();
	};

	const handleDelete = () => {
		if (deleteTarget) {
			deleteImage({ path: 'upload', id: deleteTarget });
		}
	};

	useEffect(() => {
		if (result.isSuccess && !result.isLoading) {
			onClose();
			setDeleteTarget(null);
		}
	}, [result.isSuccess, result.isLoading, onClose]);

	const onLoadMore = () => {
		if (page < data?.totalPages) setPage(prev => prev + 1);
	};

	useEffect(() => {
		if (isFetching) return;
		if (data?.doc) {
			if (page === 1) {
				// Reset viewData for first page
				setViewData(data.doc);
			} else {
				// Append for subsequent pages
				setViewData((prev: any) => [...prev, ...data.doc]);
			}
		}
	}, [data, isFetching, page]);

	return (
		<Column
			gap={3}
			pb={2}>
			<Grid
				minH='200px'
				gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(5, 1fr)' }}
				gap={2}>
				{viewData?.map((item: any, i: number) => (
					<ImageComponent
						src={item?.url}
						type={type}
						onClick={() => {
							setSelected(item?.url);
							handleSelect(item?.url);
						}}
						selected={selected}
						onDelete={(e) => confirmDelete(item?.key, e)}
						key={item?._id}
					/>
				))}
			</Grid>

			<Button
				isDisabled={isFetching || data?.totalPages <= page}
				onClick={onLoadMore}
				variant='white'>
				Load More
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Image
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete this image? You can&apos;t undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} size='sm' variant='white'>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={handleDelete} ml={3} size='sm' isLoading={result.isLoading}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Column>
	);
};

export default MyPhotos;
