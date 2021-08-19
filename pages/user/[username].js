import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { InView } from "react-intersection-observer";

export default function User() {
    const router = useRouter();
    const { username } = router.query;
    const { data: user, error } = useSWR(
        username && `/api/user/${username}`,
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
                <title>User {username}</title>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                {user && (
                    <div className="my-2 p-1 bg-pink-500 rounded-full text-none">
                        <Image
                            src={user.avatar_url}
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                    </div>
                )}
                <InView>
                    {({ inView, ref }) => (
                        <h1
                            data-scroll
                            ref={ref}
                            className={`text-6xl font-bold ${
                                inView && "in-view"
                            }`}
                        >
                            {user && (
                                <span className="text-pink-500 ">
                                    {user.username}
                                </span>
                            )}
                            {error && "User Not Found!"}
                            {!user && !error && "Finding User"}
                        </h1>
                    )}
                </InView>
                {user && (
                    <p className="text-lg mb-10">
                      {user.country.name} ({user.country.code})
                    </p>
                )}
                {user && user.is_supporter ? (
                    <p className="px-2 py-1 rounded-md bg-yellow-400 text-white text-lg my-2">
                        supporter
                    </p>
                ) : null}
                {user && (
                    <code className="mt-5 p-3 font-mono text-lg bg-gray-100 rounded-md">
                        pp: {user.statistics.pp}
                    </code>
                )}
                {user && (
                    <code className="mt-5 p-3 font-mono text-lg bg-gray-100 rounded-md">
                        global rank: {user.statistics.global_rank}
                    </code>
                )}
                {user && (
                    <code className="mt-5 p-3 font-mono text-lg bg-gray-100 rounded-md">
                        local rank: {user.statistics.country_rank}
                    </code>
                )}
            </main>
        </div>
    );
}
