import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Mail, User, ShieldCheck, Loader2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const { signUp, verifyOTP, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect if user becomes authenticated (e.g., via magic link)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);



  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await signUp(email, name);
      setShowOTP(true);
      toast.success(`Verification code sent to ${email}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to send code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await verifyOTP(email, otp);
      toast.success("Account verified! Welcome to Bloom Bar.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired code");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOTP) {
    return (
      <main className="container max-w-lg py-20 px-4">
        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 animate-scale-in">
          <button 
            disabled={isSubmitting}
            onClick={() => setShowOTP(false)}
            className="flex items-center gap-2 text-primary text-sm hover:underline mb-8 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Edit Details
          </button>

          <div className="text-center mb-10 space-y-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading">Verify Email</h1>
            <p className="text-muted-foreground text-sm">
              Check your inbox for a 6-digit code sent to <br />
              <span className="font-semibold text-foreground">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-8 flex flex-col items-center">
            <div className="space-y-4 w-full flex flex-col items-center">
              <InputOTP
                disabled={isSubmitting}
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="rounded-xl border-2 h-14 w-12" />
                  <InputOTPSlot index={1} className="rounded-xl border-2 h-14 w-12" />
                  <InputOTPSlot index={2} className="rounded-xl border-2 h-14 w-12" />
                  <InputOTPSlot index={3} className="rounded-xl border-2 h-14 w-12" />
                  <InputOTPSlot index={4} className="rounded-xl border-2 h-14 w-12" />
                  <InputOTPSlot index={5} className="rounded-xl border-2 h-14 w-12" />
                </InputOTPGroup>
              </InputOTP>
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={() => signUp(email, name)}
                className="text-xs text-primary font-medium hover:underline disabled:opacity-50"
              >
                Resend Code
              </button>
            </div>

            <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 rounded-xl text-md font-medium shadow-xl shadow-primary/20">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container max-w-lg py-20 px-4">
      <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-heading">Join Bloom Bar</h1>
          <p className="text-muted-foreground text-sm">Create an account to start blossoming</p>
        </div>

        <form onSubmit={handleInitialSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                disabled={isSubmitting}
                type="text"
                placeholder="Jane Doe"
                className="pl-10 h-12 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                disabled={isSubmitting}
                type="email"
                placeholder="hello@example.com"
                className="pl-10 h-12 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-12 rounded-xl text-md font-medium">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Send Verification Code <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
