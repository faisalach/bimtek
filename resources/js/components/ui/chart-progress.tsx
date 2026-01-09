import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export function ChartProgress({data}) {
	const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

	return (
		<Card className="rounded-2xl shadow-sm">
			<CardContent className="">
				<h3 className="font-semibold mb-4">
					Progres Pengerjaan Peserta
				</h3>

				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							innerRadius={60}
							outerRadius={100}
							label
						>
							{data.map((_, index) => (
								<Cell key={index} fill={COLORS[index]} />
								))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		);
}
