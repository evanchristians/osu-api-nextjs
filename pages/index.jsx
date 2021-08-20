import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { constants } from "../lib/constants";

export default function Home() {
  const [username, setUsername] = useState("BTMC");

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
              className={`text-5xl font-semibold ${inView && "in-view"}`}
            >
              Consuming the <span className="text-pink-500">Osu!</span> APIv2
              with <span className="text-blue-600">Next.js</span>
            </h1>
          )}
        </InView>
        <p className="text-xl my-20 max-w-xs">
          Get data for an <span className="text-pink-500 font-semibold">Osu!</span>{" "}
          user by typing their username in the input below & clicking{" "}
          <span className="text-green-600 font-semibold">Get User</span>.
        </p>
        <div className="flex flex-col gap-5 items-start">
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Link href={`/user/${username}/${constants.modes[0]}`}>
            <a className="btn mx-auto mt-3" disabled={username.length < 1}>
              Get User
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
