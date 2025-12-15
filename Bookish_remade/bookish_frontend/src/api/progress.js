import api from "./axios";

export const addProgress = (data) => {
  return api.post("/progress", data);
};

export const updateProgress = (id, data) => {
  return api.put(`/progress/${id}`, data);
};

export const deleteProgress = (id) => {
  return api.delete(`/progress/${id}`);
};
