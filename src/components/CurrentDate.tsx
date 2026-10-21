import { connection } from "next/server";

const CurrentDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
  return <span className="text-[15px] leading-5 text-base-content/60">{date}</span>;
}
export default CurrentDate;