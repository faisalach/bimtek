import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react'

export function ActionMenu({ urls, menus, label = "⋮" }) {
	if (menus.length == 0) {
		return false;
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">{label}</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{menus.map((menu, key) => {
					return (
						<DropdownMenuItem
							key={key}
							onClick={
								menu.onclick
								? menu.onclick
								: menu.url
								? () => router.visit(menu.url)
								: undefined
							}
						>
							{menu.label}
						</DropdownMenuItem>
					)}
				)}

			</DropdownMenuContent>
		</DropdownMenu>
		);
}


export function handleDelete({url,table}){
	Swal.fire({
		title: 'Konfirmasi Hapus',
		text: 'Apakah Anda yakin ingin menghapus data ini?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Ya, hapus',
		cancelButtonText: 'Batal',
		reverseButtons: true,
		confirmButtonColor: "#d33",
	}).then((result) => {
		if (!result.isConfirmed) return;

		Swal.fire({
			title: 'Memproses...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		fetch(url, {
			method: 'DELETE',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'X-CSRF-TOKEN': document
				.querySelector('meta[name="csrf-token"]')
				.getAttribute('content'),
			},
				// body: JSON.stringify(data),
		})
		.then(async (res) => {
			if (!res.ok) throw new Error('Request gagal');
			return res.json();
		})
		.then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Berhasil',
				text: 'Paket soal berhasil diselesaikan.',
			});

			if (table) {
				table.ajax.reload(null, false);
			}
		})
		.catch(() => {
			Swal.fire({
				icon: 'error',
				title: 'Gagal',
				text: 'Terjadi kesalahan saat menghapus data ini.',
			});
		});
	});
};
