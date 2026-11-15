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

const aboutFormFields = [
	{
		sectionTitle: 'About Us Page Content',
		description: 'Manage banners, about philosophy, location and details for About Us',
		fields: [
			'aboutBannerImage',
			'aboutBannerHeadingOne',
			'aboutBannerHeadingTwo',
			'aboutWhoWeAreTitle',
			'aboutWhoWeAreTextOne',
			'aboutWhoWeAreTextTwo',
			'aboutWhoWeAreTextThree',
			'aboutPhilosophyTitle',
			'aboutPhilosophyDescription',
			'aboutPhilosophyImage',
			'aboutLocationTitle',
			'aboutLocationDescription',
			'aboutLocationImage',
		],
	},
];

const projectFormFields = [
	{
		sectionTitle: 'Project Page Banner',
		description: 'Manage banner image and headings for the project showcase page',
		fields: [
			'projectBannerImage',
			'projectBannerHeadingOne',
			'projectBannerHeadingTwo',
		],
	},
];

const allFormFields = [
	...homeFormFields,
	...aboutFormFields,
	...projectFormFields,
];

const table: ServerTableObjectProps = {
	title: 'Website Content Management',
	path: 'elegancecontents',
	button: {
		title: 'Add New Content',
		isModal: true,
		layout: allFormFields,
	},
	menu: [
		{ type: 'view-server-modal', title: 'Quick View' },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit',
			type: 'edit-modal',
			layout: allFormFields,
		},
		{
			title: 'Delete',
			type: 'delete',
		},
	],
};

const EleganceContentsPage: NextPage = () => {
	return <ServerPageTable table={table} />;
};

export default EleganceContentsPage;
