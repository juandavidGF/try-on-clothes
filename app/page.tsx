"use client"
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [modelPersonaFile, setModelPersonaFile] = useState<File | null>(null);
  const [modelGarmentFile, setModelGarmentFile] = useState<File | null>(null);
  const [blobURL, setBlobURL] = useState<string | null>(null);

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
      alert('Please select both files before generating.');
      return;
    }

    const formData = new FormData();
    formData.append('modelPersona', modelPersonaFile);
    formData.append('modelGarment', modelGarmentFile);

    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert('Generation successful!');
    } catch (error) {
      console.error('Error during generation:', error);
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row w-full">
        <div className="flex w-1/2 flex-col gap-6">
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
        <div>
          <h1>Generation</h1>
        </div>
      </div>
    </main>
  );
}

function toBase64(file: File | Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result !== "string") return;
			resolve(reader.result);
		};
		reader.onerror = (error) => reject(error);
	});
}
