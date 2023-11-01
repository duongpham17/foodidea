import { NFTStorage } from 'nft.storage';

const api_key = process.env.NEXT_PUBLIC_API_NFT_STORAGE_API as string;

export const upload = async (image: any): Promise<{ url: string; ipfs: string}> => {
    const storage = new NFTStorage({ token: api_key || "" });
    const blob = new Blob([image]);
    const cid = await storage.storeBlob(blob);
    return {
        ipfs: cid,
        url: `https://${cid}.ipfs.nftstorage.link`,
    }
};

export const remove = async (cid: string): Promise<void> => {
    try{
        const storage = new NFTStorage({ token: api_key || "" });
        await storage.delete(cid);
    } catch(err: any){
        console.log(err.response)
    }
};