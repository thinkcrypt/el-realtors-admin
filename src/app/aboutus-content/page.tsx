'use client';

import React from 'react';
import { NextPage } from 'next';
import {
	ServerPageTable,
	ServerTableObjectProps,
} from '@/components/library';

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

const aboutTableFields = [
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
	'createdAt',
	'updatedAt',
];

const table: ServerTableObjectProps = {
	title: 'About Us Content',
	path: 'elegancecontents',
	fields: aboutTableFields,
	preferences: [
		'aboutBannerImage',
		'aboutBannerHeadingOne',
		'aboutPhilosophyTitle',
		'aboutLocationTitle',
		'createdAt',
	],
	button: {
		title: 'Add New Content',
		isModal: true,
		layout: aboutFormFields,
		prompt: {
			title: 'Add About Us Content',
			btnText: 'Save About Content',
			successMsg: 'About Us Content Saved Successfully',
		},
	},
	menu: [
		{ type: 'view-server-modal', title: 'Quick View' },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit',
			type: 'edit-modal',
			layout: aboutFormFields,
		},
		{
			title: 'Delete',
			type: 'delete',
		},
	],
};

const AboutUsContentPage: NextPage = () => {
	return (
		<ServerPageTable
			table={table}
			layoutPath='aboutus-content'
		/>
	);
};

export default AboutUsContentPage;
