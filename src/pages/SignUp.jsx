import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../services/user.services";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const alartComp = useRef();
  const [isError, setIsError] = useState(false);
  const [postData, setPostData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const checkpassword = (password, confirmPassword) => {
      if (password === confirmPassword) {
        return password;
      }
      return undefined;
    };

    e.preventDefault();
    const formData = new FormData(e.target);

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const username = formData.get("username").trim();
    const avatar = formData.get("avatar");
    const password = checkpassword(
      formData.get("password").trim(),
      formData.get("confim-password").trim(),
    );

    if (!password) {
      alartComp.current.textContent = "Password is not valid";
      setIsError(true);
      return;
    }

    if (!email.includes("@gmail.com")) {
      alartComp.current.textContent = "Email must contain @gmail.com";
      setIsError(true);
      return;
    }

    if (!avatar) {
      alartComp.current.textContent = "Please import Avatar";
      setIsError(true);
      return;
    }

    const postFormData = new FormData();
    postFormData.append("fullName", fullName);
    postFormData.append("email", email);
    postFormData.append("username", username);
    postFormData.append("password", password);
    postFormData.append("avatar", avatar);

    try {
      const res = await createAccount(postFormData);
      setPostData(res.data);
      setIsError(false);
      navigate("/sign-in", { replace: true });
    } catch (err) {
      const errorData = err?.response?.data || {};
      setPostData(errorData);
      alartComp.current.textContent = errorData.message || "An error occurred";
      setIsError(true);
    }
  };

  return (
    <>
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/sign-in"} class="btn btn-primary mx-2">
            Sign in
          </Link>
        </span>
      </nav>
      <form
        className="p-2 border min-h-40 mx-auto mt-10 flex flex-col items-center gap-2 shrink max-w-100"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p className="font-light text-2xl">Enter your details</p>
        {/* Alart */}

        <div
          className={`${!isError ? "hidden" : "block"} alert alert-danger py-1 mb-1`}
          ref={alartComp}
          role="alert"
        >
          There, error will be appear
        </div>

        {/* Full Name */}
        <input
          type="text"
          className="form-control mx-4 max-w-80"
          placeholder="Full Name"
          aria-label="Full Name"
          name="fullName"
        />
        {/* Username */}
        <input
          type="text"
          className="form-control mx-4 max-w-80"
          placeholder="Username"
          aria-label="Username"
          name="username"
        />
        {/* Email */}
        <div className="input-group mx-4 max-w-80">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon2 "
            name="email"
          />
          <span className="input-group-text" id="basic-addon2">
            @gmail.com
          </span>
        </div>
        {/* Avatar */}
        <input
          type="file"
          accept="image/*"
          className="form-control mx-4 max-w-80"
          name="avatar"
        />
        {/* Passwords */}
        <input
          type="password"
          className="form-control  mx-4 max-w-80"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          name="password"
        />

        <input
          type="password"
          className="form-control  mx-4 max-w-80"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="basic-addon1"
          name="confim-password"
        />
        {/* Submit */}
        <button className="btn btn-primary mx-4 max-w-80 w-full" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUp;
