import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, type ApiError } from "@/app/api/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const apiRes = await api.post("/users/current/pets/add", body, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes.data, { status: 201 });
  } catch (error) {
    console.error("Proxy adding pet error: ", error);

    const axiosError = error as ApiError;
    return NextResponse.json(
      {
        error:
          axiosError.response?.data.error ??
          axiosError.message ??
          "Internal server error",
      },
      {
        status: axiosError.response?.status || 500,
      },
    );
  }
}
