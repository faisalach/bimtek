export default function ProgressTimeline({
	pretest,
	materi,
	posttest,
}: {
	pretest: boolean;
	materi: boolean;
	posttest: boolean;
}) {
	return (
		<div className="flex items-center justify-between mt-6">
			<Step label="Pre Test" done={pretest} />
			<Line />
			<Step label="Materi" done={materi} />
			<Line />
			<Step label="Post Test" done={posttest} />
		</div>
		);
}

function Step({ label, done, active }: any) {
	return (
		<div className="flex flex-col items-center">
			<div
				className={`w-9 h-9 rounded-full flex items-center justify-center text-white
				${done ? "bg-emerald-500" : active ? "bg-blue-500" : "bg-slate-300"}`}
			>
				{done ? "✓" : ""}
			</div>
			<span className="text-xs mt-1 font-medium">{label}</span>
		</div>
		);
}


function Line() {
	return <div className="flex-1 h-px bg-gray-300 mx-2 mb-5" />;
}
