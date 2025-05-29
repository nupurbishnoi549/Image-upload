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
            <div className="bg-green-100 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
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
                    <div className="relative w-full max-h-[400px]">
                        <button
                            onClick={handleRemoveImage}
                            className="absolute md:top-[9%] md:right-[-2%] top-[12%] right-[-4%] text-white cursor-pointer bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                            title="Remove image"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview:</h3>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-[380px] md:h-[300px] h-[216px] rounded-xl object-contain bg-white"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleImageUpload;
