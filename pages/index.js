import Head from "next/head";
import { useState } from "react";
import { InView } from "react-intersection-observer";

export default function Home() {
    const [username, setUsername] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <InView>
                    {({ inView, ref }) => (
                        <h1
                            data-scroll
                            ref={ref}
                            className={`text-5xl font-bold ${
                                inView && "in-view"
                            }`}
                        >
                            Consuming the{" "}
                            <span className="text-pink-500">Osu!</span> APIv2
                            with <span className="text-blue-600">Next.js</span>
                        </h1>
                    )}
                </InView>
                <p className="text-xl my-20 max-w-xs">
                    Get data for an{" "}
                    <span className="text-pink-500 font-bold">Osu!</span> user
                    by typing their username in the input below and clicking{" "}
                    <span className="text-green-600 font-bold">Get User</span>.
                </p>
                <div className="flex flex-col gap-2 items-start">
                    <input
                        placeholder="Username"
                        className="bg-gray-200 p-3 text-xl"
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <a
                        className="btn mx-auto mt-3"
                        href={`/user/${username}`}
                        disabled={username.length < 1}
                    >
                        Get User
                    </a>
                </div>
            </main>
        </div>
    );
}
