export const upload = async (image: any): Promise<{ url: string; ipfs: string}> => {

    const JWT = process.env.NEXT_PUBLIC_API_PINATA_JWT as string;

    try {
        const blob = new Blob([image], { type: "text/plain" });
        const file = new File([blob], `${image.name}.txt`);
        const data = new FormData();
        data.append("file", file);

        const request = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${JWT}`},
                body: data,
            }
        );
        const response = await request.json();
        return {
            url: `https://sapphire-unknown-koala-579.mypinata.cloud/ipfs/${response.IpfsHash}`,
            ipfs: response.IpfsHash
        }
    } catch (error) {
        console.log(error);
        return {
            url: "",
            ipfs: ""
        }
    }
};

export const remove = async (hash: string): Promise<boolean> => {

    const JWT = process.env.NEXT_PUBLIC_API_PINATA_JWT as string;

    if (!JWT) {
        console.error("JWT is not defined. Please set NEXT_PUBLIC_API_PINATA_JWT in your environment.");
        return false
    };

    const hashed = hash.includes('/ipfs/') ? hash.split('/ipfs/')[1] : hash;

    try {
        const request = await fetch(
            `https://api.pinata.cloud/pinning/unpin/${hashed}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${JWT}`},
            }
        );
        const response = await request.json();
        return true
    } catch (error) {
        return false
    }
};

