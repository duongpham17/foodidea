"use client";

import styles from './Single.module.scss';
import { useState } from 'react';

interface Props {
  id: string;
  src: string;
  onUpload?: (file: File) => Promise<void>;
  onDelete?: (cid: string) => Promise<void>;
}

const SingleFile = ({ src, onUpload, onDelete, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>(src);

  // Handles both drag-and-drop and file input change
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoading(true);

    // Get file from input or drag-drop
    const files = 'dataTransfer' in e ? e.dataTransfer.files : e.currentTarget.files;
    if (!files || files.length === 0) {
      setLoading(false);
      return;
    }
    const file = files[0];

    // Create local preview URL
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);

    if (onUpload) {
      try {
        await onUpload(file);
      } catch (error) {
        console.error("Upload error:", error);
        setPreview(src); // fallback to original preview if upload fails
      }
    }
    setLoading(false);
  };

  const onRemoveFile = async () => {
    setLoading(true);
    setPreview("");
    if (onDelete && preview) {
      try {
        await onDelete(preview);
        setPreview("");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>

      {!preview && !loading &&
          <div
            className={styles.upload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onChangeFile}
          >
          <label htmlFor={`myfile${id}`}>
            Upload images <br /> or <br /> drag and drop
          </label>
          <input
            type="file"
            id={`myfile${id}`}
            accept="image/*"
            className={styles.inputFile}
            onChange={onChangeFile}
          />
        </div>
      }

      <div className={styles.preview}>
        {loading ? <div className={styles.loading} />
        : preview && 
            <div>
              <img src={preview} alt="preview" />
              <button onClick={onRemoveFile}>remove</button>
            </div>
        }
      </div>

    </div>
  );
};

export default SingleFile;
