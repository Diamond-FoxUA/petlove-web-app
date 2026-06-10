import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/users/signin", body);

    const { token } = apiRes.data;

    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    };

    if (token) {
      cookieStore.set("accessToken", token, cookieOptions);
    }

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    console.error("Proxy login error: ", error);

    const axiosError = error as ApiError;
    return NextResponse.json(
      {
        error:
          axiosError.response?.data.error ??
          axiosError.message ??
          "Internal Server Error",
      },
      {
        status: axiosError.response?.status || 500,
      },
    );
  }
}
