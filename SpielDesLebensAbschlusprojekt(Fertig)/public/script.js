async function getMatrix() {
    try {
        const response = await fetch('/getMatrix');
        console.log("Download complete", response);
    } catch (error) {
        console.error(`Download error: ${error.message}`);
    }
}
