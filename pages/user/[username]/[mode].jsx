import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { InView } from "react-intersection-observer";
import { StatBlock } from "../../../components/StatBlock";

export default function User() {
  const router = useRouter();
  const { username, mode } = router.query;
  const { data: user, error } = useSWR(
    username && `/api/user/${username}/${mode}`,
    fetcher
  );

  if (user) {
    console.log(user);
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>
          {username} | {mode}
        </title>
      </Head>

      <main className="flex flex-col items-start w-full flex-1 px-20 py-10">
        <div className="flex items-center gap-5 mb-10">
          {user && (
            <div>
              <Image
                src={user.avatar_url}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold">
              {user && (
                <>
                  <span className="text-pink-500 ">{user.username}</span>
                </>
              )}
              {error && "User Not Found!"}
              {!user && !error && "Finding User"}
            </h1>
            {user && (
              <p className="font-bold text-xl text-yellow-500">{mode}</p>
            )}
            {user && (
              <p>
                {user.country.name} ({user.country.code})
              </p>
            )}
          </div>
          {user && user.is_supporter ? (
            <p className="px-2 py-1 rounded-md bg-yellow-400 text-white text-lg my-2">
              supporter
            </p>
          ) : null}
        </div>
        <div className="flex w-full gap-5">
          {user && <StatBlock title="PP" score={user.statistics.pp} />}
          {user && (
            <StatBlock
              title="Global Rank"
              score={user.statistics.global_rank}
            />
          )}
          {user && (
            <StatBlock
              title="Local Rank"
              score={user.statistics.country_rank}
            />
          )}
        </div>
      </main>
    </div>
  );
}
