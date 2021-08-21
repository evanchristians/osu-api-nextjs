import Image from "next/image";

export const TopPlays = ({ scores }) => {
  return (
    <div className="flex w-full gap-5 flex-wrap">
      {!scores && (
        <h2 className="text-4xl text-center opacity-50">Loading...</h2>
      )}

      {scores &&
        scores.map((score, key) => (
          <div
            className="bg-gray-800 p-3 flex-grow flex flex-col gap-4 relative overflow-hidden"
            key={key}
          >
            <div className="flex gap-2">
              <span className="flex w-5 h-5 bg-yellow-500 text-gray-900 items-center justify-center rounded-full font-bold">
                {key + 1}
              </span>
              <p className="opacity-50">{score.beatmapset.artist_unicode}</p>

              <p className="ml-auto">{score.beatmap.difficulty_rating} ★</p>
            </div>

            <div className="flex flex-wrap items-center">
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <span className="text-yellow-500 font-bold">{score.rank}</span>

                <div className="flex item-center px-2 py-1 rounded-full bg-gray-900 text-sm">
                  <span className="text-pink-500">
                    {score.pp.toFixed(2)} PP
                  </span>
                </div>

                <div className="flex item-center px-2 py-1 rounded-full bg-gray-900 text-xs opacity-50">
                  <span className="text-white ">
                    {score.weight.pp.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="ml-auto mt-3 sm:mt-0 text-yellow-500 text-lg pl-4">
                {score.beatmapset.title}
              </p>
            </div>

            <div className="flex play-card-cover">
              <Image
                src={score.beatmapset.covers.card}
                width={400}
                height={140}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
