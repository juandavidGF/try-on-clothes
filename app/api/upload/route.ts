import { NextResponse } from 'next/server';

import Replicate from "replicate";
const replicate = new Replicate();


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const personaFile = formData.get('modelPersona') as File | null;
    const garmentFile = formData.get('modelGarment') as File | null;

    if (!personaFile || !garmentFile) {
      return NextResponse.json(
        { error: "Both modelPersona and modelGarment are required." }, 
        { status: 400 }
      );
    }

    const personaBuffer = await personaFile.arrayBuffer();
    const garmentBuffer = await garmentFile.arrayBuffer();

    const input = {
      model_image: Buffer.from(personaBuffer),
      garment_image: Buffer.from(garmentBuffer)
    };

    const output = await replicate.run("viktorfa/oot_diffusion:9f8fa4956970dde99689af7488157a30aa152e23953526a605df1d77598343d7", { input });
    console.log(output);
    
    return NextResponse.json(
      { status: "success", output }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { status: "error", message: error.message }, 
      { status: 500 }
    );
  }
}
