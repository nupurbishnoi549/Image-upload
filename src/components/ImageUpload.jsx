import React, { useState, useEffect } from 'react';

function SingleImageUpload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const savedPreview = localStorage.getItem('uploadedImage');
        if (savedPreview) {
            setPreview(savedPreview);
        }
    }, []);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
            localStorage.setItem('uploadedImage', previewURL);
        }
    }

    function handleRemoveImage() {
        setImage(null);
        setPreview(null);
        localStorage.removeItem('uploadedImage');
        document.getElementById('file-upload').value = '';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-300 via-sky-400 to-emerald-200 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
                <h2 className="text-2xl font-bold text-sky-700">Upload an Image</h2>

                <label
                    htmlFor="file-upload"
                    className="inline-block cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                    Choose File
                </label>

                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                {preview && (
                    <div className="relative w-full max-h-96">
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-[6%] right-[-2%] text-white cursor-pointer bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                            title="Remove image"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview:</h3>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full max-h-72 rounded-xl object-contain shadow-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleImageUpload;
