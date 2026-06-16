import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, type ApiError } from "@/app/api/api";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorize" }, { status: 401 });

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
