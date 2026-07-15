"use server";

export async function uploadToCloudinary(file: File): Promise<string | null> {
  try {
    const cloudFormData = new FormData();
    cloudFormData.append("file", file);
    cloudFormData.append("upload_preset", process.env.CLOUDINARY_PRESET || "");

    const cloudUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    const cloudResponse = await fetch(cloudUrl, {
      method: "POST",
      body: cloudFormData,
    });

    if (!cloudResponse.ok) {
      const errorText = await cloudResponse.text();
      console.error("Cloudinary upload failed:", errorText);
      return null;
    }

    const cloudData = await cloudResponse.json();
    return cloudData.secure_url;
  } catch (error) {
    console.error("Cloudinary error:", error);
    return null;
  }
}
