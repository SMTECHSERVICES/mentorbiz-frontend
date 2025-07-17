import axios from "axios";
import { server } from "./api";
const seedCoursesToBackend = async (servicesData) => {
  for (let i = 0; i < servicesData.length; i++) {
    const course = servicesData[i];
    try {
      // Step 1: Load public image file into a Blob
      const response = await fetch(course.imageUrl);
      const blob = await response.blob();

      // Step 2: Create a File object from the blob
      const file = new File([blob], course.imageUrl.split('/').pop(), { type: blob.type });

      // Step 3: Prepare FormData
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("ExplorePoints", course.ExplorePoints);
      formData.append("thumbnail", file);

      // Step 4: Send FormData to backend
      const res = await axios.post(`${server}/course/uploadCourse`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(`✅ Uploaded: ${course.title}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${course.title}`, err.message);
    }
  }
};

export default seedCoursesToBackend;