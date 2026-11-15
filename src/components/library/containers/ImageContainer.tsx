import { FC, ReactNode } from 'react';
import { Center, FlexProps, Image } from '@chakra-ui/react';
import { PLACEHOLDER_IMAGE } from '..';

type ImageContainerProps = FlexProps & {
	size?: number;
	children?: ReactNode;
	src?: string;
	alt?: string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

const ImageContainer: FC<ImageContainerProps> = ({
	children,
	objectFit,
	size,
	alt,
	src,
	h,
	w,
	height,
	width,
	...props
}) => {
	const boxSize = size || 200;
	const containerHeight = h || height || (size ? `${boxSize}px` : undefined);
	const containerWidth = w || width || (size ? `${boxSize}px` : undefined);

	const imageComponent = (
		<Image
			src={src || PLACEHOLDER_IMAGE}
			alt={alt || 'image'}
			objectFit={objectFit || 'cover'}
			width='100%'
			height='100%'
			style={{ borderRadius: '2px' }}
		/>
	);

	const innerComponent = src ? imageComponent : children;

	return (
		<Center
			borderRadius='4px'
			h={containerHeight || `${boxSize}px`}
			w={containerWidth || `${boxSize}px`}
			overflow='hidden'
			bg='whitesmoke'
			_dark={{ bg: 'background.dark' }}
			{...props}>
			{innerComponent}
		</Center>
	);
};

export default ImageContainer;
