'use client';

import React from 'react';
import { NextPage } from 'next';
import {
	ServerPageTable,
	ServerTableObjectProps,
} from '@/components/library';

const homeFormFields = [
	{
		sectionTitle: 'Home Page Content',
		description: 'Manage headings, descriptions, and gallery images for the Home Page',
		fields: [
			'homeAboutImage',
			'homeAboutHeading',
			'homeAboutSubHeading',
			'homeAboutDescriptionOne',
			'homeAboutDescriptionTwo',
			'homeEleganceHeading',
			'homeEleganceSubHeading',
			'homeEleganceDescriptionOne',
			'homeEleganceDescriptionTwo',
			'homeGalleryImages',
		],
	},
];

const homeTableFields = [
	'homeAboutImage',
	'homeAboutHeading',
	'homeAboutSubHeading',
	'homeAboutDescriptionOne',
	'homeAboutDescriptionTwo',
	'homeEleganceSubHeading',
	'homeEleganceHeading',
	'homeEleganceDescriptionOne',
	'homeEleganceDescriptionTwo',
	'homeGalleryImages',
	'createdAt',
	'updatedAt',
];

const table: ServerTableObjectProps = {
	title: 'Home Page Content',
	path: 'elegancecontents',
	fields: homeTableFields,
	preferences: [
		'homeAboutImage',
		'homeAboutHeading',
		'homeAboutSubHeading',
		'homeEleganceHeading',
		'homeGalleryImages',
		'createdAt',
	],
	button: {
		title: 'Add New Content',
		isModal: true,
		layout: homeFormFields,
		prompt: {
			title: 'Add Home Page Content',
			btnText: 'Save Home Content',
			successMsg: 'Home Page Content Saved Successfully',
		},
	},
	menu: [
		{ type: 'view-server-modal', title: 'Quick View' },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit',
			type: 'edit-modal',
			layout: homeFormFields,
		},
		{
			title: 'Delete',
			type: 'delete',
		},
	],
};

const HomePageContentPage: NextPage = () => {
	return (
		<ServerPageTable
			table={table}
			layoutPath='homepage-content'
		/>
	);
};

export default HomePageContentPage;
