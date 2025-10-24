import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@thirdparty/pinata";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    const response = await pinata.upload.public.file(file);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    console.error("Pinata upload error", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const cid = body.cid as string[];
    if (!cid) return NextResponse.json({ error: "No CID provided" }, { status: 400 });
    await pinata.files.public.delete(cid);
    return NextResponse.json({ message: "File unpinned successfully", cid }, { status: 200 });
  } catch (e) {
    console.error("Pinata unpin error", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
