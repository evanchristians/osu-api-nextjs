import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

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
                <h1 className="text-6xl font-bold">
                    {user && (
                        <>
                            User{" "}
                            <span className="text-green-600">
                                {user.username}
                            </span>{" "}
                            Found!
                        </>
                    )}
                    {error && "User Not Found!"}
                    {!user && !error && "Finding User"}
                </h1>
                {user && <a href={user.website} target="_blank" className="my-4 text-blue-600 underline">{user.website}</a>}
                {user && (
                    <code className="mt-5 p-3 font-mono text-lg bg-gray-100 rounded-md">
                        check browser console
                    </code>
                )}
            </main>
        </div>
    );
}
