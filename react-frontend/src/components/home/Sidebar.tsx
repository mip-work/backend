import { lazy, Suspense as S, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IconBtn from "../util/IconBtn";
import Avatar from "../util/Avatar";
import { setTheme, Theme } from "../../utils";
import { APIERROR } from "../../api/apiTypes";
import { mipAPI } from "../../api/axios";
import toast from "react-hot-toast";
import { useUser } from "../../hooks/useUser";
// import { useClearQueryClient } from '../../main';
const Profile = lazy(() => import("./Profile"));

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

function Sidebar(props: Props) {
  const {
    theme: { mode },
    toggleTheme,
  } = props;
  const { useGetUser } = useUser();
  const { data: user } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (user?.status === 401) return <Navigate to="/login" />;

  const handleToggle = () => {
    toggleTheme();
    setTheme(mode);
  };

  const handleLogOut = async () => {
    // useClearQueryClient() débito técnico
    toast("Logged out!");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen shrink-0">
      <div className="flex w-14 flex-col items-center justify-between bg-primary py-6">
        <div className="flex flex-col gap-y-8">
          <button
            title="Go to Home"
            onClick={() => navigate("/project")}
            className="w-8"
          >
            <img className="h-8 w-12" src="/assets/jira.svg" alt="jira-clone" />
          </button>
          <input
            checked={mode === "dark"}
            type="checkbox"
            onChange={handleToggle}
            className="btn-toggle"
            title="Toggle theme"
          />
        </div>
        <div className="flex flex-col gap-6">
          {user?.data && (
            <>
              <Avatar
                title="Profile"
                src={user?.data.profileUrl}
                name={user?.data.username}
                onClick={() => setIsOpen((p) => !p)}
                className="h-9 w-9 border-[1px] hover:border-green-500"
              />
              <IconBtn
                onClick={handleLogOut}
                icon="charm:sign-out"
                title="Log Out"
              />
            </>
          )}
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 320 : 0 }}
        transition={{ type: "tween" }}
      >
        {user?.data && (
          <S>
            <Profile authUser={user?.data} />
          </S>
        )}
      </motion.div>
    </div>
  );
}

export default Sidebar;

async function logOut() {
  const result = await mipAPI.post("auth/logout");
  return result.data;
}
