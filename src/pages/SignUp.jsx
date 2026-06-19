import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../services/user.services";

function SignUp() {
  const alartComp = useRef();
  const [isError, setIsError] = useState(false);

  return (
    <>
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/get-help"} class="btn btn-primary mx-2">
            Get help
          </Link>
        </span>
      </nav>
      <form
        className="p-2 border min-h-40 mx-auto mt-10 flex flex-col items-center gap-2 shrink max-w-100"
        onSubmit={(e) => {
          /* checkpassword */
          const checkpassword = (password, confirmPassword) => {
            if (password === confirmPassword) {
              return password;
            }
            return undefined;
          };

          e.preventDefault();
          console.log(e.target);
          const formData = new FormData(e.target);

          const fullName = formData.get("fullName").trim();
          const email = formData.get("email").trim();
          const username = formData.get("username").trim();
          const avatar = formData.get("avatar");
          /* const password = formData.get("password"); */
          const password = checkpassword(
            formData.get("password").trim(),
            formData.get("confim-password").trim(),
          );

          //password
          if (!password) {
            /* Select the children and use it for changing text of the children. */
            alartComp.current.textContent = "Password is not valid";

            setIsError(true);
            return;
          }

          //email
          if (!email.includes("@gmail.com")) {
            alartComp.current.textContent = "Email must contain @gmail.com";

            setIsError(true);
            return;
          }

          //avatar
          if (!avatar) {
            alartComp.current.textContent = "Please import Avarar";

            setIsError(true);
            return;
          }

          //send post req
          const postFormData = new FormData();
          //{ fullName, email, username, password }
          postFormData.append("fullName", fullName);
          postFormData.append("email", email);
          postFormData.append("username", username);
          postFormData.append("password", password);
          postFormData.append("avatar", avatar);

          //post request
          createAccount(postFormData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log("err");
              console.log(err.response.data);
            });

          setIsError(false);
        }}
      >
        <p className="font-light text-2xl">Enter your details</p>
        {/* Alart */}

        <div
          class={`${!isError ? "hidden" : "block"} alert alert-danger py-1 mb-1`}
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
          class="form-control mx-4 max-w-80"
          placeholder="Username"
          aria-label="Username"
          name="username"
        />
        {/* Email */}
        <div class="input-group mx-4 max-w-80">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon2 "
            name="email"
          />
          <span class="input-group-text" id="basic-addon2">
            @gmail.com
          </span>
        </div>
        {/* Avatar */}
        <input
          type="file"
          accept="image/*"
          class="form-control mx-4 max-w-80"
          name="avatar"
        />
        {/* Passwords */}
        <input
          type="text"
          class="form-control  mx-4 max-w-80"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          name="password"
        />

        <input
          type="text"
          class="form-control  mx-4 max-w-80"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="basic-addon1"
          name="confim-password"
        />
        {/* Submit */}
        <button class="btn btn-primary mx-4 max-w-80 w-full" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUp;
