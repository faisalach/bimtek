import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export function ChartNilai({data}) {
	return (
		<Card className="rounded-2xl shadow-sm">
			<CardContent className="">
				<h3 className="font-semibold mb-4">
					Rata-rata Nilai Pre Test & Post Test
				</h3>

				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<XAxis dataKey="bimtek" />
						<YAxis domain={[0, 100]} />
						<Tooltip />
						<Legend />
						<Bar
							dataKey="pretest"
							name="Pre Test"
							fill="#3b82f6"
							radius={[6, 6, 0, 0]}
						/>

						<Bar
							dataKey="posttest"
							name="Post Test"
							fill="#22c55e"
							radius={[6, 6, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		);
}
