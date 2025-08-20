"use client";

import type React from "react";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "@/redux/feature/authAPI";

function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");
  console.log(email);
  const [verifyOtp] = useVerifyOtpMutation();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.split("").slice(0, otp.length);
      const newOtp = [...otp];

      digits.forEach((digit, i) => {
        if (index + i < otp.length) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      const nextIndex = Math.min(index + digits.length, otp.length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const otpValue = otp.join("");

    if (otpValue.length !== 6 || !/^\d+$/.test(otpValue)) {
      toast.error("Please enter a valid OTP");

      setIsSubmitting(false);
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        oneTimeCode: Number(otpValue),
      }).unwrap();

      console.log({ res });

      if (res?.success) {
        toast.success(res.message);
        router.push("/reset-password");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.warning("The OTP you entered is incorrect or has expired");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30); // 30 seconds cooldown

    try {
      const res = await verifyOtp({
        email,
      }).unwrap();

      console.log(res);

      // Clear current OTP fields
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  return (
    <div className='w-full min-h-screen bg-[url(/auth-bg.png)] flex flex-col items-center justify-center p-4 md:p-8'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      <div className='container mx-auto space-y-8 flex flex-col md:flex-row items-center z-50'>
        <div className='w-full md:w-1/2 max-w-lg mx-auto bg-authFormBg px-6 py-16 rounded-xl'>
          <div className='text-center flex items-center justify-center space-x-2.5'>
            <h1 className='text-[32px] font-semibold text-authFormColor'>
              Verify with OTP
            </h1>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div className='flex justify-center gap-2 md:gap-4'>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='h-14 w-14 md:h-16 md:w-16 text-center text-xl font-semibold'
                  autoFocus={index === 0}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            <button
              type='submit'
              className='w-full !bg-button text-buttonColor text-lg font-medium py-2 rounded-full transition-colors cursor-pointer'
              disabled={isSubmitting || otp.some((digit) => !digit)}
            >
              {isSubmitting ? "Verifying..." : "Submit"}
            </button>

            <div className='flex flex-col gap-5'>
              <div className='flex justify-center'>
                <p className='text-base text-authFormColor'>
                  Didn&apos;t receive the OTP?{" "}
                  <button
                    type='button'
                    onClick={handleResend}
                    disabled={resendDisabled}
                    className='text-[#F99F04] hover:text-[#ffaf25] font-medium disabled:text-gray-400 disabled:cursor-not-allowed'
                  >
                    {resendDisabled ? `Resend (${countdown}s)` : "Resend"}
                  </button>
                </p>
              </div>

              <p className='text-sm text-center text-authFormColor'>
                Please enter the OTP we have sent you in your email.
              </p>

              <div className='text-center'>
                <Link
                  href='/signin'
                  className='text-authFormColor hover:text-authFormColor text-base font-medium hover:underline'
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense>
      <VerifyOTP />
    </Suspense>
  );
}
