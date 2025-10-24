import { PinataSDK } from "pinata";

// IMPORTANT!
// You must create an app/api/pinata/routes.ts so environment variable can be exposed on the server, otherwise wont wont.

export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT as string,
  pinataGateway: process.env.PINATA_GATEWAY as string
});

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/pinata", { method: "POST", body: formData });
  const data = await res.json();
  const id = data.id;
  const url = `https://sapphire-unknown-koala-579.mypinata.cloud/ipfs/${data.cid}`;
  return {url, id};
};

export const remove = async (id: string[]) => {
  await fetch("/api/pinata", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id }),
  });
  return "success";
};
