import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "./../../ui/SpinnerMini.jsx";
import { useLogout } from "./useLogout";

export default function Logout() {
  const { logout, isLogingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLogingOut}>
      {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
