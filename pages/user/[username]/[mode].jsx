import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { StatBlock } from "../../../components/StatBlock";
import { fetcher } from "../../../lib/fetcher";
import { toHumanizedMode } from "../../../utils/toHumanizedMode";
import { constants } from "../../../lib/constants";
import { TopPlays } from "../../../components/TopPlays";

export default function User() {
  const router = useRouter();
  const { username, mode } = router.query;

  const { data: user, error } = useSWR(
    username && `/api/user/${username}/${mode}`,
    fetcher
  );

  const { data: scores } = useSWR(user && `/api/scores/${user.id}`, fetcher);

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

        <h1 className="text-4xl font-bold text-center">
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
          {user.username} | {toHumanizedMode(mode)}
        </title>
      </Head>

      <main className="flex flex-col items-start max-w-7xl w-full flex-1 px-5 py-10">
        <div className="flex flex-col sm:flex-row text-center gap-5 mb-10 w-full">
          <div>
            <Image
              src={user.avatar_url}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col items-center text-center w-full sm:items-start">
            <h1 className="text-4xl font-bold flex items-center gap-2 mb-5">
              {user.username}{" "}
              <span className="flex items-center justify-center text-sm w-8 h-8 rounded-full bg-gray-800">
                {user.country.code}
              </span>
            </h1>

            {user.is_supporter && (
              <p className="flex items-center sm:self-start mt-2 px-2 py-1 bg-yellow-500 rounded-full text-xs ">
                Supporter
              </p>
            )}

            {user.is_online ? (
              <p className="flex  items-center sm:self-start mt-2 px-2 py-1 rounded-full text-xs bg-green-500">
                Online
              </p>
            ) : (
              <p className="flex items-center sm:self-start mt-2 px-2 py-1 bg-red-600 rounded-full text-xs">
                Offline
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full text-lg sm:text-2xl mb-5 justify-center gap-3 sm:justify-start sm:mt-10">
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

        <div className="flex flex-wrap w-full gap-5">
          <StatBlock title="PP" score={user.statistics.pp} />
          <StatBlock title="Global Rank" score={user.statistics.global_rank} />
          <StatBlock title="Local Rank" score={user.statistics.country_rank} />
          <StatBlock title="Play Count" score={user.statistics.play_count} />
        </div>

        <div className="w-full">
          <h3 className="font-bold text-yellow-500 my-10 text-4xl">
            Top Plays
          </h3>
          <TopPlays scores={scores} />
        </div>
      </main>
    </div>
  );
}
