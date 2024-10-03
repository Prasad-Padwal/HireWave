import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showSignIn, setShowSignIn] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [search, setSeacrch] = useSearchParams();

  const {user} = useUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect( () =>
  {
    if(search.get('sign-in'))
    {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) =>
  {
    if (e.target == e.currentTarget)
    {
      setShowSignIn(false);
      setSeacrch({});
    }

  }

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/job_logo.png" className="h-20 w-25 ml-5" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
              className="mr-10"
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* Add condition here */}
            {user?.unsafeMetadata?.role === "recrutier" && (
            <Link to="/post-jobs">
            <Button variant="destructive" className="rounded-full ml-10">
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
            </Link>
            )}
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10 mr-10",
              }
            }}>
            <UserButton.MenuItems>
              <UserButton.Link
              label="My Jobs"
              labelIcon={<BriefcaseBusinessIcon size={15}/>}
              href="/my-jobs"
              />
              <UserButton.Link
              label="Save Jobs"
              labelIcon={<Heart size={15}/>}
              href="/save-jobs"
              />

              
            </UserButton.MenuItems>

            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default header;
