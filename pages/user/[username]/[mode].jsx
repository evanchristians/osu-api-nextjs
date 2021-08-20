import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { StatBlock } from "../../../components/StatBlock";
import { fetcher } from "../../../lib/fetcher";
import { toHumanizedMode } from "../../../utils/toHumanizedMode";
import { constants } from "../../../lib/constants";

export default function User() {
  const router = useRouter();
  const { username, mode } = router.query;

  const { data: user, error } = useSWR(
    username && `/api/user/${username}/${mode}`,
    fetcher
  );

  const { data: scores } = useSWR(user && `/api/scores/${user.id}`, fetcher);

  user && console.log({ user });
  scores && console.log({ scores });
  error && console.log({ error });

  if (!mode || !username) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Loading...</title>
        </Head>

        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>User {username} Not Found!</title>
        </Head>

        <h1 className="text-4xl font-bold">
          User <span className="text-pink-500 ">{username}</span> Not Found
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Loading {username}'s Profile</title>
        </Head>

        <h1 className="text-4xl font-bold">
          Loading <span className="text-pink-500">{username}'s</span>{" "}
          <span className="text-yellow-500">{toHumanizedMode(mode)}</span>{" "}
          Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>
          {username} | {mode}
        </title>
      </Head>

      <main className="flex flex-col items-start max-w-7xl w-full flex-1 p-10">
        <div className="flex items-center gap-5 mb-10">
          <div>
            <Image
              src={user.avatar_url}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <span className="text-pink-500 ">{user.username}</span>{" "}
              <span className="flex items-center justify-center text-sm w-8 h-8 rounded-full bg-gray-800">
                {user.country.code}
              </span>
            </h1>

            {user.is_supporter && (
              <p className="flex items-center self-start mt-2 px-2 py-1 bg-yellow-500 rounded-full text-sm ">
                Supporter
              </p>
            )}

            {user.is_online ? (
              <p className="flex  items-center self-start mt-2 px-2 py-1 rounded-full text-xs bg-green-500">
                Online
              </p>
            ) : (
              <p className="flex items-center self-start mt-2 px-2 py-1 bg-red-600 rounded-full text-xs">
                Offline
              </p>
            )}
          </div>
        </div>

        <div className="flex text-2xl mb-5 items-end gap-3">
          {constants.modes.map((gameMode, key) =>
            gameMode === mode ? (
              <>
                <h3 key={key} className="text-yellow-500">
                  {toHumanizedMode(gameMode)}
                </h3>
                {key < constants.modes.length - 1 && <span>&middot;</span>}
              </>
            ) : (
              <>
                <Link key={key} href={`/user/${username}/${gameMode}`}>
                  <a className="opacity-30 hover:opacity-100">
                    {toHumanizedMode(gameMode)}
                  </a>
                </Link>
                {key < constants.modes.length - 1 && <span>&middot;</span>}
              </>
            )
          )}
        </div>

        <div className="flex w-full gap-5">
          <StatBlock title="PP" score={user.statistics.pp} />
          <StatBlock title="Global Rank" score={user.statistics.global_rank} />
          <StatBlock title="Local Rank" score={user.statistics.country_rank} />
          <StatBlock title="Play Count" score={user.statistics.play_count} />
        </div>

        <div className="w-full">
          <h3 className="font-bold text-yellow-500 my-5 text-4xl">Top Plays</h3>

          <div className="flex flex-col w-full gap-5">
            {!scores && <h2 className="text-xl">loading</h2>}

            {scores &&
              scores.map((score, key) => (
                <div
                  className="bg-gray-800 p-3 w-full flex flex-col gap-4 relative overflow-hidden"
                  key={key}
                >
                  <div className="flex">
                    <p className="opacity-50">
                      {score.beatmapset.artist_unicode}
                    </p>

                    <p className="ml-auto">
                      {score.beatmap.difficulty_rating} ★
                    </p>
                  </div>

                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">
                        {score.rank}
                      </span>

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

                    <p className="ml-auto text-yellow-500 text-lg">
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
        </div>
      </main>
    </div>
  );
}
