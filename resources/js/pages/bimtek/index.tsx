import { useState } from 'react';
import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, add, edit, destroy } from '@/routes/bimtek';
import Datatables from '@/components/datatables';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Bimtek',
		href: show().url,
	},
];

export default function Bimtek() {

	const menuLists = (data) => {
		const menus 	= [];
		menus.push({
			label:"Edit",
			url: edit(data.id).url
		});	
		menus.push(
		{
			label:"Delete",
			onclick: () => handleDelete({
				url : destroy(data.id).url,
				table: window.bimtekTable
			})
		});
		return menus;
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Bimtek" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div>
					<Link href={add().url} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-flex items-center cursor-pointer">
					<Plus className="h-4 w-4 mr-3" />
					<span>Tambah Data</span>
				</Link>
			</div>
			<div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
				<Datatables 
					id="datatable"
					ajaxUrl={getData().url}
					onInit={(table) => {
						window.bimtekTable = table;
					}}
					order={[[3,"desc"]]}
					columns={[
						{ data: 'nama_bimtek' },
						{ data: 'deskripsi' },
						{ data: 'nama_assesment' },
						{ data: 'tanggal_mulai' },
						{ data: 'tanggal_selesai' },
						{ data: 'kode_reff' },
						{ data: 'id', orderable:false, createdCell: (td, _cellData, rowData) => {
							return ReactDOM.createRoot(td).render( <ActionMenu menus={menuLists(rowData)} /> )
						}},
					]}
					actionMenu={(container,rowData) =>{
						return ReactDOM.createRoot(container).render( <ActionMenu label="action" menus={menuLists(rowData)} /> );
					}}
					>
					<thead>
						<tr className="bg-blue-500 text-white">
							<th>Nama Bimtek</th>
							<th>Deskripsi</th>
							<th>Nama Assesment</th>
							<th>Tanggal Mulai</th>
							<th>Tanggal Selesai</th>
							<th>Kode Reff</th>
							<th>#</th>
						</tr>
					</thead>
				</Datatables>
			</div>
		</div>
	</AppLayout>
	);
}
