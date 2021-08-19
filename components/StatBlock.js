export const StatBlock = ({ title, score, className = "w-full" }) => (
    <div {...{ className }}>
        <div className="bg-gray-800 p-6 flex flex-col items-start">
            <p className="text-2xl font-bold mb-5">{title}</p>
            <p className="ml-auto">{score}</p>
        </div>
    </div>
);
