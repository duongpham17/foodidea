import styles from './Single.module.scss';
import { useState } from 'react';
import Spinner from '@components/loading/Spinner';
import { MdClose } from 'react-icons/md'

interface Props {
    id: string,
    src: string,
    onUpload?: (blob: any) => Promise<void>;
    onDelete?: (cid: string) => Promise<void>;
}

const SingleFile = ({src, onUpload, onDelete, id}: Props) => {

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState<string>(src);
    
    const onChangeFile = async (e: any): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const file = e.target.files ? e.target.files : e.dataTransfer.files;
        const objectURL = URL.createObjectURL(file[0]);    
        setPreview(objectURL);
        if(onUpload) await onUpload(file[0]);
        setLoading(false)
    };

    const onRemoveFile = async () => {
        setLoading(true);
        setPreview("");
        if(onDelete) await onDelete(preview);
        setLoading(false)
    };

    return (
        <div className={styles.container}>

            <div className={styles.upload} onDragOver={(e) => e.preventDefault()} onDrop={onChangeFile}>
                <label htmlFor={`myfile${id}`}>Upload images <br/> or <br/> drag and drop</label>
                <input type="file" id={`myfile${id}`} accept='image/*' className={styles.inputFile} onChange={onChangeFile}/>
            </div>

            <div className={styles.preview}>
                { loading 
                    ? 
                        <Spinner size={20} center />
                    : 
                        <div>
                            <img src={preview} alt="preview"/>
                            {preview && <button onClick={onRemoveFile}><MdClose /></button>}
                        </div> 
                }
            </div>

        </div>
    )
}

export default SingleFile