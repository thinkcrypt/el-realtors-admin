import { FC } from 'react';

import {
	Center,
	FormControl,
	Image,
	Stack,
	InputProps,
	GridProps,
	FlexProps,
} from '@chakra-ui/react';
import { UploadModal, HelperText, Label, ImageContainer } from '../..';

type FormDataType = InputProps &
	GridProps & {
		value: string | undefined;
		onChange: any;
		isRequired?: boolean;
		label?: string;
		helper?: string;
		isDisabled?: boolean;
		style?: any;
		folder?: string;
	};

const VImage: FC<FormDataType> = ({
	value,
	onChange,
	isRequired = false,
	label,
	helper,
	isDisabled = false,
	style,
	folder,
	...props
}) => {
	const type = value ? 'edit' : 'add';

	const isFeature =
		label?.toLowerCase().includes('feature') ||
		(props?.name && String(props.name).toLowerCase().includes('feature'));

	const aspectRatio = style?.aspectRatio || (isFeature ? '16/9' : undefined);
	const containerW = style?.w || (aspectRatio ? (isFeature ? '320px' : '260px') : '200px');
	const containerH = style?.h || (aspectRatio ? 'auto' : '200px');

	const imageComponent = (
		<ImageContainer
			w='full'
			h='full'
			aspectRatio={aspectRatio}
			objectFit='cover'>
			<Image
				h='100%'
				w='100%'
				objectFit='cover'
				src={value}
				alt={label || 'image'}
			/>
		</ImageContainer>
	);

	if (isDisabled) return imageComponent;
	return (
		<FormControl isRequired={isRequired}>
			<Stack w='full'>
				<Label>{label}</Label>
				<Center
					{...imageCss}
					w={containerW}
					h={containerH}
					aspectRatio={aspectRatio}
					maxW='100%'
					overflow='hidden'>
					<UploadModal
						type={type}
						handleImage={onChange}
						multiple={true}
						folder={folder}
						fileType='image'
					/>
					{value && imageComponent}
				</Center>
				{helper && <HelperText>{helper}</HelperText>}
			</Stack>
		</FormControl>
	);
};

const imageCss: FlexProps = {
	bg: 'transparent',
	position: 'relative',
};

export default VImage;
