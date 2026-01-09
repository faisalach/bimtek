import ReactDom from "react-dom/client";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import Responsive from 'datatables.net-responsive-dt';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';

DataTable.use(DT);
DataTable.use(Responsive);

function renderMobileCard(headers, row, table) {
	const tr = row.node(); // <tr> asli
	const tds = tr.querySelectorAll('td');

	return `
		<div class="dt-card">
			<div class="card-row action-row !justify-end">
				<div class="mobile-action"></div>
			</div>

			${headers
				.map((label, index) => {
					// skip kolom expand & action
					if (index === 0 || label === '#') return '';

					const td = tds[index];
					if (!td) return '';

					const value = td.innerHTML; // ⬅ ambil dari TD

					return `
						<div class="card-row">
							<span class="label">${label}</span>
							<span class="value whitespace-nowrap">${value || '-'}</span>
						</div>
					`;
				})
				.join('')}
		</div>
	`;
}




export default function Datatables({
	id,
	ajaxUrl,
	columns,
	onInit,
	order,
	customData,
	children,
	actionMenu
}) {
	const defaultColumnDefs = [
		{ targets: Array.from({ length: columns.length }, (_, i) => i).slice(1), className: 'desktop-only' },
		{ targets: 0, className: 'expand-control' },
		// { targets: "_all", className: 'text-sm' }
	];

	return (
		<DataTable
			id={id}
			options={{
				serverSide: true,
				processing: true,
				ajax: {
					url: ajaxUrl,
					type: 'GET',
					data: function(data) {
						if (customData) {
							return {...data,...customData,...window.filterDatatable};
						}else{
							return {...data,...window.filterDatatable};
						}
					}
				},
				order,
				columns,
				columnDefs: defaultColumnDefs,
				language: {
					lengthMenu: "Show _MENU_",
					zeroRecords: "Data tidak ditemukan",
					// info: "_START_ sampai _END_ dari _TOTAL_ data",
					info: "Total _TOTAL_ data",
					infoEmpty: "Tidak ada data",
					infoFiltered: "(difilter dari total _MAX_ data)",
					search: "",
					searchPlaceholder: "Search...",
					loadingRecords: "Loading data...",
					// processing: "Memproses...",
					emptyTable: "Tidak ada data di tabel",
					paginate: {
						// first: "Pertama",
						// last: "Terakhir",
						next: "Next",
						previous: "Prev"
					}
				},

				createdRow: function (row, data, dataIndex) {
					if (dataIndex % 2 === 1) {
						row.classList.add("dark:bg-gray-950","bg-gray-50");
					} else {
						row.classList.add("bg-gray-100", "dark:bg-gray-900");
					}
				},
				initComplete: function () {
					const table = this.api();
					const tbody = document.querySelector(`#${id} tbody`) as HTMLElement;
					const thead = table.table().header();
					const headers = Array.from(thead.querySelectorAll('th')).map(th => th.textContent?.trim());

					if (renderMobileCard && tbody && !(tbody as any).__expandBound) {
						(tbody as any).__expandBound = true;

						tbody.addEventListener('click', (e) => {
							if (window.innerWidth > 768) return;

							const target = e.target as HTMLElement;
							if (!target.classList.contains('expand-control')) return;

							const tr = target.closest('tr');
							if (!tr) return;

							const row = table.row(tr);

							if (row.child.isShown()) {
								row.child.hide();
								tr.classList.remove('shown');
							} else {
								row.child(
									renderMobileCard(headers,row, table)
								).show();
								tr.classList.add('shown');

								setTimeout(() => {
									const container = tr.nextElementSibling
									?.querySelector('.mobile-action') as HTMLElement;

									if (!container) return;

									return actionMenu(container,row.data());

								}, 0);
							}
						});
					}
					onInit?.(table);
				},
			}}
		>
			{children}
		</DataTable>
	);
}
