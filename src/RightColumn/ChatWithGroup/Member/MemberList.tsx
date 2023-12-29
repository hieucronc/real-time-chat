import "../Edit/EditGroup.css";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdTrash } from "react-icons/io";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IoMdArrowBack } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import ChannelApi from "../../../Api/ChannelApi";
import Member from "./Member";
import { idID } from "@mui/material/locale";

type UserType = {
  id: number;
  username: string;
  avatar_url: any;
  first_name: string;
  last_name: string;
  fullname: string;
};

type ChannelType = {
  id: number;
  member_count: number;
  last_message?: any;
  title: string;
  avatar_url?: string;
  create_at: string;
};

type UnifiedType = UserType | ChannelType;

type ChannelInboxProps = {
  channel: UnifiedType;
  userId: number;
  handMemberBack: (event: React.MouseEvent<HTMLSpanElement>) => void;
};

type MemberType = {
  id: number;
  user: any;
  nickname: string;
  role: any;
  channel: number;
};

const MemberList: React.FC<ChannelInboxProps> = ({
  channel,
  handMemberBack,
  userId,
}) => {
  const channelInfo = channel as ChannelType;

  const [members, setMemners] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ChannelApi.getAllMembersChannel(channelInfo.id); // Replace with your API endpoint
        setMemners(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="rightcolumn-header">
        <span className="btn-edit" onClick={handMemberBack}>
          <IoMdArrowBack size={24} className="util-icon" />
        </span>
        <h3>Member</h3>
      </div>
      <div style={{ height: "4rem" }}></div>
      <div>
        {members.map((member) => (
          <Member
            channel={member.channel}
            id={member.id}
            nickname={member.nickname}
            role={member.role}
            user={member.user}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberList;