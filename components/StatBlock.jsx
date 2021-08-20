export const StatBlock = ({ title, score, className = "flex flex-1 min-w-max" }) => (
  <div {...{ className }}>
    <div className="bg-gray-800 p-6 flex flex-col flex-grow items-start">
      <p className="text-white text-lg mb-5 opacity-60">{title}</p>
      <p className="text-yellow-500 text-2xl font-bold ml-auto mt-auto">{score ?? "N/A"}</p>
    </div>
  </div>
);
