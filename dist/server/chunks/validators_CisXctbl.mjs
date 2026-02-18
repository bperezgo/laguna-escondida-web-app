function isRequired(value) {
  if (value === null || value === void 0) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
function isValidPhone(phone) {
  const re = /^(\+?[0-9]{1,3})?[\s.-]?(\(?[0-9]{1,4}\)?[\s.-]?){2,4}[0-9]{1,4}$/;
  return re.test(phone.replace(/\s/g, ""));
}

export { isRequired as a, isValidPhone as b, isValidEmail as i };
