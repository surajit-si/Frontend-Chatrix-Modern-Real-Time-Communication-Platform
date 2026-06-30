import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../services/user.services";

function SignIn() {
  const [isError, setIsError] = useState(false);
  const alartComp = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const usernameOrEmail = formData.get("usernameOrEmail").trim();
    const password = formData.get("password").trim();

    const postFormData = new FormData();
    usernameOrEmail.includes("@gmail.com")
      ? postFormData.append("email", usernameOrEmail)
      : postFormData.append("username", usernameOrEmail);

    postFormData.append("password", password);
    try {
      const response = await logIn(postFormData);
      console.log(response.data.data.updatedUser.isVerified);
      //redirect to destination
      response.data.data.updatedUser.isVerified
        ? navigate("/home")
        : navigate("/varify-email");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/sign-up"} className="btn btn-primary mx-2">
            SignUp
          </Link>
        </span>
      </nav>
      <form
        className="p-2 pb-3 border border-(--border)! rounded-2xl min-h-40 mx-auto mt-10 flex flex-col items-center gap-2 shrink max-w-100"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p className="font-light text-2xl text-(--text) ">Login</p>
        {/* Alart */}

        <div
          className={`${!isError ? "hidden" : "block"} alert alert-danger py-1 mb-1`}
          ref={alartComp}
          role="alert"
        >
          There, error will be appear
        </div>

        {/* Username / Email */}
        <input
          type="text"
          className="form-control mx-4 max-w-80"
          placeholder="Username/Email"
          aria-label="Username/Email"
          name="usernameOrEmail"
        />
        {/* Password */}
        <input
          type="password"
          className="form-control mx-4 max-w-80"
          placeholder="Password"
          aria-label="Password"
          name="password"
        />
        {/* Submit */}
        <button
          className="btn btn-primary mx-4 max-w-80 w-full text-(--text) "
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default SignIn;
