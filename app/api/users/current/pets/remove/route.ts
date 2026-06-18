import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, type ApiError } from "@/app/api/api";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const id = typeof body === "object" && body !== null ? body.id : body;

    if (!id) {
      return NextResponse.json(
        { error: "Pet ID is required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const apiRes = await api.delete(`/users/current/pets/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    console.error("Proxy deleting pet error: ", error);
    const axiosError = error as ApiError;
    return NextResponse.json(
      { error: axiosError.response?.data.error ?? "Internal server error" },
      { status: axiosError.response?.status || 500 },
    );
  }
}
