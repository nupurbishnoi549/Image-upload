import React, { useState, useEffect } from 'react';

function MultipleImageUpload() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('uploadedImages'));
        if (savedImages) {
            setImages(savedImages);
        }
    }, []);

    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        localStorage.setItem(
            'uploadedImages',
            JSON.stringify(updatedImages)
        );
    }

    function handleRemoveImage(index) {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    }

    function handleClearAll() {
        setImages([]);
        localStorage.removeItem('uploadedImages');
        document.getElementById('multi-upload').value = '';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-400 to-rose-300 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6">
                <h2 className="text-2xl font-bold text-pink-700">Upload Multiple Images</h2>

                <label
                    htmlFor="multi-upload"
                    className="inline-block cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                    Choose Files
                </label>

                <input
                    id="multi-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />

                {images.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-[-3%] right-[-3%] text-white bg-red-500 hover:bg-red-600 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-10"
                                        title="Remove image"
                                    >
                                        &times;
                                    </button>
                                    <img
                                        src={img.preview}
                                        alt={`preview-${index}`}
                                        className="w-full h-60 object-contain rounded-lg bg-gray-100 shadow"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleClearAll}
                            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg transition duration-300"
                        >
                            Clear All
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MultipleImageUpload;
