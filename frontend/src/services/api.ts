import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAnalysis = async (jobId: string) => {
  const response = await api.get(`/analysis/${jobId}`);
  return response.data;
};

export const matchJD = async (jobId: string, jdText: string) => {
  const response = await api.post("/match", { job_id: jobId, jd_text: jdText });
  return response.data;
};

export const rewriteSection = async (sectionText: string, context: string) => {
  const response = await api.post("/rewrite", { section_text: sectionText, context });
  return response.data;
};
