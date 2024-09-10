export async function uploadFile(file:any, numEpochs:number = 1) {
    try {
        const response = await fetch(`https://publisher-devnet.walrus.space/v1/store?epochs=${numEpochs}`, {
            method: "PUT",
            body: file,
        });

        if (response.status === 200) {
            const info = await response.json();
            return { info, mediaType: file.type };
        } else {
            throw new Error("Something went wrong when storing the blob!");
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}