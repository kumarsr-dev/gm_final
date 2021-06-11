import { fetch } from "../fetch.services";
import { API_PATH } from "../../constant/path"

export const getAllCategories = () => {
  return fetch("get", API_PATH + 'type=categories', {}, {});
}

export const getAllPackagesById = (cat_id) => {
  return fetch("get", API_PATH + 'type=packagebyCatId&category_id=' + cat_id, {}, {});
}

export const getVendorToken = (token) => {
  return fetch("get", API_PATH + 'type=getVendor&sessToken='+token, {}, {});
}

export const getSetsbyPackageId = (package_id) => {
  return fetch("get", API_PATH + 'type=setsbyPackageId&package_id=' + package_id, {}, {});
}

export const loginCheck = (phoneno) => {
  return fetch("get", API_PATH + 'type=logincheck&username=' + phoneno, {}, {});
}

export const verifyLogin = (phoneno, otp) => {
  return fetch("get", API_PATH + 'type=verifylogin&username=' + phoneno + '&passwd=' + otp, {}, {});
}

export const getQuestionsBySetId = (set_id) => {
  return fetch("get", API_PATH + 'type=questionsbySetId&set_id=' + set_id, {}, {});
}