export function convertFileToBase64(file: File, callback: (result: string | null) => void) {
    const reader = new FileReader();

    reader.onloadend = () => {
        let base64Data = reader.result as string;
        base64Data = base64Data.split(',')[1];
        callback(base64Data);
    };

    reader.onerror = () => {
        callback(null);
    };

    reader.readAsDataURL(file);
}