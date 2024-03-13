"use client"
import Image from "next/image";
import { useState } from "react";


export default function Home() {
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

  const generate = () => {
    if (!modelPersonaFile || !modelGarmentFile) {
      alert('Please select both files before generating.');
      return;
    }

    const formData = new FormData();
    formData.append('modelPersona', modelPersonaFile);
    formData.append('modelGarment', modelGarmentFile);

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row w-full">
        <div className="flex w-1/2 flex-col gap-6">
          <div>
            <h1>Model Persona</h1>
            <input 
            type="file" className="file-input w-full max-w-xs" accept="image/*" 
            onChange={(e) => handleFileChange(e, setModelPersonaFile)}
            />
          </div>
          <div>
            <h1>Model Garment</h1>
            <input type="file" className="file-input w-full max-w-xs" accept="image/*" 
            onChange={(e) => handleFileChange(e, setModelPersonaFile)}
            />
          </div>
          <div>
            <button className="btn" onClick={generate}>Generate</button>
          </div>
        </div>
        <div>
          <h1>Generation</h1>
        </div>
      </div>
    </main>
  );
}
