"use client"
import Image from "next/image";
import { useState } from "react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Prediction = {
  output: string[];
  status: string;
};

export default function Home() {
  const [prediction, setPrediction] = useState< Prediction | null>(null);
  const [error, setError] = useState(null);
  const [modelPersonaFile, setModelPersonaFile] = useState<File | null>(null);
  const [modelGarmentFile, setModelGarmentFile] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setter(file);
    }
  };
  
  const generate = async () => {
    if (!modelPersonaFile || !modelGarmentFile) {
      alert('Please upload the files.');
      return;
    }

    const formData = new FormData();
    formData.append('modelPersona', modelPersonaFile);
    formData.append('modelGarment', modelGarmentFile);

    try {
      const response = await fetch('api/predictions', {
        method: 'POST',
        body: formData,
      });

      let prediction = await response.json();
      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }
      
      // let prediction: any = {
      //   id: 'v5mks04y4xrgp0cg166tzwhfz0',
      //   status: 'starting',
      // };
      setPrediction(prediction);

      while(
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(500);

        const response = await fetch(`/api/predictions/${prediction.id}`);
        prediction = await response.json();

        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        // console.log({ prediction });
        setPrediction(prediction);
      }
    } catch (error) {
      console.error('Error during generation:', error);
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl gap-3 m-auto">
        <div className="flex lg:w-1/2 flex-col gap-6">
          <div>
            <h1>Model Persona</h1>
            <input type="file" className="file-input w-full max-w-xs" accept="image/*"
            onChange={(e) => handleFileChange(e, setModelPersonaFile)}
            />
          </div>
          <div>
            <h1>Model Garment</h1>
            <input type="file" className="file-input w-full max-w-xs" accept="image/*" 
            onChange={(e) => handleFileChange(e, setModelGarmentFile)}
            />
          </div>
          <div>
            <button className="btn" onClick={generate}>Generate</button>
          </div>
        </div>
        <div className="flex lg:w-1/2 flex-col">
          <h1>Generation</h1>
          {error && <div>{error}</div>}
          {prediction && (
            <>
              {prediction.output && (
                prediction.output.map((pred,i) => {
                  return <div key={i}
                  className="relative w-full h-96 mt-5 overflow-hidden rounded-lg">
                    <Image
                      fill
                      src={pred}
                      alt="output"
                      sizes="(max-width: 100%) 100vw, (max-width: 100%) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>

                })
              )}
              <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
