import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resendOtp, sendOTP, verifyOtp } from "../services/user.services";

function VerifyEmail() {
  const alartComp = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const resendRef = useRef();

  //first otp send
  async function sendEmail() {
    try {
      await sendOTP();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    sendEmail();
  }, []);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get("otp").trim();
    console.log(otp);
    // const otp = "";
    if (otp.length != 6) {
      alartComp.current.textContent = "OTP must be of 6 numbers";
      setIsError(true);
      return;
    }

    const postFormData = new FormData();

    postFormData.append("otp", otp);
    try {
      const response = await verifyOtp(postFormData);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      alartComp.current.textContent = error.response.data.message.err;
      setIsError(true);
      return;
    }
    //remove err msg
    setIsError(false);
  };
  //handle resend
  const handleResend = async () => {
    if (resendRef.current.textContent != "resend OTP") {
      alartComp.current.textContent = `please wait for cooldown`;
      setIsError(true);
      return;
    }
    //==============Resend OTP==============
    try {
      const response = await resendOtp();
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }

    let i = 30;
    const cooldownInterval = setInterval(() => {
      resendRef.current.textContent = `resend OTP (${i}s)`;
      if (i == 0) {
        resendRef.current.textContent = `resend OTP`;
        setIsError(false);
        clearInterval(cooldownInterval);
      }
      i--;
    }, 1000);
  };

  return (
    <>
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/get-help"} className="btn btn-primary mx-2">
            Get Help
          </Link>
        </span>
      </nav>

      <form
        className="p-2 border min-h-40 mx-auto mt-10 flex flex-col items-center gap-2 shrink max-w-100"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p className="font-light text-2xl">Verify OTP</p>
        {/* Alart */}

        <div
          className={`${!isError ? "hidden" : "block"} alert alert-danger py-1 mb-1`}
          ref={alartComp}
          role="alert"
        >
          There, error will be appear
        </div>

        {/* OTP */}
        <input
          type="number"
          className="form-control mx-4 max-w-80"
          placeholder="OTP"
          aria-label="OTP"
          name="otp"
        />

        <p
          href="#"
          ref={resendRef}
          className="link-secondary my-0 py-0 cursor-pointer hover:underline"
          onClick={() => {
            handleResend();
          }}
        >
          resend OTP
        </p>

        {/* Submit */}
        <button className="btn btn-primary mx-4 max-w-80 w-full" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default VerifyEmail;
