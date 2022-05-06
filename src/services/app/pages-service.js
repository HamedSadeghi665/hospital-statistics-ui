import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/global/pages";

async function accessiblePageCategories() {
  const { data } = await http.get(`${apiEndpoint}/accessiblePageCategories`);

  return data;
}

async function accessiblePagesByCategory(categoryID) {
  const { data } = await http.get(`${apiEndpoint}/accessiblePages/${categoryID}`);

  return data;
}

async function accessiblePages() {
  const { data } = await http.get(`${apiEndpoint}/accessiblePages`);

  return data;
}

const service = {
  accessiblePageCategories,
  accessiblePagesByCategory,
  accessiblePages,
};

export default service;
