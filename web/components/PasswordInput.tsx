import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";

export default function PasswordInput(
  props: Omit<ComponentProps<typeof Input>, "type">
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <Button
        className="absolute right-0 top-0"
        variant="ghost"
        tabIndex={-1}
        onClick={() => {
          setShowPassword((curr) => !curr);
        }}
      >
        {showPassword ? <Eye /> : <EyeOff />}
        <span className="sr-only">
          {showPassword ? "Hide Password" : "Show Password"} password
        </span>
      </Button>
    </div>
  );
}
