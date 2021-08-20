import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { StatBlock } from "../../../components/StatBlock";
import { fetcher } from "../../../lib/fetcher";

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
          Loading <span className="text-pink-500 ">{username}'s</span>{" "}
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
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              <span className="text-pink-500 ">{user.username}</span>
            </h1>

            <p className="font-bold text-xl text-yellow-500">{mode}</p>

            <p>
              {user.country.name} ({user.country.code})
            </p>
          </div>

          {user.is_supporter && (
            <p className="px-2 py-1 rounded-md bg-yellow-400 text-white text-lg my-2">
              supporter
            </p>
          )}
        </div>

        <div className="flex w-full gap-5">
          <StatBlock title="PP" score={user.statistics.pp} />
          <StatBlock title="Global Rank" score={user.statistics.global_rank} />
          <StatBlock title="Local Rank" score={user.statistics.country_rank} />
        </div>

        <div className="w-full">
          <h3 className="font-bold text-yellow-500 mt-5 mb-10 text-4xl">
            Top Plays
          </h3>

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
