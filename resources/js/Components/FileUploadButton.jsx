import React, { useState } from 'react';
import axios from 'axios';

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded:', response.data);

        // Realizar una acción adicional después de subir el archivo
        // Aquí puedes realizar la lógica que necesitas, como otra solicitud al servidor o acciones en el cliente
        alert('¡Archivo subido correctamente! Realizando acción adicional...');

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Subir archivo</button>
    </div>
  );
}
