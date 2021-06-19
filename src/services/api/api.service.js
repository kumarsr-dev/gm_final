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

export const getQuestionsBySubject = (set_id) => {
  return fetch("get", API_PATH + 'type=questionsbySetId&set_id=' + set_id, {}, {});
}

export const getReport = (set_id, getCustomerId) => {
  return fetch("get", API_PATH + 'type=getReport&customer_id=' + getCustomerId + '&set_id=' + set_id, {}, {});
}

export const saveTest = (options) => {
  return fetch("post", API_PATH + 'type=saveTest', JSON.stringify(options), {});
}

export const getVendor = (userToken) => {
  return fetch("get", API_PATH + 'type=getVendor&sessToken=' + userToken, {}, {});
}

export const profileUpdate = (options, headers) => {
  return fetch("post", API_PATH + 'type=profileUpdate', JSON.stringify(options), headers);
}

export const saveOrder = (customer_id, package_id) => {
  return fetch("get", API_PATH + `type=saveOrder&customer_id=${customer_id}&package_id=${package_id}`, {}, {});
}