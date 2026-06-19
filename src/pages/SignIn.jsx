import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [isError, setIsError] = useState(false);
  const alartComp = useRef();
  return (
    <>
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/get-help"} className="btn btn-primary mx-2">
            Get help
          </Link>
        </span>
      </nav>
      <form
        className="p-2 border min-h-40 mx-auto mt-10 flex flex-col items-center gap-2 shrink max-w-100"
        onSubmit={(e) => {}}
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
          type="text"
          className="form-control  mx-4 max-w-80"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          name="password"
        />

        <input
          type="text"
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
export default SignIn;
