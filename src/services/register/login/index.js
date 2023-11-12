export const login = async (formData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response)
    const data = response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error, "error in login");
  }
};
