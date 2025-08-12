import Avatar from "../../ui/Avatar/Avatar";
import userImage from "../../../assets/user-img.jpg";

function UserInfo() {
  return (
    <div>
      <Avatar src={userImage} size="sm" />
    </div>
  );
}

export default UserInfo;
