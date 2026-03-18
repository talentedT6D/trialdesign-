import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const SubmissionForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState(null);
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    "Drama",
    "Comedy",
    "Horror",
    "Documentary",
    "Animation",
    "Experimental",
    "Music Video",
    "Other",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 200 * 1024 * 1024) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("File size must be under 200MB.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !email || !contact || !submissionTitle || !category) {
      setError("Please fill all fields and upload a file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `submissions/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (uploadError) => {
          setError("Upload failed. Please try again.");
          setUploading(false);
          console.error(uploadError);
        },
        async () => {
          const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Save submission data to Firestore
          const docRef = await addDoc(collection(db, "submissions"), {
            name,
            email,
            contact,
            submissionTitle,
            fileUrl,
            category,
            status: "Pending",
            createdAt: new Date().toISOString(),
          });

          // Navigate to payment page with submission ID
          navigate("/payment", {
            state: {
              submissionId: docRef.id,
              name,
              email,
              submissionTitle,
            },
          });
        }
      );
    } catch (err) {
      setError("Error submitting form. Please try again.");
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #1a0000 20%, #8b0000 50%, #ff4500 80%, #ffd700 100%)",
      }}
    >
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <div
          className="w-16 h-16 border-2 flex items-center justify-center"
          style={{ borderColor: "#ffd700" }}
        >
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            ISF
          </span>
        </div>
      </div>

      <h2
        className="text-4xl md:text-5xl mb-2 text-center"
        style={{ fontFamily: "Bebas Neue", color: "#ffd700" }}
      >
        SUBMISSION FORM
      </h2>
      <p className="text-white/60 mb-8 text-center">
        Fill in your details and upload your vertical short film
      </p>

      {error && (
        <div className="mb-4 px-6 py-3 bg-red-900/80 border border-red-500 text-red-200 text-center max-w-lg w-full">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="input-festival"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="input-festival"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Contact Number"
          className="input-festival"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Film Title"
          className="input-festival"
          value={submissionTitle}
          onChange={(e) => setSubmissionTitle(e.target.value)}
          required
        />

        {/* Category Dropdown */}
        <select
          className="input-festival"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ background: "#1a0000" }}>
              {cat}
            </option>
          ))}
        </select>

        {/* File Upload */}
        <div
          className="border-2 border-dashed p-6 text-center cursor-pointer"
          style={{ borderColor: "#ff0000", background: "rgba(0,0,0,0.4)" }}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            {file ? (
              <div>
                <p className="text-white font-semibold">{file.name}</p>
                <p className="text-white/50 text-sm mt-1">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-white/70 text-lg mb-2">
                  Click to upload your film
                </p>
                <p className="text-white/40 text-sm">
                  Max 200MB | Video files only | Under 120 seconds
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="w-full bg-black/50 h-3 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${uploadProgress}%`,
                background:
                  "linear-gradient(90deg, #ff4500, #ffd700)",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn-festival w-full py-4 text-xl"
          disabled={uploading}
        >
          {uploading ? `UPLOADING... ${uploadProgress}%` : "SUBMIT FILM"}
        </button>

        <p className="text-white/40 text-xs text-center mt-4">
          Submission fee of ₹499 will be collected on the next page
        </p>
      </form>

      {/* Zigzag border */}
      <div className="w-full mt-auto zigzag-border" />
    </div>
  );
};

export default SubmissionForm;
