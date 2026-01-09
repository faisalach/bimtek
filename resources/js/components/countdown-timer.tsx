import { useEffect, useState } from "react";

interface Props {
	endAt: string;
	serverNow: string;
	onTimeout: () => void;
}

const formatTime = (totalSeconds: number): string => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return [
		hours.toString().padStart(2, "0"),
		minutes.toString().padStart(2, "0"),
		seconds.toString().padStart(2, "0"),
	].join(":");
};

const getRemainingSeconds = (endAt: string, serverNow: string): number => {
	const end = new Date(endAt).getTime();
	const now = new Date(serverNow).getTime();
	return Math.max(Math.floor((end - now) / 1000), 0);
};

export default function CountdownTimer({
	endAt,
	serverNow,
	onTimeout,
	className,
}: Props) {
	const [remaining, setRemaining] = useState(
		getRemainingSeconds(endAt, serverNow)
		);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					onTimeout();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const minutes = Math.floor(remaining / 60);
	const seconds = remaining % 60;

	return (
		<div
			className={`${className} text-2xl font-bold ${
				remaining <= 300 ? "text-red-600" : "text-gray-800 dark:text-gray-200"
			}`}
		>
			{formatTime(remaining)}
		</div>
		);
}
