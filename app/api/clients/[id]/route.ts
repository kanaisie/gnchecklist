import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const apiKey = process.env.API;

    if (!apiKey) {
      console.error("Missing API env var `API`");
      return NextResponse.json(
        { error: "Missing API env var `API` on server" },
        { status: 500 }
      );
    }

    const res = await fetch(`https://api.assembly.com/v1/clients/${id}`, {
      headers: {
        "X-API-KEY": apiKey,
        accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Assembly Get Client error:", res.status, text);
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Assembly Get Client request failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

