const { BlobServiceClient } = require('@azure/storage-blob');

// Connection string to your Azure Storage account
const AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://neonprivatecdn.blob.core.windows.net/;QueueEndpoint=https://neonprivatecdn.queue.core.windows.net/;FileEndpoint=https://neonprivatecdn.file.core.windows.net/;TableEndpoint=https://neonprivatecdn.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=co&sp=rlitf&se=2024-05-20T21:50:15Z&st=2024-05-20T13:58:15Z&spr=https&sig=uXdqiJGCfMp229ysRaQCT6ngdrHAc5hxZezLoGrH9PM%3D";
const MY_CONTAINER_NAME = 'kitchen-slideshow';
async function listBlobsInContainer() {
    // Create a BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Get a reference to the container
    const containerName = MY_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    console.log(`Listing blobs in container ${containerName}...`);

    // List blobs in the container
    for await (const blob of containerClient.listBlobsFlat()) {
        const blobClient = containerClient.getBlobClient(blob.name);
        const blobUrl = blobClient.url;
        console.log(`${blob.name}`);
        console.log(`Blob URL: ${blobUrl}`);
    }
}

listBlobsInContainer().catch((err) => {
    console.error("Error running sample:", err.message);
});