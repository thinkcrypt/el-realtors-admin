import { ReactNode, FC } from 'react';
import { Center, FlexProps, Heading } from '@chakra-ui/react';
import { Icon } from '../..';
import { motion } from 'framer-motion';

type AddImageButtonProps = FlexProps & {
	children?: ReactNode;
	size?: string;
};

const AddImageButton: FC<AddImageButtonProps> = ({ children, size, h, w, height, width, ...props }) => {
	return (
		<Center
			as={motion.div}
			cursor='pointer'
			whileTap={{ scale: 0.9 }}
			flexDir='column'
			h={h || height || (size === 'full' ? '100%' : size) || '100px'}
			w={w || width || (size === 'full' ? '100%' : size) || '100px'}
			border='2px dashed #ccc'
			borderRadius='8px'
			color='#ccc'
			userSelect='none'
			gap={2}
			{...props}>
			<Icon
				name='add-image'
				size={30}
			/>
			<Heading
				color='#ccc'
				size='xs'>
				{children || 'Add Image'}
			</Heading>
		</Center>
	);
};

export default AddImageButton;
