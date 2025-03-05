const validate = (): boolean => {
  const newErrors: Partial<SignInRequest> = {};

  if (!formData.email || !formData.email.trim()) {
    newErrors.email = "Email không được để trống.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    newErrors.email = "Email không hợp lệ.";
  }

  if (!formData.password || !formData.password.trim()) {
    newErrors.password = "Mật khẩu không được để trống.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
