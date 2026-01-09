import { Card, CardContent } from "@/components/ui/card";

type ColorVariant = "blue" | "green" | "amber" | "slate" | "purple";

const colorStyles: Record<ColorVariant, {
	bg: string;
	text: string;
	icon: string;
}> = {
	blue: {
		bg: "bg-blue-50",
		text: "text-blue-700",
		icon: "bg-blue-500",
	},
	green: {
		bg: "bg-emerald-50",
		text: "text-emerald-700",
		icon: "bg-emerald-500",
	},
	amber: {
		bg: "bg-amber-50",
		text: "text-amber-700",
		icon: "bg-amber-500",
	},
	slate: {
		bg: "bg-slate-50",
		text: "text-slate-600",
		icon: "bg-slate-400",
	},
	purple: {
		bg: "bg-purple-50",
		text: "text-purple-700",
		icon: "bg-purple-500",
	},
};

export default function DashboardCard({
	title,
	value,
	subtitle,
	icon: Icon,
	color = "blue",
	className = ""
}: {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: any;
	color?: ColorVariant;
	className?: string;
}) {
	const styles = colorStyles[color];

	return (
		<Card className={`rounded-2xl border shadow-sm ${styles.bg} dark:bg-transparent ${className}`}>
			<CardContent className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">
						{title}
					</p>

					<h2 className={`text-3xl font-bold mt-1 ${styles.text}`}>
						{value}
					</h2>

					{subtitle && (
						<p className="text-xs text-muted-foreground mt-1">
							{subtitle}
						</p>
						)}
				</div>

				{Icon && (
					<div
						className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow ${styles.icon}`}
					>
						<Icon className="w-6 h-6" />
					</div>
					)}
			</CardContent>
		</Card>
		);
}
