import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.API;

    if (!apiKey) {
      console.error("Missing API env var `API`");
      return NextResponse.json(
        { error: "Missing API env var `API` on server" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.assembly.com/v1/clients", {
      headers: {
        "X-API-KEY": apiKey,
        accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Assembly API error:", res.status, text);
      // Surface the upstream error so you can see what's wrong
      return NextResponse.json(
        {
          error: "Upstream error",
          upstreamStatus: res.status,
          upstreamBody: text,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Assembly API request failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

