import { NextResponse } from "next/server";
import { api, type ApiError } from "@/app/api/api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const apiRes = await api.get("/users/current/full", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes.data);
  } catch (error) {
    console.error("Proxy current full user error:", error);
    const axiosError = error as ApiError;

    return NextResponse.json(
      {
        error:
          axiosError.response?.data.error ??
          axiosError.message ??
          "Internal Server Error",
      },
      { status: axiosError.response?.status || 500 },
    );
  }
}
