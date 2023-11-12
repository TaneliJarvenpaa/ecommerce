"use client";
import { loginFormControls } from "@/utils";
import InputComponent from "../components/FormElements/InputComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/services/register/login";

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);

  const router = useRouter();

  console.log(formData);
  //disable the login button if either one of the input fields is empty
  function isValidForm() {
    return formData &&
      formData.password !== "" &&
      formData.password.trim() &&
      formData.email &&
      formData.email.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin(){
    const res= await login(formData);
    console.log(res)
  }

  return (
    <div className="bg-white relative">
      <div className="flex flex-col item-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg-flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 ">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}>
                  Login
                </button>
                <div className="flex flex-col gap-0">
                  <p>First time ordering rally gear?</p>
                </div>
                <button
                  onClick={() => router.push("/register")}
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
