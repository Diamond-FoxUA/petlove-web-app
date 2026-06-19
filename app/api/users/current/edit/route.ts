import { NextRequest, NextResponse } from "next/server";
import { api, type ApiError } from "@/app/api/api";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const apiRes = await api.patch("/users/current/edit", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes);
  } catch (error) {
    console.error("Proxy edit user error: ", error);
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
