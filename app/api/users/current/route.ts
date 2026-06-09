import { NextResponse } from "next/server";
import { api, type ApiError } from "../../api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const apiRes = await api.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes.data);
  } catch (error) {
    console.log("Proxy current user error:", error);
    const axiosError = error as ApiError;

    return NextResponse.json(
      {
        error:
          axiosError.response?.data?.error ??
          axiosError.message ??
          "Internal server error",
      },
      { status: axiosError.response?.status || 500 },
    );
  }
}
